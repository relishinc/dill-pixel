import { BLEND_MODES, DisplayObject, Graphics, Point } from 'pixi.js';
import { Dictionary } from 'typescript-collections';
import { Application } from '../core';
import { popKeyboardLayer, pushKeyboardLayer } from '../functions';
import { Container } from '../gameobjects';
import * as Input from '../input';
import { KeyValues } from '../input/KeyValues';
import { Signals } from '../signals';
import * as LogUtils from '../utils/LogUtils';
import { IPopup } from './IPopup';
import { Popup } from './Popup';
import { IPopupToken } from './PopupToken';

export class PopupManager extends Container {
  private _activePopups: IPopup[];
  private _popups: Dictionary<string, typeof Popup>;
  private _size!: Point;
  private _debug: boolean = false;
  private _overlayColor: number;
  private _overlayAlpha: number;

  constructor(
    protected _app: Application,
    overlayColor: number = 0x000000,
    overlayAlpha: number = 0.75,
  ) {
    super();
    this._popups = new Dictionary<string, typeof Popup>();
    this._activePopups = new Array<IPopup>();
    this._overlayColor = overlayColor;
    this._overlayAlpha = overlayAlpha;

    this.addSignalConnection(Signals.showPopup.connect(this.handleShowPopup));
    this.addSignalConnection(Signals.hidePopup.connect(this.handleHidePopup));
    this.addSignalConnection(Signals.hideAllPopups.connect(this.handleHideAllPopups));
    this.addSignalConnection(Signals.hideTopMostPopup.connect(this.handleHideTopmostPopup));
    this.addSignalConnection(Signals.hidePopupComplete.connect(this.handleHidePopupComplete));

    // subscribe to global keyboard events
    window.addEventListener(Input.Events.KEY_DOWN, this.handleKeyDown, false);
  }

  get app(): Application {
    return this._app;
  }

  /** Enabling this will print all debug logs. */
  public set debug(value: boolean) {
    this._debug = value;
  }

  // #endregion INITIALIZATION

  /**
   * Tick update on all open popups
   * @description Expectation is that this is called in {@link Application.update}
   * @param deltaTime Seconds elapsed since last call to update()
   */
  public update(deltaTime: number): void {
    for (let i = 0; i < this._activePopups.length; ++i) {
      this._activePopups[i].update(deltaTime);
    }
  }

  /**
   * Tick update() on all open popups
   * @description Expectation is that this is called in {@link Application.onResize}
   * @param size Screen size, in pixels(?)
   */
  public onResize(size: Point): void {
    this._size = size;
    this.position.set(this._size.x * 0.5, this._size.y * 0.5);
    for (let i = 0; i < this._activePopups.length; ++i) {
      this._activePopups[i].onResize(size);
    }
  }

  // #region PUBLIC FUNCTIONS
  /**
   * Register a popup, so that it can be spawned later.
   * @description Expectation is that this is called in {@link Application.registerPopups}
   * @param popupClass
   * @param popupId Unique ID for this type of popup
   */
  public register(popupClass: typeof Popup, popupId?: string): void {
    const id = popupClass.NAME === '__Popup' ? popupId : popupClass.NAME;
    if (!id || id === '__Popup') {
      throw new Error(
        'PopupManager.register: Popup class should have a NAME property, or you should pass an id parameter',
      );
    }
    this._popups.setValue(id, popupClass);
    this.log(`registerPopup: Registered popup with ID " ${id} `);
  }

  // #endregion PUBLIC FUNCTIONS

