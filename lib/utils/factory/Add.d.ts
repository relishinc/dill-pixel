import { Geometry, State } from '@pixi/core';
import { Container, DRAW_MODES, HTMLTextStyle, IBitmapTextStyle, ITextStyle, Mesh, Point, Shader, SimplePlane, Sprite, TextStyle, Texture } from 'pixi.js';
export declare class Add {
    private defaultContainer;
    constructor(defaultContainer: Container);
    existing<T>(pObject: T, position?: {
        x: number;
        y: number;
    } | [number, number?] | number, anchor?: {
        x: number;
        y: number;
    } | [number, number?] | number, scale?: {
        x: number;
        y: number;
    } | [number, number?] | number): T;
    coloredSprite(color?: number, size?: {
        x: number;
        y: number;
    } | [number, number?] | number, shape?: 'rectangle' | 'rounded_rectangle' | 'circle', alpha?: number, position?: {
        x: number;
        y: number;
    } | [number, number?] | number, anchor?: {
        x: number;
        y: number;
    } | [number, number?] | number, scale?: {
        x: number;
        y: number;
    } | [number, number?] | number, opts?: {
        [key: string]: string | number;
    }): Sprite;
    sprite(pAsset: string | Texture, pSheet?: string | undefined, alpha?: number, position?: {
        x: number;
        y: number;
    } | [number, number?] | number, anchor?: {
        x: number;
        y: number;
    } | [number, number?] | number, scale?: {
        x: number;
        y: number;
    } | [number, number?] | number): Sprite;
    tilingSprite(pAsset: string | Texture, pSheet?: string | undefined, alpha?: number, width?: number, height?: number, tilePosition?: Point, position?: {
        x: number;
        y: number;
    } | [number, number?] | number, anchor?: {
        x: number;
        y: number;
    } | [number, number?] | number, scale?: {
        x: number;
        y: number;
    } | [number, number?] | number): import("pixi.js").TilingSprite;
    static mesh(pGeometry: Geometry, pShader: Shader, pState?: State, pDrawMode?: DRAW_MODES, alpha?: number, position?: {
        x: number;
        y: number;
    } | [number, number?] | number, scale?: {
        x: number;
        y: number;
    } | [number, number?] | number): Mesh<Shader>;
    simpleRope(pAsset: string | Texture, pSheet?: string | undefined, pNumPoints?: number, pSegmentLength?: number, pAutoUpdate?: boolean, alpha?: number, position?: {
        x: number;
        y: number;
    } | [number, number?] | number, scale?: {
        x: number;
        y: number;
    } | [number, number?] | number): {
        rope: import("pixi.js").SimpleRope;
        points: Point[];
    };
    simplePlane(pAsset: string | Texture, pSheet: string | undefined, pVertsWidth: number, pVertsHeight: number, alpha?: number, position?: {
        x: number;
        y: number;
    } | [number, number?] | number, scale?: {
        x: number;
        y: number;
    } | [number, number?] | number): SimplePlane;
    text(pText?: string, pStyle?: Partial<ITextStyle> | TextStyle, alpha?: number, position?: {
        x: number;
        y: number;
    } | [number, number?] | number, anchor?: {
        x: number;
        y: number;
    } | [number, number?] | number, scale?: {
        x: number;
        y: number;
    } | [number, number?] | number): import("pixi.js").Text;
    htmlText(pText?: string, pStyle?: Partial<HTMLTextStyle | TextStyle | ITextStyle>, alpha?: number, position?: {
        x: number;
        y: number;
    } | [number, number?] | number, anchor?: {
        x: number;
        y: number;
    } | [number, number?] | number, scale?: {
        x: number;
        y: number;
    } | [number, number?] | number): import("pixi.js").HTMLText;
    bitmapText(pText: string, pStyle?: Partial<IBitmapTextStyle>, alpha?: number, position?: {
        x: number;
        y: number;
    } | [number, number?] | number, anchor?: {
        x: number;
        y: number;
    } | [number, number?] | number, scale?: {
        x: number;
        y: number;
    } | [number, number?] | number): import("pixi.js").BitmapText;
    container(alpha?: number, position?: {
        x: number;
        y: number;
    } | [number, number?] | number, scale?: {
        x: number;
        y: number;
    } | [number, number?] | number): import("../..").Container;
    graphics(alpha?: number, position?: {
        x: number;
        y: number;
    } | [number, number?] | number, scale?: {
        x: number;
        y: number;
    } | [number, number?] | number): import("pixi.js").Graphics;
    nineSlice(pAsset: string, pSheet?: string | undefined, leftWidth?: number, topHeight?: number, rightWidth?: number, bottomHeight?: number, alpha?: number, position?: {
        x: number;
        y: number;
    } | [number, number?] | number, scale?: {
        x: number;
        y: number;
    } | [number, number?] | number): import("pixi.js").NineSlicePlane;
}
//# sourceMappingURL=Add.d.ts.map