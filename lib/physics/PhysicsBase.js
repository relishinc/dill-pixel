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
        if (this._debug) {
            if (!this._debugGraphics || !this._debugContainer || !this._debugGraphics.parent) {
                this._debugContainer = this.app.add.container({ position: [this.app.size.x * 0.5, this.app.size.y * 0.5] });
                this._debugGraphics = this._debugContainer.add.graphics();
                this.app.stage.setChildIndex(this._debugContainer, this.app.stage.children.length - 1);
            }
        }
        else {
            this._debugContainer?.parent.removeChild(this._debugContainer);
            this._debugGraphics?.destroy({ children: true });
            this._debugContainer?.destroy({ children: true });
        }
    }
    get debug() {
        return this._debug;
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
        if (this._debugGraphics) {
            this._debugGraphics?.destroy();
        }
        if (this._debugContainer) {
            this.app.stage.removeChild(this._debugContainer);
        }
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