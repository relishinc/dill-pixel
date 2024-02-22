import { SignalConnections } from 'typed-signals';
import { Application } from '../core';
import { Animated, Factory } from '../mixins';
import { defaultFactoryMethods } from '../mixins/factory';
import { bindAllMethods } from '../utils';
const _Container = Animated(Factory(defaultFactoryMethods));
export class Container extends _Container {
    constructor(autoResize = true, autoUpdate = false, priority = 0) {
        super();
        this._signalConnections = new SignalConnections();
        bindAllMethods(this);
        if (autoResize) {
            this.addSignalConnection(this.app.onResize.connect(this.onResize, priority));
        }
        if (autoUpdate) {
            this.app.ticker.add(this.update);
        }
        void this.initialize();
    }
    get app() {
        return Application.getInstance();
    }
    destroy(options) {
        this._signalConnections.disconnectAll();
        super.destroy(options);
    }
    initialize() { }
    addSignalConnection(...args) {
        for (const connection of args) {
            this._signalConnections.add(connection);
        }
    }
    onResize(size) { }
    update(ticker) { }
}
//# sourceMappingURL=Container.js.map