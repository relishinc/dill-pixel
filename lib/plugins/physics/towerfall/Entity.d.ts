import { Bounds, Rectangle } from 'pixi.js';
import { Application } from '../../../core/Application';
import { Container } from '../../../display/Container';
import { PIXIContainer } from '../../../pixi';
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
    view: PIXIContainer;
    isCollideable: boolean;
    xRemainder: number;
    yRemainder: number;
    config: T;
    constructor(config?: Partial<T>);
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
