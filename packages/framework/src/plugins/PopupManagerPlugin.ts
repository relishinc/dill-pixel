import { Container } from '../display';
import { Signal } from '../signals';
import type { IPopup, PopupConfig, PopupConstructor } from '../ui';
import { bindAllMethods, getLastMapEntry } from '../utils';
import type { IPlugin } from './Plugin';
import { Plugin } from './Plugin';

/**`
 * Interface for PopupManager
 */
export interface IPopupManagerPlugin extends IPlugin {
  readonly view: Container; // The view of the PopupManager
  readonly current: IPopup | undefined; // The current active popup
  readonly hasActivePopups: boolean; // Whether there are any active popups
  readonly popupCount: number; // The count of popups
  readonly currentPopupId: string | number | undefined; // The id of the current popup
  // signals
  onShowPopup: Signal<(detail: PopupSignalDetail) => void>; // Signal for when a popup is shown
  onHidePopup: Signal<(detail: PopupSignalDetail) => void>; // Signal for when a popup is hidden
  onPopupChanged: Signal<(detail: PopupSignalDetail) => void>; // Signal for when a popup is changed
  // methods
  addPopup(id: string | number, popup: PopupConstructor): void; // Add a popup

  showPopup<T = any>(id: string | number, config: Partial<PopupConfig<T>>): Promise<IPopup<T> | undefined>;

  hidePopup<T = any>(id: string | number, data?: any): Promise<IPopup<T> | undefined>; // Hide a popup

  removeAllPopups(animate?: boolean): void; // Remove all popups
}

export type PopupSignalDetail<T = any> = { id: string | number; data?: T };

/**
 * PopupManager
 */

export class PopupManagerPlugin extends Plugin implements IPopupManagerPlugin {
  public readonly id: string = 'popups'; // The id of the PopupManager
  public readonly view = new Container(); // The view of the PopupManager

  // signals
  public onShowPopup: Signal<(detail: PopupSignalDetail) => void> = new Signal<(detail: PopupSignalDetail) => void>(); // Signal for when a popup is shown
  public onHidePopup: Signal<(detail: PopupSignalDetail) => void> = new Signal<(detail: PopupSignalDetail) => void>(); // Signal for when a popup is hidden
  public onPopupChanged: Signal<(detail: PopupSignalDetail) => void> = new Signal<
    (detail: PopupSignalDetail) => void
  >(); // Signal for when a popup is changed
  private _popups: Map<string | number, PopupConstructor> = new Map(); // Map of popups
  private _activePopups: Map<string | number, IPopup> = new Map(); // Map of active popups

  private _currentPopupId: string | number | undefined = undefined; // The id of the current popup

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

  get hasActivePopups(): boolean {
    return this._activePopups.size > 0;
  }

  /**
   * Initialize the PopupManager
   * @param _app
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  initialize(): void {
    bindAllMethods(this);
    this.view.label = 'PopupManager';
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
  addPopup<T = any>(id: string | number, popup: PopupConstructor<T>): void {
    this._popups.set(id, popup);
  }

  /**
   * Show a popup
   * @param id - The id of the popup
   * @param config - The configuration for the popup
   * @returns a promise resolving to the popup, if it exists
   */
  async showPopup<T = any>(id: string | number, config: Partial<PopupConfig<T>> = {}): Promise<IPopup<T> | undefined> {
    const popup: PopupConstructor<T> | undefined = this._popups.get(id);
    if (popup) {
      config.id = id;
      const instance = this.view.add.existing(new popup(id, config));
      instance.initialize();
      this.app.focus.clearFocus();

      await instance.show();

      this.app.focus.setFocusLayer(id);
      instance.afterShow();

      this._activePopups.set(id, instance);
      this._currentPopupId = id;

      return new Promise((resolve) => {
        this.app.ticker.addOnce(() => {
          this.onShowPopup.emit({ id, data: config?.data });
          instance.start();
          this.onPopupChanged.emit({ id, data: config?.data });
          resolve(instance);
        });
      });
    }
    return;
  }

  /**
   * Hide a popup
   * @param id - The id of the popup
   * @param data
   * @returns a promise resolving to the popup, if it exists
   */
  async hidePopup<T = any>(id: string | number, data?: T): Promise<IPopup<T> | undefined> {
    const popup = this._activePopups.get(id);
    if (popup) {
      popup.beforeHide();
      await popup.hide();
      this.view.removeChild(popup as any);
      this._activePopups.delete(id);
      this._currentPopupId = getLastMapEntry(this._activePopups)?.[0] || undefined;
      return new Promise((resolve) => {
        this.app.ticker.addOnce(() => {
          this.onHidePopup.emit({ id, data });
          popup.end();
          this.onPopupChanged.emit({ id, data });
          resolve(popup);
        });
      });
    }
    return;
  }

  /**
   * Remove all popups
   * @param animate - Whether to animate the removal
   */
  removeAllPopups(animate: boolean = false): void {
    if (animate) {
      this._activePopups.forEach((popup) => {
        popup.hide();
      });
    } else {
      this._activePopups.clear();
      this.view.removeChildren();
    }
  }

  protected getCoreFunctions() {
    return ['addPopup', 'hidePopup', 'showPopup', 'removeAllPopups'];
  }

  protected getCoreSignals() {
    return ['onShowPopup', 'onHidePopup', 'onPopupChanged'];
  }

  /**
   * Setup application listeners
   * @private
   */
  private _setupAppListeners(): void {
    this.addSignalConnection(this.app.scenes.onSceneChangeStart.connect(() => this.removeAllPopups()));
    this.app.keyboard.onKeyUp('Escape').connect(this._handleEscape);
  }

  /**
   * Handle escape key press
   * if the current popup should close when escape is pressed (true by default), closes it
   * @private
   */
  private _handleEscape() {
    if (this.current && this.current.config.closeOnEscape) {
      void this.hidePopup(this.current.id);
    }
  }
}
