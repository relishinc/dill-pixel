"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lerp = exports.clamp = void 0;
/**
 * Clamp a number
 * @param pValue
 * @param pMin
 * @param pMax
 */
function clamp(pValue, pMin, pMax) {
    return Math.max(pMin, Math.min(pMax, pValue));
}
exports.clamp = clamp;
/**
 * lerp
 * @param pMin
 * @param pMax
 * @param pPerc
 */
function lerp(pMin, pMax, pPerc) {
    return pMin + ((pMax - pMin) * pPerc);
}
exports.lerp = lerp;
//# sourceMappingURL=MathUtils.js.map