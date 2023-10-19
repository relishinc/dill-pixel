import { PhysicsBase } from '../PhysicsBase';
import { Factory } from './factory';
export class MatterPhysics extends PhysicsBase {
    constructor(app) {
        super(app);
        this.app = app;
        this._debug = false;
        this._updateables = [];
        this._bounds = { x: 0, y: 0 };
        this._isRunning = false;
        this._factory = new Factory();
    }
    get engine() {
        return this._engine;
    }
    set debug(pDebug) {
        this._debug = pDebug;
        if (!this._debug) {
            this._debugContainer?.parent.removeChild(this._debugContainer);
            this._debugGraphics?.destroy({ children: true });
            this._debugContainer?.destroy({ children: true });
        }
    }
    get debug() {
        return this._debug;
    }
    destroy() {
        Matter.World.clear(this._engine.world, false);
        Matter.Engine.clear(this._engine);
        this._updateables = [];
        this._isRunning = false;
    }
    async init(pAutoStart = false, pDebug = false, autoCreateBounds = true, pEngineOptions = {}) {
        await import('matter-js').then((module) => {
            globalThis.Matter = module;
        });
        const opts = pEngineOptions || {};
        this._debug = pDebug;
        this._engine = Matter.Engine.create(opts);
        if (autoCreateBounds) {
            this.createWorldBounds();
        }
        if (pAutoStart) {
            this.start();
        }
    }
    createWorldBounds(useStage = true) {
        const thickness = 50; // or however thick you want the boundaries to be
        const width = useStage ? this.app.size.x : this._bounds.x;
        const height = useStage ? this.app.size.y : this._bounds.y;
        // Top boundary
        const top = Matter.Bodies.rectangle(-thickness / 2, -height / 2 - thickness / 2, width + thickness, thickness, {
            isStatic: true,
        });
        // Bottom boundary
        const bottom = Matter.Bodies.rectangle(-thickness / 2, height / 2 + thickness / 2, width + thickness, thickness, {
            isStatic: true,
        });
        // Left boundary
        const left = Matter.Bodies.rectangle(-width / 2 - thickness / 2, -thickness / 2, thickness, height + thickness, {
            isStatic: true,
        });
        // Right boundary
        const right = Matter.Bodies.rectangle(width / 2 + thickness / 2, -thickness / 2, thickness, height + thickness, {
            isStatic: true,
        });
        // Add these bodies to the world
        this.addToWorld(top, bottom, left, right);
    }
    start() {
        this._isRunning = true;
    }
    stop() {
        this._isRunning = false;
    }
    addToWorld(...objects) {
        objects.forEach((obj) => {
            let body;
            // eslint-disable-next-line no-prototype-builtins
            if (obj.hasOwnProperty('body')) {
                body = obj.body;
                this._updateables.push(obj);
            }
            else {
                body = obj;
            }
            Matter.World.add(this._engine.world, body);
        });
    }
    removeFromWorld(...bodies) {
        bodies.forEach((body) => {
            Matter.World.remove(this._engine.world, body);
        });
    }
    drawDebug() {
        if (!this._debugGraphics || !this._debugContainer || !this._debugGraphics.parent) {
            this._debugContainer = this.app.make.container();
            this.app.add.existing(this._debugContainer);
            this._debugGraphics = this.app.make.graphics();
            this._debugContainer.addChild(this._debugGraphics);
            this._debugContainer.x = this.app.resizer.getSize().x * 0.5;
            this._debugContainer.y = this.app.resizer.getSize().y * 0.5;
            this.app.stage.setChildIndex(this._debugContainer, this.app.stage.children.length - 1);
        }
        this._debugGraphics.clear();
        for (let i = 0; i < this._updateables.length; i++) {
            const updateable = this._updateables[i];
            const body = this._updateables[i].body;
            const color = updateable?.debugColor || 0x29c5f6;
            const vertices = body.vertices;
            this._debugGraphics.lineStyle(1, 0x00ff00, 1);
            this._debugGraphics.beginFill(color, 0.5);
            this._debugGraphics.moveTo(vertices[0].x, vertices[0].y);
            for (let j = 1; j < vertices.length; j++) {
                this._debugGraphics.lineTo(vertices[j].x, vertices[j].y);
            }
            this._debugGraphics.lineTo(vertices[0].x, vertices[0].y);
            this._debugGraphics.endFill();
        }
    }
    update(_deltaTime) {
        if (!this._isRunning) {
            return;
        }
        if (typeof Matter === 'undefined' || !this._engine) {
            return;
        }
        if (this._engine) {
            this._updateables.forEach((obj) => {
                obj.update();
            });
            if (this._debug) {
                this.drawDebug();
            }
            Matter.Engine.update(this._engine, 16.666666666666668, 1);
        }
    }
}
//# sourceMappingURL=MatterPhysics.js.map