/**
 * Delays the execution of the subsequent code.
 * @param {number} seconds The delay time in seconds. Default is 0.
 * @returns {Promise<void>} A promise that resolves after the specified delay.
 */
export const delay = (seconds = 0) => new Promise((resolve) => setTimeout(resolve, seconds * 1000));
/**
 * Checks if the given value is a promise.
 * @param {any} value The value to check.
 * @returns {boolean} True if the value is a promise, false otherwise.
 */
export const isPromise = (value) => value && typeof value.then === 'function';
