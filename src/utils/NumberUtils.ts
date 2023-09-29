/**
 * Pad a number with leading zeros.
 * From https://stackoverflow.com/questions/10073699/pad-a-number-with-leading-zeros-in-javascript
 * @param pSource
 * @param pPadSize
 */
export function addZeroPadding(pSource: string | number, pPadSize: number): string {
    const source: string = (typeof pSource === "string") ? pSource : pSource.toString();
    return source.length >= pPadSize ? source : new Array(pPadSize - source.length + 1).join("0") + source;
}
