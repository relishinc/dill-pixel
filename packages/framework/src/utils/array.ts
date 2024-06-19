import {intBetween} from './random';

/**
 * Shuffle an array.
 * @param array
 */
export function shuffle<T>(array: T[]): void {
  let temp: T;
  let index: number;
  for (let i = 0; i < array.length; ++i) {
    index = intBetween(0, array.length);
    temp = array[i];
    array[i] = array[index];
    array[index] = temp;
  }
}

/**
 * Get a random array element.
 * @param array
 */
export function getRandomElement<T>(array: T[]): T {
  return array[intBetween(0, array.length)];
}
