
import * as PIXI from "pixi.js";
import * as MathUtils from "../Utils/MathUtils";

type Point = PIXI.Point | PIXI.ObservablePoint | PIXI.IPoint;

/**
 * Add the x and the y values of two PIXI.Points together and return a new point.
 * @param pA
 * @param pB
 * @returns PIXI.Point
 */
export function add(pA: Point, pB: Point): PIXI.Point {
    return new PIXI.Point(pA.x + pB.x, pA.y + pB.y);
}

/**
 * Increase the x,y of point A by the x,y of point B.
 * @param pA
 * @param pB
 */
export function addToPoint(pA: Point, pB: Point): void {
    pA.x += pB.x;
    pA.y += pB.y;
}

/**
 * Subtract the x and the y values of point B from Point A and return a new point.
 * @param pA
 * @param pB
 */
export function subtract(pA: Point, pB: Point): PIXI.Point {
    return new PIXI.Point(pA.x - pB.x, pA.y - pB.y);
}

/**
 * Decrease the x,y of point A by the x,y of point B.
 * @param pA
 * @param pB
 */
export function subtractFromPoint(pA: Point, pB: Point): void {
    pA.x -= pB.x;
    pA.y -= pB.y;
}

/**
 * Multply the x,y values of a point by the provided value.
 * @param pA
 * @param pMult
 */
export function multiply(pA: Point, pMult: number): PIXI.Point {
    const point: PIXI.Point = new PIXI.Point(pA.x, pA.y);
    point.x *= pMult;
    point.y *= pMult;
    return point;
}

/**
 *
 * @param pPoint
 * @param pPerc
 */
export function lerp(pPoint: PIXI.Point, pPerc: number): number {
    return MathUtils.lerp(pPoint.x, pPoint.y, pPerc);
}

/**
 * Get the distance between two points.
 * @param pA
 * @param pB
 */
export function distance(pA: Point, pB: Point): number {
    return Math.sqrt(distanceSq(pA, pB));
}

/**
 * Get the squared distance between two points.
 * @param pA
 * @param pB
 */
export function distanceSq(pA: Point, pB: Point): number {
    return (pB.x - pA.x) * (pB.x - pA.x) + (pB.y - pA.y) * (pB.y - pA.y);
}

/**
 * Gets the magnitude of a point.
 * @param pPoint
 */
export function magnitude(pPoint: Point): number {
    return Math.sqrt((pPoint.x * pPoint.x) + (pPoint.y * pPoint.y));
}
