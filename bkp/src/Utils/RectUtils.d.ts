import { IPoint, Point, Rectangle } from "pixi.js";
/**
 *
 * @param pRect
 * @param pDelta
 */
export declare function offset(pRect: Rectangle, pDelta: Point): Rectangle;
/**
 *
 * @param pRect
 * @param pOutput
 */
export declare function center(pRect: Rectangle, pOutput?: Point): Point;
/**
 * Scale a rectangle by a provided value
 * @param pRect
 * @param pScale
 */
export declare function scale(pRect: Rectangle, pScale: number): Rectangle;
/**
 * Returns a `Point` representing the width and height of the input Rectangle
 * @param pRect
 * @param pOutput
 */
export declare function size(pRect: Rectangle, pOutput?: Point): IPoint;
//# sourceMappingURL=RectUtils.d.ts.map