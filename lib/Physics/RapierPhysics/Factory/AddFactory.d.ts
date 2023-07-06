import { Container, Texture } from "pixi.js";
import { IPhysicsAddFactory, IPhysicsObject, PhysicsBodyType } from "../../index";
import MakeFactory from "./MakeFactory";
export default class AddFactory implements IPhysicsAddFactory {
    private defaultContainer;
    protected _make: MakeFactory;
    constructor(defaultContainer: Container);
    set container(value: Container);
    get make(): MakeFactory;
    physicsSprite(pTexture: string | Texture, pSheet?: string | string[] | undefined, pSize?: {
        x: number;
        y: number;
    } | [number, number?] | number, pType?: PhysicsBodyType, pAlpha?: number, pPosition?: {
        x: number;
        y: number;
    } | [number, number?] | number): IPhysicsObject;
    existing(pObject: any): any;
}
//# sourceMappingURL=AddFactory.d.ts.map