import { Geometry, State } from '@pixi/core';
import { Container as PIXIContainer } from '@pixi/display';
import {
  BitmapText,
  DisplayObject,
  DRAW_MODES,
  Graphics,
  HTMLText,
  HTMLTextStyle,
  IBitmapTextStyle,
  ITextStyle,
  Mesh,
  NineSlicePlane,
  Point,
  Shader,
  SimplePlane,
  SimpleRope,
  Sprite,
  Text,
  TextStyle,
  Texture,
  TilingSprite,
} from 'pixi.js';
import { Container, FlexContainer, FlexContainerSettings } from '../../gameobjects';
import { PointLike, SpritesheetLike } from '../index';
import {
  AnchorSettings,
  BitmapTextSettings,
  ColoredSpriteSettings,
  ContainerSettings,
  FlexContainerCreationSettings,
  GraphicsSettings,
  HTMLTextSettings,
  Make,
  MeshSettings,
  NineSliceSettings,
  PositionSettings,
  ScaleSettings,
  SimplePlaneSettings,
  SimpleRopeSettings,
  SpriteSettings,
  TextSettings,
  TilingSpriteSettings,
} from './Make';
import { resolvePointLike } from './utils';

export interface ExistingSettings extends PositionSettings, AnchorSettings, ScaleSettings {}

export class Add {
  constructor(private defaultContainer: PIXIContainer) {}

  existing<T>(pObject: T, settings: ExistingSettings): T;
  existing<T>(pObject: T, position?: PointLike, anchor?: PointLike, scale?: PointLike): T;
  existing<T>(pObject: T, settingsOrPosition?: ExistingSettings | PointLike, anchor?: PointLike, scale?: PointLike): T {
    let position: PointLike | undefined = settingsOrPosition as PointLike;
    if (
      settingsOrPosition &&
      typeof settingsOrPosition === 'object' &&
      ('position' in settingsOrPosition || 'anchor' in settingsOrPosition || 'scale' in settingsOrPosition)
    ) {
      const settings = settingsOrPosition as ExistingSettings;
      position = settings?.position;
      anchor = settings?.anchor;
      scale = settings?.scale;
    }
    const obj = this.defaultContainer.addChild(pObject as DisplayObject) as T;
    const dObj = obj as Sprite;

    if (position !== undefined) {
      const resolvedPosition = resolvePointLike(position);
      dObj?.position?.set(resolvedPosition.x, resolvedPosition.y);
    }
    if (anchor !== undefined) {
      const resolvedAnchor = resolvePointLike(anchor);
      dObj?.anchor?.set(resolvedAnchor.x, resolvedAnchor.y);
    }
    if (scale !== undefined) {
      const resolvedScale = resolvePointLike(scale);
      dObj?.scale?.set(resolvedScale.x, resolvedScale.y);
    }

    return obj;
  }

  coloredSprite(settings: ColoredSpriteSettings): Sprite;
  coloredSprite(
    color: number,
    size?: PointLike,
    shape?: 'rectangle' | 'rounded_rectangle' | 'circle',
    opts?: {
      [key: string]: any;
    },
    alpha?: number,
    position?: PointLike,
    anchor?: PointLike,
    scale?: PointLike,
  ): Sprite;
  coloredSprite(
    settingsOrColor: number | ColoredSpriteSettings = 0x0,
    size: PointLike = {
      x: 1,
      y: 1,
    },
    shape: 'rectangle' | 'rounded_rectangle' | 'circle' = 'rectangle',
    opts?: {
      [key: string]: any;
    },
    alpha?: number,
    position?: PointLike,
    anchor?: PointLike,
    scale?: PointLike,
  ): Sprite {
    let sprite: Sprite;
    if (typeof settingsOrColor === 'object') {
      sprite = Make.coloredSprite(settingsOrColor);
    } else {
      sprite = Make.coloredSprite(settingsOrColor, size, shape, opts, alpha, position, anchor, scale);
    }

    return this.defaultContainer.addChild(sprite);
  }

  sprite(settings: SpriteSettings): Sprite;
  sprite(
    pTexture: string | Texture,
    pSheet?: SpritesheetLike,
    alpha?: number,
    position?: PointLike,
    anchor?: PointLike,
    scale?: PointLike,
  ): Sprite;
  sprite(
    settingsOrAsset: string | Texture | SpriteSettings,
    sheet?: SpritesheetLike,
    alpha?: number,
    position?: PointLike,
    anchor?: PointLike,
    scale?: PointLike,
  ): Sprite {
    const sprite =
      settingsOrAsset instanceof Texture || typeof settingsOrAsset === 'string'
        ? Make.sprite(settingsOrAsset, sheet, alpha, position, anchor, scale)
        : Make.sprite(settingsOrAsset);

    return this.defaultContainer.addChild(sprite);
  }

