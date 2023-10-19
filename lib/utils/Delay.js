/**
 * delay
 * @param delayInSeconds
 */
export function delay(delayInSeconds = 0) {
    return new Promise((resolve) => setTimeout(resolve, delayInSeconds * 1000));
}
/**
 * delay
 * @param delayInSeconds
 * @usage
 * const [delay, cancel] = cancellableDelay(5);
 *
 * // Assume checkCondition is some function that returns a boolean
 * if (checkCondition()) {
 *   cancel();  // Cancel the delay if the condition is met
 * } else {
 *   await delay;  // Otherwise, wait for the delay to elapse
 * }
 *
 * // Continue with the rest of your code...
 */
export function cancellableDelay(delayInSeconds = 0) {
    let timeoutId;
    const promise = new Promise((resolve) => {
        timeoutId = setTimeout(resolve, delayInSeconds * 1000);
    });
    const cancel = () => {
        if (timeoutId !== undefined) {
            clearTimeout(timeoutId);
        }
    };
    return [promise, cancel];
}
/**
 * @deprecated
 * @param delayInSeconds
 * @constructor
 */
export function Delay(delayInSeconds = 0) {
    return delay(delayInSeconds);
}
//# sourceMappingURL=Delay.js.map