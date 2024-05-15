import { Container } from 'pixi.js';
import { IFocusable } from './IFocusable';
import { IKeyboardFocus } from './IKeyboardFocus';
export declare class KeyboardFocusManager<T extends IKeyboardFocus> extends Container {
    protected _T: new (...args: any[]) => T;
    protected _activeFocus?: T;
    protected _focusPool: T[];
    private _connections;
    constructor(_T: new (...args: any[]) => T);
    destroy(pOptions?: Parameters<typeof Container.prototype.destroy>[0]): void;
    protected clearFocus(): void;
    protected onFocusBegin(pFocusable: IFocusable): void;
    protected onFocusEnd(pFocusable: IFocusable): void;
    protected reFocus(): void;
    protected getFocus(): T;
}
//# sourceMappingURL=KeyboardFocusManager.d.ts.map