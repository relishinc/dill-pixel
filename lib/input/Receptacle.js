import { Container, Point, Rectangle } from 'pixi.js';
import { SignalConnections } from 'typed-signals';
import { AudioToken } from '../audio';
import * as AudioCategory from '../audio/AudioCategory';
import { playAudio } from '../functions';
import { Signals } from '../signals';
import * as PixiUtils from '../utils/PixiUtils';
import * as RectUtils from '../utils/RectUtils';
import * as InputUtils from './InputUtils';
/**
 * Receptacle
 */
export class Receptacle extends Container {
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
     * Gets whether is active
     */
    get isActive() {
        return this._isActive;
    }
    /**
     * Sets whether is active
     */
    set isActive(pValue) {
        this._isActive = pValue;
    }
    /**
     * onFocusBegin
     */
    onFocusBegin() {
        this.playHoverVo();
    }
    /**
     * onFocusEnd
     */
    onFocusEnd() {
        // unused
    }
    /**
     * onFocusActivated
     */
    onFocusActivated() {
        this.addDraggable(this._selected);
    }
    /**
     * onFocusPosition
     */
    getFocusPosition() {
        if (this.hitArea instanceof Rectangle) {
            return new Point().copyFrom(this.toGlobal(RectUtils.center(this.hitArea)));
        }
        else {
            return this.getGlobalPosition();
        }
    }
    /**
     * Gets focus size
     * @returns Point
     */
    getFocusSize() {
        let bounds;
        if (this.hitArea instanceof Rectangle) {
            bounds = PixiUtils.getGlobalBounds(this, this.hitArea.clone());
        }
        else {
            bounds = PixiUtils.getGlobalBounds(this);
        }
        return RectUtils.size(bounds);
    }
    /**
     * Destroys receptacle
     */
    destroy() {
        this._connections.disconnectAll();
        super.destroy();
    }
    /**
     * Plays hover vo
     */
    playHoverVo() {
        if (this._hoverVo !== undefined) {
            playAudio(new AudioToken(this._hoverVo, 1, false, AudioCategory.VO.toString()));
        }
    }
    /**
     * onPointerOver
     */
    onPointerOver() {
        this._isPointerOver = true;
        if (this._selected !== undefined) {
            this.playHoverVo();
        }
    }
    /**
     * onPointerDown
     */
    onPointerDown(pEvent) {
        this._eventData = pEvent;
    }
    /**
     * onPointerUp
     */
    onPointerUp() {
        if (this._selected !== undefined) {
            this._eventData = undefined;
            this.addDraggable(this._selected);
        }
    }
    /**
     * onPointerUpOutside
     */
    onPointerUpOutside() {
        this._eventData = undefined;
    }
    /**
     * onPointerOut
     */
    onPointerOut() {
        this._isPointerOver = false;
    }
    /**
     * onPointerMove
     */
    onPointerMove(_event) {
        // override
    }
    onTouchMove(pEvent) {
        const local = pEvent.getLocalPosition(this);
        if (this.hitArea) {
            if (!this._isPointerOver) {
                if (this.hitArea.contains(local.x, local.y)) {
                    this.onPointerOver();
                }
            }
            else {
                if (this.hitArea.contains(local.x, local.y) === false) {
                    this.onPointerOut();
                }
            }
        }
    }
    /**
     * Adds draggable
     * @param _draggable
     */
    addDraggable(_draggable) {
        // override
    }
    /**
     * onDragBegin
     * @param pTopic
     * @param pDraggable
     */
    onDragBegin(pDraggable) {
        if (this._isActive) {
            this.interactive = true;
            this._dragged = pDraggable;
        }
    }
    /**
     * onDragEnd
     * @param _draggable
     */
    onDragEnd(_draggable) {
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
    onDraggableSelected(pDraggable) {
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
    onDraggableDeselected(pDraggable) {
        if (this._isActive) {
            if (this._selected === pDraggable) {
                this.interactive = false;
                this._selected = undefined;
            }
        }
    }
}
//# sourceMappingURL=Receptacle.js.map