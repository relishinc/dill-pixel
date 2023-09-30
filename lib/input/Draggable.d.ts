import { Container, FederatedPointerEvent, Point } from 'pixi.js';
import { Selectable } from './Selectable';
/**
 * Draggable
 * @todo SH: Strip the Chef Leo logic from this class and make it generic and customizable
 */
export declare class Draggable extends Selectable {
    readonly onDragBegin: ((p: Draggable) => void)[];
    readonly onDrag: ((p: Draggable) => void)[];
    readonly onDragEnd: ((p: Draggable) => void)[];
    protected _isDrag: boolean;
    protected _pointerOffset: Point;
    private _dragThresholdSq;
    constructor();
    /**
     * Gets whether is dragging
     */
    get isDragging(): boolean;
    /**
     * Gets visuals
     */
    get visuals(): Container;
    /**
     * Sets drag threshold
     * @param pValue
     */
    set dragThreshold(pValue: number);
    /**
     * Attaches visuals
     */
    attachVisuals(): void;
    /**
     * Drops draggable
     */
    drop(): void;
    /**
     * Selects draggable
     */
    select(): void;
    /**
     * Deselects draggable
     */
    deselect(): void;
    /**
     * onPointerDown
     * @param pEvent
     */
    protected onPointerDown(pEvent: FederatedPointerEvent): void;
    /**
     * onPointerUp
     */
    protected onPointerUp(pEvent: FederatedPointerEvent): void;
    /**
     * onPointerUpOutside
     */
    protected onPointerUpOutside(pEvent: FederatedPointerEvent): void;
    /**
     * onPointerMove
     */
    protected onPointerMove(pEvent: FederatedPointerEvent): void;
    /**
     * Drag begin
     */
    protected dragBegin(): void;
    /**
     * Drag end
     */
    protected dragEnd(): void;
    /**
     * Snaps to mouse
     */
    protected snapToMouse(): void;
}
//# sourceMappingURL=Draggable.d.ts.map