import { Application } from '../core';
import { IFocusable } from './IFocusable';
import { Direction } from './KeyboardMap';
import { KeyCodes } from './KeyCodes';
export interface IKeyboardStatus {
    enabled: boolean;
    active: boolean;
    layer: number;
    currentFocusable: IFocusable | undefined;
}
interface IKeyboardBinding {
    code: KeyCodes;
    altKey?: boolean;
    shiftKey?: boolean;
    ctrlKey?: boolean;
}
/**
 * Keyboard manager
 */
export declare class KeyboardManager {
    private app;
    private _downKeys;
    private _maps;
    private _isActive;
    private _isEnabled;
    private _tabEnabled;
    private _debug;
    private _keyBindings;
    static bindingToString(pBinding: IKeyboardBinding): string;
    protected static doesEventMatchBinding(pEvent: KeyboardEvent, pBinding: IKeyboardBinding): boolean;
    private static areEqual;
    constructor(app: Application);
    set debug(pEnabled: boolean);
    get isActive(): boolean;
    get numLayers(): number;
    addKeyBinding(pDirection: Direction | 'Enter', pKeyCode: KeyCodes, pModifiers?: Partial<{
        altKey: boolean;
        shiftKey: boolean;
        ctrlKey: boolean;
    }>): void;
    /** removes all keys associated with the direction */
    removeKeyBindings(pDirection: Direction | 'Enter'): void;
    /** removes a specific key associated with the direction */
    removeKeyBinding(pDirection: Direction | 'Enter', pKeyCode: KeyCodes, pModifiers?: Partial<{
        altKey: boolean;
        shiftKey: boolean;
        ctrlKey: boolean;
    }>): void;
    removeAllKeyBindings(): void;
    getKeyBindings(pDirection: Direction | 'Enter'): IKeyboardBinding[];
    getAllKeyBindings(): Readonly<{
        [index: string]: IKeyboardBinding[];
    }>;
    /** log key bindings to console, if this.debug is true */
    printAllKeyBindings(): void;
    addDefaultBindings(): void;
    /** returns an object which you can use for removeBinding, or false if not bound */
    isKeyBound(pKeyCode: KeyCodes, pModifiers?: Partial<{
        altKey: boolean;
        shiftKey: boolean;
        ctrlKey: boolean;
    }>): {
        direction: Direction | 'Enter';
        binding: IKeyboardBinding;
    } | false;
    isKeyDown(...args: (string | KeyCodes)[]): boolean;
    /**
     * onKeyUp
     * @param pEvent
     */
    private onKeyUp;
    /**
     * onKeyDown
     * @param pEvent
     */
    private onKeyDown;
    /**
     * onDirectionPressed
     * @param pDirection
     */
    private onDirectionPressed;
    /**
     * onMouseDown
     */
    private onMouseDown;
    /**
     * onBrowserBlur
     */
    private onBrowserBlur;
    /**
     * onBrowserFocus
     */
    private onBrowserFocus;
    private onRegisterFocusable;
    private onRegisterFocusables;
    private onUnregisterFocusable;
    private onUnregisterFocusables;
    private onUnregisterAllFocusables;
    private onClearFocus;
    private onForceFocus;
    private onForceNeighbours;
    private onClearNeighbours;
    private onSetKeyboardEnabled;
    private onGetKeyboardStatus;
    /**
     * Pushs map layer
     */
    private pushMapLayer;
    /**
     * Pops map layer
     */
    private popMapLayer;
    private log;
    private logW;
    private logE;
}
export {};
//# sourceMappingURL=KeyboardManager.d.ts.map