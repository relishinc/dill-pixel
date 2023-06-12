"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bool = exports.intBetweenPoint = exports.intBetween = exports.floatBetweenPoint = exports.floatBetween = void 0;
/**
 * Find a float between two numbers, inclusive of {@param pMin} and exclusive of {@param pMax}.
 * @param pMin
 * @param pMax
 * @returns number
 */
function floatBetween(pMin, pMax) {
    return pMin + (Math.random() * (pMax - pMin));
}
exports.floatBetween = floatBetween;
/**
 * Find a float between the x,y of a Point
 * @param pPoint
 * @returns number
 */
function floatBetweenPoint(pPoint) {
    return floatBetween(pPoint.x, pPoint.y);
}
exports.floatBetweenPoint = floatBetweenPoint;
/**
 * Find an integer between two numbers, inclusive of {@param pMin} and exclusive of {@param pMax}.
 * @param pMin
 * @param pMax
 * @returns number
 */
function intBetween(pMin, pMax) {
    return Math.floor(floatBetween(pMin, pMax));
}
exports.intBetween = intBetween;
/**
 * Find an int between the x,y of a Point
 * @param pPoint
 * @returns number
 */
function intBetweenPoint(pPoint) {
    return intBetween(pPoint.x, pPoint.y);
}
exports.intBetweenPoint = intBetweenPoint;
/**
 * Get a random boolean value
 * @returns boolean
 */
function bool() {
    return Math.random() < 0.5;
}
exports.bool = bool;
//# sourceMappingURL=Random.js.map