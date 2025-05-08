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
 * Find a float between two numbers, inclusive of {@param min} and optionally inclusive of {@param max}.
 * @param min The minimum value (inclusive)
 * @param max The maximum value (exclusive by default)
 * @param includeMax Whether the max value should be inclusive (default: false)
 * @returns number
 */
export function floatBetween(min: number, max: number, includeMax = false): number {
  return min + Math.random() * (max - min + (includeMax ? 1 : 0));
}

/**
 * Find a float between the x,y of a Point
 * @param pt The point containing min (x) and max (y) values
 * @param includeMax Whether the max value should be inclusive (default: false)
 * @returns number
 */
export function floatBetweenPoint(pt: Point, includeMax = false): number {
  return floatBetween(pt.x, pt.y, includeMax);
}

/**
 * Find an integer between two numbers, inclusive of {@param min} and optionally inclusive of {@param max}.
 * @param min The minimum value (inclusive)
 * @param max The maximum value (exclusive by default)
 * @param includeMax Whether the max value should be inclusive (default: false)
 * @returns number
 */
export function intBetween(min: number, max: number, includeMax = false): number {
  return Math.floor(floatBetween(min, max, includeMax));
}

/**
 * Find an int between the x,y of a Point
 * @param pt The point containing min (x) and max (y) values
 * @param includeMax Whether the max value should be inclusive (default: false)
 * @returns number
 */
export function intBetweenPoint(pt: Point, includeMax = false): number {
  return intBetween(pt.x, pt.y, includeMax);
}

/**
 * Get a random boolean value
 * @returns boolean
 */
export function bool(): boolean {
  return Math.random() < 0.5;
}
