import * as PIXI from "pixi.js";

/**
 *
 * @param pRect
 * @param pDelta
 */
export function offset(pRect: PIXI.Rectangle, pDelta: PIXI.Point): PIXI.Rectangle {
    pRect.x += pDelta.x;
    pRect.y += pDelta.y;
    return pRect;
}

/**
 *
 * @param pRect
 * @param pOutput
 */
export function center(pRect: PIXI.Rectangle, pOutput?: PIXI.Point): PIXI.Point {
    if (pOutput === undefined) {
        pOutput = new PIXI.Point();
    }
    pOutput.set(pRect.x + pRect.width * 0.5, pRect.y + pRect.height * 0.5);
    return pOutput;
}

/**
 * Scale a rectangle by a provided value
 * @param pRect
 * @param pScale
 */
export function scale(pRect: PIXI.Rectangle, pScale: number): PIXI.Rectangle {
    pRect.x *= pScale;
    pRect.y *= pScale;
    pRect.width *= pScale;
    pRect.height *= pScale;
    return pRect;
}

/**
 * Returns a `PIXI.Point` representing the width and height of the input Rectangle
 * @param pRect
 * @param pOutput
 */
export function size(pRect: PIXI.Rectangle, pOutput?: PIXI.Point): PIXI.IPoint {
    if (pOutput === undefined) {
        pOutput = new PIXI.Point();
    }
    pOutput.set(pRect.width, pRect.height);
    return pOutput;
}
