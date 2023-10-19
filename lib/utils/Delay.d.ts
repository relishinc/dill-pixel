/**
 * delay
 * @param delayInSeconds
 */
export declare function delay(delayInSeconds?: number): Promise<void>;
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
export declare function cancellableDelay(delayInSeconds?: number): [Promise<unknown>, () => void];
/**
 * @deprecated
 * @param delayInSeconds
 * @constructor
 */
export declare function Delay(delayInSeconds?: number): Promise<void>;
//# sourceMappingURL=Delay.d.ts.map