/**
 * Returns the map entry that comes before the entry with the provided key.
 * If the provided key is the first entry in the map or doesn't exist in the map, the function returns undefined.
 * @param {Map<K, V>} map The map to search in.
 * @param {any} currentKey The key of the map entry that comes after the desired entry.
 * @returns {[K, V] | undefined} The map entry that comes before the entry with the provided key, or undefined if such an entry doesn't exist.
 */
export declare function getPreviousMapEntry<K = any, V = any>(map: Map<K, V>, currentKey: any): [K, V] | undefined;
/**
 * Returns the last entry in the provided map.
 * If the map is empty, the function returns undefined.
 * @param {Map<K, V>} map The map to get the last entry from.
 * @returns {[K, V] | undefined} The last entry in the map, or undefined if the map is empty.
 */
export declare function getLastMapEntry<K = any, V = any>(map: Map<K, V>): [K, V] | undefined;
