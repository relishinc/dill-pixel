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
    /**
     * Initializes the physics engine
     * @param _autoStart
     * @param _debug
     * @param _autoCreateBounds
     * @param _engineOptions
     */
    init(_autoStart, _debug, _autoCreateBounds, _engineOptions) {
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