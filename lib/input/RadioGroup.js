/**
 * Radio group
 * @template T
 */
export class RadioGroup {
    constructor() {
        this._elements = new Array();
        this._selectedIndex = -1;
    }
    /**
     * Adds element
     * @param pElement
     */
    addElement(pElement) {
        if (this._elements.indexOf(pElement) === -1) {
            this._elements.push(pElement);
            pElement.onSelected.push(this.onElementSelected.bind(this));
            pElement.onDeselected.push(this.onElementDeselected.bind(this));
        }
    }
    /**
     * Removes element
     * @param pElement
     */
    removeElement(pElement) {
        const index = this._elements.indexOf(pElement);
        if (index !== -1) {
            if (index === this._selectedIndex) {
                this._selectedIndex = -1;
            }
            else if (index < this._selectedIndex) {
                --this._selectedIndex;
            }
            this._elements.splice(index, 1);
        }
    }
    /**
     * Deselects radio group
     */
    deselect() {
        if (this._selectedIndex !== -1) {
            this._elements[this._selectedIndex].deselect();
            this._selectedIndex = -1;
        }
    }
    /**
     * Disables radio group
     * @param pExcept
     */
    disable(pExcept) {
        this.deselect();
        for (let i = 0; i < this._elements.length; ++i) {
            if (this._elements[i] !== pExcept) {
                this._elements[i].interactive = false;
            }
        }
    }
    /**
     * Enables radio group
     */
    enable() {
        for (let i = 0; i < this._elements.length; ++i) {
            this._elements[i].interactive = false;
        }
    }
    /**
     * onElementSelected
     * @param pElement
     */
    onElementSelected(pElement) {
        this.deselect();
        this._selectedIndex = this._elements.indexOf(pElement);
    }
    /**
     * onElementDeselected
     * @param pElement
     */
    onElementDeselected(pElement) {
        if (this._selectedIndex === this._elements.indexOf(pElement)) {
            this._selectedIndex = -1;
        }
    }
}
//# sourceMappingURL=RadioGroup.js.map