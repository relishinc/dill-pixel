import * as PIXI from "pixi.js";
import * as Topics from "../Data/Topics";
import { subscribe, unsubscribe } from "../Utils";
export class KeyboardFocusManager extends PIXI.Container {
    constructor(_T) {
        super();
        this._T = _T;
        this._pubSubTokens = new Array();
        this._focusPool = new Array();
        this._pubSubTokens.push(subscribe(Topics.KEYBOARD_FOCUS_BEGIN, this.onFocusBegin.bind(this)));
        this._pubSubTokens.push(subscribe(Topics.KEYBOARD_FOCUS_END, this.onFocusEnd.bind(this)));
        this._pubSubTokens.push(subscribe(Topics.KEYBOARD_REFOCUS, this.reFocus.bind(this)));
    }
    destroy(pOptions) {
        for (let i = 0; i < this._pubSubTokens.length; ++i) {
            unsubscribe(this._pubSubTokens[i]);
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
//# sourceMappingURL=KeyboardFocusManager.js.map