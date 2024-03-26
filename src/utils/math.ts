/**
 * Clamp a number
 * @param pValue
 * @param pMin
 * @param pMax
 */
export function clamp(pValue: number, pMin: number, pMax: number): number {
  return Math.max(pMin, Math.min(pMax, pValue));
}

/**
 * lerp
 * @param pMin
 * @param pMax
 * @param pPerc
 */
export function lerp(pMin: number, pMax: number, pPerc: number): number {
  return pMin + (pMax - pMin) * pPerc;
}
