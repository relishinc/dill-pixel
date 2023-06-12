/// <reference types="matter-js" />
import { Application } from "../Application";
export type BodyLike = Matter.Body | Matter.Composite | Matter.Constraint | Matter.MouseConstraint | Matter.World;
export interface IPhysicsObject {
    body: BodyLike;
    debugColor: number;
    update(): void;
}
export type PointLike = {
    x: number;
    y: number;
};
export declare class Physics {
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
    add(...objects: (IPhysicsObject | BodyLike)[]): void;
    remove(...bodies: BodyLike[]): void;
    drawDebug(): void;
    update(deltaTime: number): void;
}
//# sourceMappingURL=index.d.ts.map