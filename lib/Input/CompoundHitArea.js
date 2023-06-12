"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompoundHitArea = void 0;
/**
 * Compound hit area
 */
class CompoundHitArea {
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
exports.CompoundHitArea = CompoundHitArea;
//# sourceMappingURL=CompoundHitArea.js.map