export function getPreviousMapEntry(map: Map<any, any>, currentKey: any): [any, any] | undefined {
  let previous: [any, any] | undefined = undefined;

  for (const entry of map.entries()) {
    if (entry[0] === currentKey) {
      return previous; // Return the previous entry once the current key is found
    }
    previous = entry; // Update previous to the current entry before moving to the next
  }
  // If the currentKey was not found or is the first element, return undefined
  return undefined;
}

export function getLastMapEntry(map: Map<any, any>): any | undefined {
  // Convert the map keys to an array and return the last element
  return Array.from(map.entries()).pop();
}