  tilingSprite(settings: TilingSpriteSettings): TilingSprite;
  tilingSprite(
    asset: string | Texture,
    sheet: SpritesheetLike,
    width: number,
    height: number,
    tilePosition?: PointLike,
    alpha?: number,
    position?: PointLike,
    anchor?: PointLike,
    scale?: PointLike,
  ): TilingSprite;
  tilingSprite(
    settingsOrAsset: string | Texture | TilingSpriteSettings,
    sheet?: SpritesheetLike,
    width: number = 1,
    height: number = 1,
    tilePosition: PointLike = 0,
    alpha?: number,
    position?: PointLike,
    anchor?: PointLike,
    scale?: PointLike,
  ): TilingSprite {
    const sprite =
      typeof settingsOrAsset === 'string' || settingsOrAsset instanceof Texture
        ? Make.tilingSprite(settingsOrAsset, sheet, width, height, tilePosition, alpha, position, anchor, scale)
        : Make.tilingSprite(settingsOrAsset);

    return this.defaultContainer.addChild(sprite);
  }

  text(
    value?: string,
    style?: Partial<ITextStyle | TextStyle>,
    alpha?: number,
    position?: PointLike,
    anchor?: PointLike,
    scale?: PointLike,
  ): Text;
  text(settings: TextSettings): Text;
  text(
    settingsOrValue: string | TextSettings = '',
    style?: Partial<ITextStyle | TextStyle>,
    alpha?: number,
    position?: PointLike,
    anchor?: PointLike,
    scale?: PointLike,
  ): Text {
    const text =
      typeof settingsOrValue === 'object'
        ? Make.text(settingsOrValue)
        : Make.text(settingsOrValue, style, alpha, position, anchor, scale);
    return this.defaultContainer.addChild(text);
  }

  htmlText(settings?: HTMLTextSettings): HTMLText;
  htmlText(
    value?: string,
    style?: Partial<HTMLTextStyle | TextStyle | ITextStyle>,
    alpha?: number,
    position?: PointLike,
    anchor?: PointLike,
    scale?: PointLike,
  ): HTMLText;
  htmlText(
    settingsOrValue: string | HTMLTextSettings = '',
    style?: Partial<HTMLTextStyle | TextStyle | ITextStyle>,
    alpha?: number,
    position?: PointLike,
    anchor?: PointLike,
    scale?: PointLike,
  ): HTMLText {
    const text =
      typeof settingsOrValue === 'string'
        ? Make.htmlText(settingsOrValue, style, alpha, position, anchor, scale)
        : Make.htmlText(settingsOrValue);
    return this.defaultContainer.addChild(text);
  }

  // Add BitmapText
  bitmapText(settings?: BitmapTextSettings): BitmapText;
  bitmapText(
    value?: string,
    style?: Partial<IBitmapTextStyle>,
    alpha?: number,
    position?: PointLike,
    anchor?: PointLike,
    scale?: PointLike,
  ): BitmapText;
  bitmapText(
    settingsOrValue: string | BitmapTextSettings = '',
    style?: Partial<IBitmapTextStyle>,
    alpha?: number,
    position?: PointLike,
    anchor?: PointLike,
    scale?: PointLike,
  ): BitmapText {
    const bitmapText =
      typeof settingsOrValue === 'string'
        ? Make.bitmapText(settingsOrValue, style, alpha, position, anchor, scale)
        : Make.bitmapText(settingsOrValue);
    return this.defaultContainer.addChild(bitmapText);
  }

  // Add Container
  container(settings?: ContainerSettings): Container;
  container(alpha?: number, position?: PointLike, scale?: PointLike): Container;
  container(settingsOrAlpha?: number | ContainerSettings, position?: PointLike, scale?: PointLike): Container {
    let container: Container;
    if (typeof settingsOrAlpha === 'object') {
      container = Make.container(settingsOrAlpha);
    } else {
      container = Make.container(settingsOrAlpha, position, scale);
    }
    return this.defaultContainer.addChild(container);
  }

  // Add FlexContainer
  flexContainer(settings: Partial<FlexContainerCreationSettings>): FlexContainer;
  flexContainer(
    alpha?: number,
    position?: PointLike,
    settings?: Partial<FlexContainerSettings>,
    scale?: PointLike,
  ): FlexContainer;
  flexContainer(
    settingsOrAlpha?: Partial<FlexContainerCreationSettings> | number,
    position?: PointLike,
    settings: Partial<FlexContainerSettings> = {},
    scale?: PointLike,
  ): FlexContainer {
    const container =
      typeof settingsOrAlpha === 'object'
        ? Make.flexContainer(settingsOrAlpha)
        : Make.flexContainer(settingsOrAlpha, position, settings, scale);

    return this.defaultContainer.addChild(container);
  }

