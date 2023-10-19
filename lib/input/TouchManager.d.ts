import { DisplayObject, EventSystem, FederatedPointerEvent, Point } from 'pixi.js';
/**
 * CoordinateSystem
 */
export declare enum CoordinateSystem {
    LOCAL = 0,
    GLOBAL = 1,
    NUM_ELEMENTS = 2
}
/**
 * GestureType
 */
export declare enum GestureType {
    SWIPE = 0,
    PINCH = 1,
    NUM_ELEMENTS = 2
}
/**
 * TouchManager
 */
export declare class TouchManager {
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
    constructor(pEventSystem: EventSystem, pTarget: DisplayObject);
    /**
     * Sets the callback to be fired when a swipe is updated
     * @param pValue
     */
    set onSwipe(pValue: ((pDelta: Point) => void) | undefined);
    /**
     * Sets the callback to be fired when a swipe starts
     * @param pValue
     */
    set onSwipeStart(pValue: ((pDelta: Point) => void) | undefined);
    /**
     * Sets the callback to be fired when a swipe ends
     * @param pValue
     */
    set onSwipeEnd(pValue: ((pDelta: Point) => void) | undefined);
    /**
     * Sets the callback to be fired when a pinch is updated
     * @param pValue
     */
    set onPinch(pValue: ((pDelta: number) => void) | undefined);
    /**
     * Sets the callback to be fired when a pinch starts
     * @param pValue
     */
    set onPinchStart(pValue: ((pDelta: number) => void) | undefined);
    /**
     * Sets the callback to be fired when a pinch ends
     * @param pValue
     */
    set onPinchEnd(pValue: ((pDelta: number) => void) | undefined);
    /**
     * Sets the minimum magnitude of a swipe. Swipes smaller than this value will be ignored
     * @param pValue
     */
    set swipeThreshhold(pValue: number);
    /**
     * Sets the minimum magnitude of a pinch. Pinches smaller than this value will be ignored
     * @param pValue
     */
    set pinchThreshhold(pValue: number);
    /**
     * Sets what type of CoordinateSystem to use when determining positions for the specified Gesture
     * @param pGesture
     * @param pCoord
     */
    setCoordinateSystem(pGesture: GestureType, pCoord: CoordinateSystem): void;
    /**
     * destroy
     */
    destroy(): void;
    /**
     * Internal function for optimizing number of input callbacks
     */
    protected registerCallbacks(): void;
    /**
     * Internal function for optimizing number of input callbacks
     */
    protected unregisterCallbacks(): void;
    /**
     * onTouchStart
     * @param pEvent
     */
    protected onTouchStart(pEvent: FederatedPointerEvent): void;
    /**
     * onTouchMove
     * @param _event
     */
    protected onTouchMove(_event: FederatedPointerEvent): void;
    /**
     * onTouchEnd
     * @param pEvent
     */
    protected onTouchEnd(pEvent: FederatedPointerEvent): void;
    /**
     * Gets the position of a touch in the CoordinateSystem associated with the specified Gesture
     * @param pData
     * @param pGesture
     * @returns the position of a touch in the CoordinateSystem associated with the specified Gesture
     */
    protected getTouchPos(pData: FederatedPointerEvent, pGesture: GestureType): Point;
    /**
     * Gets the distance between two touches being treated as a pinch
     * @param pA
     * @param pB
     * @returns the distance between two touches being treated as a pinch
     */
    protected getPinchDist(pA: FederatedPointerEvent, pB: FederatedPointerEvent): number;
}
//# sourceMappingURL=TouchManager.d.ts.map