import { ISelectable } from "../Input/ISelectable";
/**
 * Radio group
 * @template T
 */
export declare class RadioGroup<T extends ISelectable> {
    private _elements;
    private _selectedIndex;
    constructor();
    /**
     * Adds element
     * @param pElement
     */
    addElement(pElement: T): void;
    /**
     * Removes element
     * @param pElement
     */
    removeElement(pElement: T): void;
    /**
     * Deselects radio group
     */
    deselect(): void;
    /**
     * Disables radio group
     * @param pExcept
     */
    disable(pExcept: T): void;
    /**
     * Enables radio group
     */
    enable(): void;
    /**
     * onElementSelected
     * @param pElement
     */
    private onElementSelected;
    /**
     * onElementDeselected
     * @param pElement
     */
    private onElementDeselected;
}
//# sourceMappingURL=RadioGroup.d.ts.map