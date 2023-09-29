import * as Random from './Random';

/**
 * Shuffle an array.
 * @param pArray
 */
export function shuffle<T>(pArray: T[]): void {
  let temp: T;
  let index: number;
  for (let i = 0; i < pArray.length; ++i) {
    index = Random.intBetween(0, pArray.length);
    temp = pArray[i];
    pArray[i] = pArray[index];
    pArray[index] = temp;
  }
}

/**
 * Get a random array element.
 * @param pArray
 */
export function random<T>(pArray: T[]): T {
  return pArray[Random.intBetween(0, pArray.length)];
}
