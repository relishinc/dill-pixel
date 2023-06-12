import * as Random from "../Utils/Random";
/**
 * Shuffle an array.
 * @param pArray
 */
export function shuffle(pArray) {
    let temp;
    let index;
    for (let i = 0; i < pArray.length; ++i) {
        index = Random.intBetween(0, pArray.length);
        temp = pArray[i];
        pArray[i] = pArray[index];
        pArray[index] = temp;
    }
}
/**
 * Get a random array element.
 * @param pArray
 */
export function random(pArray) {
    return pArray[Random.intBetween(0, pArray.length)];
}
//# sourceMappingURL=ArrayUtils.js.map