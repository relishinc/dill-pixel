import { DeepPartial } from './types';

/**
 * Plucks the specified keys from an object and returns a new object with only those keys.
 * @template T The type of the original object.
 * @template K The keys to pluck from the original object.
 * @param {T} obj The original object.
 * @param {K[]} keys The keys to pluck from the original object.
 * @returns {Pick<T, K>} A new object with only the plucked keys.
 */
export function pluck<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  return keys.reduce((acc, key) => (key in obj ? { ...acc, [key]: obj[key] } : acc), {} as Pick<T, K>);
}

/**
 * Omits the specified keys from an object and returns a new object without those keys.
 * @template T The type of the original object.
 * @template K The keys to omit from the original object.
 * @param {K[]} keysToOmit The keys to omit from the original object.
 * @param {Partial<T>} obj The original object.
 * @returns {Omit<T, K>} A new object without the omitted keys.
 */
export function omitKeys<T extends object, K extends keyof T>(keysToOmit: K[], obj: Partial<T>): Omit<T, K> {
  return Object.entries(obj)
    .filter(([key]) => !keysToOmit.includes(key as K))
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {} as Omit<T, K>);
}

export function deepMerge<T extends Record<string, any>>(target: T, source: DeepPartial<T>): T {
  for (const key in source) {
    if (
      source[key] !== undefined &&
      Object.prototype.toString.call(source[key]) === '[object Object]' &&
      key in target &&
      typeof target[key] === 'object'
    ) {
      target[key] = deepMerge(target[key], source[key] as T[Extract<keyof T, string>]);
    } else if (source[key] !== undefined) {
      target[key] = source[key] as T[Extract<keyof T, string>];
    }
  }
  return target;
}
