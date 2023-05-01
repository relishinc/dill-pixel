import {EventSystem} from "pixi.js";
import {Events} from "./InputUtils";

/**
 * Holds mouse state data.
 */
export class MouseManager {
    private static _mouseDown: boolean = false;
    private _eventSystem: EventSystem;

    constructor(pEventSystem: EventSystem) {
        this._eventSystem = pEventSystem;

        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);

        this._eventSystem.domElement.addEventListener(Events.MOUSE_DOWN, this.onMouseDown)
        this._eventSystem.domElement.addEventListener(Events.MOUSE_UP, this.onMouseUp);
    }

    /**
     * Is the mouse currently down?
     */
    public static get mouseDown(): boolean {
        return MouseManager._mouseDown;
    }

    /**
     * Sets the mouse down flag to true.
     */
    private onMouseDown(): void {
        MouseManager._mouseDown = true;
    }

    /**
     * Sets the mouse down flag to false.
     */
    private onMouseUp(): void {
        MouseManager._mouseDown = false;
    }
}
