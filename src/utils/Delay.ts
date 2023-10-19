/**
 * delay
 * @param delayInSeconds
 */
export function delay(delayInSeconds: number = 0): Promise<void> {
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
export function cancellableDelay(delayInSeconds: number = 0): [Promise<unknown>, () => void] {
  let timeoutId: any | undefined;
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
export function Delay(delayInSeconds: number = 0): Promise<void> {
  return delay(delayInSeconds);
}
