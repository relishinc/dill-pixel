"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.size = exports.scale = exports.center = exports.offset = void 0;
const pixi_js_1 = require("pixi.js");
/**
 *
 * @param pRect
 * @param pDelta
 */
function offset(pRect, pDelta) {
    pRect.x += pDelta.x;
    pRect.y += pDelta.y;
    return pRect;
}
exports.offset = offset;
/**
 *
 * @param pRect
 * @param pOutput
 */
function center(pRect, pOutput) {
    if (pOutput === undefined) {
        pOutput = new pixi_js_1.Point();
    }
    pOutput.set(pRect.x + pRect.width * 0.5, pRect.y + pRect.height * 0.5);
    return pOutput;
}
exports.center = center;
/**
 * Scale a rectangle by a provided value
 * @param pRect
 * @param pScale
 */
function scale(pRect, pScale) {
    pRect.x *= pScale;
    pRect.y *= pScale;
    pRect.width *= pScale;
    pRect.height *= pScale;
    return pRect;
}
exports.scale = scale;
/**
 * Returns a `Point` representing the width and height of the input Rectangle
 * @param pRect
 * @param pOutput
 */
function size(pRect, pOutput) {
    if (pOutput === undefined) {
        pOutput = new pixi_js_1.Point();
    }
    pOutput.set(pRect.width, pRect.height);
    return pOutput;
}
exports.size = size;
//# sourceMappingURL=RectUtils.js.map