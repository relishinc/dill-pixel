import * as PIXI from "pixi.js";
import {FederatedPointerEvent} from "pixi.js";
import * as AudioCategory from "../Audio/AudioCategory";
import {AudioToken} from "../Audio/AudioToken";
import * as Topics from "../Data/Topics";
import {Draggable} from "../Input/Draggable";
import {IFocusable} from "../Input/IFocusable";
import * as InputUtils from "../Input/InputUtils";
import {broadcast, subscribe, unsubscribe} from "../Utils";
import * as PixiUtils from "../Utils/PixiUtils";
import * as RectUtils from "../Utils/RectUtils";

/**
 * Receptacle
 */
export abstract class Receptacle extends PIXI.Container implements IFocusable {
	protected _visuals: PIXI.Container;
	protected _eventData: PIXI.FederatedPointerEvent | undefined;
	protected _isPointerOver: boolean;
	protected _hoverVo: string | undefined;
	protected _dragged: Draggable | undefined;
	protected _selected: Draggable | undefined;
	protected _subscriptions: any[];
	protected _isActive: boolean;

	constructor() {
		super();
		this._isPointerOver = false;
		this._isActive = true;

		this._visuals = new PIXI.Container();
		this.addChild(this._visuals);

		this.cursor = "pointer";
		this.interactive = false;

		this.on(InputUtils.Events.POINTER_OVER, this.onPointerOver);
		this.on(InputUtils.Events.POINTER_DOWN, this.onPointerDown);
		this.on(InputUtils.Events.POINTER_UP, this.onPointerUp);
		this.on(InputUtils.Events.POINTER_UP_OUTSIDE, this.onPointerUpOutside);
		this.on(InputUtils.Events.POINTER_OUT, this.onPointerOut);
		this.on(InputUtils.Events.POINTER_MOVE, this.onPointerMove);
		this.on(InputUtils.Events.TOUCH_MOVE, this.onTouchMove);

		this._subscriptions = new Array<any>();
		this._subscriptions.push(subscribe(Topics.DRAG_BEGIN, this.onDragBegin.bind(this)));
		this._subscriptions.push(subscribe(Topics.DRAG_END, this.onDragEnd.bind(this)));
		this._subscriptions.push(subscribe(Topics.DRAGGABLE_SELECTED, this.onDraggableSelected.bind(this)));
		this._subscriptions.push(subscribe(Topics.DRAGGABLE_DESELECTED, this.onDraggableDeselected.bind(this)));
	}

	/**
	 * Sets whether is active
	 */
	public set isActive(pValue: boolean) {
		this._isActive = pValue;
	}

	/**
	 * Gets whether is active
	 */
	public get isActive(): boolean {
		return this._isActive;
	}

	/**
	 * onFocusBegin
	 */
	public onFocusBegin(): void {
		this.playHoverVo();
	}

	/**
	 * onFocusEnd
	 */
	public onFocusEnd(): void {
		// unused
	}

	/**
	 * onFocusActivated
	 */
	public onFocusActivated(): void {
		this.addDraggable(this._selected!);
	}

	/**
	 * onFocusPosition
	 */
	public getFocusPosition(): PIXI.Point {
		if (this.hitArea instanceof PIXI.Rectangle) {
			return new PIXI.Point().copyFrom(this.toGlobal(RectUtils.center(this.hitArea)));
		} else {
			return this.getGlobalPosition();
		}
	}

	/**
	 * Gets focus size
	 * @returns PIXI.Point
	 */
	public getFocusSize(): PIXI.IPoint {
		let bounds: PIXI.Rectangle;
		if (this.hitArea instanceof PIXI.Rectangle) {
			bounds = PixiUtils.getGlobalBounds(this, this.hitArea.clone());
		} else {
			bounds = PixiUtils.getGlobalBounds(this);
		}
		return RectUtils.size(bounds);
	}

	/**
	 * Destroys receptacle
	 */
	public destroy() {
		for (let i = 0; i < this._subscriptions.length; ++i) {
			unsubscribe(this._subscriptions[i]);
		}
		super.destroy();
	}

	/**
	 * Plays hover vo
	 */
	protected playHoverVo(): void {
		if (this._hoverVo !== undefined) {
			broadcast(Topics.PLAY_AUDIO, new AudioToken(
				this._hoverVo, 1, false, AudioCategory.VO.toString(),
			));
		}
	}

	/**
	 * onPointerOver
	 */
	protected onPointerOver(): void {
		this._isPointerOver = true;
		if (this._selected !== undefined) {
			this.playHoverVo();
		}
	}

	/**
	 * onPointerDown
	 */
	protected onPointerDown(pEvent: FederatedPointerEvent): void {
		this._eventData = pEvent;
	}

	/**
	 * onPointerUp
	 */
	protected onPointerUp(): void {
		if (this._selected !== undefined) {
			this._eventData = undefined;
			this.addDraggable(this._selected);
		}
	}

	/**
	 * onPointerUpOutside
	 */
	protected onPointerUpOutside(): void {
		this._eventData = undefined;
	}

	/**
	 * onPointerOut
	 */
	protected onPointerOut(): void {
		this._isPointerOver = false;
	}

	/**
	 * onPointerMove
	 */
	protected onPointerMove(pEvent: FederatedPointerEvent): void {
		// override
	}

	protected onTouchMove(pEvent: FederatedPointerEvent): void {
		const local: PIXI.Point = pEvent.getLocalPosition(this);
		if (this.hitArea) {
			if (!this._isPointerOver) {
				if (this.hitArea.contains(local.x, local.y)) {
					this.onPointerOver();
				}
			} else {
				if (this.hitArea.contains(local.x, local.y) === false) {
					this.onPointerOut();
				}
			}
		}
	}

	/**
	 * Adds draggable
	 * @param pDraggable
	 */
	protected addDraggable(pDraggable: Draggable): void {
		// override
	}

	/**
	 * onDragBegin
	 * @param pTopic
	 * @param pDraggable
	 */
	protected onDragBegin(pTopic: string, pDraggable: Draggable): void {
		if (this._isActive) {
			this.interactive = true;
			this._dragged = pDraggable;
		}
	}

	/**
	 * onDragEnd
	 * @param pTopic
	 * @param pDraggable
	 */
	protected onDragEnd(pTopic: string, pDraggable: Draggable): void {
		if (this._isActive) {
			if (this._isPointerOver && this._dragged !== undefined) {
				this.addDraggable(this._dragged);
			}
			this.interactive = false;
			this._dragged = undefined;
		}
	}

	/**
	 * onDraggableSelected
	 * @param pTopic
	 * @param pDraggable
	 */
	protected onDraggableSelected(pTopic: string, pDraggable: Draggable): void {
		if (this._isActive) {
			this.interactive = true;
			this._selected = pDraggable;
		}
	}

	/**
	 * onDraggableDeselected
	 * @param pTopic
	 * @param pDraggable
	 */
	protected onDraggableDeselected(pTopic: string, pDraggable: Draggable): void {
		if (this._isActive) {
			if (this._selected === pDraggable) {
				this.interactive = false;
				this._selected = undefined;
			}
		}
	}
}
