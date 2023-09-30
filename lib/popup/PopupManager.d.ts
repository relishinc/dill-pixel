import { Container, Point } from 'pixi.js';
import { Application } from '../core/Application';
import { Popup } from './Popup';
export declare class PopupManager extends Container {
    private app;
    private _activePopups;
    private _popups;
    private _size;
    private _debug;
    private _overlayColor;
    private _overlayAlpha;
    constructor(app: Application, pOverlayColor?: number, pOverlayAlpha?: number);
    /** Enabling this will print all debug logs. */
    set debug(pEnabled: boolean);
    /**
     * Register a popup, so that it can be spawned later.
     * @description Expectation is that this is called in {@link Application.registerPopups}
     * @param pPopupClass
     * @param pId Unique ID for this type of popup
     */
    register(pPopupClass: typeof Popup, pId?: string): void;
    /**
     * Tick update on all open popups
     * @description Expectation is that this is called in {@link Application.update}
     * @param pDeltaTime Seconds elapsed since last call to update()
     */
    update(pDeltaTime: number): void;
    /**
     * Tick update() on all open popups
     * @description Expectation is that this is called in {@link Application.onResize}
     * @param pSize Screen size, in pixels(?)
     */
    onResize(pSize: Point): void;
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
     * @param pToken.id Make sure to call {@link registerPopup} with this ID first
     * @param pToken.callback This gets called when the popup is closed
     */
    private ShowPopup;
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
    private HidePopup;
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
    private HideAllPopups;
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
    private HideTopmostPopup;
    /**
     * Hide a popup by reference
     * @param pPopup
     */
    private _hidePopup;
    private handleEscapeKeyDown;
    private onHidePopupComplete;
    private handleHidePopup;
    private handleHideAllPopups;
    private handleShowPopup;
    private handleHidePopupComplete;
    private handleHideTopmostPopup;
    private handleKeyDown;
    /** Creates an overlay, but does not add it to the stage */
    private CreateOverlay;
    /**
     * Get an active popup, by ID
     * This might return undefined!
     */
    private getPopup;
    /**
     * Logs a message with class name and colour coding if debug flag is true.
     * @param pText The message to print.
     * @param [pParams] Optional data to be included in the message.
     * @todo Decide if this should live in its own class, be in an interface or within each manager.
     */
    private log;
    /**
     * Logs a warning message with class name and colour coding if debug flag is true.
     * @param pText The message to print.
     * @param [pParams] Optional data to be included in the message.
     * @todo Decide if this should live in its own class, be in an interface or within each manager.
     */
    private logW;
    /**
     * Logs an error message with class name and colour coding.
     * @param pText The message to print.
     * @param [pParams] Optional data to be included in the message.
     * @todo Decide if this should live in its own class, be in an interface or within each manager.
     */
    private logE;
}
//# sourceMappingURL=PopupManager.d.ts.map