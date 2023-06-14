import * as PIXI from "pixi.js";
import { IFocusable } from "./IFocusable";
export interface IKeyboardFocus extends PIXI.DisplayObject {
    readonly target: IFocusable | undefined;
    show(pFocusable: IFocusable): void;
    hide(pOnComplete?: () => void, pInstantly?: boolean): void;
    redraw(): void;
}
//# sourceMappingURL=IKeyboardFocus.d.ts.map