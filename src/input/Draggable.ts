import { Container, FederatedPointerEvent, Point } from 'pixi.js';
import { dragBegin, dragEnd, draggableDeselected, draggableSelected } from '../functions/draggable';
import * as PixiUtils from '../utils/PixiUtils';
import * as PointUtils from '../utils/PointUtils';
import { Selectable } from './Selectable';

// TODO:SH: Strip the Chef Leo logic from this class and make it generic and customizable
/**
 * Draggable
 * @todo SH: Strip the Chef Leo logic from this class and make it generic and customizable
 */
export class Draggable extends Selectable {
  protected _isDrag: boolean;
  protected _pointerOffset: Point;
  private _dragThresholdSq: number;
  private _storedStageHitArea: any;
  private _storedStageEventMode: any;

  constructor() {
    super();
    this.onPointerMove = this.onPointerMove.bind(this);

    this._isDrag = false;
    this._pointerOffset = new Point(0, 0);
    this._dragThresholdSq = 15 * 15;

    this.cursor = 'grab';
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

  protected addEventListeners() {
    this.on('pointerdown', this.onPointerDown);
    this.on('pointerup', this.onPointerUp);
    this.on('pointerupoutside', this.onPointerUpOutside);
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

    this._storedStageHitArea = this.app.stage.hitArea;
    this._storedStageEventMode = this.app.stage.eventMode;

    this.app.stage.cursor = 'grabbing';
    this.cursor = 'grabbing';

    this.app.stage.hitArea = this.app.screen;
    this.app.stage.eventMode = 'static';
    this.app.stage.on('pointermove', this.onPointerMove);
    this.app.stage.on('pointerup', this.onPointerUp);
    this.app.stage.on('pointerupoutside', this.onPointerUpOutside);
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
    this.removeAppListeners();
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
    this.removeAppListeners();
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

  removeAppListeners() {
    this.app.stage.off('pointermove', this.onPointerMove);
    this.app.stage.off('pointerup', this.onPointerUp);
    this.app.stage.off('pointerupoutside', this.onPointerUpOutside);

    this.app.stage.hitArea = this._storedStageHitArea;
    this.app.stage.eventMode = this._storedStageEventMode;
    this._storedStageHitArea = null;
    this._storedStageEventMode = null;

    this.app.stage.cursor = 'default';
    this.cursor = 'grab';

    this.setHitArea();
  }

  public addVisual(pVisual: Container): void {
    this._visuals.addChild(pVisual);
    this.setHitArea();
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
        this._eventData = pEvent;
        this.snapToMouse();
      }
    }
  }

  /**
   * Drag begin
   */
  protected dragBegin(): void {
    this._isDrag = true;
    dragBegin(this);
  }

  /**
   * Drag end
   */
  protected dragEnd(): void {
    this._isDrag = false;
    this._eventData = undefined;
    dragEnd(this);
  }

  /**
   * Snaps to mouse
   */
  protected snapToMouse(): void {
    const pos = this.parent.toLocal(this._eventData!.global, this.parent);
    this.position.set(pos.x, pos.y);
  }
}
