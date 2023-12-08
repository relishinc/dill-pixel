import { DisplayObject, Graphics, Point, Sprite } from 'pixi.js';
import { IPopupToken } from './PopupToken';
export interface IPopup extends DisplayObject {
    /**
     * Note that IDs are, for now, shared among all instances of the same type of popup.
     * Typescript quirk: a `readonly` Field can be implemented as a read-only Property (i.e. a getter)
     */
    readonly id: string;
    /**
     * A full-screen overlay that prevents clicks on things behind the Popup
     * Note that this will not be a child of the Popup
     */
    blackout?: Graphics | Sprite;
    /** Whether or not to close the popup when the escape key (or Android back button) is pressed */
    readonly keyboardToClose: boolean;
    /**
     * Update tick. Needed for some animations.
     * @description This should be called by {@link PopupManager.update}
     * @param deltaTime Seconds elapsed since last call to update()
     */
    update(deltaTime: number): void;
    /**
     * Window resize handler
     * @description This should be called by {@link PopupManager.onResize}
     * @param size Screen size, in pixels(?)
     */
    onResize(size: Point): void;
    /**
     * Show the popup, and set the close callback
     * @param token.id The popup should expect to answer to this ID from now on
     * @param token.callback The popup should call this function, which may be undefined, on close
     * @param token.backdrop If `true`, it is the popup's responsibility to add the click handler to {@link blackout}
     * @param token.keyboardToClose This is handled by {@link PopupManager} at the moment
     */
    show(token: IPopupToken): void;
    /**
     * Hide the popup.
     * When implementing, make sure to call `hidePopupComplete(this)` afterwards
     */
    hide(): void;
    /**
     * "Delayed constructor", this is called before {@link show()}
     * @param size Screen size, in pixels(?)
     */
    init(size: Point): void;
}
//# sourceMappingURL=IPopup.d.ts.map