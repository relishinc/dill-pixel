/**
 * Capitalize a string.
 * From: https://stackoverflow.com/questions/2332811/capitalize-words-in-string
 * @param pString
 */
export function capitalize(pString: string): string {
    return pString.replace(/\b\w/g, (l) => l.toUpperCase());
}
