import type { ActiveCollisionTypes, ActiveEvents, ActiveHooks, Collider, RigidBody, World } from '@dimforge/rapier2d';
import { Container, DisplayObject, Sprite } from 'pixi.js';
import { Application } from '../../../core';
import { IPhysicsObject, PhysicsBodyType } from '../../index';
import { RapierPhysics } from '../RapierPhysics';
export declare class RapierPhysicsComposite extends Container implements IPhysicsObject {
    static readonly DEFAULT_DEBUG_COLOR: number;
    visual: Sprite;
    visuals: Sprite[];
    body: RigidBody;
    bodies: RigidBody[];
    collider: Collider;
    colliders: Collider[];
    colliderRef: {
        collider: Collider;
        visual: DisplayObject;
        data?: any;
    }[];
    constructor();
    get physics(): RapierPhysics;
    get app(): Application;
    get world(): World;
    get activeCollisionTypes(): ActiveCollisionTypes;
    get activeEvents(): ActiveEvents;
    get activeHooks(): ActiveHooks;
    get debugColor(): number;
    addVisual(color: number, size: [number, number], position?: [number, number], type?: PhysicsBodyType): Sprite;
    onAdded(): void;
    onRemoved(): void;
    createCollider(visual: Sprite, body: RigidBody, type?: PhysicsBodyType): Collider;
    createPiece(color: number, size: [number, number], position?: [number, number], angle?: number, type?: PhysicsBodyType, data?: any): {
        visual: Sprite;
        body: RigidBody;
        collider: Collider;
    };
    createBody(): void;
    update(): void;
}
//# sourceMappingURL=RapierPhysicsComposite.d.ts.map