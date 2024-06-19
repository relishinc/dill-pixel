/**
 * Delays the execution of the subsequent code.
 * @param {number} seconds The delay time in seconds. Default is 0.
 * @returns {Promise<void>} A promise that resolves after the specified delay.
 */
export const delay = (seconds: number = 0): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, seconds * 1000));

export const wait = (seconds: number = 0): Promise<void> => delay(seconds);

/**
 * Checks if the given value is a promise.
 * @param {any} value The value to check.
 * @returns {boolean} True if the value is a promise, false otherwise.
 */
export const isPromise = (value: any): value is Promise<any> => value && typeof value.then === 'function';
