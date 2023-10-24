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
  ObservablePoint,
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

export class Make {
  static texture(pAsset: string, pSheet?: SpritesheetLike): Texture {
    // tslint:disable-next-line:no-shadowed-variable
    let texture: Texture<Resource> | undefined;
    if (!pSheet || pSheet?.length === 0) {
      if (Assets.cache.has(pAsset)) {
        texture = Assets.get(pAsset)!;
      } else if (Assets.get(pAsset)) {
        texture = Assets.get(pAsset).texture!;
      } else {
        throw new Error('Asset "' + pAsset + '" not loaded into Pixi cache');
      }
    } else {
      if (!Assets.get(pSheet)) {
        throw new Error('Spritesheet "' + pSheet + '" not loaded into Pixi cache');
      } else {
        const sheet: Spritesheet = Assets.get(pSheet) as Spritesheet;
        const textures = sheet.textures;
        if (textures !== undefined) {
          // eslint-disable-next-line no-prototype-builtins
          if (textures.hasOwnProperty(pAsset)) {
            texture = textures[pAsset];
          } else if (sheet.linkedSheets !== undefined && sheet.linkedSheets.length > 0) {
            for (const linkedSheet of sheet.linkedSheets) {
              // eslint-disable-next-line no-prototype-builtins
              if (linkedSheet.textures !== undefined && linkedSheet.textures.hasOwnProperty(pAsset)) {
                texture = linkedSheet.textures[pAsset];
                break;
              }
            }
            if (texture === undefined) {
              throw new Error(
                'Asset "' + pAsset + '" not found inside spritesheet "' + pAsset + "' or any of its linked sheets",
              );
            }
          } else {
            throw new Error('Asset "' + pAsset + '" not found inside spritesheet "' + pSheet + "'");
          }
        } else {
          throw new Error('Spritesheet "' + pSheet + '" loaded but textures arent?!');
        }
      }
    }
    return texture || new Sprite().texture;
  }

  static coloredSprite(
    color: number = 0x0,
    size: PointLike = {
      x: 1,
      y: 1,
    },
    shape: 'rectangle' | 'rounded_rectangle' | 'circle' = 'rectangle',
    opts?: {
      [key: string]: string | number;
    },
  ): Sprite {
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

    return Make.sprite(Application.instance.renderer.generateTexture(gfx));
  }

  static sprite(
    pTexture: string | Texture,
    pSheet?: SpritesheetLike,
    alpha?: number,
    position?: PointLike,
    anchor?: PointLike,
  ): Sprite {
    const sprite = new Sprite(typeof pTexture === 'string' ? this.texture(pTexture, pSheet) : pTexture);
    setObjectName(sprite, pTexture, pSheet);
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
    return sprite;
  }

  static text(
    pText: string = '',
    pStyle?: Partial<ITextStyle | TextStyle>,
    alpha?: number,
    position?: PointLike,
    anchor?: PointLike,
  ): Text {
    const text = new Text(pText, pStyle);
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
    return text;
  }

  static htmlText(
    pText: string = '',
    pStyle?: Partial<HTMLTextStyle | TextStyle | ITextStyle>,
    alpha?: number,
    position?: PointLike,
    anchor?: PointLike,
  ): HTMLText {
    const text = new HTMLText(pText, pStyle);
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
    return text;
  }

  static bitmapText(
    pText: string = '',
    pStyle?: Partial<IBitmapTextStyle>,
    alpha?: number,
    position?: PointLike,
    anchor?: PointLike,
  ): BitmapText {
    const text = new BitmapText(pText, pStyle);
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
    return text;
  }

  static container(alpha?: number, position?: PointLike): Container {
    const container = new Container();
    if (alpha !== undefined) {
      container.alpha = alpha;
    }
    if (position !== undefined) {
      const resolvedPosition = resolvePointLike(position);
      container.position.set(resolvedPosition.x, resolvedPosition.y);
    }
    return container;
  }

