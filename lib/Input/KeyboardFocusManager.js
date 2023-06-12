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
exports.KeyboardFocusManager = void 0;
const PIXI = __importStar(require("pixi.js"));
const Topics = __importStar(require("../Data/Topics"));
class KeyboardFocusManager extends PIXI.Container {
    constructor(_T) {
        super();
        this._T = _T;
        this._pubSubTokens = new Array();
        this._focusPool = new Array();
        this._pubSubTokens.push(PubSub.subscribe(Topics.KEYBOARD_FOCUS_BEGIN, this.onFocusBegin.bind(this)));
        this._pubSubTokens.push(PubSub.subscribe(Topics.KEYBOARD_FOCUS_END, this.onFocusEnd.bind(this)));
        this._pubSubTokens.push(PubSub.subscribe(Topics.KEYBOARD_REFOCUS, this.reFocus.bind(this)));
    }
    destroy(pOptions) {
        for (let i = 0; i < this._pubSubTokens.length; ++i) {
            PubSub.unsubscribe(this._pubSubTokens[i]);
        }
        super.destroy(pOptions);
    }
    onFocusBegin(pTopic, pFocusable) {
        const focus = this.getFocus();
        this.addChild(focus);
        focus.show(pFocusable);
        this._activeFocus = focus;
    }
    onFocusEnd(pTopic, pFocusable) {
        if (this._activeFocus === undefined) {
            return;
        }
        if (this._activeFocus.target !== pFocusable) {
            return;
        }
        const focus = this._activeFocus;
        focus.hide(() => {
            this.removeChild(focus);
            this._focusPool.push(focus);
        });
        this._activeFocus = undefined;
    }
    reFocus() {
        if (this._activeFocus !== undefined) {
            this._activeFocus.redraw();
        }
    }
    getFocus() {
        let focus;
        if (this._focusPool.length > 0) {
            focus = this._focusPool.pop();
        }
        else {
            focus = new this._T();
        }
        return focus;
    }
}
exports.KeyboardFocusManager = KeyboardFocusManager;
//# sourceMappingURL=KeyboardFocusManager.js.map