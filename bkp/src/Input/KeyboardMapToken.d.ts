import { Dictionary } from "typescript-collections";
import { IFocusable } from "./IFocusable";
import { Direction } from "./KeyboardMap";
export declare class KeyboardMapToken {
    readonly target: IFocusable;
    readonly neighbours: Dictionary<Direction, IFocusable | undefined>;
    constructor(pFocusable: IFocusable, pUp?: IFocusable, pDown?: IFocusable, pLeft?: IFocusable, pRight?: IFocusable);
    /**
     * @return a set of KeyboardMapToken that makes a row in keyboard navigation
     * @param pFocusables - the array of focusables aligned in a row
     * @param pUp - the outer focusable to navigate on up key
     * @param pDown - the outer focusable to navigate on down key
     * @param pLeft - the outer focusable to navigate on left key
     * @param pRight - the outer focusable to navigate on right key
     */
    static getRow(pFocusables: IFocusable[], pUp?: IFocusable, pDown?: IFocusable, pLeft?: IFocusable, pRight?: IFocusable): KeyboardMapToken[];
    /**
     * @return a set of KeyboardMapToken that makes a column in keyboard navigation
     * @param pFocusables - the array of focusables aligned in a column
     * @param pUp - the outer focusable to navigate on up key
     * @param pDown - the outer focusable to navigate on down key
     * @param pLeft - the outer focusable to navigate on left key
     * @param pRight - the outer focusable to navigate on right key
     */
    static getColumn(pFocusables: IFocusable[], pUp?: IFocusable, pDown?: IFocusable, pLeft?: IFocusable, pRight?: IFocusable): KeyboardMapToken[];
    /**
     * @return a set of KeyboardMapToken that makes a table in keyboard navigation
     * @param pFocusables - the array of focusables aligned in a table like:
     * [
     *  [a,b,c],
     *  [d,e,f]
     * ]
     * @param pUp - the outer focusable to navigate on up key
     * @param pDown - the outer focusable to navigate on down key
     * @param pLeft - the outer focusable to navigate on left key
     * @param pRight - the outer focusable to navigate on right key
     */
    static getTable(pFocusables: IFocusable[][], pUp?: IFocusable, pDown?: IFocusable, pLeft?: IFocusable, pRight?: IFocusable): KeyboardMapToken[];
}
//# sourceMappingURL=KeyboardMapToken.d.ts.map