  static flexContainer(alpha?: number, position?: PointLike, settings?: Partial<FlexContainerSettings>): FlexContainer {
    const container = new FlexContainer(settings);
    if (alpha !== undefined) {
      container.alpha = alpha;
    }
    if (position !== undefined) {
      const resolvedPosition = resolvePointLike(position);
      container.position.set(resolvedPosition.x, resolvedPosition.y);
    }
    return container;
  }

  static graphics(alpha?: number, position?: PointLike): Graphics {
    const graphics = new Graphics();
    if (alpha !== undefined) {
      graphics.alpha = alpha;
    }
    if (position !== undefined) {
      const resolvedPosition = resolvePointLike(position);
      graphics.position.set(resolvedPosition.x, resolvedPosition.y);
    }
    return graphics;
  }

  static tilingSprite(
    pTexture: string | Texture,
    pSheet: SpritesheetLike,
    pWidth: number,
    pHeight: number,
    pTilePosition?: Point,
    alpha?: number,
    position?: PointLike,
    anchor?: PointLike,
  ): TilingSprite {
    const tilingSprite = new TilingSprite(
      typeof pTexture === 'string' ? this.texture(pTexture, pSheet) : pTexture,
      pWidth,
      pHeight,
    );
    setObjectName(tilingSprite, pTexture, pSheet);
    if (pTilePosition) {
      tilingSprite.tilePosition.x = pTilePosition.x;
      tilingSprite.tilePosition.y = pTilePosition.y;
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
    return tilingSprite;
  }

  static mesh(pGeometry: Geometry, pShader: Shader, pState?: State, pDrawMode?: DRAW_MODES): Mesh<Shader> {
    return new Mesh<Shader>(pGeometry, pShader, pState, pDrawMode);
  }

  static simpleRope(
    pTexture: string | Texture,
    pSheet: SpritesheetLike,
    pPoints: (Point | ObservablePoint)[],
    pAutoUpdate?: boolean,
  ): SimpleRope {
    const simpleRope = new SimpleRope(
      typeof pTexture === 'string' ? this.texture(pTexture, pSheet) : pTexture,
      pPoints,
    );
    setObjectName(simpleRope, pTexture, pSheet);
    simpleRope.autoUpdate = pAutoUpdate !== false;
    return simpleRope;
  }

  static simplePlane(
    pTexture: string | Texture,
    pSheet: SpritesheetLike,
    pVertsWidth: number,
    pVertsHeight: number,
  ): SimplePlane {
    const simplePlane = new SimplePlane(
      typeof pTexture === 'string' ? this.texture(pTexture, pSheet) : pTexture,
      pVertsWidth,
      pVertsHeight,
    );
    setObjectName(simplePlane, pTexture, pSheet);
    return simplePlane;
  }

  static simpleMesh(
    pTexture: string | Texture,
    pSheet: SpritesheetLike,
    pVertices?: Float32Array,
    pUvs?: Float32Array,
    pIndices?: Uint16Array,
    pDrawMode?: number,
  ): SimpleMesh {
    const simpleMesh = new SimpleMesh(
      typeof pTexture === 'string' ? this.texture(pTexture, pSheet) : pTexture,
      pVertices,
      pUvs,
      pIndices,
      pDrawMode,
    );
    setObjectName(simpleMesh, pTexture, pSheet);
    return simpleMesh;
  }

  static nineSlice(
    pTexture: string | Texture,
    pSheet?: SpritesheetLike,
    leftWidth: number = 10,
    topHeight: number = 10,
    rightWidth: number = 10,
    bottomHeight: number = 10,
    alpha?: number,
    position?: PointLike,
  ) {
    const ns = new NineSlicePlane(
      typeof pTexture === 'string' ? this.texture(pTexture, pSheet) : pTexture,
      leftWidth,
      topHeight,
      rightWidth,
      bottomHeight,
    );
    setObjectName(ns, pTexture, pSheet);
    if (alpha !== undefined) {
      ns.alpha = alpha;
    }
    if (position !== undefined) {
      const resolvedPosition = resolvePointLike(position);
      ns.position.set(resolvedPosition.x, resolvedPosition.y);
    }
    return ns;
  }
}
