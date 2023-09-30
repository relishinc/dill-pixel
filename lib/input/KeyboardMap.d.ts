import { IFocusable } from './IFocusable';
export declare enum Direction {
    UP = "Up",
    RIGHT = "Right",
    DOWN = "Down",
    LEFT = "Left",
    FORWARDS = "Forwards",
    BACKWARDS = "Backwards"
}
/**
 * Keyboard map
 */
export declare class KeyboardMap {
    private _isActive;
    private _currentFocusable;
    private _focusables;
    private _neighbours;
    /**
     * Sets whether is active
     * @param pValue
     */
    set isActive(pValue: boolean);
    get currentFocusable(): IFocusable | undefined;
    /**
     * Clears keyboard map
     */
    clear(): void;
    /**
     * Registers focusable
     * @param pFocusable
     */
    registerFocusable(pFocusable: IFocusable | IFocusable[]): void;
    /**
     * Unregisters focusable
     * @param pFocusable
     */
    unregisterFocusable(pFocusable: (IFocusable | ((it: IFocusable) => boolean)) | (IFocusable | ((it: IFocusable) => boolean))[]): void;
    /**
     * Steps keyboard map
     * @param pDirection
     */
    step(pDirection: Direction): void;
    /**
     * Clears focus
     */
    clearFocus(): void;
    /**
     * Sets focus on a node if that node is interactive AND visible.
     * @param pFocusable
     */
    setFocus(pFocusable: IFocusable): void;
    /**
     * Focuses the first node that is both interactive and visible
     */
    focusFirstNode(): void;
    /**
     * Activates focussed node
     */
    activateFocussedNode(): void;
    /**
     * Sets a neighbour for a node
     * @param pFocusable
     * @param pNeighbour
     * @param pDirection
     */
    forceNeighbour(pFocusable: IFocusable, pNeighbour: IFocusable, pDirection: Direction): void;
    clearNeighbours(): void;
    private stepToNeighbour;
    private stepToNearest;
    /**
     * Calculates weight
     * @todo SH: Optimize
     * @param posA
     * @param posB
     * @param pDirection
     * @returns weight
     */
    private calculateWeight;
    /**
     * Temps keyboard map
     * @param pParallel
     * @param pPerpendicular
     * @returns temp
     */
    private temp;
    private isFocusable;
}
//# sourceMappingURL=KeyboardMap.d.ts.map