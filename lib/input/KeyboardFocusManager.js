import { Container } from 'pixi.js';
import { SignalConnections } from 'typed-signals';
import { Signals } from '../signals';
export class KeyboardFocusManager extends Container {
    constructor(_T) {
        super();
        this._T = _T;
        this.onFocusBegin = this.onFocusBegin.bind(this);
        this.onFocusEnd = this.onFocusEnd.bind(this);
        this.reFocus = this.reFocus.bind(this);
        this._focusPool = [];
        this._connections = new SignalConnections();
        this._connections.add(Signals.keyboardFocusBegin.connect(this.onFocusBegin));
        this._connections.add(Signals.keyboardFocusEnd.connect(this.onFocusEnd));
        this._connections.add(Signals.keyboardReFocus.connect(this.reFocus));
    }
    destroy(pOptions) {
        this._connections.disconnectAll();
        super.destroy(pOptions);
    }
    onFocusBegin(pFocusable) {
        const focus = this.getFocus();
        this.addChild(focus);
        focus.show(pFocusable);
        this._activeFocus = focus;
    }
    onFocusEnd(pFocusable) {
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