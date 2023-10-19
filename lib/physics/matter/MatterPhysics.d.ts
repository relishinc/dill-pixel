/// <reference types="matter-js" />
import { Application } from '../../core';
import { PhysicsBase } from '../PhysicsBase';
import { IMatterPhysicsObject } from './interfaces';
import { MatterBodyLike } from './types';
export declare class MatterPhysics extends PhysicsBase {
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
    destroy(): void;
    init(pAutoStart?: boolean, pDebug?: boolean, autoCreateBounds?: boolean, pEngineOptions?: Matter.IEngineDefinition): Promise<void>;
    createWorldBounds(useStage?: boolean): void;
    start(): void;
    stop(): void;
    addToWorld(...objects: (IMatterPhysicsObject | MatterBodyLike)[]): void;
    removeFromWorld(...bodies: MatterBodyLike[]): void;
    drawDebug(): void;
    update(_deltaTime: number): void;
}
//# sourceMappingURL=MatterPhysics.d.ts.map