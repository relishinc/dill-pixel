export const STYLE_RED_BOLD: string = "color: red; font-weight: bold";
export const STYLE_RELISH: string = "color: #74b64c";
export const STYLE_RELISH_BOLD: string = "color: #74b64c; font-weight: bold";
export const STYLE_BLUE_BOLD: string = "color: blue; font-weight: bold";
export const STYLE_LIGHT_BLUE: string = "color: #3580bd";
export const STYLE_PINK_DARK: string = "color: #cf0198";
export const STYLE_BLACK: string = "color: black";
export const STYLE_WHITE: string = "color: white";
export const COLOR_LIGHT_BLUE: string = "#3580bd";
export const COLOR_RELISH: string = "#74b64c";

export class LogOptions {
	public className: string = "";
	public color: string = "black";
}

/**
 * Logs an error message
 * @param pText The error message to print.
 * @param pOptions Text options. Includes color and class name
 * @param [pParams] Optional data to be included in the error message.
 */
export function logError(
	pText: string,
	pOptions: LogOptions,
	...pParams: any[]
): void {
	console.error(
		"%c[%s]%c -- " + pText,
		"color: " + pOptions.color,
		pOptions.className,
		STYLE_WHITE,
		...pParams
	);
}

/**
 * Logs a warning message
 * @param pText The warning message to print.
 * @param pOptions Text options. Includes color and class name
 * @param [pParams] Optional data to be included in the warning message.
 */
export function logWarning(
	pText: string,
	pOptions: LogOptions,
	...pParams: any[]
): void {
	console.warn(
		"%c[%s]%c -- " + pText,
		"color: " + pOptions.color,
		pOptions.className,
		STYLE_BLACK,
		...pParams
	);
}

/**
 * Logs a message
 * @param pText The message to print.
 * @param pOptions Text options. Includes color and class name
 * @param [pParams] Optional data to be included in the message.
 */
export function log(
	pText: string,
	pOptions: LogOptions,
	...pParams: any[]
): void {
	console.log(
		"%c[%s]%c -- " + pText,
		"color: " + pOptions.color,
		pOptions.className,
		STYLE_BLACK,
		...pParams
	);
}
