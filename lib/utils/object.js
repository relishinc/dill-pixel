/**
 * Plucks the specified keys from an object and returns a new object with only those keys.
 * @template T The type of the original object.
 * @template K The keys to pluck from the original object.
 * @param {T} obj The original object.
 * @param {K[]} keys The keys to pluck from the original object.
 * @returns {Pick<T, K>} A new object with only the plucked keys.
 */
export function pluck(obj, keys) {
    return keys.reduce((acc, key) => (key in obj ? { ...acc, [key]: obj[key] } : acc), {});
}
/**
 * Omits the specified keys from an object and returns a new object without those keys.
 * @template T The type of the original object.
 * @template K The keys to omit from the original object.
 * @param {K[]} keysToOmit The keys to omit from the original object.
 * @param {Partial<T>} obj The original object.
 * @returns {Omit<T, K>} A new object without the omitted keys.
 */
export function omitKeys(keysToOmit, obj) {
    return Object.entries(obj)
        .filter(([key]) => !keysToOmit.includes(key))
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
}
//# sourceMappingURL=object.js.map