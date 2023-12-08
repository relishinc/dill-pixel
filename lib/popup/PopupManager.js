import { BLEND_MODES, Graphics } from 'pixi.js';
import { Dictionary } from 'typescript-collections';
import { Container } from '../gameobjects';
import * as Input from '../input';
import { popKeyboardLayer, pushKeyboardLayer, Signals } from '../signals';
import * as LogUtils from '../utils/LogUtils';
export class PopupManager extends Container {
    constructor(_app, pOverlayColor = 0x000000, pOverlayAlpha = 0.75) {
        super();
        this._app = _app;
        this._debug = false;
        this._popups = new Dictionary();
        this._activePopups = new Array();
        this._overlayColor = pOverlayColor;
        this._overlayAlpha = pOverlayAlpha;
        Signals.showPopup.connect(this.handleShowPopup);
        Signals.hidePopup.connect(this.handleHidePopup);
        Signals.hideAllPopups.connect(this.handleHideAllPopups);
        Signals.hideTopMostPopup.connect(this.handleHideTopmostPopup);
        Signals.hidePopupComplete.connect(this.handleHidePopupComplete);
        // subscribe to global keyboard events
        window.addEventListener(Input.Events.KEY_DOWN, this.handleKeyDown, false);
    }
    get app() {
        return this._app;
    }
    /** Enabling this will print all debug logs. */
    set debug(pEnabled) {
        this._debug = pEnabled;
    }
    // #endregion INITIALIZATION
    // #region PUBLIC FUNCTIONS
    /**
     * Register a popup, so that it can be spawned later.
     * @description Expectation is that this is called in {@link Application.registerPopups}
     * @param pPopupClass
     * @param pId Unique ID for this type of popup
     */
    register(pPopupClass, pId) {
        const id = pPopupClass.NAME === '__Popup' ? pId : pPopupClass.NAME;
        if (!id || id === '__Popup') {
            throw new Error('PopupManager.register: Popup class should have a NAME property, or you should pass an id parameter');
        }
        this._popups.setValue(id, pPopupClass);
        this.log(`registerPopup: Registered popup with ID " ${pId} `);
    }
    /**
     * Tick update on all open popups
     * @description Expectation is that this is called in {@link Application.update}
     * @param pDeltaTime Seconds elapsed since last call to update()
     */
    update(pDeltaTime) {
        for (let i = 0; i < this._activePopups.length; ++i) {
            this._activePopups[i].update(pDeltaTime);
        }
    }
    /**
     * Tick update() on all open popups
     * @description Expectation is that this is called in {@link Application.onResize}
     * @param size Screen size, in pixels(?)
     */
    onResize(size) {
        this._size = size;
        this.position.set(this._size.x * 0.5, this._size.y * 0.5);
        for (let i = 0; i < this._activePopups.length; ++i) {
            this._activePopups[i].onResize(size);
        }
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
    showPopup(token) {
        const popupConstructor = this._popups.getValue(token.id);
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
        }
        else {
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
    hidePopup(pId) {
        const popup = this.getPopup(pId);
        // TODO: Better handling for situation where multiple active popups have the same ID
        if (popup !== undefined) {
            this.log(`HidePopup: Attempting to hide popup with ID "${pId}"`);
            this._hidePopup(popup);
        }
        else {
            this.logE(`HidePopup: Can't find any active popup with ID "${pId}"`);
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
    hideAllPopups() {
        if (this._activePopups.length === 0) {
            this.logW('HideAllPopups: No popups to hide!');
        }
        else {
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
    hideTopmostPopup() {
        if (this._activePopups.length === 0) {
            this.logW('HideTopmostPopup: No popups to hide!');
        }
        else {
            const popup = this._activePopups[this._activePopups.length - 1];
            this.log('HideTopmostPopup: Hiding topmost popup');
            this._hidePopup(popup);
        }
    }
    /**
     * Hide a popup by reference
     * @param pPopup
     */
    _hidePopup(pPopup) {
        pPopup.hide();
    }
    handleEscapeKeyDown(pEvent) {
        this.log('Escape key (or Android back button) pressed');
        if (this._activePopups.length === 0) {
            this.logW('No popups to close');
        }
        else {
            const popup = this._activePopups[this._activePopups.length - 1];
            if (popup.keyboardToClose) {
                pEvent.preventDefault();
                this._hidePopup(popup);
            }
        }
    }
    onHidePopupComplete(pPopup) {
        if (pPopup !== undefined) {
            this._activePopups.splice(this._activePopups.indexOf(pPopup), 1);
            this.removeChild(pPopup);
            this.log('onHidePopupComplete: Removed popup from stage');
            const overlay = pPopup.blackout;
            if (overlay !== undefined) {
                this.removeChild(overlay);
                this.log('onHidePopupComplete: Removed overlay from stage');
                overlay.destroy(); // TODO: Pool overlays
                this.log('onHidePopupComplete: Destroyed overlay');
            }
            else {
                this.logE("onHidePopupComplete: Can't find overlay to remove");
            }
            pPopup.destroy(); // TODO: Pool popups
            this.log('onHidePopupComplete: Destroyed popup');
            popKeyboardLayer();
        }
        else {
            this.logE('onHidePopupComplete: parameter pPopup is undefined!');
        }
        // TODO: Emit events for when the first popup is opened and when the last popup is closed
        const numPopups = this._activePopups.length;
        if (numPopups === 0) {
            this.log('onHidePopupComplete: No more popups');
        }
        else {
            this.log('onHidePopupComplete: ' + numPopups + ' popups remaining');
        }
    }
    // #endregion PRIVATE FUNCTIONS
    // #region EVENT HANDLERS
    handleHidePopup(id) {
        this.hidePopup(id);
    }
    handleHideAllPopups() {
        this.hideAllPopups();
    }
    handleShowPopup(token) {
        this.showPopup(token);
    }
    handleHidePopupComplete(popup) {
        this.onHidePopupComplete(popup);
    }
    handleHideTopmostPopup() {
        this.hideTopmostPopup();
    }
    handleKeyDown(pEvent) {
        switch (pEvent.keyCode) {
            case Input.KeyCodes.ESC:
                this.handleEscapeKeyDown(pEvent);
                break;
        }
    }
    // #endregion
    // #region HELPERS
    /** Creates an overlay, but does not add it to the stage */
    createOverlay() {
        // TODO: Pool overlays
        const overlay = new Graphics();
        overlay.beginFill(this._overlayColor, this._overlayAlpha);
        overlay.drawRect(0, 0, 2, 2);
        overlay.endFill();
        overlay.blendMode = BLEND_MODES.OVERLAY;
        overlay.eventMode = 'static';
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
    getPopup(pId) {
        let popup;
        for (let i = this._activePopups.length - 1; i >= 0; --i) {
            if (this._activePopups[i].id === pId) {
                popup = this._activePopups[i];
                break;
            }
        }
        return popup;
    }
    /**
     * Logs a message with class name and colour coding if debug flag is true.
     * @param pText The message to print.
     * @param [pParams] Optional data to be included in the message.
     * @todo Decide if this should live in its own class, be in an interface or within each manager.
     */
    log(pText, ...pParams) {
        if (this._debug) {
            LogUtils.log(pText, { className: 'PopupManager', color: 'blue' }, ...pParams);
        }
    }
    /**
     * Logs a warning message with class name and colour coding if debug flag is true.
     * @param pText The message to print.
     * @param [pParams] Optional data to be included in the message.
     * @todo Decide if this should live in its own class, be in an interface or within each manager.
     */
    logW(pText, ...pParams) {
        if (this._debug) {
            LogUtils.logWarning(pText, { className: 'PopupManager', color: 'blue' }, ...pParams);
        }
    }
    /**
     * Logs an error message with class name and colour coding.
     * @param pText The message to print.
     * @param [pParams] Optional data to be included in the message.
     * @todo Decide if this should live in its own class, be in an interface or within each manager.
     */
    logE(pText, ...pParams) {
        LogUtils.logError(pText, { className: 'PopupManager', color: 'blue' }, ...pParams);
    }
}
//# sourceMappingURL=PopupManager.js.map