"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MouseManager = void 0;
const InputUtils_1 = require("./InputUtils");
/**
 * Holds mouse state data.
 */
class MouseManager {
    constructor(pEventSystem) {
        this._eventSystem = pEventSystem;
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this._eventSystem.domElement.addEventListener(InputUtils_1.Events.MOUSE_DOWN, this.onMouseDown);
        this._eventSystem.domElement.addEventListener(InputUtils_1.Events.MOUSE_UP, this.onMouseUp);
    }
    /**
     * Is the mouse currently down?
     */
    static get mouseDown() {
        return MouseManager._mouseDown;
    }
    /**
     * Sets the mouse down flag to true.
     */
    onMouseDown() {
        MouseManager._mouseDown = true;
    }
    /**
     * Sets the mouse down flag to false.
     */
    onMouseUp() {
        MouseManager._mouseDown = false;
    }
}
MouseManager._mouseDown = false;
exports.MouseManager = MouseManager;
//# sourceMappingURL=MouseManager.js.map