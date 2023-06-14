import {Point} from "pixi.js";

/**
 * Find a float between two numbers, inclusive of {@param pMin} and exclusive of {@param pMax}.
 * @param pMin
 * @param pMax
 * @returns number
 */
export function floatBetween(pMin: number, pMax: number): number {
	return pMin + (Math.random() * (pMax - pMin));
}

/**
 * Find a float between the x,y of a Point
 * @param pPoint
 * @returns number
 */
export function floatBetweenPoint(pPoint: Point): number {
	return floatBetween(pPoint.x, pPoint.y);
}

/**
 * Find an integer between two numbers, inclusive of {@param pMin} and exclusive of {@param pMax}.
 * @param pMin
 * @param pMax
 * @returns number
 */
export function intBetween(pMin: number, pMax: number): number {
	return Math.floor(floatBetween(pMin, pMax));
}

/**
 * Find an int between the x,y of a Point
 * @param pPoint
 * @returns number
 */
export function intBetweenPoint(pPoint: Point): number {
	return intBetween(pPoint.x, pPoint.y);
}

/**
 * Get a random boolean value
 * @returns boolean
 */
export function bool(): boolean {
	return Math.random() < 0.5;
}
