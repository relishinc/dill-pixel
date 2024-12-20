import { BLEND_MODES, Graphics } from 'pixi.js';
import { Dictionary } from 'typescript-collections';
import { Application } from '../core';
import { popKeyboardLayer, pushKeyboardLayer } from '../functions';
import { Container } from '../gameobjects';
import * as Input from '../input';
import { KeyValues } from '../input/KeyValues';
import { Signal, Signals } from '../signals';
import * as LogUtils from '../utils/LogUtils';
export class PopupManager extends Container {
    constructor(_app, overlayColor = 0x000000, overlayAlpha = 0.75) {
        super();
        this._app = _app;
        this.onPopupShow = new Signal();
        this.onPopupHideComplete = new Signal();
        this.onPopupHide = new Signal();
        this._debug = false;
        this._popups = new Dictionary();
        this._activePopups = new Array();
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
    get app() {
        return Application.getInstance();
    }
    /** Enabling this will print all debug logs. */
    set debug(value) {
        this._debug = value;
    }
    // #endregion INITIALIZATION
    /**
     * Tick update on all open popups
     * @description Expectation is that this is called in {@link Application.update}
     * @param deltaTime Seconds elapsed since last call to update()
     */
    update(deltaTime) {
        for (let i = 0; i < this._activePopups.length; ++i) {
            this._activePopups[i].update(deltaTime);
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
    // #region PUBLIC FUNCTIONS
    /**
     * Register a popup, so that it can be spawned later.
     * @description Expectation is that this is called in {@link Application.registerPopups}
     * @param popupClass
     * @param popupId Unique ID for this type of popup
     */
    register(popupClass, popupId) {
        const id = popupClass.NAME === '__Popup' ? popupId : popupClass.NAME;
        if (!id || id === '__Popup') {
            throw new Error('PopupManager.register: Popup class should have a NAME property, or you should pass an id parameter');
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
            this.onPopupShow.emit(token.id);
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
    hidePopup(popupId) {
        const popup = this.getPopup(popupId);
        // TODO: Better handling for situation where multiple active popups have the same ID
        if (popup !== undefined) {
            this.log(`HidePopup: Attempting to hide popup with ID "${popupId}"`);
            this._hidePopup(popup);
        }
        else {
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
     * @param popup
     */
    _hidePopup(popup) {
        popKeyboardLayer();
        popup.hide();
        this.onPopupHide.emit(popup.id);
    }
    handleEscapeKeyDown(event) {
        this.log('Escape key (or Android back button) pressed');
        if (this._activePopups.length === 0) {
            this.logW('No popups to close');
        }
        else {
            const popup = this._activePopups[this._activePopups.length - 1];
            if (popup.keyboardToClose) {
                event.preventDefault();
                this._hidePopup(popup);
            }
        }
    }
    onHidePopupComplete(popup) {
        if (popup !== undefined) {
            this._activePopups.splice(this._activePopups.indexOf(popup), 1);
            this.removeChild(popup);
            this.log('onHidePopupComplete: Removed popup from stage');
            const overlay = popup.blackout;
            if (overlay !== undefined) {
                this.removeChild(overlay);
                this.log('onHidePopupComplete: Removed overlay from stage');
                overlay.destroy({ children: true }); // TODO: Pool overlays
                this.log('onHidePopupComplete: Destroyed overlay');
            }
            else {
                this.logE("onHidePopupComplete: Can't find overlay to remove");
            }
            this.onPopupHideComplete.emit(popup.id);
            popup.destroy({ children: true }); // TODO: Pool popups
            this.log('onHidePopupComplete: Destroyed popup');
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
    handleHidePopup(popupId) {
        this.hidePopup(popupId);
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
    handleKeyDown(event) {
        switch (event.key) {
            case KeyValues.ESC:
                this.handleEscapeKeyDown(event);
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
    getPopup(popupId) {
        let popup;
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
     * @param rest
     * @todo Decide if this should live in its own class, be in an interface or within each manager.
     */
    log(text, ...rest) {
        if (this._debug) {
            LogUtils.log(text, { className: 'PopupManager', color: 'blue' }, ...rest);
        }
    }
    /**
     * Logs a warning message with class name and colour coding if debug flag is true.
     * @param text The message to print.
     * @param rest
     * @todo Decide if this should live in its own class, be in an interface or within each manager.
     */
    logW(text, ...rest) {
        if (this._debug) {
            LogUtils.logWarning(text, { className: 'PopupManager', color: 'blue' }, ...rest);
        }
    }
    /**
     * Logs an error message with class name and colour coding.
     * @param text The message to print.
     * @param rest
     * @todo Decide if this should live in its own class, be in an interface or within each manager.
     */
    logE(text, ...rest) {
        LogUtils.logError(text, { className: 'PopupManager', color: 'blue' }, ...rest);
    }
}
//# sourceMappingURL=PopupManager.js.map