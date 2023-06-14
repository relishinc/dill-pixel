import { Dictionary } from "typescript-collections";
import {IFocusable} from "./IFocusable";
import {Direction} from "./KeyboardMap";

export class KeyboardMapToken {

    public readonly target: IFocusable;
    public readonly neighbours: Dictionary<Direction, IFocusable | undefined>;

    constructor(pFocusable: IFocusable, pUp?: IFocusable, pDown?: IFocusable, pLeft?: IFocusable,
                pRight?: IFocusable) {
        this.target = pFocusable;
        this.neighbours = new Dictionary<Direction, IFocusable | undefined>();
        this.neighbours.setValue(Direction.UP, pUp);
        this.neighbours.setValue(Direction.DOWN, pDown);
        this.neighbours.setValue(Direction.LEFT, pLeft);
        this.neighbours.setValue(Direction.RIGHT, pRight);
    }

    /**
     * @return a set of KeyboardMapToken that makes a row in keyboard navigation
     * @param pFocusables - the array of focusables aligned in a row
     * @param pUp - the outer focusable to navigate on up key
     * @param pDown - the outer focusable to navigate on down key
     * @param pLeft - the outer focusable to navigate on left key
     * @param pRight - the outer focusable to navigate on right key
     */
    public static getRow(pFocusables: IFocusable[], pUp?: IFocusable, pDown?: IFocusable, pLeft?: IFocusable,
                         pRight?: IFocusable) {
        const tokens: KeyboardMapToken[] = [];
        for (let i = 0, n = pFocusables.length; i < n; i++) {
            tokens.push(new KeyboardMapToken(pFocusables[i],
                pUp,
                pDown,
                i === 0 ? pLeft : pFocusables[i - 1],
                i === n - 1 ? pRight : pFocusables[i + 1]));
        }
        return tokens;
    }

    /**
     * @return a set of KeyboardMapToken that makes a column in keyboard navigation
     * @param pFocusables - the array of focusables aligned in a column
     * @param pUp - the outer focusable to navigate on up key
     * @param pDown - the outer focusable to navigate on down key
     * @param pLeft - the outer focusable to navigate on left key
     * @param pRight - the outer focusable to navigate on right key
     */
    public static getColumn(pFocusables: IFocusable[], pUp?: IFocusable, pDown?: IFocusable, pLeft?: IFocusable,
                            pRight?: IFocusable) {
        const tokens: KeyboardMapToken[] = [];
        for (let i = 0, n = pFocusables.length; i < n; i++) {
            tokens.push(new KeyboardMapToken(pFocusables[i],
                i === 0 ? pUp : pFocusables[i - 1],
                i === n - 1 ? pDown : pFocusables[i + 1],
                pLeft,
                pRight));
        }
        return tokens;
    }

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
    public static getTable(pFocusables: IFocusable[][], pUp?: IFocusable, pDown?: IFocusable, pLeft?: IFocusable,
                           pRight?: IFocusable) {
        const tokens: KeyboardMapToken[] = [];
        for (let i = 0, n = pFocusables.length; i < n; i++) {
            for (let j = 0, m = pFocusables[i].length; j < m; j++) {
                tokens.push(new KeyboardMapToken(pFocusables[i][j],
                    i === 0 ? pUp : pFocusables[i - 1][j],
                    i === n - 1 ? pDown : pFocusables[i + 1][j],
                    j === 0 ? pLeft : pFocusables[i][j - 1],
                    j === m - 1 ? pRight : pFocusables[i][j + 1]));
            }
        }
        return tokens;
    }
}
