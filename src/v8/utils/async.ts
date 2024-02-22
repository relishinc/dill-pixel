export function delay(delayInSeconds: number = 0): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, delayInSeconds * 1000));
}
