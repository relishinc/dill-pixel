import { Container as PIXIContainer } from 'pixi.js';
import { SignalConnections } from 'typed-signals';
import { Application } from '../core/Application';
import { Signals } from '../signals';
import { Add, Make } from '../utils/factory';
/**
 * Enhanced PIXI Container that has a factory for adding children, and a reference to the Application instance
 * @class Container
 * @extends PIXIContainer
 */
export class Container extends PIXIContainer {
    constructor(listenForResize = true) {
        super();
        this._connections = new SignalConnections();
        this.onResize = this.onResize.bind(this);
        this._addFactory = new Add(this);
        if (listenForResize) {
            Signals.onResize.connect(this.onResize);
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
        //
    }
    /**
     * @protected
     * adds a signal connection
     */
    addSignalConnection(pConnection) {
        this._connections.add(pConnection);
    }
    /**
     * @protected
     * removes all signal connections
     */
    disconnectAllSignals() {
        this._connections.disconnectAll();
    }
}
//# sourceMappingURL=Container.js.map