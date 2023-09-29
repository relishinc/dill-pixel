import {Container, FederatedPointerEvent, Point} from 'pixi.js';
import * as InputUtils from '../input/InputUtils';
import {dragBegin, dragEnd, draggableDeselected, draggableSelected} from '../signals';
import * as PixiUtils from '../utils/PixiUtils';
import * as PointUtils from '../utils/PointUtils';
import {Selectable} from './Selectable';

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
  protected _pointerOffset: Point;
  private _dragThresholdSq: number;

  constructor() {
    super();
    this._isDrag = false;
    this._pointerOffset = new Point(0, 0);
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
  public get visuals(): Container {
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
    draggableSelected(this);
  }

  /**
   * Deselects draggable
   */
  public deselect(): void {
    super.deselect();
    draggableDeselected(this);
  }

  /**
   * onPointerDown
   * @param pEvent
   */
  protected onPointerDown(pEvent: FederatedPointerEvent): void {
    super.onPointerDown(pEvent);
    this._isDrag = false;
    this._pointerOffset = PointUtils.subtract(this.position, this._eventData!.getLocalPosition(this.parent)) as Point;
  }

  /**
   * onPointerUp
   */
  protected onPointerUp(pEvent: FederatedPointerEvent): void {
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
  protected onPointerUpOutside(pEvent: FederatedPointerEvent): void {
    if (this._isDrag) {
      this.onPointerUp(pEvent);
    } else {
      super.onPointerUpOutside(pEvent);
    }
  }

  /**
   * onPointerMove
   */
  protected onPointerMove(pEvent: FederatedPointerEvent): void {
    if (this._eventData !== undefined && this._eventData.pointerId === pEvent.pointerId) {
      if (!this._isDrag) {
        // Calculate how far the mouse has moved
        const delta: number = PointUtils.distanceSq(
          PointUtils.add(this._eventData.getLocalPosition(this.parent), this._pointerOffset),
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
    dragBegin(this);
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
    dragEnd(this);
  }

  /**
   * Snaps to mouse
   */
  protected snapToMouse(): void {
    this._eventData!.getLocalPosition(this._visuals.parent, this._visuals.position as Point);
  }
}
