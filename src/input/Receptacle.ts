import {Container, FederatedPointerEvent, IPoint, Point, Rectangle} from 'pixi.js';
import {SignalConnections} from 'typed-signals';
import {AudioToken} from '../audio';
import * as AudioCategory from '../audio/AudioCategory';
import {playAudio, Signals} from '../signals';
import * as PixiUtils from '../utils/PixiUtils';
import * as RectUtils from '../utils/RectUtils';
import {Draggable} from './Draggable';
import {IFocusable} from './IFocusable';
import * as InputUtils from './InputUtils';

/**
 * Receptacle
 */
export abstract class Receptacle extends Container implements IFocusable {
  protected _visuals: Container;
  protected _eventData: FederatedPointerEvent | undefined;
  protected _isPointerOver: boolean;
  protected _hoverVo: string | undefined;
  protected _dragged: Draggable | undefined;
  protected _selected: Draggable | undefined;
  protected _isActive: boolean;
  private _connections: SignalConnections;

  constructor() {
    super();

    this.onDragBegin = this.onDragBegin.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onDraggableSelected = this.onDraggableSelected.bind(this);
    this.onDraggableDeselected = this.onDraggableDeselected.bind(this);

    this._isPointerOver = false;
    this._isActive = true;

    this._visuals = new Container();
    this.addChild(this._visuals);

    this.cursor = 'pointer';
    this.interactive = false;

    this.on(InputUtils.Events.POINTER_OVER, this.onPointerOver);
    this.on(InputUtils.Events.POINTER_DOWN, this.onPointerDown);
    this.on(InputUtils.Events.POINTER_UP, this.onPointerUp);
    this.on(InputUtils.Events.POINTER_UP_OUTSIDE, this.onPointerUpOutside);
    this.on(InputUtils.Events.POINTER_OUT, this.onPointerOut);
    this.on(InputUtils.Events.POINTER_MOVE, this.onPointerMove);
    this.on(InputUtils.Events.TOUCH_MOVE, this.onTouchMove);

    this._connections = new SignalConnections();
    this._connections.add(Signals.dragBegin.connect(this.onDragBegin));
    this._connections.add(Signals.dragEnd.connect(this.onDragEnd));
    this._connections.add(Signals.draggableSelected.connect(this.onDraggableSelected));
    this._connections.add(Signals.draggableDeselected.connect(this.onDraggableDeselected));
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
  public getFocusPosition(): Point {
    if (this.hitArea instanceof Rectangle) {
      return new Point().copyFrom(this.toGlobal(RectUtils.center(this.hitArea)));
    } else {
      return this.getGlobalPosition();
    }
  }

  /**
   * Gets focus size
   * @returns Point
   */
  public getFocusSize(): IPoint {
    let bounds: Rectangle;
    if (this.hitArea instanceof Rectangle) {
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
    this._connections.disconnectAll();
    super.destroy();
  }

  /**
   * Plays hover vo
   */
  protected playHoverVo(): void {
    if (this._hoverVo !== undefined) {
      playAudio(new AudioToken(this._hoverVo, 1, false, AudioCategory.VO.toString()));
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
    const local: Point = pEvent.getLocalPosition(this);
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
  protected onDragBegin(pDraggable: Draggable): void {
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
  protected onDragEnd(pDraggable: Draggable): void {
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
  protected onDraggableSelected(pDraggable: Draggable): void {
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
  protected onDraggableDeselected(pDraggable: Draggable): void {
    if (this._isActive) {
      if (this._selected === pDraggable) {
        this.interactive = false;
        this._selected = undefined;
      }
    }
  }
}
