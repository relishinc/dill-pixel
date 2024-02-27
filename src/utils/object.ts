export function pluck<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const pluckedObj: Partial<T> = {};
  keys.forEach((key) => {
    if (key in obj) {
      pluckedObj[key] = obj[key];
    }
  });
  return pluckedObj as Pick<T, K>;
}

export function omitKeys<T extends object, K extends keyof T>(keysToOmit: K[], obj: Partial<T>): Omit<T, K> {
  // Convert the object into an array of [key, value] pairs,
  // then filter out the pairs where the key is in the keysToOmit array,
  const entries = Object.entries(obj).filter(([key]) => !keysToOmit.includes(key as K));
  const result = {} as Omit<T, K>;
  entries.forEach(([key, value]) => {
    if (key !== undefined) {
      (result as any)[key] = value;
    }
  });
  return result;
}
