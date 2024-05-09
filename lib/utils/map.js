/**
 * Returns the map entry that comes before the entry with the provided key.
 * If the provided key is the first entry in the map or doesn't exist in the map, the function returns undefined.
 * @param {Map<K, V>} map The map to search in.
 * @param {any} currentKey The key of the map entry that comes after the desired entry.
 * @returns {[K, V] | undefined} The map entry that comes before the entry with the provided key, or undefined if such an entry doesn't exist.
 */
export function getPreviousMapEntry(map, currentKey) {
    let previous;
    for (const entry of map) {
        if (entry[0] === currentKey) {
            return previous;
        }
        previous = entry;
    }
}
/**
 * Returns the last entry in the provided map.
 * If the map is empty, the function returns undefined.
 * @param {Map<K, V>} map The map to get the last entry from.
 * @returns {[K, V] | undefined} The last entry in the map, or undefined if the map is empty.
 */
export function getLastMapEntry(map) {
    return Array.from(map.entries()).pop();
}
