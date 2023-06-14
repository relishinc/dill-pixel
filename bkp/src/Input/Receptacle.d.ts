import * as PIXI from "pixi.js";
import { FederatedPointerEvent } from "pixi.js";
import { Draggable } from "../Input/Draggable";
import { IFocusable } from "../Input/IFocusable";
/**
 * Receptacle
 */
export declare abstract class Receptacle extends PIXI.Container implements IFocusable {
    protected _visuals: PIXI.Container;
    protected _eventData: PIXI.FederatedPointerEvent | undefined;
    protected _isPointerOver: boolean;
    protected _hoverVo: string | undefined;
    protected _dragged: Draggable | undefined;
    protected _selected: Draggable | undefined;
    protected _subscriptions: any[];
    protected _isActive: boolean;
    constructor();
    /**
     * Sets whether is active
     */
    set isActive(pValue: boolean);
    /**
     * Gets whether is active
     */
    get isActive(): boolean;
    /**
     * onFocusBegin
     */
    onFocusBegin(): void;
    /**
     * onFocusEnd
     */
    onFocusEnd(): void;
    /**
     * onFocusActivated
     */
    onFocusActivated(): void;
    /**
     * onFocusPosition
     */
    getFocusPosition(): PIXI.Point;
    /**
     * Gets focus size
     * @returns PIXI.Point
     */
    getFocusSize(): PIXI.IPoint;
    /**
     * Destroys receptacle
     */
    destroy(): void;
    /**
     * Plays hover vo
     */
    protected playHoverVo(): void;
    /**
     * onPointerOver
     */
    protected onPointerOver(): void;
    /**
     * onPointerDown
     */
    protected onPointerDown(pEvent: FederatedPointerEvent): void;
    /**
     * onPointerUp
     */
    protected onPointerUp(): void;
    /**
     * onPointerUpOutside
     */
    protected onPointerUpOutside(): void;
    /**
     * onPointerOut
     */
    protected onPointerOut(): void;
    /**
     * onPointerMove
     */
    protected onPointerMove(pEvent: FederatedPointerEvent): void;
    protected onTouchMove(pEvent: FederatedPointerEvent): void;
    /**
     * Adds draggable
     * @param pDraggable
     */
    protected addDraggable(pDraggable: Draggable): void;
    /**
     * onDragBegin
     * @param pTopic
     * @param pDraggable
     */
    protected onDragBegin(pTopic: string, pDraggable: Draggable): void;
    /**
     * onDragEnd
     * @param pTopic
     * @param pDraggable
     */
    protected onDragEnd(pTopic: string, pDraggable: Draggable): void;
    /**
     * onDraggableSelected
     * @param pTopic
     * @param pDraggable
     */
    protected onDraggableSelected(pTopic: string, pDraggable: Draggable): void;
    /**
     * onDraggableDeselected
     * @param pTopic
     * @param pDraggable
     */
    protected onDraggableDeselected(pTopic: string, pDraggable: Draggable): void;
}
//# sourceMappingURL=Receptacle.d.ts.map