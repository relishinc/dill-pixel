import { Container, FederatedPointerEvent, IPoint, Point } from 'pixi.js';
import { Draggable } from './Draggable';
import { IFocusable } from './IFocusable';
/**
 * Receptacle
 */
export declare abstract class Receptacle extends Container implements IFocusable {
    protected _visuals: Container;
    protected _eventData: FederatedPointerEvent | undefined;
    protected _isPointerOver: boolean;
    protected _hoverVo: string | undefined;
    protected _dragged: Draggable | undefined;
    protected _selected: Draggable | undefined;
    protected _isActive: boolean;
    private _connections;
    constructor();
    /**
     * Gets whether is active
     */
    get isActive(): boolean;
    /**
     * Sets whether is active
     */
    set isActive(pValue: boolean);
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
    getFocusPosition(): Point;
    /**
     * Gets focus size
     * @returns Point
     */
    getFocusSize(): IPoint;
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
    protected onPointerMove(_event: FederatedPointerEvent): void;
    protected onTouchMove(pEvent: FederatedPointerEvent): void;
    /**
     * Adds draggable
     * @param _draggable
     */
    protected addDraggable(_draggable: Draggable): void;
    /**
     * onDragBegin
     * @param pTopic
     * @param pDraggable
     */
    protected onDragBegin(pDraggable: Draggable): void;
    /**
     * onDragEnd
     * @param _draggable
     */
    protected onDragEnd(_draggable: Draggable): void;
    /**
     * onDraggableSelected
     * @param pTopic
     * @param pDraggable
     */
    protected onDraggableSelected(pDraggable: Draggable): void;
    /**
     * onDraggableDeselected
     * @param pTopic
     * @param pDraggable
     */
    protected onDraggableDeselected(pDraggable: Draggable): void;
}
//# sourceMappingURL=Receptacle.d.ts.map