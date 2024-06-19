import {Point, PointLike} from 'pixi.js';
import {PointLike as DillPixelPointLike} from './types';
import {lerp} from './math';

/**
 * Add the x and the y values of two Points together and return a new point.
 * @returns Point
 * @aram a
 * @aram b
 */
export function add(a: PointLike, b: PointLike): Point {
  return new Point(a.x + b.x, a.y + b.y);
}

/**
 * Increase the x,y of point A by the x,y of point B.
 * @aram a
 * @aram b
 */
export function addToPoint(a: PointLike, b: PointLike): void {
  a.x += b.x;
  a.y += b.y;
}

/**
 * Subtract the x and the y values of point B from Point A and return a new point.
 * @aram a
 * @aram b
 */
export function subtract(a: PointLike, b: PointLike): Point {
  return new Point(a.x - b.x, a.y - b.y);
}

/**
 * Decrease the x,y of point A by the x,y of point B.
 * @aram a
 * @aram b
 */
export function subtractFromPoint(a: PointLike, b: PointLike): void {
  a.x -= b.x;
  a.y -= b.y;
}

/**
 * Multply the x,y values of a point by the provided value.
 * @aram a
 * @aram pMult
 */
export function multiply(a: PointLike, pMult: number): Point {
  const point: Point = new Point(a.x, a.y);
  point.x *= pMult;
  point.y *= pMult;
  return point;
}

/**
 *
 * @aram pt
 * @aram percent
 */
export function lerpPoint(pt: PointLike, percent: number): number {
  return lerp(pt.x, pt.y, percent);
}

/**
 * Get the distance between two points.
 * @aram a
 * @aram b
 */
export function distance(a: PointLike, b: Point): number {
  return Math.sqrt(distanceSq(a, b));
}

/**
 * Get the squared distance between two points.
 * @aram a
 * @aram b
 */
export function distanceSq(a: PointLike, b: Point): number {
  return (b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y);
}

/**
 * Gets the magnitude of a point.
 * @aram pt
 */
export function magnitude(pt: PointLike): number {
  return Math.sqrt(pt.x * pt.x + pt.y * pt.y);
}

export type PointLikeResult = { x: number; y: number } | Point;

export function resolvePointLike(
  position?: DillPixelPointLike,
  asPoint?: false,
  x?: number,
  y?: number,
): { x: number; y: number };
export function resolvePointLike(position?: DillPixelPointLike, asPoint?: true, x?: number, y?: number): Point;
export function resolvePointLike(
  position?: DillPixelPointLike,
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
