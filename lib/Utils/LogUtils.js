export const STYLE_RED_BOLD = "color: red; font-weight: bold";
export const STYLE_RELISH = "color: #74b64c";
export const STYLE_RELISH_BOLD = "color: #74b64c; font-weight: bold";
export const STYLE_BLUE_BOLD = "color: blue; font-weight: bold";
export const STYLE_LIGHT_BLUE = "color: #3580bd";
export const STYLE_PINK_DARK = "color: #cf0198";
export const STYLE_BLACK = "color: black";
export const STYLE_WHITE = "color: white";
export const COLOR_LIGHT_BLUE = "#3580bd";
export const COLOR_RELISH = "#74b64c";
export class LogOptions {
    constructor() {
        this.className = "";
        this.color = "black";
    }
}
/**
 * Logs an error message
 * @param pText The error message to print.
 * @param pOptions Text options. Includes color and class name
 * @param [pParams] Optional data to be included in the error message.
 */
export function logError(pText, pOptions, ...pParams) {
    console.error("%c[%s]%c -- " + pText, "color: " + pOptions.color, pOptions.className, STYLE_WHITE, ...pParams);
}
/**
 * Logs a warning message
 * @param pText The warning message to print.
 * @param pOptions Text options. Includes color and class name
 * @param [pParams] Optional data to be included in the warning message.
 */
export function logWarning(pText, pOptions, ...pParams) {
    console.warn("%c[%s]%c -- " + pText, "color: " + pOptions.color, pOptions.className, STYLE_BLACK, ...pParams);
}
/**
 * Logs a message
 * @param pText The message to print.
 * @param pOptions Text options. Includes color and class name
 * @param [pParams] Optional data to be included in the message.
 */
export function log(pText, pOptions, ...pParams) {
    console.log("%c[%s]%c -- " + pText, "color: " + pOptions.color, pOptions.className, STYLE_BLACK, ...pParams);
}
//# sourceMappingURL=LogUtils.js.map