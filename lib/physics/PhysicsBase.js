export class PhysicsBase {
    constructor(app) {
        this.app = app;
        this._debug = false;
    }
    get factory() {
        return this._factory;
    }
    set debug(value) {
        this._debug = value;
    }
    get debug() {
        return false;
    }
    get add() {
        return this.factory.add;
    }
    set container(value) {
        this.factory.container = value;
    }
    init(pAutoStart, pDebug, autoCreateBounds, pEngineOptions) {
        // noop
    }
    destroy() {
        // noop
    }
    update(pDeltaTime) {
        // noop
    }
    addToWorld(body) {
        // noop
    }
    removeFromWorld(body) {
        // noop
    }
}
//# sourceMappingURL=PhysicsBase.js.map