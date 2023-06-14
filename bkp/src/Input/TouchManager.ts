import {DisplayObject, EventSystem, FederatedPointerEvent, Point} from "pixi.js";
import {Events} from "../Input/InputUtils";
import * as PointUtils from "../Utils/PointUtils";

/**
 * CoordinateSystem
 */
export enum CoordinateSystem {
	LOCAL,
	GLOBAL,
	NUM_ELEMENTS,
}

/**
 * GestureType
 */
export enum GestureType {
	SWIPE,
	PINCH,
	NUM_ELEMENTS,
}

/**
 * TouchManager
 */
export class TouchManager {
	protected _startCallback: (pEvent: FederatedPointerEvent) => void;
	protected _moveCallback: (pEvent: FederatedPointerEvent) => void;
	protected _endCallback: (pEvent: FederatedPointerEvent) => void;

	protected _target: DisplayObject;
	protected _events: EventSystem;
	protected _touches: FederatedPointerEvent[];
	protected _gestureCoordSys: CoordinateSystem[];
	protected _swipePrevPos: Point;
	protected _pinchPrevDist: number;
	protected _swipeAccum: Point;
	protected _pinchAccum: number;
	protected _swipeThreshhold: number;
	protected _pinchThreshhold: number;
	protected _isSwiping: boolean;
	protected _isPinching: boolean;

	protected _onSwipe: ((pDelta: Point) => void) | undefined;
	protected _onSwipeStart: ((pPos: Point) => void) | undefined;
	protected _onSwipeEnd: ((pPos: Point) => void) | undefined;
	protected _onPinch: ((pDelta: number) => void) | undefined;
	protected _onPinchStart: ((pDelta: number) => void) | undefined;
	protected _onPinchEnd: ((pDelta: number) => void) | undefined;

	constructor(pEventSystem: EventSystem, pTarget: DisplayObject) {
		this._events = pEventSystem;
		this._target = pTarget;

		this._touches = [];
		this._gestureCoordSys = new Array<CoordinateSystem>(GestureType.NUM_ELEMENTS);
		this._gestureCoordSys[GestureType.SWIPE] = CoordinateSystem.LOCAL;
		this._gestureCoordSys[GestureType.PINCH] = CoordinateSystem.GLOBAL;

		this._swipePrevPos = new Point();
		this._pinchPrevDist = 0;

		this._swipeAccum = new Point();
		this._pinchAccum = 0;
		this._swipeThreshhold = 0;
		this._pinchThreshhold = 0;
		this._isSwiping = false;
		this._isPinching = false;

		this._startCallback = this.onTouchStart.bind(this);
		this._moveCallback = this.onTouchMove.bind(this);
		this._endCallback = this.onTouchEnd.bind(this);

		this._events.renderer.addListener(Events.TOUCH_START, this._startCallback);
	}

	/**
	 * Sets the callback to be fired when a swipe is updated
	 * @param pValue
	 */
	public set onSwipe(pValue: ((pDelta: Point) => void) | undefined) {
		this._onSwipe = pValue;
	}

	/**
	 * Sets the callback to be fired when a swipe starts
	 * @param pValue
	 */
	// TODO:SH: Look into what data should be passed into these Start and End callbacks
	public set onSwipeStart(pValue: ((pDelta: Point) => void) | undefined) {
		this._onSwipeStart = pValue;
	}

	/**
	 * Sets the callback to be fired when a swipe ends
	 * @param pValue
	 */
	public set onSwipeEnd(pValue: ((pDelta: Point) => void) | undefined) {
		this._onSwipeEnd = pValue;
	}

	/**
	 * Sets the callback to be fired when a pinch is updated
	 * @param pValue
	 */
	public set onPinch(pValue: ((pDelta: number) => void) | undefined) {
		this._onPinch = pValue;
	}

	/**
	 * Sets the callback to be fired when a pinch starts
	 * @param pValue
	 */
	public set onPinchStart(pValue: ((pDelta: number) => void) | undefined) {
		this._onPinchStart = pValue;
	}

