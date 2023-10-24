import { Geometry, State } from '@pixi/core';
import {
  Container,
  DisplayObject,
  DRAW_MODES,
  HTMLTextStyle,
  IBitmapTextStyle,
  ITextStyle,
  Mesh,
  Point,
  Shader,
  SimplePlane,
  Sprite,
  TextStyle,
  Texture,
} from 'pixi.js';
import { FlexContainerSettings } from '../../gameobjects';
import { PointLike } from '../Types';
import { Make } from './Make';
import { resolvePointLike } from './utils';

export class Add {
  constructor(private defaultContainer: Container) {}

  existing<T>(pObject: T, position?: PointLike, anchor?: PointLike, scale?: PointLike): T {
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

  coloredSprite(
    color: number = 0x0,
    size: PointLike = {
      x: 1,
      y: 1,
    },
    shape: 'rectangle' | 'rounded_rectangle' | 'circle' = 'rectangle',
    alpha: number = 1,
    position: PointLike = {
      x: 0,
      y: 0,
    },
    anchor: PointLike = { x: 0.5, y: 0.5 },
    scale: PointLike = { x: 1, y: 1 },
    opts?: {
      [key: string]: string | number;
    },
  ) {
    const sprite = Make.coloredSprite(color, size, shape, opts);
    sprite.alpha = alpha;

    const resolvedPosition = resolvePointLike(position);
    const resolvedAnchor = resolvePointLike(anchor);
    const resolvedScale = resolvePointLike(scale);

    sprite.x = resolvedPosition.x;
    sprite.y = resolvedPosition.y;
    sprite.anchor.x = resolvedAnchor.x;
    sprite.anchor.y = resolvedAnchor.y;
    sprite.scale.x = resolvedScale.x;
    sprite.scale.y = resolvedScale.y;

    return this.defaultContainer.addChild(sprite);
  }

  sprite(
    pAsset: string | Texture,
    pSheet?: string | undefined,
    alpha: number = 1,
    position: PointLike = { x: 0, y: 0 },
    anchor: PointLike = { x: 0.5, y: 0.5 },
    scale: PointLike = { x: 1, y: 1 },
  ) {
    const sprite = Make.sprite(pAsset, pSheet);
    sprite.alpha = alpha;

    const resolvedPosition = resolvePointLike(position);
    const resolvedAnchor = resolvePointLike(anchor);
    const resolvedScale = resolvePointLike(scale);

    sprite.x = resolvedPosition.x;
    sprite.y = resolvedPosition.y;
    sprite.anchor.x = resolvedAnchor.x;
    sprite.anchor.y = resolvedAnchor.y;
    sprite.scale.x = resolvedScale.x;
    sprite.scale.y = resolvedScale.y;

    return this.defaultContainer.addChild(sprite);
  }

  tilingSprite(
    pAsset: string | Texture,
    pSheet?: string | undefined,
    alpha: number = 1,
    width: number = 0,
    height: number = 0,
    tilePosition: Point = new Point(0, 0),
    position: PointLike = { x: 0, y: 0 },
    anchor: PointLike = { x: 0.5, y: 0.5 },
    scale: PointLike = { x: 1, y: 1 },
  ) {
    const sprite = Make.tilingSprite(pAsset, pSheet, width, height, tilePosition);
    sprite.alpha = alpha;

    const resolvedPosition = resolvePointLike(position);
    const resolvedAnchor = resolvePointLike(anchor);
    const resolvedScale = resolvePointLike(scale);

    sprite.x = resolvedPosition.x;
    sprite.y = resolvedPosition.y;
    sprite.anchor.x = resolvedAnchor.x;
    sprite.anchor.y = resolvedAnchor.y;
    sprite.scale.x = resolvedScale.x;
    sprite.scale.y = resolvedScale.y;

    return this.defaultContainer.addChild(sprite);
  }

  static mesh(
    pGeometry: Geometry,
    pShader: Shader,
    pState?: State,
    pDrawMode?: DRAW_MODES,
    alpha: number = 1,
    position: PointLike = { x: 0, y: 0 },
    scale: PointLike = { x: 1, y: 1 },
  ): Mesh<Shader> {
    const mesh = Make.mesh(pGeometry, pShader, pState, pDrawMode);
    mesh.alpha = alpha;

    const resolvedPosition = resolvePointLike(position);
    const resolvedScale = resolvePointLike(scale);
    mesh.x = resolvedPosition.x;
    mesh.y = resolvedPosition.y;
    mesh.scale.x = resolvedScale.x;
    mesh.scale.y = resolvedScale.y;

    return mesh;
  }

  simpleRope(
    pAsset: string | Texture,
    pSheet?: string | undefined,
    pNumPoints: number = 25,
    pSegmentLength: number = 50,
    pAutoUpdate: boolean = true,
    alpha: number = 1,
    position: PointLike = { x: 0, y: 0 },
    scale: PointLike = { x: 1, y: 1 },
  ) {
    const points = [];
    for (let i = 0; i < pNumPoints; i++) {
      points.push(new Point(i * pSegmentLength, 0));
    }
    const rope = Make.simpleRope(pAsset, pSheet, points, pAutoUpdate);
    rope.alpha = alpha;

    const resolvedPosition = resolvePointLike(position);
    const resolvedScale = resolvePointLike(scale);

    rope.x = resolvedPosition.x;
    rope.y = resolvedPosition.y;
    rope.scale.x = resolvedScale.x;
    rope.scale.y = resolvedScale.y;

    return { rope: this.defaultContainer.addChild(rope), points };
  }

  simplePlane(
    pAsset: string | Texture,
    pSheet: string | undefined,
    pVertsWidth: number,
    pVertsHeight: number,
    alpha: number = 1,
    position: PointLike = { x: 0, y: 0 },
    scale: PointLike = { x: 1, y: 1 },
  ): SimplePlane {
    const plane = Make.simplePlane(pAsset, pSheet, pVertsWidth, pVertsHeight);
    plane.alpha = alpha;

    const resolvedPosition = resolvePointLike(position);
    const resolvedScale = resolvePointLike(scale);

    plane.x = resolvedPosition.x;
    plane.y = resolvedPosition.y;
    plane.scale.x = resolvedScale.x;
    plane.scale.y = resolvedScale.y;
    return plane;
  }

  text(
    pText: string = '',
    pStyle?: Partial<ITextStyle> | TextStyle,
    alpha: number = 1,
    position: PointLike = { x: 0, y: 0 },
    anchor: PointLike = { x: 0.5, y: 0.5 },
    scale: PointLike = { x: 1, y: 1 },
  ) {
    const text = Make.text(pText, pStyle);
    text.alpha = alpha;

    const resolvedPosition = resolvePointLike(position);
    const resolvedAnchor = resolvePointLike(anchor);
    const resolvedScale = resolvePointLike(scale);

    text.x = resolvedPosition.x;
    text.y = resolvedPosition.y;
    text.anchor.x = resolvedAnchor.x;
    text.anchor.y = resolvedAnchor.y;
    text.scale.x = resolvedScale.x;
    text.scale.y = resolvedScale.y;

    return this.defaultContainer.addChild(text);
  }

  htmlText(
    pText: string = '',
    pStyle?: Partial<HTMLTextStyle | TextStyle | ITextStyle>,
    alpha: number = 1,
    position: PointLike = { x: 0, y: 0 },
    anchor: PointLike = { x: 0.5, y: 0.5 },
    scale: PointLike = { x: 1, y: 1 },
  ) {
    const text = Make.htmlText(pText, pStyle);
    text.alpha = alpha;

    const resolvedPosition = resolvePointLike(position);
    const resolvedAnchor = resolvePointLike(anchor);
    const resolvedScale = resolvePointLike(scale);

    text.x = resolvedPosition.x;
    text.y = resolvedPosition.y;
    text.anchor.x = resolvedAnchor.x;
    text.anchor.y = resolvedAnchor.y;
    text.scale.x = resolvedScale.x;
    text.scale.y = resolvedScale.y;

    return this.defaultContainer.addChild(text);
  }

  // Add BitmapText
  bitmapText(
    pText: string,
    pStyle?: Partial<IBitmapTextStyle>,
    alpha: number = 1,
    position: PointLike = { x: 0, y: 0 },
    anchor: PointLike = { x: 0.5, y: 0.5 },
    scale: PointLike = { x: 1, y: 1 },
  ) {
    const bitmapText = Make.bitmapText(pText, pStyle);
    bitmapText.alpha = alpha;

    const resolvedPosition = resolvePointLike(position);
    const resolvedAnchor = resolvePointLike(anchor);
    const resolvedScale = resolvePointLike(scale);

    bitmapText.x = resolvedPosition.x;
    bitmapText.y = resolvedPosition.y;
    bitmapText.anchor.x = resolvedAnchor.x;
    bitmapText.anchor.y = resolvedAnchor.y;
    bitmapText.scale.x = resolvedScale.x;
    bitmapText.scale.y = resolvedScale.y;

    return this.defaultContainer.addChild(bitmapText);
  }

  // Add Container
  container(alpha: number = 1, position: PointLike = { x: 0, y: 0 }, scale: PointLike = { x: 1, y: 1 }) {
    const container = Make.container();
    container.alpha = alpha;

    const resolvedPosition = resolvePointLike(position);
    const resolvedScale = resolvePointLike(scale);

    container.x = resolvedPosition.x;
    container.y = resolvedPosition.y;
    container.scale.x = resolvedScale.x;
    container.scale.y = resolvedScale.y;

    return this.defaultContainer.addChild(container);
  }

  // Add FlexContainer
  flexContainer(alpha: number = 1, position: PointLike = { x: 0, y: 0 }, settings?: Partial<FlexContainerSettings>) {
    const container = Make.flexContainer(alpha, position, settings);
    container.alpha = alpha;

    const resolvedPosition = resolvePointLike(position);

    container.x = resolvedPosition.x;
    container.y = resolvedPosition.y;

    return this.defaultContainer.addChild(container);
  }

  // Add Graphics
  graphics(alpha: number = 1, position: PointLike = { x: 0, y: 0 }, scale: PointLike = { x: 1, y: 1 }) {
    const graphics = Make.graphics();
    graphics.alpha = alpha;

    const resolvedPosition = resolvePointLike(position);
    const resolvedScale = resolvePointLike(scale);

    graphics.x = resolvedPosition.x;
    graphics.y = resolvedPosition.y;
    graphics.scale.x = resolvedScale.x;
    graphics.scale.y = resolvedScale.y;

    return this.defaultContainer.addChild(graphics);
  }

  nineSlice(
    pAsset: string,
    pSheet?: string | undefined,
    leftWidth: number = 10,
    topHeight: number = 10,
    rightWidth: number = 10,
    bottomHeight: number = 10,
    alpha: number = 1,
    position: PointLike = { x: 0, y: 0 },
    scale: PointLike = { x: 1, y: 1 },
  ) {
    const ns = Make.nineSlice(pAsset, pSheet, leftWidth, topHeight, rightWidth, bottomHeight);
    ns.alpha = alpha;

    const resolvedPosition = resolvePointLike(position);
    const resolvedScale = resolvePointLike(scale);

    ns.x = resolvedPosition.x;
    ns.y = resolvedPosition.y;

    ns.scale.x = resolvedScale.x;
    ns.scale.y = resolvedScale.y;

    return this.defaultContainer.addChild(ns);
  }
}
