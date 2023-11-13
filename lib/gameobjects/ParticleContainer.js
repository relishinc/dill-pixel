import { ParticleContainer as PIXIParticleContainer, Ticker } from 'pixi.js';
import { SignalConnections } from 'typed-signals';
import { Application } from '../core';
import { Editor } from '../misc';
import { Signals } from '../signals';
import { Add, Make } from '../utils/factory';
/**
 * Enhanced PIXI Container that has:
 * a factory for adding children,
 * a reference to the Application instance,
 * a signal connection manager,
 * and auto update / resize capabilities
 * @class ParticleContainer
 * @extends PIXIParticleContainer
 */
export class ParticleContainer extends PIXIParticleContainer {
    constructor(autoResize = true, autoUpdate = false) {
        super();
        // optionally add signals to a SignalConnections instance for easy removal
        this._signalConnections = new SignalConnections();
        this._editMode = false;
        this.editable = true;
        this.childrenEditable = true;
        this.update = this.update.bind(this);
        this.onResize = this.onResize.bind(this);
        this._addFactory = new Add(this);
        if (autoResize) {
            Signals.onResize.connect(this.onResize);
        }
        if (autoUpdate) {
            Ticker.shared.add(this.update);
        }
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
    get editMode() {
        return this._editMode;
    }
    enableEditMode() {
        this.editor = new Editor(this);
    }
    disableEditMode() {
        if (this.editor) {
            this.editor.destroy();
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
    onResize(_size) {
        // noop
    }
    update(_deltaTime) {
        // noop
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
}
//# sourceMappingURL=ParticleContainer.js.map