import { Spine } from "@pixi-spine/runtime-4.1";
import { BitmapText, Circle, Container, DisplayObject, Ellipse, IHitArea, Point, Polygon, Rectangle, RoundedRectangle, Sprite, Texture } from "pixi.js";
export type PixiSimpleShape = Rectangle | Circle | Ellipse | RoundedRectangle;
export type PixiShape = PixiSimpleShape | Polygon;
/**
 * Clone Hit Area
 * @param pHitArea
 */
export declare function cloneHitArea(pHitArea: IHitArea): IHitArea | undefined;
/**
 * Reassigns the displays object parent while maintaing it's world position
 * @todo SH: Look at: https://github.com/pixijs/js/wiki/v4-Gotchas for possible optimization
 * @param pChild
 * @param pParent
 */
export declare function setParent(pChild: DisplayObject, pParent: Container): void;
/**
 *
 * @param pObject
 * @param pAnchor
 */
export declare function setAnchor(pObject: Sprite, pAnchor: Point): void;
/**
 *
 * @param pObject
 */
export declare function objectDiagonal(pObject: Container): number;
/**
 * Removes provided object from its parent and re-adds it.
 * @param pObject The object to send to the back.
 */
export declare function sendToFront(pObject: Container): void;
/**
 * Removes provided object from its parent and re-adds it at index 0.
 * @param pObject The object to send to the back.
 */
export declare function sendToBack(pObject: Container): void;
/**
 *
 * @param pShape
 * @param pDelta
 */
export declare function offsetShape(pShape: PixiShape, pDelta: Point): PixiShape;
/**
 *
 * @param pShape
 * @param pDelta
 */
export declare function offsetSimpleShape(pShape: PixiSimpleShape, pDelta: Point): PixiSimpleShape;
/**
 * Creates and returns a `Sprite` object.
 * This uses {@link getTexture} internally
 * @param pAsset The asset of the sprite to create.
 * @param pSheet (optional) The spritesheet(s) that the texture is in. You can leave this out unless you have two textures with the same name in different spritesheets
 */
export declare function makeSprite(pAsset: string, pSheet?: string | string[]): Sprite;
/**
 * Gets a `Texture` asset.
 * @param pAsset The name of the texture to get.
 * @param pSheet (optional) The spritesheet(s) that the texture is in. You can leave this out unless you have two textures with the same name in different spritesheets
 */
export declare function getTexture(pAsset: string, pSheet?: string | string[]): Texture;
/**
 * Creates and returns a `BitmapText` object.
 * @param pText The text to display.
 * @param pFont The font to use.
 * @param pSize The size of the font.
 * @param pColour The colour of the font.
 * @default pColour 0x000000
 */
export declare function makeText(pText: string, pFont: string, pSize: number, pColour?: number): BitmapText;
/**
 * Standard tracks for spine characters.
 */
export declare enum SpineTrack {
    Body = 0,
    Eyes = 1,
    Mouth = 2,
    NumElements = 3
}
/**
 * Creates and returns a `spine.Spine` object.
 * @param pName The name of the spine file.
 */
export declare function makeSpine(pName: string): Spine;
/**
 * Calculates bounding box in global coordinate space
 * @param pTarget - local coordinate space
 * @param pRect - optional rectangle in local coordinate space, defaults to pTarget.getLocalBounds()
 */
export declare function getGlobalBounds(pTarget: DisplayObject, pRect?: Rectangle): Rectangle;
//# sourceMappingURL=PixiUtils.d.ts.map