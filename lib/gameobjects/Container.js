import { Container as PIXIContainer, Point, Ticker } from 'pixi.js';
import { SignalConnections } from 'typed-signals';
import { Application } from '../core';
import { Editor } from '../misc';
import { Signals } from '../signals';
import { Add, bindAllMethods, bindMethods, Make } from '../utils';
/**
 * Enhanced PIXI Container that has:
 * a factory for adding children,
 * a reference to the Application instance,
 * a signal connection manager,
 * and auto update / resize capabilities
 * @class Container
 * @extends PIXIContainer
 */
export class Container extends PIXIContainer {
    constructor(autoResize = true, autoUpdate = false, autoBindMethods = true) {
        super();
        this.editable = true;
        this.childrenEditable = true;
        // optionally add signals to a SignalConnections instance for easy removal
        this._signalConnections = new SignalConnections();
        this._editMode = false;
        // focus management
        this._focusable = false;
        this._addFactory = new Add(this);
        if (autoBindMethods) {
            this.bindAllMethods();
        }
        else {
            this.bindMethods('onResize', 'update');
        }
        if (autoResize) {
            Signals.onResize.connect(this.onResize);
        }
        if (autoUpdate) {
            Ticker.shared.add(this.update, this);
        }
    }
    get focusable() {
        return this._focusable;
    }
    set focusable(value) {
        this._focusable = value;
    }
    get editMode() {
        return this._editMode;
    }
    set editMode(value) {
        this._editMode = value;
        if (this._editMode) {
            this.enableEditMode();
        }
        else {
            this.disableEditMode();
        }
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
    destroy(_options) {
        this.disconnectAllSignals();
        super.destroy(_options);
    }
    enableEditMode() {
        this.editor = new Editor(this);
    }
    disableEditMode() {
        if (this.editor) {
            this.editor.destroy();
        }
    }
    onResize(_size) {
        // noop
    }
    update(_deltaTime) {
        // noop
    }
    // focus stuff
    onFocusBegin() {
        console.log(`onFocusBegin for ${this.name}`);
    }
    onFocusEnd() {
        console.log(`onFocusEnd for ${this.name}`);
    }
    onFocusActivated() {
        console.log(`onFocusActivated for ${this.name}`);
    }
    getFocusPosition() {
        return new Point(-this.width * 0.5, -this.height * 0.5);
    }
    getFocusSize() {
        const bounds = this.getBounds();
        return new Point(bounds.width, bounds.height);
    }
    isFocusable() {
        return this._focusable;
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
    bindAllMethods() {
        return bindAllMethods(this);
    }
}
//# sourceMappingURL=Container.js.map