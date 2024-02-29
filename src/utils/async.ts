export function delay(delayInSeconds: number = 0): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, delayInSeconds * 1000));
}

export function isPromise(value: any): value is Promise<any> {
  return value && typeof value.then === 'function';
}
