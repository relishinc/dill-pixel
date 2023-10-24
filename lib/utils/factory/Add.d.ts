import { Geometry, State } from '@pixi/core';
import { Container, DRAW_MODES, HTMLTextStyle, IBitmapTextStyle, ITextStyle, Mesh, Point, Shader, SimplePlane, Sprite, TextStyle, Texture } from 'pixi.js';
import { FlexContainerSettings } from '../../gameobjects';
import { PointLike } from '../Types';
export declare class Add {
    private defaultContainer;
    constructor(defaultContainer: Container);
    existing<T>(pObject: T, position?: PointLike, anchor?: PointLike, scale?: PointLike): T;
    coloredSprite(color?: number, size?: PointLike, shape?: 'rectangle' | 'rounded_rectangle' | 'circle', alpha?: number, position?: PointLike, anchor?: PointLike, scale?: PointLike, opts?: {
        [key: string]: string | number;
    }): Sprite;
    sprite(pAsset: string | Texture, pSheet?: string | undefined, alpha?: number, position?: PointLike, anchor?: PointLike, scale?: PointLike): Sprite;
    tilingSprite(pAsset: string | Texture, pSheet?: string | undefined, alpha?: number, width?: number, height?: number, tilePosition?: Point, position?: PointLike, anchor?: PointLike, scale?: PointLike): import("pixi.js").TilingSprite;
    static mesh(pGeometry: Geometry, pShader: Shader, pState?: State, pDrawMode?: DRAW_MODES, alpha?: number, position?: PointLike, scale?: PointLike): Mesh<Shader>;
    simpleRope(pAsset: string | Texture, pSheet?: string | undefined, pNumPoints?: number, pSegmentLength?: number, pAutoUpdate?: boolean, alpha?: number, position?: PointLike, scale?: PointLike): {
        rope: import("pixi.js").SimpleRope;
        points: Point[];
    };
    simplePlane(pAsset: string | Texture, pSheet: string | undefined, pVertsWidth: number, pVertsHeight: number, alpha?: number, position?: PointLike, scale?: PointLike): SimplePlane;
    text(pText?: string, pStyle?: Partial<ITextStyle> | TextStyle, alpha?: number, position?: PointLike, anchor?: PointLike, scale?: PointLike): import("pixi.js").Text;
    htmlText(pText?: string, pStyle?: Partial<HTMLTextStyle | TextStyle | ITextStyle>, alpha?: number, position?: PointLike, anchor?: PointLike, scale?: PointLike): import("pixi.js").HTMLText;
    bitmapText(pText: string, pStyle?: Partial<IBitmapTextStyle>, alpha?: number, position?: PointLike, anchor?: PointLike, scale?: PointLike): import("pixi.js").BitmapText;
    container(alpha?: number, position?: PointLike, scale?: PointLike): import("../../gameobjects").Container;
    flexContainer(alpha?: number, position?: PointLike, settings?: Partial<FlexContainerSettings>): import("../../gameobjects").FlexContainer;
    graphics(alpha?: number, position?: PointLike, scale?: PointLike): import("pixi.js").Graphics;
    nineSlice(pAsset: string, pSheet?: string | undefined, leftWidth?: number, topHeight?: number, rightWidth?: number, bottomHeight?: number, alpha?: number, position?: PointLike, scale?: PointLike): import("pixi.js").NineSlicePlane;
}
//# sourceMappingURL=Add.d.ts.map