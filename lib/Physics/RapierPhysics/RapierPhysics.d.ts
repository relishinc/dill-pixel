import RAPIER from "@dimforge/rapier2d";
import { Application } from "../../Application";
import { PhysicsBase, PointLike } from "../index";
import { IRapierPhysicsObject, RapierBodyLike } from "./index";
export interface WallDefinition {
    position: PointLike;
    size: PointLike;
    angle?: number;
}
export default class RapierPhysics extends PhysicsBase {
    protected app: Application;
    protected _debug: boolean;
    private _updateables;
    private _world;
    private _debugGraphics;
    private _debugContainer;
    private _bounds;
    private _isRunning;
    private _siScaleFactor;
    constructor(app: Application);
    get SIScaleFactor(): number;
    get world(): RAPIER.World;
    set debug(pDebug: boolean);
    get debug(): boolean;
    init(pAutoStart?: boolean, pDebug?: boolean, autoCreateBounds?: boolean, pEngineOptions?: {
        gravity: RAPIER.Vector2;
        siScaleFactor: number;
    }): Promise<void>;
    makeWall(def: WallDefinition): {
        body: RAPIER.RigidBody;
        collider: RAPIER.Collider;
        definition: WallDefinition;
    };
    createWorldBounds(useStage?: boolean): void;
    start(): void;
    stop(): void;
    addToWorld(...objects: (IRapierPhysicsObject | RapierBodyLike)[]): void;
    removeFromWorld(...bodies: RapierBodyLike[]): void;
    drawDebug(): void;
    update(deltaTime: number): void;
}
//# sourceMappingURL=RapierPhysics.d.ts.map