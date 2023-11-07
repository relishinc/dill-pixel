import type { Vector2, World } from '@dimforge/rapier2d';
import { Application } from '../../core';
import { PhysicsBase } from '../PhysicsBase';
import { IRapierPhysicsObject, IRapierWallDefinition } from './interfaces';
import { RapierBodyLike } from './types';
export declare class RapierPhysics extends PhysicsBase {
    protected app: Application;
    private _updateables;
    private _world;
    private _bounds;
    private _isRunning;
    private _systemOfUnitsFactor;
    constructor(app: Application);
    get SIFactor(): number;
    get world(): World;
    set debug(value: boolean);
    get debug(): boolean;
    init(pAutoStart?: boolean, pDebug?: boolean, autoCreateBounds?: boolean, pEngineOptions?: {
        gravity: Vector2;
        systemOfUnitsFactor: number;
    }): Promise<void>;
    destroy(): void;
    makeWall(def: IRapierWallDefinition): {
        body: import("@dimforge/rapier2d").RigidBody;
        collider: import("@dimforge/rapier2d").Collider;
        definition: IRapierWallDefinition;
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