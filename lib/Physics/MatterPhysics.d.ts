/// <reference types="matter-js" />
import { Application } from "../Application";
export type MatterBodyLike = Matter.Body | Matter.Composite | Matter.Constraint | Matter.MouseConstraint | Matter.World;
export interface IMatterPhysicsObject {
    body: MatterBodyLike;
    debugColor: number;
    update(): void;
}
export declare class Base {
    private app;
    private _updateables;
    private _debug;
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
    add(...objects: (IMatterPhysicsObject | MatterBodyLike)[]): void;
    remove(...bodies: MatterBodyLike[]): void;
    drawDebug(): void;
    update(deltaTime: number): void;
}
//# sourceMappingURL=MatterPhysics.d.ts.map