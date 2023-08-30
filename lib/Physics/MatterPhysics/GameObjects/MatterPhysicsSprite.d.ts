import Matter from "matter-js";
import { Container, Sprite, Texture } from "pixi.js";
import { Application } from "../../../Application";
import { SpritesheetLike } from "../../../Utils/Types";
import { IPhysicsObject, PhysicsBodyType } from "../../index";
import MatterPhysicsBase from "../MatterPhysics";
export declare class MatterPhysicsSprite extends Container implements IPhysicsObject {
    static readonly DEFAULT_DEBUG_COLOR: number;
    visual: Sprite;
    body: Matter.Body;
    _size: {
        x: number;
        y: number;
    };
    _bodyType: PhysicsBodyType;
    constructor(pTexture: string | Texture, pSheet?: SpritesheetLike, pSize?: {
        x: number;
        y: number;
    } | [number, number?] | number, pBodyType?: PhysicsBodyType);
    get physics(): MatterPhysicsBase;
    get debugColor(): number;
    get app(): Application;
    onAdded(): void;
    onRemoved(): void;
    createBody(): void;
    update(): void;
}
//# sourceMappingURL=MatterPhysicsSprite.d.ts.map