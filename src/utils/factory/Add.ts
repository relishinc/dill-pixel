import {
  Container,
  DisplayObject,
  HTMLTextStyle,
  IBitmapTextStyle,
  ITextStyle,
  Point,
  Sprite,
  TextStyle,
  Texture,
} from 'pixi.js';
import { Make } from './Make';
import { resolveXYFromObjectOrArray } from './utils';

export class Add {
  constructor(private defaultContainer: Container) {}

  existing<T>(
    pObject: T,
    position?:
      | {
          x: number;
          y: number;
        }
      | [number, number?]
      | number,
    anchor?: { x: number; y: number } | [number, number?] | number,
    scale?:
      | {
          x: number;
          y: number;
        }
      | [number, number?]
      | number,
  ): T {
    const obj = this.defaultContainer.addChild(pObject as DisplayObject) as T;
    const dObj = obj as Sprite;

    if (position !== undefined) {
      const resolvedPosition = resolveXYFromObjectOrArray(position);
      dObj?.position?.set(resolvedPosition.x, resolvedPosition.y);
    }
    if (anchor !== undefined) {
      const resolvedAnchor = resolveXYFromObjectOrArray(anchor);
      dObj?.anchor?.set(resolvedAnchor.x, resolvedAnchor.y);
    }

    if (scale !== undefined) {
      const resolvedScale = resolveXYFromObjectOrArray(scale);
      dObj?.scale?.set(resolvedScale.x, resolvedScale.y);
    }

    return obj;
  }

  coloredSprite(
    color: number = 0x0,
    size:
      | {
          x: number;
          y: number;
        }
      | [number, number?]
      | number = {
      x: 1,
      y: 1,
    },
    shape: 'rectangle' | 'rounded_rectangle' | 'circle' = 'rectangle',
    alpha: number = 1,
    position:
      | {
          x: number;
          y: number;
        }
      | [number, number?]
      | number = {
      x: 0,
      y: 0,
    },
    anchor: { x: number; y: number } | [number, number?] | number = { x: 0.5, y: 0.5 },
    scale:
      | {
          x: number;
          y: number;
        }
      | [number, number?]
      | number = { x: 1, y: 1 },
    opts?: {
      [key: string]: string | number;
    },
  ) {
    const sprite = Make.coloredSprite(color, size, shape, opts);
    sprite.alpha = alpha;

    const resolvedPosition = resolveXYFromObjectOrArray(position);
    const resolvedAnchor = resolveXYFromObjectOrArray(anchor);
    const resolvedScale = resolveXYFromObjectOrArray(scale);

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
    position: { x: number; y: number } | [number, number?] | number = { x: 0, y: 0 },
    anchor: { x: number; y: number } | [number, number?] | number = { x: 0.5, y: 0.5 },
    scale: { x: number; y: number } | [number, number?] | number = { x: 1, y: 1 },
  ) {
    const sprite = Make.sprite(pAsset, pSheet);
    sprite.alpha = alpha;

    const resolvedPosition = resolveXYFromObjectOrArray(position);
    const resolvedAnchor = resolveXYFromObjectOrArray(anchor);
    const resolvedScale = resolveXYFromObjectOrArray(scale);

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
    position: { x: number; y: number } | [number, number?] | number = { x: 0, y: 0 },
    anchor: { x: number; y: number } | [number, number?] | number = { x: 0.5, y: 0.5 },
    scale: { x: number; y: number } | [number, number?] | number = { x: 1, y: 1 },
  ) {
    const sprite = Make.tilingSprite(pAsset, pSheet, width, height, tilePosition);
    sprite.alpha = alpha;

    const resolvedPosition = resolveXYFromObjectOrArray(position);
    const resolvedAnchor = resolveXYFromObjectOrArray(anchor);
    const resolvedScale = resolveXYFromObjectOrArray(scale);

    sprite.x = resolvedPosition.x;
    sprite.y = resolvedPosition.y;
    sprite.anchor.x = resolvedAnchor.x;
    sprite.anchor.y = resolvedAnchor.y;
    sprite.scale.x = resolvedScale.x;
    sprite.scale.y = resolvedScale.y;

    return this.defaultContainer.addChild(sprite);
  }

  simpleRope(
    pAsset: string | Texture,
    pSheet?: string | undefined,
    pNumPoints: number = 25,
    pSegmentLength: number = 50,
    pAutoUpdate: boolean = true,
    alpha: number = 1,
    position: { x: number; y: number } | [number, number?] | number = { x: 0, y: 0 },
    scale: { x: number; y: number } | [number, number?] | number = { x: 1, y: 1 },
  ) {
    const points = [];
    for (let i = 0; i < pNumPoints; i++) {
      points.push(new Point(i * pSegmentLength, 0));
    }
    const rope = Make.simpleRope(pAsset, pSheet, points, pAutoUpdate);
    rope.alpha = alpha;

    const resolvedPosition = resolveXYFromObjectOrArray(position);
    const resolvedScale = resolveXYFromObjectOrArray(scale);

    rope.x = resolvedPosition.x;
    rope.y = resolvedPosition.y;
    rope.scale.x = resolvedScale.x;
    rope.scale.y = resolvedScale.y;

    return this.defaultContainer.addChild(rope);
  }

