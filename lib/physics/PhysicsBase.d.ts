import { Container } from 'pixi.js';
import { Application } from '../core';
import { IPhysicsAddFactory, IPhysicsBase, IPhysicsFactory } from './interfaces';
export declare class PhysicsBase implements IPhysicsBase {
    protected app: Application;
    _factory: IPhysicsFactory;
    protected _debug: boolean;
    constructor(app: Application);
    get factory(): IPhysicsFactory;
    set debug(value: boolean);
    get debug(): boolean;
    get add(): IPhysicsAddFactory;
    set container(value: Container);
    /**
     * Initializes the physics engine
     * @param _autoStart
     * @param _debug
     * @param _autoCreateBounds
     * @param _engineOptions
     */
    init(_autoStart: boolean, _debug: boolean, _autoCreateBounds?: boolean, _engineOptions?: any): void;
    destroy(): void;
    update(pDeltaTime: number): void;
    addToWorld(body: any): void;
    removeFromWorld(body: any): void;
}
//# sourceMappingURL=PhysicsBase.d.ts.map