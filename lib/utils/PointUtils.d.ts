import { IPoint, Point } from 'pixi.js';
/**
 * Add the x and the y values of two Points together and return a new point.
 * @param pA
 * @param pB
 * @returns Point
 */
export declare function add(pA: IPoint, pB: IPoint): Point;
/**
 * Increase the x,y of point A by the x,y of point B.
 * @param pA
 * @param pB
 */
export declare function addToPoint(pA: IPoint, pB: IPoint): void;
/**
 * Subtract the x and the y values of point B from Point A and return a new point.
 * @param pA
 * @param pB
 */
export declare function subtract(pA: IPoint, pB: IPoint): Point;
/**
 * Decrease the x,y of point A by the x,y of point B.
 * @param pA
 * @param pB
 */
export declare function subtractFromPoint(pA: IPoint, pB: IPoint): void;
/**
 * Multply the x,y values of a point by the provided value.
 * @param pA
 * @param pMult
 */
export declare function multiply(pA: IPoint, pMult: number): Point;
/**
 *
 * @param pPoint
 * @param pPerc
 */
export declare function lerp(pPoint: IPoint, pPerc: number): number;
/**
 * Get the distance between two points.
 * @param pA
 * @param pB
 */
export declare function distance(pA: IPoint, pB: Point): number;
/**
 * Get the squared distance between two points.
 * @param pA
 * @param pB
 */
export declare function distanceSq(pA: IPoint, pB: Point): number;
/**
 * Gets the magnitude of a point.
 * @param pPoint
 */
export declare function magnitude(pPoint: IPoint): number;
//# sourceMappingURL=PointUtils.d.ts.map