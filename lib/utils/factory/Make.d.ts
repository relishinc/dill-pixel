import { Geometry, State } from '@pixi/core';
import { BitmapText, DRAW_MODES, Graphics, HTMLText, HTMLTextStyle, IBitmapTextStyle, ITextStyle, Mesh, NineSlicePlane, ObservablePoint, Point, Shader, SimpleMesh, SimplePlane, SimpleRope, Sprite, Text, TextStyle, Texture, TilingSprite } from 'pixi.js';
import { Container } from '../../gameobjects';
import { SpritesheetLike } from '../Types';
/**
 * Gets a `PIXI.Texture` asset.
 * @param pAsset The name of the texture to get.
 * @param pSheet (optional) The spritesheet(s) that the texture is in. You can leave this out unless you have two textures with the same name in different spritesheets
 */
export declare class Make {
    static texture(pAsset: string, pSheet?: SpritesheetLike): Texture;
    static coloredSprite(color?: number, size?: {
        x: number;
        y: number;
    } | [number, number?] | number, shape?: 'rectangle' | 'rounded_rectangle' | 'circle', opts?: {
        [key: string]: string | number;
    }): Sprite;
    static sprite(pTexture: string | Texture, pSheet?: SpritesheetLike): Sprite;
    static text(pText?: string, pStyle?: Partial<ITextStyle | TextStyle>): Text;
    static htmlText(pText?: string, pStyle?: Partial<HTMLTextStyle | TextStyle | ITextStyle>): HTMLText;
    static bitmapText(pText?: string, pStyle?: Partial<IBitmapTextStyle>): BitmapText;
    static container(): Container;
    static graphics(): Graphics;
    static tiledSprite(pTexture: string | Texture, pSheet: SpritesheetLike, pWidth: number, pHeight: number, pTilePosition?: ObservablePoint): TilingSprite;
    static mesh(pGeometry: Geometry, pShader: Shader, pState?: State, pDrawMode?: DRAW_MODES): Mesh<Shader>;
    static simpleRope(pTexture: string | Texture, pSheet: SpritesheetLike, pPoints: (Point | ObservablePoint)[], pAutoUpdate?: boolean): SimpleRope;
    static simplePlane(pTexture: string | Texture, pSheet: SpritesheetLike, pVertsWidth: number, pVertsHeight: number): SimplePlane;
    static simpleMesh(pTexture: string | Texture, pSheet: SpritesheetLike, pVertices?: Float32Array, pUvs?: Float32Array, pIndices?: Uint16Array, pDrawMode?: number): SimpleMesh;
    static nineSlice(pTexture: string | Texture, pSheet?: SpritesheetLike, leftWidth?: number, topHeight?: number, rightWidth?: number, bottomHeight?: number): NineSlicePlane;
}
//# sourceMappingURL=Make.d.ts.map