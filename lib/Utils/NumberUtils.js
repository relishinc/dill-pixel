"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addZeroPadding = void 0;
/**
 * Pad a number with leading zeros.
 * From https://stackoverflow.com/questions/10073699/pad-a-number-with-leading-zeros-in-javascript
 * @param pSource
 * @param pPadSize
 */
function addZeroPadding(pSource, pPadSize) {
    const source = (typeof pSource === "string") ? pSource : pSource.toString();
    return source.length >= pPadSize ? source : new Array(pPadSize - source.length + 1).join("0") + source;
}
exports.addZeroPadding = addZeroPadding;
//# sourceMappingURL=NumberUtils.js.map