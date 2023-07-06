import RAPIER from "@dimforge/rapier2d";
import { Container, Sprite, Texture } from "pixi.js";
import { Application } from "../../../Application";
import { SpritesheetLike } from "../../../Utils/Types";
import { IPhysicsObject, PhysicsBodyType } from "../../index";
import RapierPhysics from "../RapierPhysics";
export declare class RapierPhysicsSprite extends Container implements IPhysicsObject {
    static readonly DEFAULT_DEBUG_COLOR: number;
    visual: Sprite;
    body: RAPIER.RigidBody;
    collider: RAPIER.Collider;
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
    get world(): RAPIER.World;
    get activeCollisionTypes(): RAPIER.ActiveCollisionTypes;
    get activeEvents(): RAPIER.ActiveEvents;
    get activeHooks(): RAPIER.ActiveHooks;
    onAdded(): void;
    onRemoved(): void;
    createBody(): void;
    update(): void;
}
//# sourceMappingURL=RapierPhysicsSprite.d.ts.map