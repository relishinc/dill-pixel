import { IHitArea } from "pixi.js";
import { PixiShape } from "../Utils/PixiUtils";
/**
 * Compound hit area
 */
export declare class CompoundHitArea implements IHitArea {
    private _components;
    constructor(pComponents: PixiShape[]);
    /**
     * Gets components
     */
    get components(): PixiShape[];
    /**
     * contains
     * @param pX
     * @param pY
     * @returns boolean
     */
    contains(pX: number, pY: number): boolean;
}
//# sourceMappingURL=CompoundHitArea.d.ts.map