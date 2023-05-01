import * as KeyCode from "keycode";
import {Dictionary} from "typescript-collections";
import * as Topics from "../Data/Topics";
import * as LogUtils from "../Utils/LogUtils";
import {IFocusable} from "./IFocusable";
import * as InputUtils from "./InputUtils";
import {Direction, KeyboardMap} from "./KeyboardMap";
import {KeyboardMapToken} from "./KeyboardMapToken";
import {KeyCodes} from "./KeyCodes";

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
export class KeyboardManager {

    public set debug(pEnabled: boolean) {
        this._debug = pEnabled;
    }
    private _maps: KeyboardMap[];
    private _isActive: boolean;
    private _isEnabled: boolean;
    private _debug: boolean = false;

    private _keyBindings: Dictionary<Direction | "Enter", IKeyboardBinding[]> = new Dictionary();
    constructor() {
        this._isActive = false;
        this._isEnabled = true;

        this._maps = new Array<KeyboardMap>();

        this.addDefaultBindings();

        window.addEventListener(InputUtils.Events.KEY_DOWN, this.onKeyDown.bind(this), false);
        window.addEventListener(InputUtils.Events.MOUSE_DOWN, this.onMouseDown.bind(this), false);
        window.addEventListener(InputUtils.Events.FOCUS, this.onBrowserFocus.bind(this));
        window.addEventListener(InputUtils.Events.BLUR, this.onBrowserBlur.bind(this));
        PubSub.subscribe(Topics.REGISTER_FOCUSABLE, this.onRegisterFocusable.bind(this));
        PubSub.subscribe(Topics.REGISTER_FOCUSABLES, this.onRegisterFocusable.bind(this));
        PubSub.subscribe(Topics.UNREGISTER_FOCUSABLE, this.onUnregisterFocusable.bind(this));
        PubSub.subscribe(Topics.UNREGISTER_FOCUSABLES, this.onUnregisterFocusable.bind(this));
        PubSub.subscribe(Topics.UNREGISTER_ALL_FOCUSABLES, this.onUnregisterAllFocusables.bind(this));
        PubSub.subscribe(Topics.CLEAR_FOCUS, this.onClearFocus.bind(this));
        PubSub.subscribe(Topics.FORCE_FOCUS, this.onForceFocus.bind(this));
        PubSub.subscribe(Topics.KEYBOARD_FORCE_NEIGHBOURS, this.onForceNeighbours.bind(this));
        PubSub.subscribe(Topics.KEYBOARD_CLEAR_NEIGHBOURS, this.onClearNeighbours.bind(this));
        PubSub.subscribe(Topics.PUSH_KEYBOARD_LAYER, this.pushMapLayer.bind(this));
        PubSub.subscribe(Topics.POP_KEYBOARD_LAYER, this.popMapLayer.bind(this));
        PubSub.subscribe(Topics.SET_KEYBOARD_ENABLED, this.onSetKeyboardEnabled.bind(this));
        PubSub.subscribe(Topics.GET_KEYBOARD_STATUS, this.onGetKeyboardStatus.bind(this));
    }

    public static bindingToString(pBinding: IKeyboardBinding): string {
        let ret = "";
        if (pBinding.altKey) {
            ret += "alt + ";
        }
        if (pBinding.shiftKey) {
            ret += "shift + ";
        }
        if (pBinding.ctrlKey) {
            ret += "ctrl + ";
        }
        ret += KeyCode.names[pBinding.code];
        return ret;
    }

    protected static doesEventMatchBinding(pEvent: KeyboardEvent, pBinding: IKeyboardBinding): boolean {
        if (!KeyCode.isEventKey(pEvent, pBinding.code)) {
            return false;
        }
        if ((pBinding.altKey ?? false) !== pEvent.altKey) {
            return false;
        }
        if ((pBinding.shiftKey ?? false) !== pEvent.shiftKey) {
            return false;
        }
        if ((pBinding.ctrlKey ?? false) !== pEvent.ctrlKey) {
            return false;
        }

        return true;
    }

