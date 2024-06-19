import {Point} from 'pixi.js';

/**
 * Find a float between two numbers, inclusive of {@param min} and exclusive of {@param max}.
 * @param min
 * @param max
 * @returns number
 */
export function floatBetween(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

/**
 * Find a float between the x,y of a Point
 * @param pt
 * @returns number
 */
export function floatBetweenPoint(pt: Point): number {
  return floatBetween(pt.x, pt.y);
}

/**
 * Find an integer between two numbers, inclusive of {@param min} and exclusive of {@param max}.
 * @param min
 * @param max
 * @returns number
 */
export function intBetween(min: number, max: number): number {
  return Math.floor(floatBetween(min, max));
}

/**
 * Find an int between the x,y of a Point
 * @param pt
 * @returns number
 */
export function intBetweenPoint(pt: Point): number {
  return intBetween(pt.x, pt.y);
}

/**
 * Get a random boolean value
 * @returns boolean
 */
export function bool(): boolean {
  return Math.random() < 0.5;
}