  // #region PRIVATE FUNCTIONS
  /**
   * Show a Popup, and optionally get a callback when it's closed.
   * @description Note you should be using @link {Signals.showPopup} instead of calling this directly
   * @example
   * ```ts
   * Signals.showPopup.emit(new PopupToken("popup_id"));
   * ```
   * or
   * ```ts
   * showPopup(new PopupToken("popup_id"));
   * ```
   * @param token.id Make sure to call {@link registerPopup} with this ID first
   * @param token.callback This gets called when the popup is closed
   */
  private showPopup(token: IPopupToken): void {
    const popupConstructor = this._popups.getValue(token.id) as typeof Popup;
    if (popupConstructor !== undefined) {
      this.log('ShowPopup: Creating popup from ID: "' + token.id + '"');

      // TODO: Create / return a unique ID
      const popup = new popupConstructor(token?.data);

      if (token.backdrop !== false) {
        // TODO: pool overlays
        const overlay = this.createOverlay();
        this.addChild(overlay); // NOTE: must call this before `addChild(popup.displayObject)`
        popup.blackout = overlay; // TODO: recalculate opacity of overlay based on number of open popups
      }

      pushKeyboardLayer();
      popup.init(this._size);
      this.addChild(popup);
      this._activePopups.push(popup);
      this.log('ShowPopup: Showing popup');
      popup.show(token);
      // TODO: Emit events for when the first popup is opened and when the last popup is closed
    } else {
      this.logW(`ShowPopup: No popup with the ID "${token.id}" has been registered`);
    }
  }

  /**
   * Hide a popup by ID, starting from the top and working backwards
   * @description Note that usually you should be using global {@link Signals.hidePopup} instead of calling this directly
   * @example
   * ```ts
   * Signals.hidePopup.emit( "popup_id");
   * ```
   * or
   * ```ts
   * hidePopup("popup_id");
   * ```
   */
  private hidePopup(popupId: string): void {
    const popup = this.getPopup(popupId);
    // TODO: Better handling for situation where multiple active popups have the same ID
    if (popup !== undefined) {
      this.log(`HidePopup: Attempting to hide popup with ID "${popupId}"`);
      this._hidePopup(popup);
    } else {
      this.logE(`HidePopup: Can't find any active popup with ID "${popupId}"`);
    }
  }

  /**
   * Hide all popups, starting from the top and working backwards
   * @description Note that usually you should be {@link Signals.hideAllPopups} instead of calling this directly
   * @example
   * ```ts
   * Signals.hideAllPopups.emit();
   * ```
   * or
   * ```ts
   * hideAllPopups();
   * ```
   */
  private hideAllPopups() {
    if (this._activePopups.length === 0) {
      this.logW('HideAllPopups: No popups to hide!');
    } else {
      this.log('HideAllPopups: Hiding all popups');
      for (let i = this._activePopups.length - 1; i >= 0; --i) {
        this._hidePopup(this._activePopups[i]);
      }
    }
  }

  /**
   * Hide the topmost visible popup
   * @description Note that usually you should be using {@link Signals.hideTopMostPopup} instead of calling this directly
   * @example
   * ```ts
   * Signals.hideTopMostPopup.emit();
   * ```
   * or
   * ```ts
   * hideTopMostPopup();
   * ```
   */
  private hideTopmostPopup() {
    if (this._activePopups.length === 0) {
      this.logW('HideTopmostPopup: No popups to hide!');
    } else {
      const popup = this._activePopups[this._activePopups.length - 1];
      this.log('HideTopmostPopup: Hiding topmost popup');
      this._hidePopup(popup);
    }
  }

  /**
   * Hide a popup by reference
   * @param popup
   */
  private _hidePopup(popup: IPopup) {
    popup.hide();
  }

  private handleEscapeKeyDown(event: KeyboardEvent): void {
    this.log('Escape key (or Android back button) pressed');
    if (this._activePopups.length === 0) {
      this.logW('No popups to close');
    } else {
      const popup = this._activePopups[this._activePopups.length - 1];
      if (popup.keyboardToClose) {
        event.preventDefault();
        this._hidePopup(popup);
      }
    }
  }

