/**
 * Find a float between two numbers, inclusive of {@param pMin} and exclusive of {@param pMax}.
 * @param pMin
 * @param pMax
 * @returns number
 */
export function floatBetween(pMin, pMax) {
    return pMin + (Math.random() * (pMax - pMin));
}
/**
 * Find a float between the x,y of a Point
 * @param pPoint
 * @returns number
 */
export function floatBetweenPoint(pPoint) {
    return floatBetween(pPoint.x, pPoint.y);
}
/**
 * Find an integer between two numbers, inclusive of {@param pMin} and exclusive of {@param pMax}.
 * @param pMin
 * @param pMax
 * @returns number
 */
export function intBetween(pMin, pMax) {
    return Math.floor(floatBetween(pMin, pMax));
}
/**
 * Find an int between the x,y of a Point
 * @param pPoint
 * @returns number
 */
export function intBetweenPoint(pPoint) {
    return intBetween(pPoint.x, pPoint.y);
}
/**
 * Get a random boolean value
 * @returns boolean
 */
export function bool() {
    return Math.random() < 0.5;
}
//# sourceMappingURL=Random.js.map