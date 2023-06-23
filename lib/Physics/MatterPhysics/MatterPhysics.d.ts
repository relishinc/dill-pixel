import Matter from 'matter-js';
import { Application } from "../../Application";
import { PhysicsBase } from "../index";
import { IMatterPhysicsObject, MatterBodyLike } from "./index";
export default class MatterPhysics extends PhysicsBase {
    protected app: Application;
    protected _debug: boolean;
    private _updateables;
    private _engine;
    private _debugGraphics;
    private _debugContainer;
    private _bounds;
    private _isRunning;
    constructor(app: Application);
    get engine(): Matter.Engine;
    set debug(pDebug: boolean);
    get debug(): boolean;
    init(pAutoStart?: boolean, pDebug?: boolean, autoCreateBounds?: boolean, pEngineOptions?: Matter.IEngineDefinition): Promise<void>;
    createWorldBounds(useStage?: boolean): void;
    start(): void;
    stop(): void;
    addToWorld(...objects: (IMatterPhysicsObject | MatterBodyLike)[]): void;
    removeFromWorld(...bodies: MatterBodyLike[]): void;
    drawDebug(): void;
    update(deltaTime: number): void;
}
//# sourceMappingURL=MatterPhysics.d.ts.map