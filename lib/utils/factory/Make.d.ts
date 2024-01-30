import { Geometry, State } from '@pixi/core';
import { BitmapText, DRAW_MODES, Graphics, HTMLText, HTMLTextStyle, IBitmapTextStyle, ITextStyle, Mesh, NineSlicePlane, Point, Shader, SimpleMesh, SimplePlane, SimpleRope, Text, TextStyle, Texture, TilingSprite } from 'pixi.js';
import { AnimatedSprite, Container, Sprite, SpriteAnimation } from '../../gameobjects';
import { SpriteAnimationProps } from '../../gameobjects/animation';
import { Spine } from '../../global';
import { SpineSettings } from '../../spine/Make';
import { FlexContainer, FlexContainerSettings, UICanvas, UICanvasProps } from '../../ui';
import { PointLike, SpritesheetLike } from '../Types';
/**
 * Gets a `PIXI.Texture` asset.
 * @param pAsset The name of the texture to get.
 * @param pSheet (optional) The spritesheet(s) that the texture is in. You can leave this out unless you have two textures with the same name in different spritesheets
 */
export interface TextureSettings {
    asset: string;
    sheet?: SpritesheetLike;
}
export interface SpriteTextureSettings {
    asset?: string | Texture;
    sheet?: SpritesheetLike;
}
export interface PositionSettings {
    position?: PointLike;
}
export interface VisibilitySettings {
    alpha?: number;
    visible?: boolean;
}
export interface AnchorSettings {
    anchor?: PointLike;
}
export interface ScaleSettings {
    scale?: PointLike;
}
export interface SpriteSettings extends SpriteTextureSettings, PositionSettings, AnchorSettings, VisibilitySettings, ScaleSettings {
}
export interface ContainerSettings extends PositionSettings, VisibilitySettings, ScaleSettings {
}
export interface ColoredSpriteSettings extends PositionSettings, AnchorSettings, VisibilitySettings, ScaleSettings {
    color?: number;
    size?: PointLike;
    shape?: 'rectangle' | 'rounded_rectangle' | 'circle';
    [key: string]: any;
}
export interface TextSettings extends PositionSettings, AnchorSettings, VisibilitySettings, ScaleSettings {
    value?: string;
    style?: Partial<ITextStyle | TextStyle>;
}
export interface HTMLTextSettings extends PositionSettings, AnchorSettings, VisibilitySettings, ScaleSettings {
    value?: string;
    style?: Partial<HTMLTextStyle | TextStyle | ITextStyle>;
}
export interface BitmapTextSettings extends PositionSettings, AnchorSettings, VisibilitySettings, ScaleSettings {
    value?: string;
    style?: Partial<IBitmapTextStyle>;
}
export interface FlexContainerCreationSettings extends FlexContainerSettings, ContainerSettings {
}
export interface GraphicsSettings extends PositionSettings, VisibilitySettings, ScaleSettings {
}
export interface TilingSpriteSettings extends SpriteTextureSettings, PositionSettings, VisibilitySettings, ScaleSettings, AnchorSettings {
    tilePosition?: PointLike;
    width?: number;
    height?: number;
}
export interface MeshSettings {
    geometry: Geometry;
    shader: Shader;
    state?: State;
    drawMode?: DRAW_MODES;
}
export interface SimpleRopeSettings extends SpriteTextureSettings, PositionSettings, VisibilitySettings, ScaleSettings {
    numPoints?: number;
    segmentLength?: number;
    autoUpdate?: boolean;
}
export interface SimplePlaneSettings extends SpriteTextureSettings, PositionSettings, VisibilitySettings, ScaleSettings {
    vertsWidth?: number;
    vertsHeight?: number;
}
export interface SimpleMeshSettings extends SpriteTextureSettings, PositionSettings, VisibilitySettings, ScaleSettings {
    vertices?: Float32Array;
    uvs?: Float32Array;
    indices?: Uint16Array;
    drawMode?: number;
}
export interface NineSliceSettings extends SpriteTextureSettings, PositionSettings, VisibilitySettings, ScaleSettings {
    leftWidth?: number;
    topHeight?: number;
    rightWidth?: number;
    bottomHeight?: number;
}
export interface AnimatedSpriteSettings extends VisibilitySettings, PositionSettings, ScaleSettings {
    animations: {
        key: string;
        props: SpriteAnimationProps;
    }[];
}
export interface UICanvasMakeSettings extends VisibilitySettings, PositionSettings, Partial<UICanvasProps> {
}
export declare class Make {
    static spine: (settings: SpineSettings) => Spine;
    static texture(settings: TextureSettings): Texture;
    static texture(asset: string, sheet?: SpritesheetLike): Texture;
    static coloredSprite(settings: ColoredSpriteSettings): Sprite;
    static coloredSprite(color?: number, size?: PointLike, shape?: 'rectangle' | 'rounded_rectangle' | 'circle', opts?: {
        [key: string]: any;
    }, alpha?: number, position?: PointLike, anchor?: PointLike, scale?: PointLike): Sprite;
    static sprite(settings: SpriteSettings): Sprite;
    static sprite(asset: string | Texture, sheet?: SpritesheetLike, alpha?: number, position?: PointLike, anchor?: PointLike, scale?: PointLike): Sprite;
    static text(value?: string, style?: Partial<ITextStyle | TextStyle>, alpha?: number, position?: PointLike, anchor?: PointLike, scale?: PointLike): Text;
    static text(settings: TextSettings): Text;
    static htmlText(settings?: HTMLTextSettings): HTMLText;
    static htmlText(value?: string, style?: Partial<HTMLTextStyle | TextStyle | ITextStyle>, alpha?: number, position?: PointLike, anchor?: PointLike, scale?: PointLike): HTMLText;
    static bitmapText(settings?: BitmapTextSettings): BitmapText;
    static bitmapText(value?: string, style?: Partial<IBitmapTextStyle>, alpha?: number, position?: PointLike, anchor?: PointLike, scale?: PointLike): BitmapText;
    static container(settings?: ContainerSettings): Container;
    static container(alpha?: number, position?: PointLike, scale?: PointLike): Container;
    static flexContainer(settings: Partial<FlexContainerCreationSettings>): FlexContainer;
    static flexContainer(alpha?: number, position?: PointLike, settings?: Partial<FlexContainerSettings>, scale?: PointLike): FlexContainer;
    static graphics(settings: GraphicsSettings): Graphics;
    static graphics(alpha?: number, position?: PointLike, scale?: PointLike): Graphics;
    static tilingSprite(settings: TilingSpriteSettings): TilingSprite;
    static tilingSprite(asset: string | Texture, sheet: SpritesheetLike, width: number, height: number, tilePosition?: PointLike, alpha?: number, position?: PointLike, anchor?: PointLike, scale?: PointLike): TilingSprite;
    static mesh(settings: MeshSettings): Mesh<Shader>;
    static mesh(geometry: Geometry, shader: Shader, state?: State, drawMode?: DRAW_MODES): Mesh<Shader>;
    static simpleRope(settings: SimpleRopeSettings): {
        rope: SimpleRope;
        points: Point[];
    };
    static simpleRope(asset: string | Texture, sheet?: SpritesheetLike, numPoints?: number, segmentLength?: number, autoUpdate?: boolean, alpha?: number, position?: PointLike, scale?: PointLike): {
        rope: SimpleRope;
        points: Point[];
    };
    static simplePlane(settings: SimplePlaneSettings): SimplePlane;
    static simplePlane(asset?: string | Texture, sheet?: SpritesheetLike, vertsWidth?: number, vertsHeight?: number, alpha?: number, position?: PointLike, scale?: PointLike): SimplePlane;
    static simpleMesh(settings: SimpleMeshSettings): SimpleMesh;
    static simpleMesh(asset: string | Texture, sheet: SpritesheetLike, vertices?: Float32Array, uvs?: Float32Array, indices?: Uint16Array, drawMode?: number, alpha?: number, position?: PointLike, scale?: PointLike): SimpleMesh;
    static nineSlice(settings: NineSliceSettings): NineSlicePlane;
    static nineSlice(asset: string | Texture, sheet?: SpritesheetLike, leftWidth?: number, topHeight?: number, rightWidth?: number, bottomHeight?: number, alpha?: number, position?: PointLike, scale?: PointLike): NineSlicePlane;
    static spriteAnimation(props: SpriteAnimationProps): SpriteAnimation;
    static animatedSprite(settings: AnimatedSpriteSettings): AnimatedSprite;
    static uiCanvas(settings: UICanvasMakeSettings): UICanvas;
}
//# sourceMappingURL=Make.d.ts.map