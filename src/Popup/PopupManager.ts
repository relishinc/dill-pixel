import * as PIXI from "pixi.js";
import { Dictionary } from "typescript-collections";
import * as Topics from "../Data/Topics";
import * as Input from "../Input";
import * as LogUtils from "../Utils/LogUtils";
import { IPopup } from "./IPopup";
import {IPopupToken} from "./PopupToken";

type PopupConstructor = () => IPopup;

export class PopupManager extends PIXI.Container {

// #region PUBLIC VARIABLES
    /** Enabling this will print all debug logs. */
    public set debug(pEnabled: boolean) {
        this._debug = pEnabled;
    }
// #endregion PUBLIC VARIABLES

// #region PRIVATE VARIABLES
    private _activePopups: IPopup[];
    private _popups: Dictionary<string, PopupConstructor>;
    private _size!: PIXI.Point;
    private _debug: boolean = false;
    private _overlayColor: number;
    private _overlayAlpha: number;
// #endregion PRIVATE VARIABLES

// #region INITIALIZATION
    constructor(pOverlayColor: number = 0x000000, pOverlayAlpha: number = 0.75) {
        super();
        this._popups = new Dictionary<string, PopupConstructor>();
        this._activePopups = new Array<IPopup>();
        this._overlayColor = pOverlayColor;
        this._overlayAlpha = pOverlayAlpha;

        PubSub.subscribe(Topics.SHOW_POPUP, this.handleShowPopup.bind(this));
        PubSub.subscribe(Topics.HIDE_POPUP, this.handleHidePopup.bind(this));
        PubSub.subscribe(Topics.HIDE_ALL_POPUPS, this.handleHideAllPopups.bind(this));
        PubSub.subscribe(Topics.HIDE_TOPMOST_POPUP, this.handleHideTopmostPopup.bind(this));

        PubSub.subscribe(Topics.HIDE_POPUP_COMPLETE, this.handleHidePopupComplete.bind(this));

        window.addEventListener(Input.Events.KEY_DOWN, this.handleKeyDown.bind(this), false);
    }
// #endregion INITIALIZATION

// #region PUBLIC FUNCTIONS
    /**
     * Register a popup, so that it can be spawned later.
     * @description Expectation is that this is called in {@link Application.registerPopups}
     * @param pPopup A function that returns an {@link IPopup}
     * @param pId Unique ID for this type of popup
     */
    public registerPopup(pPopup: PopupConstructor, pId: string): void {
        this._popups.setValue(pId, pPopup);
        this.log("registerPopup: Registered popup with ID \"" + pId + "\"");
    }

    /**
     * Tick update on all open popups
     * @description Expectation is that this is called in {@link Application.update}
     * @param pDeltaTime Seconds elapsed since last call to update()
     */
    public update(pDeltaTime: number): void {
        for (let i = 0; i < this._activePopups.length; ++i) {
            this._activePopups[i].update(pDeltaTime);
        }
    }

    /**
     * Tick update() on all open popups
     * @description Expectation is that this is called in {@link Application.onResize}
     * @param pSize Screen size, in pixels(?)
     */
    public onResize(pSize: PIXI.Point): void {
        this._size = pSize;
        this.position.set(this._size.x * 0.5, this._size.y * 0.5);
        for (let i = 0; i < this._activePopups.length; ++i) {
            this._activePopups[i].onResize(pSize);
        }
    }
// #endregion PUBLIC FUNCTIONS

// #region PRIVATE FUNCTIONS
    /**
     * Show a Popup, and optionally get a callback when it's closed.
     * @description Note that usually you should be using PubSub for this
     * @example
     * ```ts
     * PubSub.publishSync(Topics.SHOW_POPUP, new PopupToken("popup_id"));
     * ```
     * @param pToken.id Make sure to call {@link registerPopup} with this ID first
     * @param pToken.callback This gets called when the popup is closed
     */
    private ShowPopup(pToken: IPopupToken): void {
        const popupConstructor = this._popups.getValue(pToken.id);
        if (popupConstructor !== undefined) {
            this.log("ShowPopup: Creating popup from ID: \"" + pToken.id + "\"");

            // TODO: Create / return a unique ID
            const popup = popupConstructor();

            if (pToken.backdrop !== false) {
                // TODO: pool overlays
                const overlay = this.CreateOverlay();
                this.addChild(overlay); // NOTE: must call this before `addChild(popup.displayObject)`
                popup.blackout = overlay; // TODO: recalculate opacity of overlay based on number of open popups
            }
            PubSub.publishSync(Topics.PUSH_KEYBOARD_LAYER, null); // NOTE: must call this before `popup.init()`
            popup.init(this._size);
            this.addChild(popup);
            this._activePopups.push(popup);
            this.log("ShowPopup: Showing popup");
            popup.show(pToken);
            // TODO: Emit events for when the first popup is opened and when the last popup is closed
        }
        else {
            this.logW("ShowPopup: No popup with the ID \"" + pToken.id + "\" has been registered");
        }
    }

    /**
     * Hide a popup by ID, starting from the top and working backwards
     * @description Note that usually you should be using PubSub for this
     * @example
     * ```ts
     * PubSub.publishSync(Topics.HIDE_POPUP, "popup_id");
     * ```
     */
    private HidePopup(pId: string): void {
        const popup = this.getPopup(pId);
        // TODO: Better handling for situation where multiple active popups have the same ID
        if (popup !== undefined) {
            this.log("HidePopup: Attempting to hide popup with ID \"" + pId + "\"");
            this._hidePopup(popup);
        }
        else {
            this.logE("HidePopup: Can't find any active popup with ID \"" + pId + "\"");
        }
    }

