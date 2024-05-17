import { Container } from 'pixi.js';
import { SignalConnections } from 'typed-signals';
import { Signals } from '../signals';
/**
 * Class for managing keyboard focus.
 * @extends Container
 */
export class KeyboardFocusManager extends Container {
    /**
     * Creates a new instance of the KeyboardFocusManager class.
     * @param _T - The type of the focus objects.
     */
    constructor(_T) {
        super();
        this._T = _T;
        this.onFocusBegin = this.onFocusBegin.bind(this);
        this.onFocusEnd = this.onFocusEnd.bind(this);
        this.reFocus = this.reFocus.bind(this);
        this.clearFocus = this.clearFocus.bind(this);
        this._focusPool = [];
        this._connections = new SignalConnections();
        this._connections.add(Signals.keyboardFocusBegin.connect(this.onFocusBegin));
        this._connections.add(Signals.keyboardFocusEnd.connect(this.onFocusEnd));
        this._connections.add(Signals.keyboardReFocus.connect(this.reFocus));
        this._connections.add(Signals.clearFocus.connect(this.clearFocus));
    }
    /**
     * Destroys the KeyboardFocusManager.
     * @param pOptions - The options for destroying the KeyboardFocusManager.
     */
    destroy(pOptions) {
        this._connections.disconnectAll();
        super.destroy(pOptions);
    }
    /**
     * Clears the current focus.
     */
    clearFocus() {
        if (this._activeFocus === undefined) {
            return;
        }
        const focus = this._activeFocus;
        focus.hide(() => {
            this.removeChild(focus);
            this._focusPool.push(focus);
        });
        this._activeFocus = undefined;
    }
    /**
     * Begins focus on a focusable object.
     * @param pFocusable - The focusable object to focus on.
     */
    onFocusBegin(pFocusable) {
        const focus = this.getFocus();
        this.addChild(focus);
        focus.show(pFocusable);
        this._activeFocus = focus;
    }
    /**
     * Ends focus on a focusable object.
     * @param pFocusable - The focusable object to end focus on.
     */
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
    /**
     * Refocuses on the current focusable object.
     */
    reFocus() {
        if (this._activeFocus !== undefined) {
            this._activeFocus.redraw();
        }
    }
    /**
     * Gets a focus object.
     * @returns A focus object.
     */
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