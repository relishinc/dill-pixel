import { Point } from "pixi.js";
/**
 *
 * @param pRect
 * @param pDelta
 */
export function offset(pRect, pDelta) {
    pRect.x += pDelta.x;
    pRect.y += pDelta.y;
    return pRect;
}
/**
 *
 * @param pRect
 * @param pOutput
 */
export function center(pRect, pOutput) {
    if (pOutput === undefined) {
        pOutput = new Point();
    }
    pOutput.set(pRect.x + pRect.width * 0.5, pRect.y + pRect.height * 0.5);
    return pOutput;
}
/**
 * Scale a rectangle by a provided value
 * @param pRect
 * @param pScale
 */
export function scale(pRect, pScale) {
    pRect.x *= pScale;
    pRect.y *= pScale;
    pRect.width *= pScale;
    pRect.height *= pScale;
    return pRect;
}
/**
 * Returns a `Point` representing the width and height of the input Rectangle
 * @param pRect
 * @param pOutput
 */
export function size(pRect, pOutput) {
    if (pOutput === undefined) {
        pOutput = new Point();
    }
    pOutput.set(pRect.width, pRect.height);
    return pOutput;
}
//# sourceMappingURL=RectUtils.js.map