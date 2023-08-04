import * as PIXI from "pixi.js";
import {Point} from "pixi.js";
import * as Topics from "../Data/Topics";
import * as InputUtils from "../Input/InputUtils";
import {broadcast} from "../Utils";
import * as PixiUtils from "../Utils/PixiUtils";
import * as PointUtils from "../Utils/PointUtils";
import {Selectable} from "./Selectable";

// TODO:SH: Strip the Chef Leo logic from this class and make it generic and customizable
/**
 * Draggable
 * @todo SH: Strip the Chef Leo logic from this class and make it generic and customizable
 */
export class Draggable extends Selectable {
	// TODO: Can we get rid of these callback arrays?
	public readonly onDragBegin: ((p: Draggable) => void)[];
	public readonly onDrag: ((p: Draggable) => void)[];
	public readonly onDragEnd: ((p: Draggable) => void)[];

	protected _isDrag: boolean;
	protected _pointerOffset: PIXI.Point;
	private _dragThresholdSq: number;

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
	public get isDragging(): boolean {
		return this._isDrag;
	}

	/**
	 * Gets visuals
	 */
	public get visuals(): PIXI.Container {
		return this._visuals;
	}

	/**
	 * Sets drag threshold
	 * @param pValue
	 */
	public set dragThreshold(pValue: number) {
		this._dragThresholdSq = pValue * pValue;
	}

	/**
	 * Attaches visuals
	 */
	public attachVisuals(): void {
		PixiUtils.setParent(this._visuals, this);
	}

	/**
	 * Drops draggable
	 */
	public drop(): void {
		// override
	}

	/**
	 * Selects draggable
	 */
	public select(): void {
		super.select();
		broadcast(Topics.DRAGGABLE_SELECTED, this);
	}

	/**
	 * Deselects draggable
	 */
	public deselect(): void {
		super.deselect();
		broadcast(Topics.DRAGGABLE_DESELECTED, this);
	}

	/**
	 * onPointerDown
	 * @param pEvent
	 */
	protected onPointerDown(pEvent: PIXI.FederatedPointerEvent): void {
		super.onPointerDown(pEvent);
		this._isDrag = false;
		this._pointerOffset = PointUtils.subtract(this.position, this._eventData!.getLocalPosition(this.parent)) as Point;
	}

	/**
	 * onPointerUp
	 */
	protected onPointerUp(pEvent: PIXI.FederatedPointerEvent): void {
		if (this._eventData !== undefined && this._eventData.pointerId === pEvent.pointerId) {
			if (this._isDrag) {
				this.dragEnd();
			} else {
				super.onPointerUp(pEvent);
			}
		}
	}

	/**
	 * onPointerUpOutside
	 */
	protected onPointerUpOutside(pEvent: PIXI.FederatedPointerEvent): void {
		if (this._isDrag) {
			this.onPointerUp(pEvent);
		} else {
			super.onPointerUpOutside(pEvent);
		}
	}

	/**
	 * onPointerMove
	 */
	protected onPointerMove(pEvent: PIXI.FederatedPointerEvent): void {
		if (this._eventData !== undefined && this._eventData.pointerId === pEvent.pointerId) {
			if (!this._isDrag) {
				// Calculate how far the mouse has moved
				const delta: number = PointUtils.distanceSq(
					PointUtils.add(
						this._eventData.getLocalPosition(this.parent),
						this._pointerOffset,
					),
					this.position,
				);
				// If it has moved enough, send a message to the DragDropManager and let it handle input
				if (delta >= this._dragThresholdSq) {
					this.dragBegin();
				}
			} else {
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
	protected dragBegin(): void {
		for (let i = 0; i < this.onDragBegin.length; ++i) {
			this.onDragBegin[i](this);
		}
		this._isDrag = true;
		broadcast(Topics.DRAG_BEGIN, this);
	}

	/**
	 * Drag end
	 */
	protected dragEnd(): void {
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
	protected snapToMouse(): void {
		this._eventData!.getLocalPosition(this._visuals.parent, this._visuals.position as PIXI.Point);
	}
}
