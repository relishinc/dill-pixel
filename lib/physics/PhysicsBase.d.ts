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
    init(pAutoStart: boolean, pDebug: boolean, autoCreateBounds?: boolean, pEngineOptions?: any): void;
    destroy(): void;
    update(pDeltaTime: number): void;
    addToWorld(body: any): void;
    removeFromWorld(body: any): void;
}
//# sourceMappingURL=PhysicsBase.d.ts.map