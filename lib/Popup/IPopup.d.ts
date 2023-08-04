import * as PIXI from "pixi.js";
import {IPopupToken} from "./PopupToken";

export interface IPopup extends PIXI.DisplayObject {
	/**
	 * Note that IDs are, for now, shared among all instances of the same type of popup.
	 * Typescript quirk: a `readonly` Field can be implemented as a read-only Property (i.e. a getter)
	 */
	readonly id: string;
	/**
	 * A full-screen overlay that prevents clicks on things behind the Popup
	 * Note that this will not be a child of the Popup
	 */
	blackout?: PIXI.Graphics;
	/** Whether or not to close the popup when the escape key (or Android back button) is pressed */
	readonly keyboardToClose: boolean;

	/**
	 * Update tick. Needed for some animations.
	 * @description This should be called by {@link PopupManager.update}
	 * @param pDeltaTime Seconds elapsed since last call to update()
	 */
	update(pDeltaTime: number): void;

	/**
	 * Window resize handler
	 * @description This should be called by {@link PopupManager.onResize}
	 * @param pSize Screen size, in pixels(?)
	 */
	onResize(pSize: PIXI.Point): void;

	/**
	 * Show the popup, and set the close callback
	 * @param pToken.id The popup should expect to answer to this ID from now on
	 * @param pToken.callback The popup should call this function, which may be undefined, on close
	 * @param pToken.backdrop If `true`, it is the popup's responsibility to add the click handler to {@link blackout}
	 * @param pToken.keyboardToClose This is handled by {@link PopupManager} at the moment
	 */
	show(pToken: IPopupToken): void;

	/**
	 * Hide the popup.
	 * When implementing, make sure to call `broadcast(Topics.HIDE_POPUP_COMPLETE, this as IPopup)` afterwards
	 */
	hide(): void;

	/**
	 * "Delayed constructor", this is called before {@link show()}
	 * @param pSize Screen size, in pixels(?)
	 */
	init(pSize: PIXI.Point): void;
}

//# sourceMappingURL=IPopup.d.ts.map
