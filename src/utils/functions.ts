import { Point } from 'pixi.js';
import { PointLike, Size, SizeLike, SpriteSheetLike, TextureLike } from './types';

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

export function resolveSizeLike(size?: SizeLike): Size {
  if (size === undefined) {
    return { width: 0, height: 0 };
  }
  if (Array.isArray(size)) {
    return { width: size[0], height: size[1] === undefined ? size[0] : size[1] };
  } else if (size instanceof Point) {
    return { width: size.x, height: size.y };
  } else if (typeof size === 'object') {
    // cast as an object
    const obj = size as { width: number; height: number };
    return { width: obj.width || 0, height: obj.height || 0 };
  } else {
    return { width: size ?? 0, height: size ?? 0 };
  }
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

type DebouncedFunction<T extends (...args: any[]) => any> = (...args: Parameters<T>) => void;

/**
 * Debounce a function
 * @param func - function to debounce
 * @param wait - time in milliseconds
 * @example const debounced = debounce(() => console.log('debounced'), 1000);
 * @example window.addEventListener('resize', debounced);
 */
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): DebouncedFunction<T> {
  let timeoutId: any;
  return function (...args: Parameters<T>) {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, wait);
  };
}
