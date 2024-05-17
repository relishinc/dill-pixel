/**
 * Clamp a number
 * @param pValue
 * @param pMin
 * @param pMax
 */
export function clamp(pValue, pMin, pMax) {
    return Math.max(pMin, Math.min(pMax, pValue));
}
/**
 * lerp
 * @param pMin
 * @param pMax
 * @param pPerc
 */
export function lerp(pMin, pMax, pPerc) {
    return pMin + (pMax - pMin) * pPerc;
}