  text(
    pText: string = '',
    pStyle?: Partial<ITextStyle> | TextStyle,
    alpha: number = 1,
    position: { x: number; y: number } | [number, number?] | number = { x: 0, y: 0 },
    anchor: { x: number; y: number } | [number, number?] | number = { x: 0.5, y: 0.5 },
    scale: { x: number; y: number } | [number, number?] | number = { x: 1, y: 1 },
  ) {
    const text = Make.text(pText, pStyle);
    text.alpha = alpha;

    const resolvedPosition = resolveXYFromObjectOrArray(position);
    const resolvedAnchor = resolveXYFromObjectOrArray(anchor);
    const resolvedScale = resolveXYFromObjectOrArray(scale);

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
    position: { x: number; y: number } | [number, number?] | number = { x: 0, y: 0 },
    anchor: { x: number; y: number } | [number, number?] | number = { x: 0.5, y: 0.5 },
    scale: { x: number; y: number } | [number, number?] | number = { x: 1, y: 1 },
  ) {
    const text = Make.htmlText(pText, pStyle);
    text.alpha = alpha;

    const resolvedPosition = resolveXYFromObjectOrArray(position);
    const resolvedAnchor = resolveXYFromObjectOrArray(anchor);
    const resolvedScale = resolveXYFromObjectOrArray(scale);

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
    position: { x: number; y: number } | [number, number?] | number = { x: 0, y: 0 },
    anchor: { x: number; y: number } | [number, number?] | number = { x: 0.5, y: 0.5 },
    scale: { x: number; y: number } | [number, number?] | number = { x: 1, y: 1 },
  ) {
    const bitmapText = Make.bitmapText(pText, pStyle);
    bitmapText.alpha = alpha;

    const resolvedPosition = resolveXYFromObjectOrArray(position);
    const resolvedAnchor = resolveXYFromObjectOrArray(anchor);
    const resolvedScale = resolveXYFromObjectOrArray(scale);

    bitmapText.x = resolvedPosition.x;
    bitmapText.y = resolvedPosition.y;
    bitmapText.anchor.x = resolvedAnchor.x;
    bitmapText.anchor.y = resolvedAnchor.y;
    bitmapText.scale.x = resolvedScale.x;
    bitmapText.scale.y = resolvedScale.y;

    return this.defaultContainer.addChild(bitmapText);
  }

  // Add Container
  container(
    alpha: number = 1,
    position: { x: number; y: number } | [number, number?] | number = { x: 0, y: 0 },
    scale: { x: number; y: number } | [number, number?] | number = { x: 1, y: 1 },
  ) {
    const container = Make.container();
    container.alpha = alpha;

    const resolvedPosition = resolveXYFromObjectOrArray(position);
    const resolvedScale = resolveXYFromObjectOrArray(scale);

    container.x = resolvedPosition.x;
    container.y = resolvedPosition.y;
    container.scale.x = resolvedScale.x;
    container.scale.y = resolvedScale.y;

    return this.defaultContainer.addChild(container);
  }

  // Add Graphics
  graphics(
    alpha: number = 1,
    position: { x: number; y: number } | [number, number?] | number = { x: 0, y: 0 },
    scale: { x: number; y: number } | [number, number?] | number = { x: 1, y: 1 },
  ) {
    const graphics = Make.graphics();
    graphics.alpha = alpha;

    const resolvedPosition = resolveXYFromObjectOrArray(position);
    const resolvedScale = resolveXYFromObjectOrArray(scale);

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
    position: { x: number; y: number } | [number, number?] | number = { x: 0, y: 0 },
    scale: { x: number; y: number } | [number, number?] | number = { x: 1, y: 1 },
  ) {
    const ns = Make.nineSlice(pAsset, pSheet, leftWidth, topHeight, rightWidth, bottomHeight);
    ns.alpha = alpha;

    const resolvedPosition = resolveXYFromObjectOrArray(position);
    const resolvedScale = resolveXYFromObjectOrArray(scale);

    ns.x = resolvedPosition.x;
    ns.y = resolvedPosition.y;

    ns.scale.x = resolvedScale.x;
    ns.scale.y = resolvedScale.y;

    return this.defaultContainer.addChild(ns);
  }
}