    private static areEqual(pBinding1: IKeyboardBinding, pBinding2: IKeyboardBinding): boolean {
        if ( pBinding1.code.valueOf() === pBinding2.code.valueOf()
            && (pBinding1.altKey ?? false) === (pBinding2.altKey ?? false)
            && (pBinding1.shiftKey ?? false) === (pBinding2.shiftKey ?? false)
            && (pBinding1.ctrlKey ?? false) === (pBinding2.ctrlKey ?? false)
        ) {
            return true;
        }
        return false;
    }

    public addKeyBinding(pDirection: Direction | "Enter", pKeyCode: KeyCodes, pModifiers?: Partial<{
        altKey: boolean,
        shiftKey: boolean,
        ctrlKey: boolean,
    }>) {
        const binding = {code: pKeyCode, ...pModifiers};

        const existingDirection = this.isKeyBound(pKeyCode, pModifiers ?? {});
        if (existingDirection !== false) {
            if (existingDirection.direction === pDirection) {
                this.log(`addKeyBinding: Ignoring duplicate mapping. "` + KeyboardManager.bindingToString(binding) + `" is already mapped to "` + pDirection.toString() + `"`);
                return;
            }
            else {
                this.logW(`addKeyBinding: Key "` + KeyboardManager.bindingToString(binding) + `" was already mapped to a different function. Un-mapping it before adding new binding.`);
                this.removeKeyBinding(existingDirection.direction, existingDirection.binding.code, existingDirection.binding);
            }
        }

        if (!this._keyBindings.containsKey(pDirection)) {
            this._keyBindings.setValue(pDirection, [binding]);
        }
        else {
            this._keyBindings.getValue(pDirection)!.push(binding);
        }

        this.log(`addKeyBinding: Key "` + KeyboardManager.bindingToString(binding) + `" is now mapped to "` + pDirection.toString() + `"`);
    }

    /** removes all keys associated with the direction */
    public removeKeyBindings(pDirection: Direction | "Enter") {
        this._keyBindings.remove(pDirection);
        this.log(`removeKeyBindings: Cleared all mappings for "` + pDirection.toString() + `"`);
    }

    /** removes a specific key associated with the direction */
    public removeKeyBinding(pDirection: Direction | "Enter", pKeyCode: KeyCodes, pModifiers?: Partial<{
        altKey: boolean,
        shiftKey: boolean,
        ctrlKey: boolean,
    }>) {
        const bindings = this.getKeyBindings(pDirection) as IKeyboardBinding[];
        let found: boolean = false;

        // bindings.indexOf(pBinding) doesn't work, so instead we do a for loop
        for (let i = bindings.length - 1; i >= 0; i--) {
            if (KeyboardManager.areEqual(bindings[i], {code: pKeyCode, ...pModifiers})) {
                bindings.splice(i, 1);
                found = true;
                break; // break out of for loop
            }
        }

        if (found) {
            this._keyBindings.setValue(pDirection, bindings);
            this.log(`removeKeyBinding: Key "` + KeyboardManager.bindingToString({code: pKeyCode, ...pModifiers}) + `" is no longer mapped to "` + pDirection.toString() + `"`);
        }
        else if (this.isKeyBound(pKeyCode, pModifiers)) {
            this.logE(`removeKeyBinding: Key "` + KeyboardManager.bindingToString({code: pKeyCode, ...pModifiers}) + `" was not mapped to mapped to direction "` + pDirection.toString() + `", so nothing has been removed`);
        }
        else {
            this.logE(`removeKeyBinding: Key "` + KeyboardManager.bindingToString({code: pKeyCode, ...pModifiers}) + `" is not mapped to any direction, so nothing has been removed`);
        }
    }

