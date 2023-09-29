import {DisplayObject} from "pixi.js";
import {IFocusable} from "./IFocusable";

export interface IKeyboardFocus extends DisplayObject {
	readonly target: IFocusable | undefined;

	show(pFocusable: IFocusable): void;

	hide(pOnComplete?: () => void, pInstantly?: boolean): void;

	redraw(): void;
}
