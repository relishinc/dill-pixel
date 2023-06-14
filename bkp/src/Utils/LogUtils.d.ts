export declare const STYLE_RED_BOLD: string;
export declare const STYLE_RELISH: string;
export declare const STYLE_RELISH_BOLD: string;
export declare const STYLE_BLUE_BOLD: string;
export declare const STYLE_LIGHT_BLUE: string;
export declare const STYLE_PINK_DARK: string;
export declare const STYLE_BLACK: string;
export declare const STYLE_WHITE: string;
export declare const COLOR_LIGHT_BLUE: string;
export declare const COLOR_RELISH: string;
export declare class LogOptions {
    className: string;
    color: string;
}
/**
 * Logs an error message
 * @param pText The error message to print.
 * @param pOptions Text options. Includes color and class name
 * @param [pParams] Optional data to be included in the error message.
 */
export declare function logError(pText: string, pOptions: LogOptions, ...pParams: any[]): void;
/**
 * Logs a warning message
 * @param pText The warning message to print.
 * @param pOptions Text options. Includes color and class name
 * @param [pParams] Optional data to be included in the warning message.
 */
export declare function logWarning(pText: string, pOptions: LogOptions, ...pParams: any[]): void;
/**
 * Logs a message
 * @param pText The message to print.
 * @param pOptions Text options. Includes color and class name
 * @param [pParams] Optional data to be included in the message.
 */
export declare function log(pText: string, pOptions: LogOptions, ...pParams: any[]): void;
//# sourceMappingURL=LogUtils.d.ts.map