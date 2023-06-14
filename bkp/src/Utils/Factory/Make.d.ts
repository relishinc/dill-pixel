import { ITextStyle, Sprite, Text, TextStyle, Texture } from "pixi.js";
/**
 * Gets a `PIXI.Texture` asset.
 * @param pAsset The name of the texture to get.
 * @param pSheet (optional) The spritesheet(s) that the texture is in. You can leave this out unless you have two textures with the same name in different spritesheets
 */
export declare class MakeFactory {
    texture(pAsset: string, pSheet?: string | string[]): Texture;
    sprite(pAsset: string, pSheet?: string | string[] | undefined): Sprite;
    text(pText?: string, pStyle?: Partial<ITextStyle> | TextStyle): Text;
}
//# sourceMappingURL=Make.d.ts.map