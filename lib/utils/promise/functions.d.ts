/**
 * Delays the execution of the subsequent code.
 * @param {number} seconds The delay time in seconds. Default is 0.
 * @returns {Promise<void>} A promise that resolves after the specified delay.
 */
export declare const delay: (seconds?: number) => Promise<void>;
/**
 * Checks if the given value is a promise.
 * @param {any} value The value to check.
 * @returns {boolean} True if the value is a promise, false otherwise.
 */
export declare const isPromise: (value: any) => value is Promise<any>;
//# sourceMappingURL=functions.d.ts.map