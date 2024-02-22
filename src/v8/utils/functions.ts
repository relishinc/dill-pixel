import { Point } from 'pixi.js';
import { PointLike, SpriteSheetLike, TextureLike } from './types';

type PointLikeResult = { x: number; y: number } | Point;

export function resolvePointLike(
  position?: PointLike,
  asPoint?: false,
  x?: number,
  y?: number,
): { x: number; y: number };
export function resolvePointLike(position?: PointLike, asPoint?: true, x?: number, y?: number): Point;
export function resolvePointLike(
  position?: PointLike,
  asPoint: boolean = false,
  x: number = 0,
  y: number = 0,
): PointLikeResult {
  if (position instanceof Point) {
    x = position.x;
    y = position.y;
  } else if (Array.isArray(position)) {
    x = position[0];
    y = position[1] === undefined ? position[0] : position[1];
  } else if (typeof position === 'object') {
    // cast as an object
    const obj = position as { x: number; y: number };
    x = obj.x || 0;
    y = obj.y || 0;
  } else {
    x = position ?? x;
    y = position ?? y;
  }

  return asPoint ? new Point(x, y) : { x, y };
}

export function getSheetLikeString(sheet: SpriteSheetLike) {
  if (Array.isArray(sheet)) {
    return sheet.join('/');
  } else {
    return sheet;
  }
}

export function setObjectName(object: any, texture: TextureLike, sheet: SpriteSheetLike) {
  if (sheet && texture) {
    object.name = `${getSheetLikeString(sheet)}/${texture}`;
  } else if (typeof texture === 'string') {
    object.name = `${texture}`;
  }
  if (typeof texture === 'string') {
    object.__textureString = texture;
  }
  if (Array.isArray(sheet)) {
    object.__textureSheetArray = sheet;
  } else if (sheet) {
    object.__textureSheet = sheet;
  }
}
