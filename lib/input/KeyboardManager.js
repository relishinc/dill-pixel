import { isMobile } from 'pixi.js';
import { Dictionary } from 'typescript-collections';
import { setKeyboardEnabled, Signals } from '../signals';
import { bindMethods } from '../utils';
import * as LogUtils from '../utils/LogUtils';
import { KeyCode } from './index';
import * as InputUtils from './InputUtils';
import { Direction, KeyboardMap } from './KeyboardMap';
import { KeyCodes } from './KeyCodes';
/**
 * Keyboard manager
 */
export class KeyboardManager {
    static bindingToString(pBinding) {
        let ret = '';
        if (pBinding.altKey) {
            ret += 'alt + ';
        }
        if (pBinding.shiftKey) {
            ret += 'shift + ';
        }
        if (pBinding.ctrlKey) {
            ret += 'ctrl + ';
        }
        ret += KeyCode.names[pBinding.code];
        return ret;
    }
    static doesEventMatchBinding(pEvent, pBinding) {
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
    static areEqual(pBinding1, pBinding2) {
        if (pBinding1.code.valueOf() === pBinding2.code.valueOf() &&
            (pBinding1.altKey ?? false) === (pBinding2.altKey ?? false) &&
            (pBinding1.shiftKey ?? false) === (pBinding2.shiftKey ?? false) &&
            (pBinding1.ctrlKey ?? false) === (pBinding2.ctrlKey ?? false)) {
            return true;
        }
        return false;
    }
    constructor(app) {
        this.app = app;
        this._downKeys = new Set();
        this._tabEnabled = true;
        this._debug = false;
        this._keyBindings = new Dictionary();
        // bind internal methods
        bindMethods(this, 'onRegisterFocusable', 'onRegisterFocusables', 'onUnregisterFocusable', 'onUnregisterFocusables', 'onUnregisterAllFocusables', 'onClearFocus', 'onForceFocus', 'onForceNeighbours', 'onClearNeighbours', 'onSetKeyboardEnabled', 'onGetKeyboardStatus', 'pushMapLayer', 'popMapLayer', 'onKeyDown', 'onKeyUp');
        this._isActive = false;
        this._isEnabled = true;
        this._maps = new Array();
        this.addDefaultBindings();
        window.addEventListener(InputUtils.Events.KEY_DOWN, this.onKeyDown.bind(this), false);
        window.addEventListener(InputUtils.Events.POINTER_DOWN, this.onMouseDown.bind(this), false);
        window.addEventListener(InputUtils.Events.KEY_UP, this.onKeyUp.bind(this), false);
        window.addEventListener(InputUtils.Events.FOCUS, this.onBrowserFocus.bind(this));
        window.addEventListener(InputUtils.Events.BLUR, this.onBrowserBlur.bind(this));
        Signals.registerFocusable.connect(this.onRegisterFocusable);
        Signals.registerFocusables.connect(this.onRegisterFocusables);
        Signals.unregisterFocusable.connect(this.onUnregisterFocusable);
        Signals.unregisterFocusables.connect(this.onUnregisterFocusables);
        Signals.unregisterAllFocusables.connect(this.onUnregisterAllFocusables);
        Signals.clearFocus.connect(this.onClearFocus);
        Signals.forceFocus.connect(this.onForceFocus);
        Signals.forceNeighbours.connect(this.onForceNeighbours);
        Signals.clearNeighbours.connect(this.onClearNeighbours);
        Signals.pushKeyboardLayer.connect(this.pushMapLayer);
        Signals.popKeyboardLayer.connect(this.popMapLayer);
        Signals.setKeyboardEnabled.connect(this.onSetKeyboardEnabled);
        Signals.getKeyboardStatus.connect(this.onGetKeyboardStatus);
        if (!isMobile.any) {
            setKeyboardEnabled(true);
        }
    }
    set debug(pEnabled) {
        this._debug = pEnabled;
    }
    get isActive() {
        return this._isActive;
    }
    addKeyBinding(pDirection, pKeyCode, pModifiers) {
        const binding = { code: pKeyCode, ...pModifiers };
        const existingDirection = this.isKeyBound(pKeyCode, pModifiers ?? {});
        if (existingDirection !== false) {
            if (existingDirection.direction === pDirection) {
                this.log(`addKeyBinding: Ignoring duplicate mapping. "${KeyboardManager.bindingToString(binding)}" is already mapped to "${pDirection.toString()}"`);
                return;
            }
            else {
                this.logW(`addKeyBinding: Key "${KeyboardManager.bindingToString(binding)}" was already mapped to a different function. Un-mapping it before adding new binding.`);
                this.removeKeyBinding(existingDirection.direction, existingDirection.binding.code, existingDirection.binding);
            }
        }
        if (!this._keyBindings.containsKey(pDirection)) {
            this._keyBindings.setValue(pDirection, [binding]);
        }
        else {
            this._keyBindings.getValue(pDirection).push(binding);
        }
        this.log(`addKeyBinding: Key "${KeyboardManager.bindingToString(binding)}" is now mapped to "${pDirection.toString()}"`);
    }
    /** removes all keys associated with the direction */
    removeKeyBindings(pDirection) {
        this._keyBindings.remove(pDirection);
        this.log(`removeKeyBindings: Cleared all mappings for "${pDirection.toString()}"`);
    }
    /** removes a specific key associated with the direction */
    removeKeyBinding(pDirection, pKeyCode, pModifiers) {
        const bindings = this.getKeyBindings(pDirection);
        let found = false;
        // bindings.indexOf(pBinding) doesn't work, so instead we do a for loop
        for (let i = bindings.length - 1; i >= 0; i--) {
            if (KeyboardManager.areEqual(bindings[i], { code: pKeyCode, ...pModifiers })) {
                bindings.splice(i, 1);
                found = true;
                break; // break out of for loop
            }
        }
        if (found) {
            this._keyBindings.setValue(pDirection, bindings);
            this.log(`removeKeyBinding: Key "${KeyboardManager.bindingToString({
                code: pKeyCode,
                ...pModifiers,
            })}" is no longer mapped to "${pDirection.toString()}"`);
        }
        else if (this.isKeyBound(pKeyCode, pModifiers)) {
            this.logE(`removeKeyBinding: Key "${KeyboardManager.bindingToString({
                code: pKeyCode,
                ...pModifiers,
            })}" was not mapped to mapped to direction "${pDirection.toString()}", so nothing has been removed.`);
        }
        else {
            this.logE(`removeKeyBinding: Key "${KeyboardManager.bindingToString({
                code: pKeyCode,
                ...pModifiers,
            })}" is not mapped to any direction, so nothing has been removed.`);
        }
    }
    removeAllKeyBindings() {
        this._keyBindings.clear();
        this.log('removeAllKeyBindings: All key mappings have been cleared');
    }
    getKeyBindings(pDirection) {
        return this._keyBindings.getValue(pDirection) ?? [];
    }
    getAllKeyBindings() {
        const reducer = (o, k) => {
            o[k.toString()] = this._keyBindings.getValue(k);
            return o;
        };
        return this._keyBindings.keys().reduce(reducer, {});
    }
    /** log key bindings to console, if this.debug is true */
    printAllKeyBindings() {
        this.log('printAllKeyBindings:');
        const bindings = this.getAllKeyBindings();
        Object.keys(bindings).forEach((direction) => {
            this.log('  ' + direction + ': ' + bindings[direction].map(KeyboardManager.bindingToString).join(', '));
        });
    }
    addDefaultBindings() {
        this.log('addDefaultBindings: Adding default key bindings');
        // this.addKeyBinding(Direction.UP, KeyCodes.UP);
        // this.addKeyBinding(Direction.DOWN, KeyCodes.DOWN);
        // this.addKeyBinding(Direction.LEFT, KeyCodes.LEFT);
        // this.addKeyBinding(Direction.RIGHT, KeyCodes.RIGHT);
        //
        // this.addKeyBinding(Direction.UP, KeyCodes.W);
        // this.addKeyBinding(Direction.DOWN, KeyCodes.S);
        // this.addKeyBinding(Direction.LEFT, KeyCodes.A);
        // this.addKeyBinding(Direction.RIGHT, KeyCodes.D);
        this.addKeyBinding(Direction.FORWARDS, KeyCodes.TAB);
        this.addKeyBinding(Direction.BACKWARDS, KeyCodes.TAB, { shiftKey: true });
        this.addKeyBinding('Enter', KeyCodes.ENTER);
        this.addKeyBinding('Enter', KeyCodes.SPACEBAR);
    }
    /** returns an object which you can use for removeBinding, or false if not bound */
    isKeyBound(pKeyCode, pModifiers) {
        let found;
        this._keyBindings.forEach((direction, bindings) => {
            for (let i = 0; i < bindings.length; i++) {
                const a = bindings[i];
                const b = { code: pKeyCode, ...pModifiers };
                if (KeyboardManager.areEqual(a, b)) {
                    found = { direction, binding: bindings[i] };
                    return false; // break out of foreach
                }
            }
        });
        return found ?? false;
        return found ?? false;
    }
    isKeyDown(...args) {
        for (let i = 0; i < args.length; i++) {
            if (this._downKeys.has(args[i])) {
                return true;
            }
        }
        return false;
    }
    /**
     * onKeyUp
     * @param pEvent
     */
    onKeyUp(pEvent) {
        this._downKeys.delete(pEvent.keyCode);
        this._downKeys.delete(pEvent.key);
    }
    /**
     * onKeyDown
     * @param pEvent
     */
    onKeyDown(pEvent) {
        if (!this._isEnabled) {
            return;
        }
        if (!this._downKeys.has(pEvent.keyCode) || !this._downKeys.has(pEvent.key)) {
            this._downKeys.add(pEvent.keyCode);
            this._downKeys.add(pEvent.keyCode);
            this._downKeys.add(pEvent.key);
        }
        if (this._isActive === false && pEvent.keyCode === KeyCodes.TAB) {
            if (this._maps.length > 0) {
                this._isActive = true;
                this._maps[0].isActive = true;
                pEvent.preventDefault();
            }
        }
        else {
            this._keyBindings.forEach((direction, bindings) => {
                bindings.forEach((binding) => {
                    if (KeyboardManager.doesEventMatchBinding(pEvent, binding)) {
                        if (direction === 'Enter') {
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
    onDirectionPressed(pDirection) {
        if (this._maps.length > 0) {
            this._maps[0].step(pDirection);
        }
    }
    /**
     * onMouseDown
     */
    onMouseDown() {
        this._downKeys.clear();
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
    onBrowserBlur() {
        if (this._isActive && this._maps.length > 0) {
            this._maps[0].isActive = false;
        }
    }
    /**
     * onBrowserFocus
     */
    onBrowserFocus() {
        if (this._isEnabled && this._isActive && this._maps.length > 0) {
            this._maps[0].isActive = true;
        }
    }
    onRegisterFocusable(focusable) {
        if (this._maps.length > 0) {
            this._maps[0].registerFocusable(focusable);
        }
    }
    onRegisterFocusables(focusables) {
        if (this._maps.length > 0) {
            this._maps[0].registerFocusable(focusables);
        }
    }
    onUnregisterFocusable(focusable) {
        for (const map of this._maps) {
            map.unregisterFocusable(focusable);
        }
    }
    onUnregisterFocusables(focusables) {
        for (const map of this._maps) {
            map.unregisterFocusable(focusables);
        }
    }
    onUnregisterAllFocusables() {
        for (let i = 0; i < this._maps.length; ++i) {
            this._maps[i].clear();
        }
    }
    onClearFocus() {
        if (this._maps.length > 0) {
            this._maps[0].clearFocus();
        }
    }
    onForceFocus(pData) {
        if (this._isActive && this._maps.length > 0) {
            this._maps[0].setFocus(pData);
        }
    }
    onForceNeighbours(pData) {
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
    onClearNeighbours() {
        if (this._maps.length > 0) {
            this._maps[0].clearNeighbours();
        }
    }
    onSetKeyboardEnabled(pData) {
        this._isEnabled = pData;
    }
    onGetKeyboardStatus(pData) {
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
    pushMapLayer() {
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
    popMapLayer() {
        if (this._maps.length > 0) {
            this._maps[0].isActive = false;
            this._maps[0].clear();
        }
        this._maps.shift();
        if (this._maps.length > 0) {
            this._maps[0].isActive = this._isActive;
        }
    }
    log(pText, ...pParams) {
        if (this._debug) {
            LogUtils.log(pText, { className: 'KeyboardManager', color: 'brown' }, ...pParams);
        }
    }
    logW(pText, ...pParams) {
        if (this._debug) {
            LogUtils.logWarning(pText, { className: 'KeyboardManager', color: 'brown' }, ...pParams);
        }
    }
    logE(pText, ...pParams) {
        LogUtils.logError(pText, { className: 'KeyboardManager', color: 'brown' }, ...pParams);
    }
}
//# sourceMappingURL=KeyboardManager.js.map