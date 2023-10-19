import { Point } from 'pixi.js';
import * as PointUtils from '../utils/PointUtils';
import { Events } from './InputUtils';
/**
 * CoordinateSystem
 */
export var CoordinateSystem;
(function (CoordinateSystem) {
    CoordinateSystem[CoordinateSystem["LOCAL"] = 0] = "LOCAL";
    CoordinateSystem[CoordinateSystem["GLOBAL"] = 1] = "GLOBAL";
    CoordinateSystem[CoordinateSystem["NUM_ELEMENTS"] = 2] = "NUM_ELEMENTS";
})(CoordinateSystem || (CoordinateSystem = {}));
/**
 * GestureType
 */
export var GestureType;
(function (GestureType) {
    GestureType[GestureType["SWIPE"] = 0] = "SWIPE";
    GestureType[GestureType["PINCH"] = 1] = "PINCH";
    GestureType[GestureType["NUM_ELEMENTS"] = 2] = "NUM_ELEMENTS";
})(GestureType || (GestureType = {}));
/**
 * TouchManager
 */
export class TouchManager {
    constructor(pEventSystem, pTarget) {
        this._events = pEventSystem;
        this._target = pTarget;
        this._touches = [];
        this._gestureCoordSys = new Array(GestureType.NUM_ELEMENTS);
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
    set onSwipe(pValue) {
        this._onSwipe = pValue;
    }
    /**
     * Sets the callback to be fired when a swipe starts
     * @param pValue
     */
    // TODO:SH: Look into what data should be passed into these Start and End callbacks
    set onSwipeStart(pValue) {
        this._onSwipeStart = pValue;
    }
    /**
     * Sets the callback to be fired when a swipe ends
     * @param pValue
     */
    set onSwipeEnd(pValue) {
        this._onSwipeEnd = pValue;
    }
    /**
     * Sets the callback to be fired when a pinch is updated
     * @param pValue
     */
    set onPinch(pValue) {
        this._onPinch = pValue;
    }
    /**
     * Sets the callback to be fired when a pinch starts
     * @param pValue
     */
    set onPinchStart(pValue) {
        this._onPinchStart = pValue;
    }
    /**
     * Sets the callback to be fired when a pinch ends
     * @param pValue
     */
    set onPinchEnd(pValue) {
        this._onPinchEnd = pValue;
    }
    /**
     * Sets the minimum magnitude of a swipe. Swipes smaller than this value will be ignored
     * @param pValue
     */
    set swipeThreshhold(pValue) {
        this._swipeThreshhold = pValue;
    }
    /**
     * Sets the minimum magnitude of a pinch. Pinches smaller than this value will be ignored
     * @param pValue
     */
    set pinchThreshhold(pValue) {
        this._pinchThreshhold = pValue;
    }
    /**
     * Sets what type of CoordinateSystem to use when determining positions for the specified Gesture
     * @param pGesture
     * @param pCoord
     */
    setCoordinateSystem(pGesture, pCoord) {
        this._gestureCoordSys[pGesture] = pCoord;
    }
    /**
     * destroy
     */
    destroy() {
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
    registerCallbacks() {
        this._events.renderer.addListener(Events.TOUCH_MOVE, this._moveCallback);
        this._events.renderer.addListener(Events.TOUCH_END, this._endCallback);
        this._events.renderer.addListener(Events.TOUCH_END_OUTSIDE, this._endCallback);
        this._events.renderer.addListener(Events.TOUCH_CANCEL, this._endCallback);
    }
    /**
     * Internal function for optimizing number of input callbacks
     */
    unregisterCallbacks() {
        this._events.renderer.removeListener(Events.TOUCH_MOVE, this._moveCallback);
        this._events.renderer.removeListener(Events.TOUCH_END, this._endCallback);
        this._events.renderer.removeListener(Events.TOUCH_END_OUTSIDE, this._endCallback);
        this._events.renderer.removeListener(Events.TOUCH_CANCEL, this._endCallback);
    }
    /**
     * onTouchStart
     * @param pEvent
     */
    onTouchStart(pEvent) {
        this._touches.push(pEvent);
        if (this._touches.length === 1) {
            this.registerCallbacks();
            this._swipePrevPos.copyFrom(this.getTouchPos(pEvent, GestureType.SWIPE));
            this._isSwiping = false;
            this._swipeAccum.set(0);
        }
        else if (this._touches.length === 2) {
            this._pinchPrevDist = this.getPinchDist(this._touches[0], this._touches[1]);
            this._isPinching = false;
            this._pinchAccum = 0;
        }
    }
    /**
     * onTouchMove
     * @param _event
     */
    onTouchMove(_event) {
        // Swipe
        if (this._touches.length === 1 && this._onSwipe !== undefined) {
            const pos = this.getTouchPos(this._touches[0], GestureType.SWIPE);
            const delta = PointUtils.subtract(pos, this._swipePrevPos);
            if (!this._isSwiping) {
                PointUtils.addToPoint(this._swipeAccum, delta);
                if (PointUtils.magnitude(this._swipeAccum) >= this._swipeThreshhold) {
                    this._isSwiping = true;
                    if (this._onSwipeStart !== undefined) {
                        this._onSwipeStart(this._swipePrevPos);
                    }
                }
            }
            else {
                this._onSwipe(delta);
            }
            this._swipePrevPos.copyFrom(pos);
        }
        // Pinch
        else if (this._onPinch !== undefined) {
            const dist = PointUtils.distance(this.getTouchPos(this._touches[0], GestureType.PINCH), this.getTouchPos(this._touches[1], GestureType.PINCH));
            const delta = dist - this._pinchPrevDist;
            if (!this._isPinching) {
                this._pinchAccum += delta;
                if (Math.abs(this._pinchAccum) >= this._pinchThreshhold) {
                    this._isPinching = true;
                    if (this._onPinchStart !== undefined) {
                        this._onPinchStart(this._pinchPrevDist);
                    }
                }
            }
            else {
                this._onPinch(delta);
            }
            this._pinchPrevDist = dist;
        }
    }
    /**
     * onTouchEnd
     * @param pEvent
     */
    onTouchEnd(pEvent) {
        let index;
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
    getTouchPos(pData, pGesture) {
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
    getPinchDist(pA, pB) {
        return PointUtils.distance(this.getTouchPos(pA, GestureType.PINCH), this.getTouchPos(pB, GestureType.PINCH));
    }
}
//# sourceMappingURL=TouchManager.js.map