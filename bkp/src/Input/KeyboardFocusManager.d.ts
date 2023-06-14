import * as PIXI from "pixi.js";
import { IFocusable } from "./IFocusable";
import { IKeyboardFocus } from "./IKeyboardFocus";
export declare class KeyboardFocusManager<T extends PIXI.DisplayObject & IKeyboardFocus> extends PIXI.Container {
    protected _T: new (...args: any[]) => T;
    protected _pubSubTokens: any[];
    protected _activeFocus?: T;
    protected _focusPool: T[];
    constructor(_T: new (...args: any[]) => T);
    destroy(pOptions?: Parameters<typeof PIXI.Container.prototype.destroy>[0]): void;
    protected onFocusBegin(pTopic: string, pFocusable: IFocusable): void;
    protected onFocusEnd(pTopic: string, pFocusable: IFocusable): void;
    protected reFocus(): void;
    protected getFocus(): T;
}
//# sourceMappingURL=KeyboardFocusManager.d.ts.map