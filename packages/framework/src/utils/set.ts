/**
 * Filters a Set based on the provided filter function.
 * @param set The original Set to filter.
 * @param filterFunction The function used to filter the Set.
 * @returns A new Set containing only the elements that satisfy the filter function.
 */
export function filterSet<T>(set: Set<T>, filterFunction: (item: T) => boolean): Set<T> {
  const filteredSet = new Set<T>();
  for (const item of set) {
    if (filterFunction(item)) {
      filteredSet.add(item);
    }
  }
  return filteredSet;
}

export function firstFromSet<T = any>(set: Set<T>): T | undefined {
  return set?.values().next().value;
}

/**
 * Gets the last element of a Set.
 * @param set The Set from which to retrieve the last element.
 * @returns The last element of the Set, or undefined if the Set is empty.
 */
export function lastFromSet<T>(set: Set<T>): T | undefined {
  let lastElement: T | undefined = undefined;
  for (const item of set) {
    lastElement = item;
  }
  return lastElement;
}
