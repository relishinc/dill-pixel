import * as PIXI from "pixi.js";
import * as Topics from "../Data/Topics";
import { IFocusable } from "./IFocusable";
import { IKeyboardFocus } from "./IKeyboardFocus";

export class KeyboardFocusManager<T extends PIXI.DisplayObject & IKeyboardFocus> extends PIXI.Container {
    protected _pubSubTokens: any[];
    protected _activeFocus?: T;
    protected _focusPool: T[];

    constructor(protected _T: new (...args: any[]) => T) {
        super();

        this._pubSubTokens = new Array<any>();
        this._focusPool = new Array<T>();

        this._pubSubTokens.push(PubSub.subscribe(Topics.KEYBOARD_FOCUS_BEGIN, this.onFocusBegin.bind(this)));
        this._pubSubTokens.push(PubSub.subscribe(Topics.KEYBOARD_FOCUS_END, this.onFocusEnd.bind(this)));
        this._pubSubTokens.push(PubSub.subscribe(Topics.KEYBOARD_REFOCUS, this.reFocus.bind(this)));
    }

    public destroy(pOptions?: Parameters<typeof PIXI.Container.prototype.destroy>[0]): void {
        for (let i = 0; i < this._pubSubTokens.length; ++i) {
            PubSub.unsubscribe(this._pubSubTokens[i]);
        }
        super.destroy(pOptions);
    }

    protected onFocusBegin(pTopic: string, pFocusable: IFocusable): void {
        const focus: T = this.getFocus();
        this.addChild(focus);
        focus.show(pFocusable);
        this._activeFocus = focus;
    }

    protected onFocusEnd(pTopic: string, pFocusable: IFocusable): void {
        if (this._activeFocus === undefined) { return; }
        if (this._activeFocus.target !== pFocusable) { return; }

        const focus = this._activeFocus;

        focus.hide(() => {
            this.removeChild(focus);
            this._focusPool.push(focus);
        });

        this._activeFocus = undefined;
    }

    protected reFocus(): void {
        if (this._activeFocus !== undefined) {
            this._activeFocus.redraw();
        }
    }

    protected getFocus(): T {
        let focus: T;
        if (this._focusPool.length > 0) {
            focus = this._focusPool.pop()!;
        }
        else {
            focus = new this._T();
        }
        return focus;
    }
}