  private onHidePopupComplete(popup: IPopup): void {
    if (popup !== undefined) {
      this._activePopups.splice(this._activePopups.indexOf(popup), 1);
      this.removeChild(popup);
      this.log('onHidePopupComplete: Removed popup from stage');

      const overlay = popup.blackout;
      if (overlay !== undefined) {
        this.removeChild(overlay);
        this.log('onHidePopupComplete: Removed overlay from stage');
        overlay.destroy(); // TODO: Pool overlays
        this.log('onHidePopupComplete: Destroyed overlay');
      } else {
        this.logE("onHidePopupComplete: Can't find overlay to remove");
      }

      popup.destroy(); // TODO: Pool popups
      this.log('onHidePopupComplete: Destroyed popup');
      popKeyboardLayer();
    } else {
      this.logE('onHidePopupComplete: parameter pPopup is undefined!');
    }

    // TODO: Emit events for when the first popup is opened and when the last popup is closed
    const numPopups = this._activePopups.length;
    if (numPopups === 0) {
      this.log('onHidePopupComplete: No more popups');
    } else {
      this.log('onHidePopupComplete: ' + numPopups + ' popups remaining');
    }
  }

  // #endregion PRIVATE FUNCTIONS
  // #region EVENT HANDLERS
  private handleHidePopup(popupId: string): void {
    this.hidePopup(popupId);
  }

  private handleHideAllPopups(): void {
    this.hideAllPopups();
  }

  private handleShowPopup(token: IPopupToken): void {
    this.showPopup(token);
  }

  private handleHidePopupComplete(popup: IPopup): void {
    this.onHidePopupComplete(popup);
  }

  private handleHideTopmostPopup(): void {
    this.hideTopmostPopup();
  }

  private handleKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case KeyValues.ESC:
        this.handleEscapeKeyDown(event);
        break;
    }
  }

  // #endregion
  // #region HELPERS
  /** Creates an overlay, but does not add it to the stage */
  private createOverlay(): Graphics {
    // TODO: Pool overlays
    const overlay = new Graphics();
    overlay.beginFill(this._overlayColor, this._overlayAlpha);
    overlay.drawRect(0, 0, 2, 2);
    overlay.endFill();
    overlay.blendMode = BLEND_MODES.OVERLAY;
    (overlay as DisplayObject).eventMode = 'static';
    overlay.x = -this._size.x / 2;
    overlay.y = -this._size.y / 2;
    overlay.width = this._size.x;
    overlay.height = this._size.y;
    return overlay;
  }

  /**
   * Get an active popup, by ID
   * This might return undefined!
   */
  private getPopup(popupId: string): IPopup | undefined {
    let popup: IPopup | undefined;
    for (let i = this._activePopups.length - 1; i >= 0; --i) {
      if (this._activePopups[i].id === popupId) {
        popup = this._activePopups[i];
        break;
      }
    }
    return popup;
  }

  /**
   * Logs a message with class name and colour coding if debug flag is true.
   * @param text The message to print.
   * @param [rest] Optional data to be included in the message.
   * @todo Decide if this should live in its own class, be in an interface or within each manager.
   */
  private log(text: string, ...rest: any[]): void {
    if (this._debug) {
      LogUtils.log(text, { className: 'PopupManager', color: 'blue' }, ...rest);
    }
  }

  /**
   * Logs a warning message with class name and colour coding if debug flag is true.
   * @param text The message to print.
   * @param [rest] Optional data to be included in the message.
   * @todo Decide if this should live in its own class, be in an interface or within each manager.
   */
  private logW(text: string, ...rest: any[]): void {
    if (this._debug) {
      LogUtils.logWarning(text, { className: 'PopupManager', color: 'blue' }, ...rest);
    }
  }

  /**
   * Logs an error message with class name and colour coding.
   * @param text The message to print.
   * @param [rest] Optional data to be included in the message.
   * @todo Decide if this should live in its own class, be in an interface or within each manager.
   */
  private logE(text: string, ...rest: any[]): void {
    LogUtils.logError(text, { className: 'PopupManager', color: 'blue' }, ...rest);
  }

  // #endregion
}
