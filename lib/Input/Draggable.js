"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Draggable = void 0;
const PIXI = __importStar(require("pixi.js"));
const Topics = __importStar(require("../Data/Topics"));
const InputUtils = __importStar(require("../Input/InputUtils"));
const PixiUtils = __importStar(require("../Utils/PixiUtils"));
const PointUtils = __importStar(require("../Utils/PointUtils"));
const Selectable_1 = require("./Selectable");
// TODO:SH: Strip the Chef Leo logic from this class and make it generic and customizable
/**
 * Draggable
 * @todo SH: Strip the Chef Leo logic from this class and make it generic and customizable
 */
class Draggable extends Selectable_1.Selectable {
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
        PubSub.publishSync(Topics.DRAGGABLE_SELECTED, this);
    }
    /**
     * Deselects draggable
     */
    deselect() {
        super.deselect();
        PubSub.publishSync(Topics.DRAGGABLE_DESELECTED, this);
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
        PubSub.publishSync(Topics.DRAG_BEGIN, this);
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
        PubSub.publishSync(Topics.DRAG_END, this);
    }
    /**
     * Snaps to mouse
     */
    snapToMouse() {
        this._eventData.getLocalPosition(this._visuals.parent, this._visuals.position);
    }
}
exports.Draggable = Draggable;
//# sourceMappingURL=Draggable.js.map