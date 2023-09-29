/**
 * Compound hit area
 */
export class CompoundHitArea {
    constructor(pComponents) {
        this._components = pComponents;
    }
    /**
     * Gets components
     */
    get components() {
        return this._components;
    }
    /**
     * contains
     * @param pX
     * @param pY
     * @returns boolean
     */
    contains(pX, pY) {
        for (let i = 0; i < this._components.length; ++i) {
            if (this._components[i].contains(pX, pY)) {
                return true;
            }
        }
        return false;
    }
}
//# sourceMappingURL=CompoundHitArea.js.map