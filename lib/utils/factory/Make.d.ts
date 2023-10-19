import { Geometry, State } from '@pixi/core';
import { BitmapText, DRAW_MODES, Graphics, HTMLText, HTMLTextStyle, IBitmapTextStyle, ITextStyle, Mesh, NineSlicePlane, ObservablePoint, Point, Shader, SimpleMesh, SimplePlane, SimpleRope, Sprite, Text, TextStyle, Texture, TilingSprite } from 'pixi.js';
import { Container } from '../../gameobjects';
import { PointLike, SpritesheetLike } from '../Types';
/**
 * Gets a `PIXI.Texture` asset.
 * @param pAsset The name of the texture to get.
 * @param pSheet (optional) The spritesheet(s) that the texture is in. You can leave this out unless you have two textures with the same name in different spritesheets
 */
export declare class Make {
    static texture(pAsset: string, pSheet?: SpritesheetLike): Texture;
    static coloredSprite(color?: number, size?: PointLike, shape?: 'rectangle' | 'rounded_rectangle' | 'circle', opts?: {
        [key: string]: string | number;
    }): Sprite;
    static sprite(pTexture: string | Texture, pSheet?: SpritesheetLike, alpha?: number, position?: PointLike, anchor?: PointLike): Sprite;
    static text(pText?: string, pStyle?: Partial<ITextStyle | TextStyle>, alpha?: number, position?: PointLike, anchor?: PointLike): Text;
    static htmlText(pText?: string, pStyle?: Partial<HTMLTextStyle | TextStyle | ITextStyle>, alpha?: number, position?: PointLike, anchor?: PointLike): HTMLText;
    static bitmapText(pText?: string, pStyle?: Partial<IBitmapTextStyle>, alpha?: number, position?: PointLike, anchor?: PointLike): BitmapText;
    static container(alpha?: number, position?: PointLike): Container;
    static graphics(alpha?: number, position?: PointLike): Graphics;
    static tilingSprite(pTexture: string | Texture, pSheet: SpritesheetLike, pWidth: number, pHeight: number, pTilePosition?: Point, alpha?: number, position?: PointLike, anchor?: PointLike): TilingSprite;
    static mesh(pGeometry: Geometry, pShader: Shader, pState?: State, pDrawMode?: DRAW_MODES): Mesh<Shader>;
    static simpleRope(pTexture: string | Texture, pSheet: SpritesheetLike, pPoints: (Point | ObservablePoint)[], pAutoUpdate?: boolean): SimpleRope;
    static simplePlane(pTexture: string | Texture, pSheet: SpritesheetLike, pVertsWidth: number, pVertsHeight: number): SimplePlane;
    static simpleMesh(pTexture: string | Texture, pSheet: SpritesheetLike, pVertices?: Float32Array, pUvs?: Float32Array, pIndices?: Uint16Array, pDrawMode?: number): SimpleMesh;
    static nineSlice(pTexture: string | Texture, pSheet?: SpritesheetLike, leftWidth?: number, topHeight?: number, rightWidth?: number, bottomHeight?: number, alpha?: number, position?: PointLike): NineSlicePlane;
}
//# sourceMappingURL=Make.d.ts.map