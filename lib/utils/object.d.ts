/**
 * Plucks the specified keys from an object and returns a new object with only those keys.
 * @template T The type of the original object.
 * @template K The keys to pluck from the original object.
 * @param {T} obj The original object.
 * @param {K[]} keys The keys to pluck from the original object.
 * @returns {Pick<T, K>} A new object with only the plucked keys.
 */
export declare function pluck<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K>;
/**
 * Omits the specified keys from an object and returns a new object without those keys.
 * @template T The type of the original object.
 * @template K The keys to omit from the original object.
 * @param {K[]} keysToOmit The keys to omit from the original object.
 * @param {Partial<T>} obj The original object.
 * @returns {Omit<T, K>} A new object without the omitted keys.
 */
export declare function omitKeys<T extends object, K extends keyof T>(keysToOmit: K[], obj: Partial<T>): Omit<T, K>;
