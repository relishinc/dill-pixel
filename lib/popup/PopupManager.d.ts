import { Point } from 'pixi.js';
import { Application } from '../core';
import { Container } from '../gameobjects';
import { Popup } from './Popup';
export declare class PopupManager<T extends Application = Application> extends Container<T> {
    protected _app: Application<T>;
    private _activePopups;
    private _popups;
    private _size;
    private _debug;
    private _overlayColor;
    private _overlayAlpha;
    constructor(_app: Application<T>, overlayColor?: number, overlayAlpha?: number);
    get app(): T;
    /** Enabling this will print all debug logs. */
    set debug(value: boolean);
    /**
     * Tick update on all open popups
     * @description Expectation is that this is called in {@link Application.update}
     * @param deltaTime Seconds elapsed since last call to update()
     */
    update(deltaTime: number): void;
    /**
     * Tick update() on all open popups
     * @description Expectation is that this is called in {@link Application.onResize}
     * @param size Screen size, in pixels(?)
     */
    onResize(size: Point): void;
    /**
     * Register a popup, so that it can be spawned later.
     * @description Expectation is that this is called in {@link Application.registerPopups}
     * @param popupClass
     * @param popupId Unique ID for this type of popup
     */
    register(popupClass: typeof Popup<T>, popupId?: string): void;
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
    private showPopup;
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
    private hidePopup;
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
    private hideAllPopups;
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
    private hideTopmostPopup;
    /**
     * Hide a popup by reference
     * @param popup
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
    private createOverlay;
    /**
     * Get an active popup, by ID
     * This might return undefined!
     */
    private getPopup;
    /**
     * Logs a message with class name and colour coding if debug flag is true.
     * @param text The message to print.
     * @param [rest] Optional data to be included in the message.
     * @todo Decide if this should live in its own class, be in an interface or within each manager.
     */
    private log;
    /**
     * Logs a warning message with class name and colour coding if debug flag is true.
     * @param text The message to print.
     * @param [rest] Optional data to be included in the message.
     * @todo Decide if this should live in its own class, be in an interface or within each manager.
     */
    private logW;
    /**
     * Logs an error message with class name and colour coding.
     * @param text The message to print.
     * @param [rest] Optional data to be included in the message.
     * @todo Decide if this should live in its own class, be in an interface or within each manager.
     */
    private logE;
}
//# sourceMappingURL=PopupManager.d.ts.map