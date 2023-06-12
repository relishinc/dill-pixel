import * as PIXI from "pixi.js";
/**
 * Hit area renderer
 */
export declare class HitAreaRenderer extends PIXI.Container {
    private _root;
    private _graphics;
    private _interval;
    private _elapsed;
    private _active;
    constructor(pRoot: PIXI.DisplayObject, pActive?: boolean, pInterval?: number);
    /**
     * Gets active
     */
    get active(): boolean;
    /**
     * Sets active
     */
    set active(pValue: boolean);
    /**
     * Sets interval
     */
    set interval(pValue: number);
    /**
     *
     * @param pDeltaTime
     */
    update(pDeltaTime: number): void;
    /**
     * Renders hit area renderer
     */
    renderHitAreas(): void;
    /**
     * Clears hit area renderer
     */
    clear(): void;
    /**
     * Renders recursive
     * @param pTarget
     * @returns recursive
     */
    private renderRecursive;
    /**
     * Renders target
     * @param pTarget
     */
    private renderTarget;
}
//# sourceMappingURL=HitAreaRenderer.d.ts.map