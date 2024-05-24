import { Container as PIXIContianer, Bounds, Rectangle } from 'pixi.js';
import { Application, Container } from 'dill-pixel';
import { ICollider } from './ICollider';
import { System } from './System';
import { EntityType } from './types';

export declare class Entity<T = any, A extends Application = Application> extends Container<A> implements ICollider {
    isActor: boolean;
    isSolid: boolean;
    isSensor: boolean;
    debug: boolean;
    debugColors: {
        bounds: number;
        outerBounds: number;
    };
    type: EntityType;
    view: PIXIContianer;
    isCollideable: boolean;
    xRemainder: number;
    yRemainder: number;
    config: T;
    constructor(config?: Partial<T>);
    protected _cachedBounds: Bounds | Rectangle | null;
    get cachedBounds(): Bounds | Rectangle;
    set cachedBounds(value: Bounds);
    protected _dirtyBounds: boolean;
    get dirtyBounds(): boolean;
    set dirtyBounds(value: boolean);
    get top(): number;
    get bottom(): number;
    get left(): number;
    get right(): number;
    get system(): typeof System;
    get collideables(): Entity[];
    getWorldBounds(): Bounds | Rectangle;
    getBoundingBox(): Rectangle;
    getOuterBoundingBox(): Rectangle | null;
    protected initialize(): void;
}
//# sourceMappingURL=Entity.d.ts.map