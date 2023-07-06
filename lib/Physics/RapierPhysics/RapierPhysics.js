var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import RAPIER from "@dimforge/rapier2d";
import { PhysicsBase } from "../index";
import { Factory } from "./Factory";
export default class RapierPhysics extends PhysicsBase {
    constructor(app) {
        super(app);
        this.app = app;
        this._debug = true;
        this._updateables = [];
        this._bounds = { x: 0, y: 0 };
        this._isRunning = false;
        this._systemOfUnitsFactor = 500;
        this._factory = new Factory();
    }
    get SIFactor() {
        return this._systemOfUnitsFactor;
    }
    get world() {
        return this._world;
    }
    set debug(pDebug) {
        var _a, _b, _c;
        this._debug = pDebug;
        if (!this._debug) {
            (_a = this._debugContainer) === null || _a === void 0 ? void 0 : _a.parent.removeChild(this._debugContainer);
            (_b = this._debugGraphics) === null || _b === void 0 ? void 0 : _b.destroy({ children: true });
            (_c = this._debugContainer) === null || _c === void 0 ? void 0 : _c.destroy({ children: true });
        }
    }
    get debug() {
        return this._debug;
    }
    init(pAutoStart = false, pDebug = false, autoCreateBounds = true, pEngineOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            const defaults = { systemOfUnitsFactor: this._systemOfUnitsFactor };
            pEngineOptions = Object.assign({}, defaults, pEngineOptions);
            const opts = Object.assign({}, {
                gravity: new RAPIER.Vector2(0.0, 9.81 * pEngineOptions.systemOfUnitsFactor),
            }, pEngineOptions);
            this._systemOfUnitsFactor = pEngineOptions.systemOfUnitsFactor;
            this._debug = pDebug;
            this._world = new RAPIER.World(opts.gravity);
            if (autoCreateBounds) {
                this.createWorldBounds();
            }
            if (pAutoStart) {
                this.start();
            }
            return Promise.resolve();
        });
    }
    makeWall(def) {
        const bodyDesc = RAPIER.RigidBodyDesc.fixed().setTranslation(def.position.x, def.position.y).setRotation(def.angle || 0);
        const body = this.world.createRigidBody(bodyDesc);
        const colliderDesc = RAPIER.ColliderDesc.cuboid(def.size.x / 2, def.size.y / 2).setTranslation(0, 0).setRestitution(0);
        const collider = this.world.createCollider(colliderDesc, body);
        return { body, collider, definition: def };
    }
    createWorldBounds(useStage = true) {
        const thickness = 50; // or however thick you want the boundaries to be
        const width = useStage ? this.app.size.x : this._bounds.x;
        const height = useStage ? this.app.size.y : this._bounds.y;
        this.makeWall({
            size: { x: width, y: thickness },
            position: { x: 0, y: -height / 2 - thickness / 2 },
        });
        this.makeWall({
            size: { x: width, y: thickness },
            position: { x: 0, y: height / 2 + thickness / 2 },
        });
        this.makeWall({
            size: { x: thickness, y: height },
            position: { x: -width / 2 - thickness / 2, y: 0 },
        });
        this.makeWall({
            size: { x: thickness, y: height },
            position: { x: width / 2 + thickness / 2, y: 0 },
        });
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
            if (obj.hasOwnProperty("body")) {
                body = obj.body;
                this._updateables.push(obj);
            }
            else {
                body = obj;
            }
        });
    }
    removeFromWorld(...bodies) {
        bodies.forEach((body) => {
            this.world.removeRigidBody(body);
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
            this._debugContainer.scale.set(1, -1);
            this.app.stage.setChildIndex(this._debugContainer, this.app.stage.children.length - 1);
        }
        this._debugGraphics.clear();
        const buffers = this.world.debugRender();
        const vtx = buffers.vertices;
        const cls = buffers.colors;
        const color = 0xff0000;
        for (let i = 0; i < vtx.length / 4; i += 1) {
            this._debugGraphics.lineStyle(1.0, color, cls[i * 8 + 3], 1, true);
            this._debugGraphics.moveTo(vtx[i * 4], -vtx[i * 4 + 1]);
            this._debugGraphics.lineTo(vtx[i * 4 + 2], -vtx[i * 4 + 3]);
        }
    }
    update(deltaTime) {
        if (!this._isRunning) {
            return;
        }
        if (this.world) {
            if (deltaTime) {
                this.world.timestep = deltaTime;
            }
            this._updateables.forEach((obj) => {
                obj.update();
            });
            if (this._debug) {
                this.drawDebug();
            }
            this.world.step();
        }
    }
}
//# sourceMappingURL=RapierPhysics.js.map