    public removeAllKeyBindings() {
        this._keyBindings.clear();
        this.log(`removeAllKeyBindings: All key mappings have been cleared`);
    }

    public getKeyBindings(pDirection: Direction | "Enter"): IKeyboardBinding[] {
        return this._keyBindings.getValue(pDirection)! ?? [];
    }

    public getAllKeyBindings(): Readonly<{[index: string]: IKeyboardBinding[]}> {
        const reducer = (o: {[index: string]: IKeyboardBinding[]}, k: Direction | "Enter") => {
            o[k.toString()] = this._keyBindings.getValue(k)!;
            return o;
        };

        return this._keyBindings.keys().reduce(reducer, {});
    }

    /** log key bindings to console, if this.debug is true */
    public printAllKeyBindings() {
        this.log("printAllKeyBindings:");
        const bindings = this.getAllKeyBindings();
        Object.keys(bindings).forEach((direction) => {
            this.log("  " + direction + ": " + bindings[direction].map(KeyboardManager.bindingToString).join(", "));
        });
    }

    public addDefaultBindings() {
        this.log("addDefaultBindings: Adding default key bindings");

        this.addKeyBinding(Direction.UP, KeyCodes.UP);
        this.addKeyBinding(Direction.DOWN, KeyCodes.DOWN);
        this.addKeyBinding(Direction.LEFT, KeyCodes.LEFT);
        this.addKeyBinding(Direction.RIGHT, KeyCodes.RIGHT);

        this.addKeyBinding(Direction.UP, KeyCodes.W);
        this.addKeyBinding(Direction.DOWN, KeyCodes.S);
        this.addKeyBinding(Direction.LEFT, KeyCodes.A);
        this.addKeyBinding(Direction.RIGHT, KeyCodes.D);

        this.addKeyBinding(Direction.FORWARDS, KeyCodes.TAB);
        this.addKeyBinding(Direction.BACKWARDS, KeyCodes.TAB, { shiftKey: true });

        this.addKeyBinding("Enter", KeyCodes.ENTER);
        this.addKeyBinding("Enter", KeyCodes.SPACEBAR);
    }

    /** returns an object which you can use for removeBinding, or false if not bound */
    public isKeyBound(pKeyCode: KeyCodes, pModifiers?: Partial<{
        altKey: boolean,
        shiftKey: boolean,
        ctrlKey: boolean,
    }>): {"direction": Direction | "Enter", "binding": IKeyboardBinding} | false {
        let found: {"direction": Direction | "Enter", "binding": IKeyboardBinding} | undefined;
        this._keyBindings.forEach((direction, bindings) => {
            for (let i = 0; i < bindings.length; i++) {
                const a = bindings[i];
                const b = {code: pKeyCode, ...pModifiers};
                if (KeyboardManager.areEqual(a, b)) {
                    found = {direction, binding: bindings[i]};
                    return false; // break out of foreach
                }
            }
        });

        return found ?? false;
    }

    /**
     * onKeyDown
     * @param pEvent
     */
    private onKeyDown(pEvent: KeyboardEvent): void {
        if (!this._isEnabled) {
            return;
        }
        if (this._isActive === false) {
            if (this._maps.length > 0) {
                this._isActive = true;
                this._maps[0].isActive = true;
                pEvent.preventDefault();
            }
        } else {
            this._keyBindings.forEach((direction, bindings) => {
                bindings.forEach((binding) => {
                    if (KeyboardManager.doesEventMatchBinding(pEvent, binding)) {
                        if (direction === "Enter") {
                            if (this._maps.length > 0) {
                                this._maps[0].activateFocussedNode();
                                pEvent.preventDefault();
                            }
                        }
                        else {
                            this.onDirectionPressed(direction);
                        }
                        pEvent.preventDefault();
                    }
                });
            });
        }
    }

    /**
     * onDirectionPressed
     * @param pDirection
     */
    private onDirectionPressed(pDirection: Direction): void {
        if (this._maps.length > 0) {
            this._maps[0].step(pDirection);
        }
    }