	/**
	 * Sets the callback to be fired when a pinch ends
	 * @param pValue
	 */
	public set onPinchEnd(pValue: ((pDelta: number) => void) | undefined) {
		this._onPinchEnd = pValue;
	}

	/**
	 * Sets the minimum magnitude of a swipe. Swipes smaller than this value will be ignored
	 * @param pValue
	 */
	public set swipeThreshhold(pValue: number) {
		this._swipeThreshhold = pValue;
	}

	/**
	 * Sets the minimum magnitude of a pinch. Pinches smaller than this value will be ignored
	 * @param pValue
	 */
	public set pinchThreshhold(pValue: number) {
		this._pinchThreshhold = pValue;
	}

	/**
	 * Sets what type of CoordinateSystem to use when determining positions for the specified Gesture
	 * @param pGesture
	 * @param pCoord
	 */
	public setCoordinateSystem(pGesture: GestureType, pCoord: CoordinateSystem): void {
		this._gestureCoordSys[pGesture] = pCoord;
	}

	/**
	 * destroy
	 */
	public destroy(): void {
		this._events.renderer.removeListener(Events.TOUCH_START, this._startCallback);
		this._events.renderer.removeListener(Events.TOUCH_MOVE, this._moveCallback);
		this._events.renderer.removeListener(Events.TOUCH_END, this._endCallback);
		this._events.renderer.removeListener(Events.TOUCH_END_OUTSIDE, this._endCallback);
		this._events.renderer.removeListener(Events.TOUCH_END_OUTSIDE, this._endCallback);
		this._events.renderer.removeListener(Events.TOUCH_CANCEL, this._endCallback);
		delete this._onSwipe;
		delete this._onSwipeStart;
		delete this._onSwipeEnd;
		delete this._onPinch;
		delete this._onPinchStart;
		delete this._onPinchEnd;
	}

	// Optimization as per "Best Practices" from:
	// https://developer.mozilla.org/en-US/docs/Web/API/Touch_events/Using_Touch_Events
	/**
	 * Internal function for optimizing number of input callbacks
	 */
	protected registerCallbacks(): void {
		this._events.renderer.addListener(Events.TOUCH_MOVE, this._moveCallback);
		this._events.renderer.addListener(Events.TOUCH_END, this._endCallback);
		this._events.renderer.addListener(Events.TOUCH_END_OUTSIDE, this._endCallback);
		this._events.renderer.addListener(Events.TOUCH_CANCEL, this._endCallback);
	}

	/**
	 * Internal function for optimizing number of input callbacks
	 */
	protected unregisterCallbacks(): void {
		this._events.renderer.removeListener(Events.TOUCH_MOVE, this._moveCallback);
		this._events.renderer.removeListener(Events.TOUCH_END, this._endCallback);
		this._events.renderer.removeListener(Events.TOUCH_END_OUTSIDE, this._endCallback);
		this._events.renderer.removeListener(Events.TOUCH_CANCEL, this._endCallback);
	}

	/**
	 * onTouchStart
	 * @param pEvent
	 */
	protected onTouchStart(pEvent: FederatedPointerEvent): void {
		this._touches.push(pEvent);

		if (this._touches.length === 1) {
			this.registerCallbacks();
			this._swipePrevPos.copyFrom(this.getTouchPos(pEvent, GestureType.SWIPE));
			this._isSwiping = false;
			this._swipeAccum.set(0);
		} else if (this._touches.length === 2) {
			this._pinchPrevDist = this.getPinchDist(this._touches[0], this._touches[1]);
			this._isPinching = false;
			this._pinchAccum = 0;
		}
	}