  // Add Graphics
  graphics(settings: GraphicsSettings): Graphics;
  graphics(alpha?: number, position?: PointLike, scale?: PointLike): Graphics;
  graphics(settingsOrAlpha?: GraphicsSettings | number, position?: PointLike, scale?: PointLike): Graphics {
    const graphics =
      typeof settingsOrAlpha === 'object'
        ? Make.graphics(settingsOrAlpha)
        : Make.graphics(settingsOrAlpha, position, scale);

    return this.defaultContainer.addChild(graphics);
  }

  nineSlice(settings: NineSliceSettings): NineSlicePlane;
  nineSlice(
    asset: string | Texture,
    sheet?: SpritesheetLike,
    leftWidth?: number,
    topHeight?: number,
    rightWidth?: number,
    bottomHeight?: number,
    alpha?: number,
    position?: PointLike,
    scale?: PointLike,
  ): NineSlicePlane;
  nineSlice(
    settingsOrAsset?: string | Texture | NineSliceSettings,
    sheet?: SpritesheetLike,
    leftWidth?: number,
    topHeight?: number,
    rightWidth?: number,
    bottomHeight?: number,
    alpha?: number,
    position?: PointLike,
    scale?: PointLike,
  ): NineSlicePlane {
    const ns =
      typeof settingsOrAsset === 'string' || settingsOrAsset instanceof Texture
        ? Make.nineSlice(settingsOrAsset, sheet, leftWidth, topHeight, rightWidth, bottomHeight, alpha, position, scale)
        : Make.nineSlice(settingsOrAsset as NineSliceSettings);
    return this.defaultContainer.addChild(ns);
  }

  // @ts-ignore
  mesh(settings: MeshSettings): Mesh<Shader>;
  mesh(geometry: Geometry, shader: Shader, state?: State, drawMode?: DRAW_MODES): Mesh<Shader>;
  mesh(
    settingsOrGeometry: MeshSettings | Geometry,
    shader: Shader,
    state: State = State.for2d(),
    drawMode: DRAW_MODES = DRAW_MODES.LINE_LOOP,
  ): Mesh<Shader> {
    const mesh =
      settingsOrGeometry instanceof Geometry
        ? Make.mesh(settingsOrGeometry, shader, state, drawMode)
        : Make.mesh(settingsOrGeometry);
    return this.defaultContainer.addChild(mesh);
  }

  simpleRope(settings: SimpleRopeSettings): { rope: SimpleRope; points: Point[] };
  simpleRope(
    asset: string | Texture,
    sheet?: SpritesheetLike,
    numPoints?: number,
    segmentLength?: number,
    autoUpdate?: boolean,
    alpha?: number,
    position?: PointLike,
    scale?: PointLike,
  ): { rope: SimpleRope; points: Point[] };
  simpleRope(
    settingsOrAsset?: string | Texture | SimpleRopeSettings,
    sheet?: SpritesheetLike,
    numPoints: number = 25,
    segmentLength: number = 50,
    autoUpdate?: boolean,
    alpha?: number,
    position?: PointLike,
    scale?: PointLike,
  ): { rope: SimpleRope; points: Point[] } {
    const sr =
      typeof settingsOrAsset === 'string' || settingsOrAsset instanceof Texture
        ? Make.simpleRope(settingsOrAsset, sheet, numPoints, segmentLength, autoUpdate, alpha, position, scale)
        : Make.simpleRope(settingsOrAsset as SimpleRopeSettings);
    this.defaultContainer.addChild(sr.rope);
    return sr;
  }

  simplePlane(settings: SimplePlaneSettings): SimplePlane;
  simplePlane(
    asset?: string | Texture,
    sheet?: SpritesheetLike,
    vertsWidth?: number,
    vertsHeight?: number,
    alpha?: number,
    position?: PointLike,
    scale?: PointLike,
  ): SimplePlane;
  simplePlane(
    settingsOrAsset?: string | Texture | SimplePlaneSettings,
    sheet?: SpritesheetLike,
    vertsWidth: number = 1,
    vertsHeight: number = 1,
    alpha?: number,
    position?: PointLike,
    scale?: PointLike,
  ): SimplePlane {
    const sp =
      typeof settingsOrAsset === 'string' || settingsOrAsset instanceof Texture
        ? Make.simplePlane(settingsOrAsset, sheet, vertsWidth, vertsHeight, alpha, position, scale)
        : Make.simplePlane(settingsOrAsset as SimplePlaneSettings);
    this.defaultContainer.addChild(sp);
    return sp;
  }
}
