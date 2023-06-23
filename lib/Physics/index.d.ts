import { Container, DisplayObject, Texture } from "pixi.js";
import { Application } from "../Application";
import { BodyType } from "../GameObjects";
import { SpritesheetLike } from "../Utils/Types";
export declare enum PhysicsEngineType {
    MATTER = "matter",
    RAPIER = "rapier"
}
export interface IPhysicsBase {
    update: (pDeltaTime: number) => void;
    get debug(): boolean;
    init(pAutoStart: boolean, pDebug: boolean, autoCreateBounds: boolean, pEngineOptions: any): void;
}
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
    update(pDeltaTime: number): void;
    addToWorld(body: any): void;
    removeFromWorld(body: any): void;
}
export interface IPhysicsObject extends Container {
    visual: DisplayObject;
    body: any;
}
export interface IPhysicsAddFactory {
    set container(value: Container);
    physicsSprite(pTexture: string | Texture, pSheet?: string | string[] | undefined, pSize?: {
        x: number;
        y: number;
    } | [number, number?] | number, pType?: BodyType, pAlpha?: number, pPosition?: {
        x: number;
        y: number;
    } | [number, number?] | number): IPhysicsObject;
    existing(pSprite: DisplayObject): IPhysicsObject;
}
export interface IPhysicsMakeFactory {
    physicsSprite(pTexture: string | Texture, pSheet?: SpritesheetLike, pSize?: {
        x: number;
        y: number;
    } | [number, number?] | number, pBodyType?: BodyType): IPhysicsObject;
}
export interface IPhysicsFactory {
    add: IPhysicsAddFactory;
    make: IPhysicsMakeFactory;
    set container(value: Container);
}
export type PointLike = {
    x: number;
    y: number;
};
//# sourceMappingURL=index.d.ts.map