    /**
     * Hide all popups, starting from the top and working backwards
     * @description Note that usually you should be using PubSub for this
     * @example
     * ```ts
     * PubSub.publishSync(Topics.HIDE_ALL_POPUPS, undefined);
     * ```
     */
    private HideAllPopups() {
        if (this._activePopups.length === 0) {
            this.logW("HideAllPopups: No popups to hide!");
        }
        else {
            this.log("HideAllPopups: Hiding all popups");
            for (let i = this._activePopups.length - 1; i >= 0; --i) {
                this._hidePopup(this._activePopups[i]);
            }
        }
    }

    /**
     * Hide the topmost visible popup
     * @description Note that usually you should be using PubSub for this
     * @example
     * ```ts
     * PubSub.publishSync(Topics.HIDE_TOPMOST_POPUP, undefined);
     * ```
     */
    private HideTopmostPopup() {
        if (this._activePopups.length === 0) {
            this.logW("HideTopmostPopup: No popups to hide!");
        }
        else {
            const popup = this._activePopups[this._activePopups.length - 1];
            this.log("HideTopmostPopup: Hiding topmost popup");
            this._hidePopup(popup);
        }
    }

    /**
     * Hide a popup by reference
     * @param pPopup
     */
    private _hidePopup(pPopup: IPopup) {
        pPopup.hide();
    }

    private handleEscapeKeyDown(pEvent: KeyboardEvent): void {
        this.log("Escape key (or Android back button) pressed");
        if (this._activePopups.length === 0) {
            this.logW("No popups to close");
        }
        else {
            const popup = this._activePopups[this._activePopups.length - 1];
            if (popup.keyboardToClose) {
                pEvent.preventDefault();
                this._hidePopup(popup);
            }
        }
    }
    private onHidePopupComplete(pPopup: IPopup): void {
        if (pPopup !== undefined) {
            this._activePopups.splice(this._activePopups.indexOf(pPopup), 1);
            this.removeChild(pPopup);
            this.log("onHidePopupComplete: Removed popup from stage");

            const overlay = pPopup.blackout;
            if (overlay !== undefined) {
                this.removeChild(overlay);
                this.log("onHidePopupComplete: Removed overlay from stage");
                overlay.destroy(); // TODO: Pool overlays
                this.log("onHidePopupComplete: Destroyed overlay");
            }
            else {
                this.logE("onHidePopupComplete: Can't find overlay to remove");
            }

            pPopup.destroy(); // TODO: Pool popups
            this.log("onHidePopupComplete: Destroyed popup");

            PubSub.publishSync(Topics.POP_KEYBOARD_LAYER, null);
        }
        else {
            this.logE("onHidePopupComplete: parameter pPopup is undefined!");
        }

        // TODO: Emit events for when the first popup is opened and when the last popup is closed
        const numPopups = this._activePopups.length;
        if (numPopups === 0) {
            this.log("onHidePopupComplete: No more popups");
        }
        else {
            this.log("onHidePopupComplete: " + numPopups + " popups remaining");
        }
    }
// #endregion PRIVATE FUNCTIONS
// #region EVENT HANDLERS
    private handleHidePopup(pTopic: string, pId: string): void {
        this.HidePopup(pId);
    }
    private handleHideAllPopups(pTopic: string): void {
        this.HideAllPopups();
    }
    private handleShowPopup(pTopic: string, pToken: IPopupToken): void {
        this.ShowPopup(pToken);
    }
    private handleHidePopupComplete(pTopic: string, pPopup: IPopup): void {
        this.onHidePopupComplete(pPopup);
    }
    private handleHideTopmostPopup(pTopic: string): void {
        this.HideTopmostPopup();
    }
    private handleKeyDown(pEvent: KeyboardEvent): void {
        switch (pEvent.keyCode) {
            case Input.KeyCodes.ESC:
                this.handleEscapeKeyDown(pEvent);
                break;
        }
    }

// #endregion
// #region HELPERS
    /** Creates an overlay, but does not add it to the stage */
    private CreateOverlay(): PIXI.Graphics {
        // TODO: Pool overlays
        const overlay = new PIXI.Graphics();
        overlay.beginFill(this._overlayColor, this._overlayAlpha);
        overlay.drawRect(0, 0, 2, 2);
        overlay.endFill();
        overlay.blendMode = PIXI.BLEND_MODES.OVERLAY;
        (overlay as PIXI.DisplayObject).interactive = true;
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
    private getPopup(pId: string): IPopup | undefined {
        let popup: IPopup | undefined;
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
    private log(pText: string, ...pParams: any[]): void {
        if (this._debug) {
            LogUtils.log(pText, {className: "PopupManager", color: "blue"}, ...pParams);
        }
    }

    /**
     * Logs a warning message with class name and colour coding if debug flag is true.
     * @param pText The message to print.
     * @param [pParams] Optional data to be included in the message.
     * @todo Decide if this should live in its own class, be in an interface or within each manager.
     */
    private logW(pText: string, ...pParams: any[]): void {
        if (this._debug) {
            LogUtils.logWarning(pText, {className: "PopupManager", color: "blue"}, ...pParams);
        }
    }

    /**
     * Logs an error message with class name and colour coding.
     * @param pText The message to print.
     * @param [pParams] Optional data to be included in the message.
     * @todo Decide if this should live in its own class, be in an interface or within each manager.
     */
    private logE(pText: string, ...pParams: any[]): void {
        LogUtils.logError(pText, {className: "PopupManager", color: "blue"}, ...pParams);
    }
// #endregion
}
