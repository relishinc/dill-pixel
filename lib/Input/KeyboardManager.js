"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyboardManager = void 0;
const KeyCode = __importStar(require("keycode"));
const typescript_collections_1 = require("typescript-collections");
const Topics = __importStar(require("../Data/Topics"));
const LogUtils = __importStar(require("../Utils/LogUtils"));
const InputUtils = __importStar(require("./InputUtils"));
const KeyboardMap_1 = require("./KeyboardMap");
const KeyCodes_1 = require("./KeyCodes");
/**
 * Keyboard manager
 */
class KeyboardManager {
    set debug(pEnabled) {
        this._debug = pEnabled;
    }
    constructor(app) {
        this.app = app;
        this._debug = false;
        this._keyBindings = new typescript_collections_1.Dictionary();
        this._isActive = false;
        this._isEnabled = true;
        this._maps = new Array();
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
    static bindingToString(pBinding) {
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
    static doesEventMatchBinding(pEvent, pBinding) {
        var _a, _b, _c;
        if (!KeyCode.isEventKey(pEvent, pBinding.code)) {
            return false;
        }
        if (((_a = pBinding.altKey) !== null && _a !== void 0 ? _a : false) !== pEvent.altKey) {
            return false;
        }
        if (((_b = pBinding.shiftKey) !== null && _b !== void 0 ? _b : false) !== pEvent.shiftKey) {
            return false;
        }
        if (((_c = pBinding.ctrlKey) !== null && _c !== void 0 ? _c : false) !== pEvent.ctrlKey) {
            return false;
        }
        return true;
    }
    static areEqual(pBinding1, pBinding2) {
        var _a, _b, _c, _d, _e, _f;
        if (pBinding1.code.valueOf() === pBinding2.code.valueOf() &&
            ((_a = pBinding1.altKey) !== null && _a !== void 0 ? _a : false) === ((_b = pBinding2.altKey) !== null && _b !== void 0 ? _b : false) &&
            ((_c = pBinding1.shiftKey) !== null && _c !== void 0 ? _c : false) === ((_d = pBinding2.shiftKey) !== null && _d !== void 0 ? _d : false) &&
            ((_e = pBinding1.ctrlKey) !== null && _e !== void 0 ? _e : false) === ((_f = pBinding2.ctrlKey) !== null && _f !== void 0 ? _f : false)) {
            return true;
        }
        return false;
    }
    addKeyBinding(pDirection, pKeyCode, pModifiers) {
        const binding = Object.assign({ code: pKeyCode }, pModifiers);
        const existingDirection = this.isKeyBound(pKeyCode, pModifiers !== null && pModifiers !== void 0 ? pModifiers : {});
        if (existingDirection !== false) {
            if (existingDirection.direction === pDirection) {
                this.log(`addKeyBinding: Ignoring duplicate mapping. "` +
                    KeyboardManager.bindingToString(binding) +
                    `" is already mapped to "` +
                    pDirection.toString() +
                    `"`);
                return;
            }
            else {
                this.logW(`addKeyBinding: Key "` +
                    KeyboardManager.bindingToString(binding) +
                    `" was already mapped to a different function. Un-mapping it before adding new binding.`);
                this.removeKeyBinding(existingDirection.direction, existingDirection.binding.code, existingDirection.binding);
            }
        }
        if (!this._keyBindings.containsKey(pDirection)) {
            this._keyBindings.setValue(pDirection, [binding]);
        }
        else {
            this._keyBindings.getValue(pDirection).push(binding);
        }
        this.log(`addKeyBinding: Key "` +
            KeyboardManager.bindingToString(binding) +
            `" is now mapped to "` +
            pDirection.toString() +
            `"`);
    }
    /** removes all keys associated with the direction */
    removeKeyBindings(pDirection) {
        this._keyBindings.remove(pDirection);
        this.log(`removeKeyBindings: Cleared all mappings for "` +
            pDirection.toString() +
            `"`);
    }
    /** removes a specific key associated with the direction */
    removeKeyBinding(pDirection, pKeyCode, pModifiers) {
        const bindings = this.getKeyBindings(pDirection);
        let found = false;
        // bindings.indexOf(pBinding) doesn't work, so instead we do a for loop
        for (let i = bindings.length - 1; i >= 0; i--) {
            if (KeyboardManager.areEqual(bindings[i], Object.assign({ code: pKeyCode }, pModifiers))) {
                bindings.splice(i, 1);
                found = true;
                break; // break out of for loop
            }
        }
        if (found) {
            this._keyBindings.setValue(pDirection, bindings);
            this.log(`removeKeyBinding: Key "` +
                KeyboardManager.bindingToString(Object.assign({ code: pKeyCode }, pModifiers)) +
                `" is no longer mapped to "` +
                pDirection.toString() +
                `"`);
        }
        else if (this.isKeyBound(pKeyCode, pModifiers)) {
            this.logE(`removeKeyBinding: Key "` +
                KeyboardManager.bindingToString(Object.assign({ code: pKeyCode }, pModifiers)) +
                `" was not mapped to mapped to direction "` +
                pDirection.toString() +
                `", so nothing has been removed`);
        }
        else {
            this.logE(`removeKeyBinding: Key "` +
                KeyboardManager.bindingToString(Object.assign({ code: pKeyCode }, pModifiers)) +
                `" is not mapped to any direction, so nothing has been removed`);
        }
    }
    removeAllKeyBindings() {
        this._keyBindings.clear();
        this.log(`removeAllKeyBindings: All key mappings have been cleared`);
    }
    getKeyBindings(pDirection) {
        var _a;
        return (_a = this._keyBindings.getValue(pDirection)) !== null && _a !== void 0 ? _a : [];
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
        this.log("printAllKeyBindings:");
        const bindings = this.getAllKeyBindings();
        Object.keys(bindings).forEach((direction) => {
            this.log("  " +
                direction +
                ": " +
                bindings[direction].map(KeyboardManager.bindingToString).join(", "));
        });
    }
    addDefaultBindings() {
        this.log("addDefaultBindings: Adding default key bindings");
        this.addKeyBinding(KeyboardMap_1.Direction.UP, KeyCodes_1.KeyCodes.UP);
        this.addKeyBinding(KeyboardMap_1.Direction.DOWN, KeyCodes_1.KeyCodes.DOWN);
        this.addKeyBinding(KeyboardMap_1.Direction.LEFT, KeyCodes_1.KeyCodes.LEFT);
        this.addKeyBinding(KeyboardMap_1.Direction.RIGHT, KeyCodes_1.KeyCodes.RIGHT);
        this.addKeyBinding(KeyboardMap_1.Direction.UP, KeyCodes_1.KeyCodes.W);
        this.addKeyBinding(KeyboardMap_1.Direction.DOWN, KeyCodes_1.KeyCodes.S);
        this.addKeyBinding(KeyboardMap_1.Direction.LEFT, KeyCodes_1.KeyCodes.A);
        this.addKeyBinding(KeyboardMap_1.Direction.RIGHT, KeyCodes_1.KeyCodes.D);
        this.addKeyBinding(KeyboardMap_1.Direction.FORWARDS, KeyCodes_1.KeyCodes.TAB);
        this.addKeyBinding(KeyboardMap_1.Direction.BACKWARDS, KeyCodes_1.KeyCodes.TAB, { shiftKey: true });
        this.addKeyBinding("Enter", KeyCodes_1.KeyCodes.ENTER);
        this.addKeyBinding("Enter", KeyCodes_1.KeyCodes.SPACEBAR);
    }
    /** returns an object which you can use for removeBinding, or false if not bound */
    isKeyBound(pKeyCode, pModifiers) {
        let found;
        this._keyBindings.forEach((direction, bindings) => {
            for (let i = 0; i < bindings.length; i++) {
                const a = bindings[i];
                const b = Object.assign({ code: pKeyCode }, pModifiers);
                if (KeyboardManager.areEqual(a, b)) {
                    found = { direction, binding: bindings[i] };
                    return false; // break out of foreach
                }
            }
        });
        return found !== null && found !== void 0 ? found : false;
    }
    /**
     * onKeyDown
     * @param pEvent
     */
    onKeyDown(pEvent) {
        if (!this._isEnabled) {
            return;
        }
        if (this._isActive === false) {
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
    onDirectionPressed(pDirection) {
        if (this._maps.length > 0) {
            this._maps[0].step(pDirection);
        }
    }
    /**
     * onMouseDown
     */
    onMouseDown() {
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
    onRegisterFocusable(pTopic, pData) {
        if (this._maps.length > 0) {
            this._maps[0].registerFocusable(pData);
        }
    }
    onUnregisterFocusable(pTopic, pData) {
        for (const map of this._maps) {
            map.unregisterFocusable(pData);
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
    onForceFocus(pTopic, pData) {
        if (this._isActive && this._maps.length > 0) {
            this._maps[0].setFocus(pData);
        }
    }
    onForceNeighbours(pTopic, pData) {
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
    onSetKeyboardEnabled(pTopic, pData) {
        this._isEnabled = pData;
    }
    onGetKeyboardStatus(pTopic, pData) {
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
        const map = new KeyboardMap_1.KeyboardMap();
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
            LogUtils.log(pText, { className: "KeyboardManager", color: "brown" }, ...pParams);
        }
    }
    logW(pText, ...pParams) {
        if (this._debug) {
            LogUtils.logWarning(pText, { className: "KeyboardManager", color: "brown" }, ...pParams);
        }
    }
    logE(pText, ...pParams) {
        LogUtils.logError(pText, { className: "KeyboardManager", color: "brown" }, ...pParams);
    }
}
exports.KeyboardManager = KeyboardManager;
//# sourceMappingURL=KeyboardManager.js.map