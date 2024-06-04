import { Body, StaticBody } from './Body';
import { Bounds, Container as PIXIContainer, Point } from 'pixi.js';
import { ArcadePhysics } from 'arcade-physics/lib/physics/arcade/ArcadePhysics';
import { ArcadePhysicsPlugin } from './ArcadePhysicsPlugin';
import { Container } from 'dill-pixel';
import { World } from 'arcade-physics/lib/physics/arcade/World';

export interface IEntity {
    readonly physics: ArcadePhysics;
    readonly world: World;
    body: Body | StaticBody;
}
export type EntityType = 'actor' | 'solid';
export declare class Entity extends Container implements IEntity {
    static pluginName: string;
    type: EntityType;
    bodyType: 'circle' | 'rectangle';
    body: Body | StaticBody;
    bodyPosition: Point;
    offset: Point;
    protected _cachedBounds: Bounds;
    constructor();
    protected _view: PIXIContainer;
    get view(): PIXIContainer;
    set view(value: PIXIContainer);
    get world(): World;
    get physics(): ArcadePhysics;
    get plugin(): ArcadePhysicsPlugin;
    added(): void;
    updateBody(): void;
    getBoundingBox(): Bounds;
    update(): void;
    protected create(): void;
    protected postCreate(): void;
}
//# sourceMappingURL=Entity.d.ts.map