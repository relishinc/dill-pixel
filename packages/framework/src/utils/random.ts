import { Point } from 'pixi.js';

/**
 * Generates a UUID v4 string
 * @returns {string} A UUID v4 string
 */
export function randomUUID(): string {
  // Check if crypto.randomUUID is available
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  // Fallback implementation of UUID v4
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

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
