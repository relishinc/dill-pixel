import {Geometry, State} from '@pixi/core';
import {
  Assets,
  BitmapText,
  DRAW_MODES,
  Graphics,
  HTMLText,
  HTMLTextStyle,
  IBitmapTextStyle,
  ITextStyle,
  Mesh,
  NineSlicePlane,
  Point,
  Resource,
  Shader,
  SimpleMesh,
  SimplePlane,
  SimpleRope,
  Sprite,
  Spritesheet,
  Text,
  TextStyle,
  Texture,
  TilingSprite
} from 'pixi.js';
import {Application} from '../../core';
import {Container, FlexContainer, FlexContainerSettings} from '../../gameobjects';
import {PointLike, SpritesheetLike} from '../Types';
import {resolvePointLike, setObjectName} from './utils';

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

export interface SpriteSettings
  extends SpriteTextureSettings,
    PositionSettings,
    AnchorSettings,
    VisibilitySettings,
    ScaleSettings {}

export interface ContainerSettings extends PositionSettings, VisibilitySettings, ScaleSettings {}

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

export interface FlexContainerCreationSettings extends FlexContainerSettings, ContainerSettings {}

export interface GraphicsSettings extends PositionSettings, VisibilitySettings, ScaleSettings {}

export interface TilingSpriteSettings
  extends SpriteTextureSettings,
    PositionSettings,
    VisibilitySettings,
    ScaleSettings,
    AnchorSettings {
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

export interface SimplePlaneSettings
  extends SpriteTextureSettings,
    PositionSettings,
    VisibilitySettings,
    ScaleSettings {
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

export class Make {
  static texture(settings: TextureSettings): Texture;
  static texture(asset: string, sheet?: SpritesheetLike): Texture;
  static texture(asset: string | TextureSettings, sheet?: SpritesheetLike): Texture {
    // tslint:disable-next-line:no-shadowed-variable
    let texture: Texture<Resource> | undefined;
    if (typeof asset === 'object') {
      const settings = asset as TextureSettings;
      asset = settings.asset;
      sheet = settings?.sheet;
    }
    if (!sheet || sheet?.length === 0) {
      if (Assets.cache.has(asset)) {
        texture = Assets.get(asset)!;
      } else if (Assets.get(asset)) {
        texture = Assets.get(asset).texture!;
      } else {
        throw new Error('Asset "' + asset + '" not loaded into Pixi cache');
      }
    } else {
      if (!Assets.get(sheet)) {
        throw new Error('Spritesheet "' + sheet + '" not loaded into Pixi cache');
      } else {
        const spriteSheet: Spritesheet = Assets.get(sheet) as Spritesheet;
        const textures = spriteSheet.textures;
        if (textures !== undefined) {
          // eslint-disable-next-line no-prototype-builtins
          if (textures.hasOwnProperty(asset)) {
            texture = textures[asset];
          } else if (spriteSheet.linkedSheets !== undefined && spriteSheet.linkedSheets.length > 0) {
            for (const linkedSheet of spriteSheet.linkedSheets) {
              // eslint-disable-next-line no-prototype-builtins
              if (linkedSheet.textures !== undefined && linkedSheet.textures.hasOwnProperty(asset)) {
                texture = linkedSheet.textures[asset];
                break;
              }
            }
            if (texture === undefined) {
              throw new Error(
                'Asset "' + asset + '" not found inside spritesheet "' + asset + "' or any of its linked sheets",
              );
            }
          } else {
            throw new Error('Asset "' + asset + '" not found inside spritesheet "' + sheet + "'");
          }
        } else {
          throw new Error('Spritesheet "' + sheet + '" loaded but textures arent?!');
        }
      }
    }
    return texture || new Sprite().texture;
  }

  static coloredSprite(settings: ColoredSpriteSettings): Sprite;
  static coloredSprite(
    color?: number,
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
  static coloredSprite(
    settingsOrColor: number | ColoredSpriteSettings = 0x0,
    size: PointLike = {
      x: 1,
      y: 1,
    },
    shape: 'rectangle' | 'rounded_rectangle' | 'circle' = 'rectangle',
    opts?: {
      [key: string]: any;
    },
    alpha: number = 1,
    position: PointLike = [0, 0],
    anchor: PointLike = [0.5, 0.5],
    scale: PointLike = [1, 1],
  ): Sprite {
    let color: number = settingsOrColor as number;
    const visible = true;
    let settings: ColoredSpriteSettings = {};
    if (typeof settingsOrColor === 'object') {
      settings = settingsOrColor as ColoredSpriteSettings;
      const {
        color: settingsColor = 0x0,
        size: settingsSize = 1,
        shape: settingsShape = 'rectangle',
        ...settingsOpts
      } = settings;
      color = settingsColor as number;
      size = settingsSize as PointLike;
      shape = settingsShape as 'rectangle' | 'rounded_rectangle' | 'circle';
      opts = settingsOpts;
    } else {
      settings.alpha = alpha;
      settings.visible = visible;
      settings.position = position;
      settings.anchor = anchor;
      settings.scale = scale;
    }
    const gfx = new Graphics();
    const resolvedSize = resolvePointLike(size);
    gfx.lineStyle({ width: 0, color: 0, alpha: 0 });
    gfx.beginFill(color, 1);
    switch (shape) {
      case 'circle':
        gfx.drawCircle(0, 0, resolvedSize.x);
        break;
      case 'rounded_rectangle':
        gfx.drawRoundedRect(0, 0, resolvedSize.x, resolvedSize.y, (opts?.radius as number) || 5);
        break;
      case 'rectangle':
      default:
        gfx.drawRect(0, 0, resolvedSize.x, resolvedSize.y);
        break;
    }

    gfx.endFill();
    const texture = Application.instance.renderer.generateTexture(gfx);
    const spriteSettings: SpriteSettings = {
      asset: texture,
      visible,
      ...settings,
    };
    return Make.sprite(spriteSettings);
  }

  static sprite(settings: SpriteSettings): Sprite;
  static sprite(
    asset: string | Texture,
    sheet?: SpritesheetLike,
    alpha?: number,
    position?: PointLike,
    anchor?: PointLike,
    scale?: PointLike,
  ): Sprite;
  static sprite(
    settingsOrAsset: string | Texture | SpriteSettings,
    sheet?: SpritesheetLike,
    alpha?: number,
    position?: PointLike,
    anchor?: PointLike,
    scale?: PointLike,
  ): Sprite {
    let visible = true;
    let sprite: Sprite;
    let asset: string | Texture | undefined = settingsOrAsset as string | Texture;

    if (typeof settingsOrAsset === 'object' && !(settingsOrAsset instanceof Texture)) {
      const settings = settingsOrAsset as SpriteSettings;
      asset = settings?.asset;
      sheet = settings?.sheet;
      alpha = settings?.alpha ?? 1;
      visible = settings?.visible ?? true;
      position = settings?.position ?? 0;
      anchor = settings?.anchor ?? 0.5;
      scale = settings?.scale ?? 1;
    }

    if (!asset) {
      sprite = new Sprite();
    } else {
      sprite = new Sprite(typeof asset === 'string' ? this.texture(asset as string, sheet) : (asset as Texture));
      setObjectName(sprite, asset, sheet);
    }

    if (alpha !== undefined) {
      sprite.alpha = alpha;
    }
    if (position !== undefined) {
      const resolvedPosition = resolvePointLike(position);
      sprite.position.set(resolvedPosition.x, resolvedPosition.y);
    }
    if (anchor !== undefined) {
      const resolvedAnchor = resolvePointLike(anchor);
      sprite.anchor.set(resolvedAnchor.x, resolvedAnchor.y);
    }
    if (scale !== undefined) {
      const resolvedScale = resolvePointLike(scale);
      sprite.scale.set(resolvedScale.x, resolvedScale.y);
    }
    sprite.visible = visible;
    return sprite;
  }

  static text(
    value?: string,
    style?: Partial<ITextStyle | TextStyle>,
    alpha?: number,
    position?: PointLike,
    anchor?: PointLike,
    scale?: PointLike,
  ): Text;
  static text(settings: TextSettings): Text;
  static text(
    settingsOrValue: string | TextSettings = '',
    style?: Partial<ITextStyle | TextStyle>,
    alpha: number = 1,
    position: PointLike = 0,
    anchor: PointLike = 0,
    scale: PointLike = 1,
  ): Text {
    let value: string = settingsOrValue as string;
    let visible = true;
    if (typeof settingsOrValue === 'object') {
      const settings = settingsOrValue as TextSettings;
      value = settings?.value ?? '';
      style = settings?.style ?? {};
      alpha = settings?.alpha ?? 1;
      position = settings?.position ?? 0;
      anchor = settings?.anchor ?? 0;
      scale = settings?.scale ?? 1;
      visible = settings?.visible !== false;
    }

    const text = new Text(value, style);
    if (alpha !== undefined) {
      text.alpha = alpha;
    }
    if (position !== undefined) {
      const resolvedPosition = resolvePointLike(position);
      text.position.set(resolvedPosition.x, resolvedPosition.y);
    }
    if (anchor !== undefined) {
      const resolvedAnchor = resolvePointLike(anchor);
      text.anchor.set(resolvedAnchor.x, resolvedAnchor.y);
    }
    if (scale !== undefined) {
      const resolvedScale = resolvePointLike(scale);
      text.scale.set(resolvedScale.x, resolvedScale.y);
    }
    text.visible = visible;
    return text;
  }

  static htmlText(settings?: HTMLTextSettings): HTMLText;
  static htmlText(
    value?: string,
    style?: Partial<HTMLTextStyle | TextStyle | ITextStyle>,
    alpha?: number,
    position?: PointLike,
    anchor?: PointLike,
    scale?: PointLike,
  ): HTMLText;
  static htmlText(
    settingsOrValue: string | HTMLTextSettings = '',
    style?: Partial<HTMLTextStyle | TextStyle | ITextStyle>,
    alpha: number = 1,
    position: PointLike = 0,
    anchor: PointLike = 0,
    scale: PointLike = 1,
  ): HTMLText {
    let value: string = settingsOrValue as string;
    let visible = true;
    if (typeof settingsOrValue === 'object') {
      const settings = settingsOrValue as TextSettings;
      value = settings?.value ?? '';
      style = settings?.style ?? {};
      alpha = settings?.alpha ?? 1;
      position = settings?.position ?? 0;
      anchor = settings?.anchor ?? 0;
      scale = settings?.scale ?? 1;
      visible = settings?.visible !== false;
    }
    const text = new HTMLText(value, style);
    if (alpha !== undefined) {
      text.alpha = alpha;
    }
    if (position !== undefined) {
      const resolvedPosition = resolvePointLike(position);
      text.position.set(resolvedPosition.x, resolvedPosition.y);
    }
    if (anchor !== undefined) {
      const resolvedAnchor = resolvePointLike(anchor);
      text.anchor.set(resolvedAnchor.x, resolvedAnchor.y);
    }
    if (scale !== undefined) {
      const resolvedScale = resolvePointLike(scale);
      text.scale.set(resolvedScale.x, resolvedScale.y);
    }
    text.visible = visible;
    return text;
  }

  static bitmapText(settings?: BitmapTextSettings): BitmapText;
  static bitmapText(
    value?: string,
    style?: Partial<IBitmapTextStyle>,
    alpha?: number,
    position?: PointLike,
    anchor?: PointLike,
    scale?: PointLike,
  ): BitmapText;
  static bitmapText(
    settingsOrValue: string | BitmapTextSettings = '',
    style?: Partial<IBitmapTextStyle>,
    alpha: number = 1,
    position: PointLike = 0,
    anchor: PointLike = 0,
    scale: PointLike = 1,
  ): BitmapText {
    let value: string = settingsOrValue as string;
    let visible = true;
    if (typeof settingsOrValue === 'object') {
      const settings = settingsOrValue as BitmapTextSettings;
      value = settings?.value ?? '';
      style = settings?.style ?? {};
      alpha = settings?.alpha ?? 1;
      position = settings?.position ?? 0;
      anchor = settings?.anchor ?? 0;
      scale = settings?.scale ?? 1;
      visible = settings?.visible !== false;
    }
    const text = new BitmapText(value, style);
    if (alpha !== undefined) {
      text.alpha = alpha;
    }
    if (position !== undefined) {
      const resolvedPosition = resolvePointLike(position);
      text.position.set(resolvedPosition.x, resolvedPosition.y);
    }
    if (anchor !== undefined) {
      const resolvedAnchor = resolvePointLike(anchor);
      text.anchor.set(resolvedAnchor.x, resolvedAnchor.y);
    }
    if (scale !== undefined) {
      const resolvedScale = resolvePointLike(anchor);
      text.scale.set(resolvedScale.x, resolvedScale.y);
    }
    text.visible = visible;
    return text;
  }

  static container(settings?: ContainerSettings): Container;
  static container(alpha?: number, position?: PointLike, scale?: PointLike): Container;
  static container(
    settingsOrAlpha: number | ContainerSettings = 1,
    position: PointLike = 0,
    scale: PointLike = 1,
  ): Container {
    let visible = true;
    let alpha: number = settingsOrAlpha as number;
    if (typeof settingsOrAlpha === 'object') {
      const settings = settingsOrAlpha as ContainerSettings;
      alpha = settings?.alpha ?? 1;
      position = settings?.position ?? 0;
      visible = settings?.visible !== false;
    }
    const container = new Container();
    container.alpha = alpha;
    if (position !== undefined) {
      const resolvedPosition = resolvePointLike(position);
      container.position.set(resolvedPosition.x, resolvedPosition.y);
    }
    if (scale !== undefined) {
      const resolvedScale = resolvePointLike(scale);
      container.scale.set(resolvedScale.x, resolvedScale.y);
    }
    container.visible = visible;
    return container;
  }

  static flexContainer(settings: FlexContainerCreationSettings): FlexContainer;
  static flexContainer(
    alpha?: number,
    position?: PointLike,
    settings?: Partial<FlexContainerSettings>,
    scale?: PointLike,
  ): FlexContainer;
  static flexContainer(
    settingsOrAlpha: FlexContainerCreationSettings | number = 1,
    position: PointLike = 0,
    settings: Partial<FlexContainerSettings> = {},
    scale: PointLike = 1,
  ): FlexContainer {
    let visible = true;
    let alpha: number = settingsOrAlpha as number;
    let container: FlexContainer;
    if (typeof settingsOrAlpha === 'object') {
      const settings = settingsOrAlpha as FlexContainerCreationSettings;
      alpha = settings?.alpha ?? 1;
      position = settings?.position ?? 0;
      visible = settings?.visible !== false;
      container = new FlexContainer(settingsOrAlpha);
    } else {
      container = new FlexContainer(settings);
    }
    if (alpha !== undefined) {
      container.alpha = alpha;
    }
    if (position !== undefined) {
      const resolvedPosition = resolvePointLike(position);
      container.position.set(resolvedPosition.x, resolvedPosition.y);
    }
    if (scale !== undefined) {
      const resolvedScale = resolvePointLike(scale);
      container.scale.set(resolvedScale.x, resolvedScale.y);
    }
    container.visible = visible;
    return container;
  }

  static graphics(settings: GraphicsSettings): Graphics;
  static graphics(alpha?: number, position?: PointLike, scale?: PointLike): Graphics;
  static graphics(
    settingsOrAlpha: GraphicsSettings | number = 1,
    position: PointLike = 0,
    scale: PointLike = 1,
  ): Graphics {
    let visible = true;
    let alpha: number = settingsOrAlpha as number;
    if (typeof settingsOrAlpha === 'object') {
      const settings = settingsOrAlpha as GraphicsSettings;
      alpha = settings?.alpha ?? 1;
      position = settings?.position ?? 0;
      visible = settings?.visible !== false;
      scale = settings?.scale ?? 1;
    }
    const graphics = new Graphics();
    if (alpha !== undefined) {
      graphics.alpha = alpha;
    }
    if (position !== undefined) {
      const resolvedPosition = resolvePointLike(position);
      graphics.position.set(resolvedPosition.x, resolvedPosition.y);
    }
    if (scale !== undefined) {
      const resolvedScale = resolvePointLike(scale);
      graphics.scale.set(resolvedScale.x, resolvedScale.y);
    }
    graphics.visible = visible;
    return graphics;
  }

  static tilingSprite(settings: TilingSpriteSettings): TilingSprite;
  static tilingSprite(
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
  static tilingSprite(
    settingsOrAsset: string | Texture | TilingSpriteSettings,
    sheet?: SpritesheetLike,
    width: number = 1,
    height: number = 1,
    tilePosition: PointLike = 0,
    alpha: number = 1,
    position: PointLike = 0,
    anchor: PointLike = 0.5,
    scale: PointLike = 1,
  ): TilingSprite {
    let visible = true;
    let asset: string | Texture | undefined = settingsOrAsset as string | Texture;
    if (typeof settingsOrAsset !== 'string' && !(settingsOrAsset instanceof Texture)) {
      const settings: TilingSpriteSettings = settingsOrAsset as TilingSpriteSettings;
      asset = settings?.asset;
      sheet = settings?.sheet;
      width = settings?.width ?? 1;
      height = settings?.height ?? 1;
      tilePosition = settings?.tilePosition ?? 0;
      alpha = settings?.alpha ?? 1;
      position = settings?.position ?? 0;
      anchor = settings?.anchor ?? 0.5;
      scale = settings?.scale ?? 1;
      visible = settings?.visible !== false;
    }
    if (!asset) {
      asset = Texture.WHITE;
    }
    const tilingSprite = new TilingSprite(
      typeof asset === 'string' ? this.texture(asset as string, sheet) : (asset as Texture),
      width,
      height,
    );
    setObjectName(tilingSprite, asset ?? '', sheet);
    if (tilePosition !== undefined) {
      const resolvedTilePosition = resolvePointLike(tilePosition);
      tilingSprite.tilePosition.x = resolvedTilePosition.x;
      tilingSprite.tilePosition.y = resolvedTilePosition.y;
    }
    if (alpha !== undefined) {
      tilingSprite.alpha = alpha;
    }
    if (position !== undefined) {
      const resolvedPosition = resolvePointLike(position);
      tilingSprite.position.set(resolvedPosition.x, resolvedPosition.y);
    }
    if (anchor !== undefined) {
      const resolvedAnchor = resolvePointLike(anchor);
      tilingSprite.anchor.set(resolvedAnchor.x, resolvedAnchor.y);
    }
    if (scale !== undefined) {
      const resolvedScale = resolvePointLike(scale);
      tilingSprite.scale.set(resolvedScale.x, resolvedScale.y);
    }
    tilingSprite.visible = visible;
    return tilingSprite;
  }

  // @ts-ignore
  static mesh(settings: MeshSettings): Mesh<Shader>;
  static mesh(geometry: Geometry, shader: Shader, state?: State, drawMode?: DRAW_MODES): Mesh<Shader>;
  static mesh(
    settingsOrGeometry: MeshSettings | Geometry,
    shader: Shader,
    state: State = State.for2d(),
    drawMode: DRAW_MODES = DRAW_MODES.LINE_LOOP,
  ): Mesh<Shader> {
    let geometry: Geometry = settingsOrGeometry as Geometry;
    if (!(settingsOrGeometry instanceof Geometry)) {
      const settings = settingsOrGeometry as MeshSettings;
      geometry = settings.geometry;
      shader = settings.shader;
      state = settings?.state ?? State.for2d();
      drawMode = settings?.drawMode ?? DRAW_MODES.LINE_LOOP;
    }
    return new Mesh<Shader>(geometry, shader, state, drawMode);
  }

  static simpleRope(settings: SimpleRopeSettings): { rope: SimpleRope; points: Point[] };
  static simpleRope(
    asset: string | Texture,
    sheet?: SpritesheetLike,
    numPoints?: number,
    segmentLength?: number,
    autoUpdate?: boolean,
    alpha?: number,
    position?: PointLike,
    scale?: PointLike,
  ): { rope: SimpleRope; points: Point[] };
  static simpleRope(
    settingsOrAsset?: string | Texture | SimpleRopeSettings,
    sheet?: SpritesheetLike,
    numPoints: number = 25,
    segmentLength: number = 50,
    autoUpdate?: boolean,
    alpha: number = 1,
    position: PointLike = 0,
    scale: PointLike = 1,
  ): { rope: SimpleRope; points: Point[] } {
    let visible = true;
    let asset: string | Texture | undefined = settingsOrAsset as string | Texture;
    if (typeof settingsOrAsset !== 'string' && !(settingsOrAsset instanceof Texture)) {
      const settings: SimpleRopeSettings = settingsOrAsset as SimpleRopeSettings;
      asset = settings?.asset;
      sheet = settings?.sheet;
      numPoints = settings?.numPoints ?? 25;
      segmentLength = settings?.segmentLength ?? 50;
      autoUpdate = settings?.autoUpdate ?? true;
      alpha = settings?.alpha ?? 1;
      position = settings?.position ?? 0;
      scale = settings?.scale ?? 1;
      visible = settings?.visible !== false;
    }
    if (!asset) {
      asset = Texture.WHITE;
    }
    const points = [];
    for (let i = 0; i < numPoints; i++) {
      points.push(new Point(i * segmentLength, 0));
    }
    const simpleRope = new SimpleRope(typeof asset === 'string' ? this.texture(asset, sheet) : asset, points);
    setObjectName(simpleRope, asset, sheet);
    simpleRope.autoUpdate = autoUpdate !== false;

    if (alpha !== undefined) {
      simpleRope.alpha = alpha;
    }
    if (position !== undefined) {
      const resolvedPosition = resolvePointLike(position);
      simpleRope.position.set(resolvedPosition.x, resolvedPosition.y);
    }
    if (scale !== undefined) {
      const resolvedScale = resolvePointLike(scale);
      simpleRope.scale.set(resolvedScale.x, resolvedScale.y);
    }
    simpleRope.visible = visible;
    return { rope: simpleRope, points };
  }

  static simplePlane(settings: SimplePlaneSettings): SimplePlane;
  static simplePlane(
    asset?: string | Texture,
    sheet?: SpritesheetLike,
    vertsWidth?: number,
    vertsHeight?: number,
    alpha?: number,
    position?: PointLike,
    scale?: PointLike,
  ): SimplePlane;
  static simplePlane(
    settingsOrAsset?: string | Texture | SimplePlaneSettings,
    sheet?: SpritesheetLike,
    vertsWidth: number = 1,
    vertsHeight: number = 1,
    alpha: number = 1,
    position: PointLike = 0,
    scale: PointLike = 1,
  ): SimplePlane {
    let visible = true;
    let asset: string | Texture | undefined = settingsOrAsset as string | Texture;
    if (typeof settingsOrAsset !== 'string' && !(settingsOrAsset instanceof Texture)) {
      const settings: SimplePlaneSettings = settingsOrAsset as SimplePlaneSettings;
      asset = settings?.asset;
      sheet = settings?.sheet;
      vertsWidth = settings?.vertsWidth ?? 1;
      vertsHeight = settings?.vertsHeight ?? 1;
      alpha = settings?.alpha ?? 1;
      position = settings?.position ?? 0;
      scale = settings?.scale ?? 1;
      visible = settings?.visible !== false;
    }
    if (!asset) {
      asset = Texture.WHITE;
    }
    const simplePlane = new SimplePlane(
      typeof asset === 'string' ? this.texture(asset, sheet) : asset,
      vertsWidth,
      vertsHeight,
    );
    if (alpha !== undefined) {
      simplePlane.alpha = alpha;
    }
    if (position !== undefined) {
      const resolvedPosition = resolvePointLike(position);
      simplePlane.position.set(resolvedPosition.x, resolvedPosition.y);
    }
    if (scale !== undefined) {
      const resolvedScale = resolvePointLike(scale);
      simplePlane.scale.set(resolvedScale.x, resolvedScale.y);
    }
    setObjectName(simplePlane, asset, sheet);
    simplePlane.visible = visible;
    return simplePlane;
  }

  static simpleMesh(settings: SimpleMeshSettings): SimpleMesh;
  static simpleMesh(
    asset: string | Texture,
    sheet: SpritesheetLike,
    vertices?: Float32Array,
    uvs?: Float32Array,
    indices?: Uint16Array,
    drawMode?: number,
    alpha?: number,
    position?: PointLike,
    scale?: PointLike,
  ): SimpleMesh;

  static simpleMesh(
    settingsOrAsset?: string | Texture | SimpleMeshSettings,
    sheet?: SpritesheetLike,
    vertices?: Float32Array,
    uvs?: Float32Array,
    indices?: Uint16Array,
    drawMode?: number,
    alpha: number = 1,
    position: PointLike = 0,
    scale: PointLike = 1,
  ): SimpleMesh {
    let visible = true;
    let asset: string | Texture | undefined = settingsOrAsset as string | Texture;
    if (typeof settingsOrAsset !== 'string' && !(settingsOrAsset instanceof Texture)) {
      const settings: SimpleMeshSettings = settingsOrAsset as SimpleMeshSettings;
      asset = settings?.asset;
      sheet = settings?.sheet;
      vertices = settings?.vertices;
      uvs = settings?.uvs;
      indices = settings?.indices;
      drawMode = settings?.drawMode;
      alpha = settings?.alpha ?? 1;
      position = settings?.position ?? 0;
      scale = settings?.scale ?? 1;
      visible = settings?.visible !== false;
    }
    if (!asset) {
      asset = Texture.WHITE;
    }
    const simpleMesh = new SimpleMesh(
      typeof asset === 'string' ? this.texture(asset, sheet) : asset,
      vertices,
      uvs,
      indices,
      drawMode,
    );
    if (alpha !== undefined) {
      simpleMesh.alpha = alpha;
    }
    if (position !== undefined) {
      const resolvedPosition = resolvePointLike(position);
      simpleMesh.position.set(resolvedPosition.x, resolvedPosition.y);
    }
    if (scale !== undefined) {
      const resolvedScale = resolvePointLike(scale);
      simpleMesh.scale.set(resolvedScale.x, resolvedScale.y);
    }
    setObjectName(simpleMesh, asset, sheet);
    simpleMesh.visible = visible;
    return simpleMesh;
  }

  static nineSlice(settings: NineSliceSettings): NineSlicePlane;
  static nineSlice(
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
  static nineSlice(
    settingsOrAsset?: string | Texture | NineSliceSettings,
    sheet?: SpritesheetLike,
    leftWidth: number = 10,
    topHeight: number = 10,
    rightWidth: number = 10,
    bottomHeight: number = 10,
    alpha: number = 1,
    position: PointLike = 0,
    scale: PointLike = 1,
  ) {
    let visible = true;
    let asset: string | Texture | undefined = settingsOrAsset as string | Texture;
    if (typeof settingsOrAsset !== 'string' && !(settingsOrAsset instanceof Texture)) {
      const settings: NineSliceSettings = settingsOrAsset as NineSliceSettings;
      asset = settings?.asset;
      sheet = settings?.sheet;
      leftWidth = settings?.leftWidth ?? 10;
      topHeight = settings?.topHeight ?? 10;
      rightWidth = settings?.rightWidth ?? 10;
      bottomHeight = settings?.bottomHeight ?? 10;
      alpha = settings?.alpha ?? 1;
      position = settings?.position ?? 0;
      scale = settings?.scale ?? 1;
      visible = settings?.visible !== false;
    }
    if (!asset) {
      asset = Texture.WHITE;
    }
    const ns = new NineSlicePlane(
      typeof asset === 'string' ? this.texture(asset, sheet) : asset,
      leftWidth,
      topHeight,
      rightWidth,
      bottomHeight,
    );
    setObjectName(ns, asset, sheet);
    if (alpha !== undefined) {
      ns.alpha = alpha;
    }
    if (position !== undefined) {
      const resolvedPosition = resolvePointLike(position);
      ns.position.set(resolvedPosition.x, resolvedPosition.y);
    }
    if (scale !== undefined) {
      const resolvedScale = resolvePointLike(scale);
      ns.scale.set(resolvedScale.x, resolvedScale.y);
    }
    ns.visible = visible;
    return ns;
  }
}
