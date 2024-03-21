import { IApplication } from '../../../core/Application';
import { CoreModule } from '../../../core/decorators';
import { Container } from '../../../display/Container';
import { IPopup, PopupConfig, PopupConstructor } from '../../../display/Popup';
import { Signal } from '../../../signals';
import { getLastMapEntry } from '../../../utils/map';
import { bindAllMethods } from '../../../utils/methodBinding';
import type { IModule } from '../../Module';
import { Module } from '../../Module';

/**`
 * Interface for PopupManager
 */
export interface IPopupManager extends IModule {
  readonly view: Container; // The view of the PopupManager
  readonly current: IPopup | undefined; // The current active popup
  readonly popupCount: number; // The count of popups
  readonly currentPopupId: string | number | undefined; // The id of the current popup
  // signals
  onPopupShown: Signal<() => void>; // Signal for when a popup is shown
  onPopupHidden: Signal<() => void>; // Signal for when a popup is hidden

  // methods
  add(id: string | number, popup: PopupConstructor): void; // Add a popup

  show(id: string | number, config?: Partial<PopupConfig>): Promise<IPopup | undefined>; // Show a popup

  hide(id: string | number): Promise<IPopup | undefined>; // Hide a popup

  removeAll(animate?: boolean): void; // Remove all popups
}

/**
 * Class representing a PopupManager
 */
@CoreModule
export class PopupManager extends Module implements IPopupManager {
  public readonly id: string = 'PopupManager'; // The id of the PopupManager
  public readonly view = new Container(); // The view of the PopupManager

  // signals
  public onPopupShown = new Signal<() => void>(); // Signal for when a popup is shown
  public onPopupHidden = new Signal<() => void>(); // Signal for when a popup is hidden

  private _currentPopupId: string | number | undefined = undefined; // The id of the current popup

  private _popups: Map<string | number, PopupConstructor> = new Map(); // Map of popups
  private _activePopups: Map<string | number, IPopup> = new Map(); // Map of active popups

  get currentPopupId(): string | number | undefined {
    return this._currentPopupId;
  }

  get popupCount(): number {
    return this._popups.size;
  }

  get current(): IPopup | undefined {
    if (this._currentPopupId === undefined) {
      return undefined;
    }
    return this._activePopups.get(this._currentPopupId);
  }

  /**
   * Initialize the PopupManager
   * @param app - The application
   */
  initialize(app: IApplication): void {
    bindAllMethods(this);
    this.view.name = 'PopupManager';
    this._setupAppListeners();
  }

  /**
   * Destroy the PopupManager
   */
  destroy(): void {
    this._activePopups.clear();
    super.destroy();
  }

  /**
   * Add a popup
   * @param id - The id of the popup
   * @param popup - The popup constructor
   */
  add(id: string | number, popup: PopupConstructor): void {
    this._popups.set(id, popup);
  }

  /**
   * Show a popup
   * @param id - The id of the popup
   * @param config - The configuration for the popup
   * @returns a promise resolving to the popup, if it exists
   */
  async show(id: string | number, config: Partial<PopupConfig> = {}) {
    const popup = this._popups.get(id);
    if (popup) {
      const instance = this.view.add.existing(new popup(id, config));
      instance.initialize();
      await instance.show();
      instance.afterShow();
      this._activePopups.set(id, instance);
      this._currentPopupId = id;
      this.onPopupShown.emit();
      instance.start();
      return instance;
    }
    return;
  }

  /**
   * Hide a popup
   * @param id - The id of the popup
   * @returns a promise resolving to the popup, if it exists
   */
  async hide(id: string | number) {
    const popup = this._activePopups.get(id);
    if (popup) {
      popup.beforeHide();
      await popup.hide();
      this.view.removeChild(popup as any);
      this._activePopups.delete(id);
      this._currentPopupId = getLastMapEntry(this._activePopups)?.[0] || undefined;
      this.onPopupHidden.emit();
      popup.end();
      return popup;
    }
    return;
  }

  /**
   * Remove all popups
   * @param animate - Whether to animate the removal
   */
  removeAll(animate: boolean = false): void {
    if (animate) {
      this._activePopups.forEach((popup) => {
        popup.hide();
      });
    } else {
      this._activePopups.clear();
      this.view.removeChildren();
    }
  }

  /**
   * Setup application listeners
   * @private
   */
  private _setupAppListeners(): void {
    this.addSignalConnection(this.app.scenes.onSceneChangeStart.connect(() => this.removeAll()));
    this.app.keyboard.onKeyUp('Escape').connect(this._handleEscape);
  }

  /**
   * Handle escape key press
   * if the current popup should close when escape is pressed (true by default), closes it
   * @private
   */
  private _handleEscape() {
    if (this.current && this.current.config.closeOnEscape) {
      void this.hide(this.current.id);
    }
  }
}
