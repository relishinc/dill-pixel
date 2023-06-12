import { Container, Graphics, IBitmapTextStyle, ITextStyle, TextStyle, Texture } from "pixi.js";
import { BodyType, PhysicsSprite } from "../../GameObjects/PhysicsSprite";
import { ObjectOrArrayXY } from "./utils";
export declare class AddFactory {
    private defaultContainer;
    private _make;
    constructor(defaultContainer: Container);
    existing(pObject: any): any;
    coloredSprite(color?: number, alpha?: number, position?: ObjectOrArrayXY, anchor?: ObjectOrArrayXY, scale?: ObjectOrArrayXY): import("pixi.js").Sprite;
    sprite(pAsset: string, pSheet?: string | string[] | undefined, alpha?: number, position?: ObjectOrArrayXY, anchor?: ObjectOrArrayXY, scale?: ObjectOrArrayXY): import("pixi.js").Sprite;
    text(pText?: string, pStyle?: Partial<ITextStyle> | TextStyle, alpha?: number, position?: ObjectOrArrayXY, anchor?: ObjectOrArrayXY, scale?: ObjectOrArrayXY): import("pixi.js").Text;
    bitmapText(pText: string, pStyle?: IBitmapTextStyle, alpha?: number, position?: ObjectOrArrayXY, anchor?: ObjectOrArrayXY, scale?: ObjectOrArrayXY): import("pixi.js").BitmapText;
    container(alpha?: number, position?: ObjectOrArrayXY, scale?: ObjectOrArrayXY): Container<import("pixi.js").DisplayObject>;
    graphics(alpha?: number, position?: ObjectOrArrayXY, scale?: ObjectOrArrayXY): Graphics;
    physicsSprite(pTexture: string | Texture, pSheet?: string | string[] | undefined, pSize?: ObjectOrArrayXY, pType?: BodyType, pAlpha?: number, pPosition?: ObjectOrArrayXY): PhysicsSprite;
}
//# sourceMappingURL=Add.d.ts.map