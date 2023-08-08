import * as PIXI from "pixi.js";
import * as Topics from "../Data/Topics";
import * as InputUtils from "../Input/InputUtils";
import { broadcast } from "../Utils";
import * as PixiUtils from "../Utils/PixiUtils";
import * as PointUtils from "../Utils/PointUtils";
import { Selectable } from "./Selectable";
// TODO:SH: Strip the Chef Leo logic from this class and make it generic and customizable
/**
 * Draggable
 * @todo SH: Strip the Chef Leo logic from this class and make it generic and customizable
 */
export class Draggable extends Selectable {
    constructor() {
        super();
        this._isDrag = false;
        this._pointerOffset = new PIXI.Point(0, 0);
        this._dragThresholdSq = 15 * 15;
        this.onDragBegin = [];
        this.onDrag = [];
        this.onDragEnd = [];
        this.on(InputUtils.Events.POINTER_MOVE, this.onPointerMove);
    }
    /**
     * Gets whether is dragging
     */
    get isDragging() {
        return this._isDrag;
    }
    /**
     * Gets visuals
     */
    get visuals() {
        return this._visuals;
    }
    /**
     * Sets drag threshold
     * @param pValue
     */
    set dragThreshold(pValue) {
        this._dragThresholdSq = pValue * pValue;
    }
    /**
     * Attaches visuals
     */
    attachVisuals() {
        PixiUtils.setParent(this._visuals, this);
    }
    /**
     * Drops draggable
     */
    drop() {
        // override
    }
    /**
     * Selects draggable
     */
    select() {
        super.select();
        broadcast(Topics.DRAGGABLE_SELECTED, this);
    }
    /**
     * Deselects draggable
     */
    deselect() {
        super.deselect();
        broadcast(Topics.DRAGGABLE_DESELECTED, this);
    }
    /**
     * onPointerDown
     * @param pEvent
     */
    onPointerDown(pEvent) {
        super.onPointerDown(pEvent);
        this._isDrag = false;
        this._pointerOffset = PointUtils.subtract(this.position, this._eventData.getLocalPosition(this.parent));
    }
    /**
     * onPointerUp
     */
    onPointerUp(pEvent) {
        if (this._eventData !== undefined && this._eventData.pointerId === pEvent.pointerId) {
            if (this._isDrag) {
                this.dragEnd();
            }
            else {
                super.onPointerUp(pEvent);
            }
        }
    }
    /**
     * onPointerUpOutside
     */
    onPointerUpOutside(pEvent) {
        if (this._isDrag) {
            this.onPointerUp(pEvent);
        }
        else {
            super.onPointerUpOutside(pEvent);
        }
    }
    /**
     * onPointerMove
     */
    onPointerMove(pEvent) {
        if (this._eventData !== undefined && this._eventData.pointerId === pEvent.pointerId) {
            if (!this._isDrag) {
                // Calculate how far the mouse has moved
                const delta = PointUtils.distanceSq(PointUtils.add(this._eventData.getLocalPosition(this.parent), this._pointerOffset), this.position);
                // If it has moved enough, send a message to the DragDropManager and let it handle input
                if (delta >= this._dragThresholdSq) {
                    this.dragBegin();
                }
            }
            else {
                for (let i = 0; i < this.onDrag.length; ++i) {
                    this.onDrag[i](this);
                }
                this.snapToMouse();
            }
        }
    }
    /**
     * Drag begin
     */
    dragBegin() {
        for (let i = 0; i < this.onDragBegin.length; ++i) {
            this.onDragBegin[i](this);
        }
        this._isDrag = true;
        broadcast(Topics.DRAG_BEGIN, this);
    }
    /**
     * Drag end
     */
    dragEnd() {
        for (let i = 0; i < this.onDragEnd.length; ++i) {
            this.onDragEnd[i](this);
        }
        this._isDrag = false;
        this._eventData = undefined;
        broadcast(Topics.DRAG_END, this);
    }
    /**
     * Snaps to mouse
     */
    snapToMouse() {
        this._eventData.getLocalPosition(this._visuals.parent, this._visuals.position);
    }
}
//# sourceMappingURL=Draggable.js.map