"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.capitalize = void 0;
/**
 * Capitalize a string.
 * From: https://stackoverflow.com/questions/2332811/capitalize-words-in-string
 * @param pString
 */
function capitalize(pString) {
    return pString.replace(/\b\w/g, (l) => l.toUpperCase());
}
exports.capitalize = capitalize;
//# sourceMappingURL=StringUtils.js.map