import RAPIER from "@dimforge/rapier2d";
import { Container, DisplayObject, Sprite } from "pixi.js";
import { Application } from "../../../Application";
import { IPhysicsObject, PhysicsBodyType } from "../../index";
import RapierPhysics from "../RapierPhysics";
export declare class RapierPhysicsComposite extends Container implements IPhysicsObject {
    static readonly DEFAULT_DEBUG_COLOR: number;
    visual: Sprite;
    visuals: Sprite[];
    body: RAPIER.RigidBody;
    bodies: RAPIER.RigidBody[];
    collider: RAPIER.Collider;
    colliders: RAPIER.Collider[];
    colliderRef: {
        collider: RAPIER.Collider;
        visual: DisplayObject;
        data?: any;
    }[];
    constructor();
    get physics(): RapierPhysics;
    get app(): Application;
    get world(): RAPIER.World;
    get activeCollisionTypes(): RAPIER.ActiveCollisionTypes;
    get activeEvents(): RAPIER.ActiveEvents;
    get activeHooks(): RAPIER.ActiveHooks;
    get debugColor(): number;
    addVisual(color: number, size: [number, number], position?: [number, number], type?: PhysicsBodyType): Sprite;
    onAdded(): void;
    onRemoved(): void;
    createCollider(visual: Sprite, body: RAPIER.RigidBody, type?: PhysicsBodyType): RAPIER.Collider;
    createPiece(color: number, size: [number, number], position?: [number, number], angle?: number, type?: PhysicsBodyType, data?: any): {
        visual: Sprite;
        body: RAPIER.RigidBody;
        collider: RAPIER.Collider;
    };
    createBody(): void;
    update(): void;
}
//# sourceMappingURL=RapierPhysicsComposite.d.ts.map