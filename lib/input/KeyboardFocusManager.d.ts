import { Container } from 'pixi.js';
import { IFocusable } from './IFocusable';
import { IKeyboardFocus } from './IKeyboardFocus';
/**
 * Class for managing keyboard focus.
 * @extends Container
 */
export declare class KeyboardFocusManager<T extends IKeyboardFocus> extends Container {
    protected _T: new (...args: any[]) => T;
    /**
     * The currently active focus.
     */
    protected _activeFocus?: T;
    /**
     * Pool of focus objects.
     */
    protected _focusPool: T[];
    /**
     * Connections to signals.
     */
    private _connections;
    /**
     * Creates a new instance of the KeyboardFocusManager class.
     * @param _T - The type of the focus objects.
     */
    constructor(_T: new (...args: any[]) => T);
    /**
     * Destroys the KeyboardFocusManager.
     * @param pOptions - The options for destroying the KeyboardFocusManager.
     */
    destroy(pOptions?: Parameters<typeof Container.prototype.destroy>[0]): void;
    /**
     * Clears the current focus.
     */
    protected clearFocus(): void;
    /**
     * Begins focus on a focusable object.
     * @param pFocusable - The focusable object to focus on.
     */
    protected onFocusBegin(pFocusable: IFocusable): void;
    /**
     * Ends focus on a focusable object.
     * @param pFocusable - The focusable object to end focus on.
     */
    protected onFocusEnd(pFocusable: IFocusable): void;
    /**
     * Refocuses on the current focusable object.
     */
    protected reFocus(): void;
    /**
     * Gets a focus object.
     * @returns A focus object.
     */
    protected getFocus(): T;
}
//# sourceMappingURL=KeyboardFocusManager.d.ts.map