/// <reference types="matter-js" />
import { Container, Sprite, Texture } from "pixi.js";
import { Application } from "../Application";
import { IPhysicsObject } from "../Physics";
import { ObjectOrArrayXY } from "../Utils/Factory/utils";
import { SpritesheetLike } from "../Utils/Types";
export declare enum BodyType {
    RECTANGLE = "rectangle",
    CIRCLE = "circle",
    CONVEX = "convex",
    TRAPEZOID = "trapezoid",
    POLYGON = "polygon",
    CHAMFER = "chamfer"
}
export declare class PhysicsSprite extends Container implements IPhysicsObject {
    static readonly DEFAULT_DEBUG_COLOR: number;
    sprite: Sprite;
    body: Matter.Body;
    _size: {
        x: number;
        y: number;
    };
    _bodyType: BodyType;
    constructor(pTexture: string | Texture, pSheet?: SpritesheetLike, pSize?: ObjectOrArrayXY, pBodyType?: BodyType);
    get debugColor(): number;
    get app(): Application;
    onAdded(): void;
    onRemoved(): void;
    createBody(): void;
    update(): void;
}
//# sourceMappingURL=PhysicsSprite.d.ts.map