	/**
	 * onTouchMove
	 * @param pEvent
	 */
	protected onTouchMove(pEvent: FederatedPointerEvent): void {
		// Swipe
		if (this._touches.length === 1 && this._onSwipe !== undefined) {
			const pos: Point = this.getTouchPos(this._touches[0], GestureType.SWIPE);
			const delta: Point = PointUtils.subtract(pos, this._swipePrevPos) as Point;
			if (!this._isSwiping) {
				PointUtils.addToPoint(this._swipeAccum, delta);
				if (PointUtils.magnitude(this._swipeAccum) >= this._swipeThreshhold) {
					this._isSwiping = true;
					if (this._onSwipeStart !== undefined) {
						this._onSwipeStart(this._swipePrevPos);
					}
				}
			} else {
				this._onSwipe(delta);
			}
			this._swipePrevPos.copyFrom(pos);
		}
		// Pinch
		else if (this._onPinch !== undefined) {
			const dist: number = PointUtils.distance(
				this.getTouchPos(this._touches[0], GestureType.PINCH),
				this.getTouchPos(this._touches[1], GestureType.PINCH),
			);
			const delta: number = dist - this._pinchPrevDist;
			if (!this._isPinching) {
				this._pinchAccum += delta;
				if (Math.abs(this._pinchAccum) >= this._pinchThreshhold) {
					this._isPinching = true;
					if (this._onPinchStart !== undefined) {
						this._onPinchStart(this._pinchPrevDist);
					}
				}
			} else {
				this._onPinch(delta);
			}
			this._pinchPrevDist = dist;
		}
	}

	/**
	 * onTouchEnd
	 * @param pEvent
	 */
	protected onTouchEnd(pEvent: FederatedPointerEvent): void {
		let index: number | undefined;
		for (let i = 0; i < this._touches.length; ++i) {
			if (this._touches[i].pointerId === pEvent.pointerId) {
				index = i;
				break;
			}
		}
		if (index !== undefined) {
			// We are moving from 1 to 0 touches, end swipe
			if (this._touches.length === 1) {
				if (this._isSwiping && this._onSwipeEnd !== undefined) {
					this._onSwipeEnd(this._swipePrevPos);
				}
				this._isSwiping = false;
				this.unregisterCallbacks();
			}
			// We are moving from 2 to 1 touches, end pinch and start swipe
			else if (this._touches.length === 2) {
				if (this._isPinching && this._onPinchEnd !== undefined) {
					this._onPinchEnd(this._pinchPrevDist);
				}
				this._isPinching = false;
				this._swipePrevPos.copyFrom(this.getTouchPos(this._touches[1 - index], GestureType.SWIPE));
				// TODO:SH: this._isSwiping should really be set to false here, and wait for the threshhold to be
				// exceeded like normal before being set to true. The issue is that the remaining pointer could
				// then trigger game input, which we want to prevent. Need to think of a solution.
				this._isSwiping = true;
				if (this._onSwipeStart !== undefined) {
					this._onSwipeStart(this._swipePrevPos);
				}
				this._swipeAccum.set(0);
			}
			// We are moving from 3+ touches to 2+ touches, pinch continues but with potentially new touches
			else {
				if (index === 0 || index === 1) {
					this._pinchPrevDist = this.getPinchDist(this._touches[1 - index], this._touches[2]);
					// if (this._isPinching && this._onPinchEnd !== undefined) {
					//     this._onPinchEnd(this._pinchPrevDist);
					// }
					// this._isPinching = false;
					this._pinchAccum = 0;
				}
			}
			this._touches.splice(index, 1);
		}
	}

	/**
	 * Gets the position of a touch in the CoordinateSystem associated with the specified Gesture
	 * @param pData
	 * @param pGesture
	 * @returns the position of a touch in the CoordinateSystem associated with the specified Gesture
	 */
	protected getTouchPos(pData: FederatedPointerEvent, pGesture: GestureType): Point {
		switch (this._gestureCoordSys[pGesture]) {
			case CoordinateSystem.LOCAL:
				return pData.getLocalPosition(this._target);
			case CoordinateSystem.GLOBAL:
			default:
				return pData.global;
		}
	}

	/**
	 * Gets the distance between two touches being treated as a pinch
	 * @param pA
	 * @param pB
	 * @returns the distance between two touches being treated as a pinch
	 */
	protected getPinchDist(pA: FederatedPointerEvent, pB: FederatedPointerEvent): number {
		return PointUtils.distance(
			this.getTouchPos(pA, GestureType.PINCH),
			this.getTouchPos(pB, GestureType.PINCH),
		);
	}
}
