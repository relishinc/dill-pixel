import { Point, Sprite as PIXISprite } from 'pixi.js';
import { SignalConnections } from 'typed-signals';
import { Application } from '../core';
import { Add, bindAllMethods, bindMethods, Make } from '../utils';
export class Sprite extends PIXISprite {
    static { this.__dill_pixel_top_level_class = true; }
    constructor(texture) {
        super(texture);
        this.editable = true;
        // optionally add signals to a SignalConnections instance for easy removal
        this._signalConnections = new SignalConnections();
        this._focusSize = new Point();
        this._focusPosition = new Point();
        this._addFactory = new Add(this);
        this.bindMethods('updateFocusValues');
        this.on('added', this.updateFocusValues);
        this.on('childAdded', this.updateFocusValues);
        this.on('childRemoved', this.updateFocusValues);
        this.updateFocusValues();
    }
    get focusPosition() {
        return this._focusPosition;
    }
    set focusPosition(value) {
        this._focusPosition = value;
    }
    get focusSize() {
        return this._focusSize;
    }
    set focusSize(value) {
        this._focusSize = value;
    }
    get add() {
        return this._addFactory;
    }
    get make() {
        return Make;
    }
    get app() {
        return Application.instance;
    }
    get focusable() {
        return this._focusable;
    }
    set focusable(value) {
        this._focusable = value;
    }
    getFocusPosition() {
        return this._focusPosition;
    }
    getFocusSize() {
        return this._focusSize;
    }
    isFocusable() {
        return this._focusable;
    }
    onFocusActivated() { }
    onFocusBegin() { }
    onFocusEnd() { }
    updateFocusValues() {
        const bounds = this.getBounds();
        this._focusSize = new Point(bounds.width, bounds.height);
        this._focusPosition = new Point(-this.width * this.anchor.x, -this.height * this.anchor.y);
    }
    /**
     * @protected
     * adds a signal connection
     */
    addSignalConnection(pConnection) {
        this._signalConnections.add(pConnection);
    }
    /**
     * @protected
     * removes all signal connections
     */
    disconnectAllSignals() {
        this._signalConnections.disconnectAll();
    }
    /**
     * @param methodNames
     * @protected
     */
    bindMethods(...methodNames) {
        return bindMethods(this, ...methodNames);
    }
    /**
     * @protected
     */
    bindAllMethods() {
        return bindAllMethods(this);
    }
}
//# sourceMappingURL=Sprite.js.map