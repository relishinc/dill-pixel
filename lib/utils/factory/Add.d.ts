import { Geometry, State } from '@pixi/core';
import { BitmapText, DRAW_MODES, Graphics, HTMLText, HTMLTextStyle, IBitmapTextStyle, ITextStyle, Mesh, NineSlicePlane, Point, Shader, SimplePlane, SimpleRope, Text, TextStyle, Texture, TilingSprite } from 'pixi.js';
import { AnimatedSprite, Container, Sprite } from '../../gameobjects';
import { Spine } from '../../global';
import { PIXIContainer } from '../../pixi';
import { SpineSettings } from '../../spine/Make';
import { FlexContainer, FlexContainerSettings, UICanvas } from '../../ui';
import { PointLike, SpritesheetLike } from '../index';
import { AnchorSettings, AnimatedSpriteSettings, BitmapTextSettings, ColoredSpriteSettings, ContainerSettings, FlexContainerCreationSettings, GraphicsSettings, HTMLTextSettings, MeshSettings, NineSliceSettings, PositionSettings, ScaleSettings, SimplePlaneSettings, SimpleRopeSettings, SpriteSettings, TextSettings, TilingSpriteSettings, UICanvasMakeSettings } from './Make';
export interface ExistingSettings extends PositionSettings, AnchorSettings, ScaleSettings {
}
export declare class Add {
    private defaultContainer;
    constructor(defaultContainer: PIXIContainer);
    existing<T>(pObject: T, settings: ExistingSettings): T;
    existing<T>(pObject: T, position?: PointLike, anchor?: PointLike, scale?: PointLike): T;
    coloredSprite(settings: ColoredSpriteSettings): Sprite;
    coloredSprite(color: number, size?: PointLike, shape?: 'rectangle' | 'rounded_rectangle' | 'circle', opts?: {
        [key: string]: any;
    }, alpha?: number, position?: PointLike, anchor?: PointLike, scale?: PointLike): Sprite;
    sprite(settings: SpriteSettings): Sprite;
    sprite(pTexture: string | Texture, pSheet?: SpritesheetLike, alpha?: number, position?: PointLike, anchor?: PointLike, scale?: PointLike): Sprite;
    tilingSprite(settings: TilingSpriteSettings): TilingSprite;
    tilingSprite(asset: string | Texture, sheet: SpritesheetLike, width: number, height: number, tilePosition?: PointLike, alpha?: number, position?: PointLike, anchor?: PointLike, scale?: PointLike): TilingSprite;
    text(value?: string, style?: Partial<ITextStyle | TextStyle>, alpha?: number, position?: PointLike, anchor?: PointLike, scale?: PointLike): Text;
    text(settings: TextSettings): Text;
    htmlText(settings?: HTMLTextSettings): HTMLText;
    htmlText(value?: string, style?: Partial<HTMLTextStyle | TextStyle | ITextStyle>, alpha?: number, position?: PointLike, anchor?: PointLike, scale?: PointLike): HTMLText;
    bitmapText(settings?: BitmapTextSettings): BitmapText;
    bitmapText(value?: string, style?: Partial<IBitmapTextStyle>, alpha?: number, position?: PointLike, anchor?: PointLike, scale?: PointLike): BitmapText;
    container(settings?: ContainerSettings): Container;
    container(alpha?: number, position?: PointLike, scale?: PointLike): Container;
    flexContainer(settings: Partial<FlexContainerCreationSettings>): FlexContainer;
    flexContainer(alpha?: number, position?: PointLike, settings?: Partial<FlexContainerSettings>, scale?: PointLike): FlexContainer;
    graphics(settings: GraphicsSettings): Graphics;
    graphics(alpha?: number, position?: PointLike, scale?: PointLike): Graphics;
    nineSlice(settings: NineSliceSettings): NineSlicePlane;
    nineSlice(asset: string | Texture, sheet?: SpritesheetLike, leftWidth?: number, topHeight?: number, rightWidth?: number, bottomHeight?: number, alpha?: number, position?: PointLike, scale?: PointLike): NineSlicePlane;
    mesh(settings: MeshSettings): Mesh<Shader>;
    mesh(geometry: Geometry, shader: Shader, state?: State, drawMode?: DRAW_MODES): Mesh<Shader>;
    simpleRope(settings: SimpleRopeSettings): {
        rope: SimpleRope;
        points: Point[];
    };
    simpleRope(asset: string | Texture, sheet?: SpritesheetLike, numPoints?: number, segmentLength?: number, autoUpdate?: boolean, alpha?: number, position?: PointLike, scale?: PointLike): {
        rope: SimpleRope;
        points: Point[];
    };
    simplePlane(settings: SimplePlaneSettings): SimplePlane;
    simplePlane(asset?: string | Texture, sheet?: SpritesheetLike, vertsWidth?: number, vertsHeight?: number, alpha?: number, position?: PointLike, scale?: PointLike): SimplePlane;
    animatedSprite(settings: AnimatedSpriteSettings): AnimatedSprite;
    spine(settings: SpineSettings): Spine;
    uiCanvas(settings: UICanvasMakeSettings): UICanvas;
}
//# sourceMappingURL=Add.d.ts.map