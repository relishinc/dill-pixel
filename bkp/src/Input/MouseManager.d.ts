import { EventSystem } from "pixi.js";
/**
 * Holds mouse state data.
 */
export declare class MouseManager {
    private static _mouseDown;
    private _eventSystem;
    constructor(pEventSystem: EventSystem);
    /**
     * Is the mouse currently down?
     */
    static get mouseDown(): boolean;
    /**
     * Sets the mouse down flag to true.
     */
    private onMouseDown;
    /**
     * Sets the mouse down flag to false.
     */
    private onMouseUp;
}
//# sourceMappingURL=MouseManager.d.ts.map