    /**
     * onMouseDown
     */
    private onMouseDown(): void {
        if (this._isActive === true) {
            this._isActive = false;
            if (this._maps.length > 0) {
                this._maps[0].isActive = false;
            }
        }
    }

    /**
     * onBrowserBlur
     */
    private onBrowserBlur(): void {
        if (this._isActive && this._maps.length > 0) {
            this._maps[0].isActive = false;
        }
    }

    /**
     * onBrowserFocus
     */
    private onBrowserFocus(): void {
        if (this._isEnabled && this._isActive && this._maps.length > 0) {
            this._maps[0].isActive = true;
        }
    }

    private onRegisterFocusable(pTopic: string, pData: IFocusable | IFocusable[]) {
        if (this._maps.length > 0) {
            this._maps[0].registerFocusable(pData);
        }
    }

    private onUnregisterFocusable(pTopic: string, pData: (IFocusable | ((it: IFocusable) => boolean)) | Array<IFocusable | ((it: IFocusable) => boolean)>) {
        for (const map of this._maps) {
            map.unregisterFocusable(pData);
        }
    }

    private onUnregisterAllFocusables() {
        for (let i = 0; i < this._maps.length; ++i) {
            this._maps[i].clear();
        }
    }

    private onClearFocus() {
        if (this._maps.length > 0) {
            this._maps[0].clearFocus();
        }
    }

    private onForceFocus(pTopic: string, pData: IFocusable) {
        if (this._isActive && this._maps.length > 0) {
            this._maps[0].setFocus(pData);
        }
    }

    private onForceNeighbours(pTopic: string, pData: KeyboardMapToken | KeyboardMapToken[]) {
        if (this._maps.length > 0) {
            if (!Array.isArray(pData)) {
                pData = [pData];
            }
            for (const token of pData) {
                token.neighbours.forEach((direction, neighbour) => {
                    if (neighbour !== undefined) {
                        this._maps[0].forceNeighbour(token.target, neighbour, direction);
                        return false; // break out of foreach
                    }
                });
            }
        }
    }

    private onClearNeighbours() {
        if (this._maps.length > 0) {
            this._maps[0].clearNeighbours();
        }
    }

    private onSetKeyboardEnabled(pTopic: string, pData: boolean) {
        this._isEnabled = pData;
    }

    private onGetKeyboardStatus(pTopic: string, pData: (status: IKeyboardStatus) => void) {
        pData({
            enabled: this._isEnabled,
            active: this._isActive,
            layer: this._maps.length,
            currentFocusable: this._maps.length > 0 ? this._maps[0].currentFocusable : undefined,
        });
    }

    /**
     * Pushs map layer
     */
    private pushMapLayer(): void {
        if (this._maps.length > 0) {
            this._maps[0].isActive = false;
        }
        const map = new KeyboardMap();
        this._maps.unshift(map);
        map.isActive = this._isActive;
    }

    /**
     * Pops map layer
     */
    private popMapLayer(): void {
        if (this._maps.length > 0) {
            this._maps[0].isActive = false;
            this._maps[0].clear();
        }
        this._maps.shift();
        if (this._maps.length > 0) {
            this._maps[0].isActive = this._isActive;
        }
    }

    private log(pText: string, ...pParams: any[]): void {
        if (this._debug) {
            LogUtils.log(pText, {className: "KeyboardManager", color: "brown"}, ...pParams);
        }
    }

    private logW(pText: string, ...pParams: any[]): void {
        if (this._debug) {
            LogUtils.logWarning(pText, {className: "KeyboardManager", color: "brown"}, ...pParams);
        }
    }

    private logE(pText: string, ...pParams: any[]): void {
        LogUtils.logError(pText, {className: "KeyboardManager", color: "brown"}, ...pParams);
    }
}
