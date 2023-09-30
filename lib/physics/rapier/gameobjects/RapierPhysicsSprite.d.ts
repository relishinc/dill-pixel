import type { ActiveCollisionTypes, ActiveEvents, ActiveHooks, Collider, RigidBody, World } from '@dimforge/rapier2d';
import { Container, Sprite, Texture } from 'pixi.js';
import { Application } from '../../../core/Application';
import { SpritesheetLike } from '../../../utils/Types';
import { IPhysicsObject, PhysicsBodyType } from '../../index';
import { RapierPhysics } from '../RapierPhysics';
export declare class RapierPhysicsSprite extends Container implements IPhysicsObject {
    static readonly DEFAULT_DEBUG_COLOR: number;
    visual: Sprite;
    body: RigidBody;
    collider: Collider;
    _size: {
        x: number;
        y: number;
    };
    _bodyType: PhysicsBodyType;
    constructor(pTexture: string | Texture, pSheet?: SpritesheetLike, pSize?: {
        x: number;
        y: number;
    } | [number, number?] | number, pBodyType?: PhysicsBodyType);
    get physics(): RapierPhysics;
    get debugColor(): number;
    get app(): Application;
    get world(): World;
    get activeCollisionTypes(): ActiveCollisionTypes;
    get activeEvents(): ActiveEvents;
    get activeHooks(): ActiveHooks;
    onAdded(): void;
    onRemoved(): void;
    createBody(): void;
    update(): void;
}
//# sourceMappingURL=RapierPhysicsSprite.d.ts.map