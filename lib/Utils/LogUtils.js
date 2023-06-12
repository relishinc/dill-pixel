"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = exports.logWarning = exports.logError = exports.LogOptions = exports.COLOR_RELISH = exports.COLOR_LIGHT_BLUE = exports.STYLE_WHITE = exports.STYLE_BLACK = exports.STYLE_PINK_DARK = exports.STYLE_LIGHT_BLUE = exports.STYLE_BLUE_BOLD = exports.STYLE_RELISH_BOLD = exports.STYLE_RELISH = exports.STYLE_RED_BOLD = void 0;
exports.STYLE_RED_BOLD = "color: red; font-weight: bold";
exports.STYLE_RELISH = "color: #74b64c";
exports.STYLE_RELISH_BOLD = "color: #74b64c; font-weight: bold";
exports.STYLE_BLUE_BOLD = "color: blue; font-weight: bold";
exports.STYLE_LIGHT_BLUE = "color: #3580bd";
exports.STYLE_PINK_DARK = "color: #cf0198";
exports.STYLE_BLACK = "color: black";
exports.STYLE_WHITE = "color: white";
exports.COLOR_LIGHT_BLUE = "#3580bd";
exports.COLOR_RELISH = "#74b64c";
class LogOptions {
    constructor() {
        this.className = "";
        this.color = "black";
    }
}
exports.LogOptions = LogOptions;
/**
 * Logs an error message
 * @param pText The error message to print.
 * @param pOptions Text options. Includes color and class name
 * @param [pParams] Optional data to be included in the error message.
 */
function logError(pText, pOptions, ...pParams) {
    console.error("%c[%s]%c -- " + pText, "color: " + pOptions.color, pOptions.className, exports.STYLE_BLACK, ...pParams);
}
exports.logError = logError;
/**
 * Logs a warning message
 * @param pText The warning message to print.
 * @param pOptions Text options. Includes color and class name
 * @param [pParams] Optional data to be included in the warning message.
 */
function logWarning(pText, pOptions, ...pParams) {
    console.warn("%c[%s]%c -- " + pText, "color: " + pOptions.color, pOptions.className, exports.STYLE_BLACK, ...pParams);
}
exports.logWarning = logWarning;
/**
 * Logs a message
 * @param pText The message to print.
 * @param pOptions Text options. Includes color and class name
 * @param [pParams] Optional data to be included in the message.
 */
function log(pText, pOptions, ...pParams) {
    console.log("%c[%s]%c -- " + pText, "color: " + pOptions.color, pOptions.className, exports.STYLE_BLACK, ...pParams);
}
exports.log = log;
//# sourceMappingURL=LogUtils.js.map