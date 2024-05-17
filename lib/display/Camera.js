import { Container, Point } from 'pixi.js';
import { Signal } from '../signals';
import { Application } from '../core/Application';
import { bindAllMethods } from '../utils/methodBinding';
import { Logger } from '../utils/console/Logger';
import { resolvePointLike } from '../utils/functions';
export class Camera extends Container {
    config;
    onZoom = new Signal();
    onZoomComplete = new Signal();
    container;
    minX = 0;
    minY = 0;
    maxX;
    maxY;
    viewportWidth;
    viewportHeight;
    worldWidth;
    worldHeight;
    constructor(config) {
        super({ isRenderGroup: true });
        this.config = config;
        bindAllMethods(this);
        if (config) {
            this.container = config.container;
            this.addChild(this.container);
            if (config.minX) {
                this.minX = config.minX;
            }
            if (config.maxX) {
                this.maxX = config.maxX;
            }
            if (config.minY) {
                this.minY = config.minY;
            }
            this.viewportWidth = config.viewportWidth ?? this.app.size.width;
            this.viewportHeight = config.viewportHeight ?? this.app.size.width;
            this.worldWidth = config.worldWidth ?? this.viewportWidth;
            this.worldHeight = config.worldHeight ?? this.viewportHeight;
            this.maxX = config.maxX ?? this.worldWidth - this.viewportWidth;
            this.maxY = config.maxY ?? this.worldHeight - this.viewportHeight;
        }
        this._targetPivot.set(this.viewportWidth * 0.5, this.viewportHeight * 0.5);
        if (config.target) {
            this.target = config.target;
        }
        this._lerp = 1;
        this.update();
        if (config.lerp) {
            this.lerp = config.lerp;
        }
        return this;
    }
    _zooming = false;
    get zooming() {
        return this._zooming;
    }
    _zoomLerp = 0.1;
    get zoomLerp() {
        return this._zoomLerp;
    }
    _targetPivot = new Point(0, 0);
    get targetPivot() {
        return this._targetPivot;
    }
    _targetScale = new Point(1, 1);
    get targetScale() {
        return this._targetPivot;
    }
    _lerp = 0;
    get lerp() {
        return this._lerp;
    }
    set lerp(value) {
        // if the value is less than 0 or greater than 1, clamp it to the range [0, 1], and log an error
        if (value < 0 || value > 1) {
            Logger.error('Camera lerp value must be in the range [0, 1]');
        }
        this._lerp = Math.max(0, Math.min(value, 1));
    }
    _target = null;
    get target() {
        return this._target;
    }
    set target(value) {
        this._target = value;
        if (this._target) {
            this.focusOn(this._target);
        }
    }
    _followOffset = new Point(0, 0);
    get followOffset() {
        return this._followOffset;
    }
    set followOffset(value) {
        this._followOffset = resolvePointLike(value, true);
    }
    get app() {
        return Application.getInstance();
    }
    follow(target, offset) {
        if (!offset) {
            offset = { x: 0, y: 0 };
        }
        this.followOffset = offset;
        this.target = target;
    }
    pan(deltaX, deltaY) {
        let newPivotX = this.pivot.x + deltaX;
        let newPivotY = this.pivot.y + deltaY;
        // Clamp pivot to min and max values
        newPivotX = Math.max(this.minX, Math.min(newPivotX, this.maxX));
        newPivotY = Math.max(this.minY, Math.min(newPivotY, this.maxY));
        this._targetPivot.set(newPivotX, newPivotY);
    }
    zoom(scale, lerp = 0.1) {
        this._zoomLerp = lerp;
        this._zooming = true;
        this._targetScale.set(scale, scale);
    }
    update() {
        this.updateZoom();
        if (this._target) {
            this.focusOn(this._target);
        }
        this.updatePosition(this._zooming);
        if (this._zooming &&
            Math.abs(this.scale.x - this._targetScale.x) < 0.001 &&
            Math.abs(this.scale.y - this._targetScale.y) < 0.001) {
            this.onZoom.emit(this);
            this._zooming = false;
            this.scale.set(this._targetScale.x, this._targetScale.y);
            this.onZoomComplete.emit(this);
        }
        else if (this._zooming) {
            this.onZoom.emit(this);
        }
    }
    focusOn(entity) {
        // Get the global position of the entity and convert it to the local position within the container.
        const globalPosition = entity.getGlobalPosition();
        const spritePosition = this.toLocal(globalPosition);
        const posXModifier = this.position.x / this.scale.x - this.viewportWidth / 2;
        const posYModifier = this.position.y / this.scale.y - this.viewportHeight / 2;
        const offsetX = this.followOffset.x / this.scale.x;
        const offsetY = this.followOffset.y / this.scale.y;
        this._targetPivot.x = (spritePosition.x * this.scale.x + this.viewportWidth / 2) * (1 / this.scale.x) + offsetX;
        const tMinX = this.viewportWidth / this.scale.x / 2 + posXModifier + this.minX - offsetX;
        const tMaxX = this.worldWidth - this.viewportWidth / this.scale.x / 2 + posXModifier + this.maxX + offsetX;
        if (this._targetPivot.x < tMinX) {
            this._targetPivot.x = tMinX;
        }
        else if (this._targetPivot.x > tMaxX) {
            this._targetPivot.x = tMaxX;
        }
        this._targetPivot.y = (spritePosition.y * this.scale.y + this.viewportHeight / 2) * (1 / this.scale.y) + offsetY;
        const tMinY = this.viewportHeight / this.scale.y / 2 + posYModifier + this.minY - offsetY;
        const tMaxY = this.worldHeight - this.viewportHeight / this.scale.y / 2 + posYModifier + this.maxY - offsetY;
        if (this._targetPivot.y < tMinY) {
            this._targetPivot.y = tMinY;
        }
        else if (this._targetPivot.y > tMaxY) {
            this._targetPivot.y = tMaxY;
        }
    }
    updateZoom() {
        const currentScaleX = this.scale.x;
        const currentScaleY = this.scale.y;
        const interpolatedScaleX = currentScaleX + this._zoomLerp * (this._targetScale.x - currentScaleX);
        const interpolatedScaleY = currentScaleY + this._zoomLerp * (this._targetScale.y - currentScaleY);
        this.scale.set(Math.max(0, interpolatedScaleX), Math.max(0, interpolatedScaleY));
    }
    updatePosition(skipLerp = false) {
        if (this.lerp > 0 && !skipLerp) {
            // Current pivot positions
            const currentPivotX = this.pivot.x;
            const currentPivotY = this.pivot.y;
            // Calculate interpolated pivot positions
            const interpolatedPivotX = currentPivotX + this.lerp * (this._targetPivot.x - currentPivotX);
            const interpolatedPivotY = currentPivotY + this.lerp * (this._targetPivot.y - currentPivotY);
            // Set the pivot to the interpolated position to smooth out the camera movement
            this.pivot.set(interpolatedPivotX, interpolatedPivotY);
        }
        else {
            this.pivot.set(this._targetPivot.x, this._targetPivot.y);
        }
        this.position.set(this.viewportWidth / 2, this.viewportHeight / 2);
    }
}
export class CameraController {
    camera;
    interactiveArea;
    dragging = false;
    previousPointerPosition = null;
    constructor(camera, interactiveArea) {
        this.camera = camera;
        this.interactiveArea = interactiveArea;
        bindAllMethods(this);
        this.camera = camera;
        this.interactiveArea = interactiveArea;
        this.app.keyboard.onKeyDown().connect(this.handleKeyDown);
        // Keyboard events
        // Mouse and touch events
        this.interactiveArea.on('pointerdown', this.onPointerDown.bind(this));
        this.interactiveArea.on('pointermove', this.onPointerMove.bind(this));
        this.app.stage.on('pointerup', this.onPointerUp.bind(this));
        this.app.stage.on('pointerupoutside', this.onPointerUp.bind(this));
        // Touch events equivalent
        this.interactiveArea.on('touchstart', this.onPointerDown.bind(this));
        this.interactiveArea.on('touchmove', this.onPointerMove.bind(this));
        this.interactiveArea.on('touchend', this.onPointerUp.bind(this));
    }
    get app() {
        return Application.getInstance();
    }
    destroy() {
        // Mouse and touch events
        this.interactiveArea.removeAllListeners();
        this.app.stage.off('pointerup', this.onPointerUp.bind(this));
        this.app.stage.off('pointerupoutside', this.onPointerUp.bind(this));
    }
    handleKeyDown(detail) {
        const panSpeed = 10; // Adjust pan speed as necessary
        const zoomFactor = 1.1; // Adjust zoom factor as necessary
        switch (detail.event.key) {
            case 'ArrowUp':
                this.camera.pan(0, -panSpeed);
                break;
            case 'ArrowDown':
                this.camera.pan(0, panSpeed);
                break;
            case 'ArrowLeft':
                this.camera.pan(-panSpeed, 0);
                break;
            case 'ArrowRight':
                this.camera.pan(panSpeed, 0);
                break;
            case '+':
                this.camera.zoom(zoomFactor);
                break;
            case '-':
                this.camera.zoom(1 / zoomFactor);
                break;
        }
    }
    onPointerDown(event) {
        this.dragging = true;
        this.previousPointerPosition = this.getEventPosition(event);
    }
    onPointerMove(event) {
        if (!this.dragging || !this.previousPointerPosition)
            return;
        const currentPosition = this.getEventPosition(event);
        const deltaX = currentPosition.x - this.previousPointerPosition.x;
        const deltaY = currentPosition.y - this.previousPointerPosition.y;
        this.camera.pan(deltaX, deltaY);
        this.previousPointerPosition = currentPosition;
    }
    onPointerUp() {
        this.dragging = false;
        this.previousPointerPosition = null;
    }
    getEventPosition(event) {
        if (event instanceof TouchEvent) {
            return new Point(event.touches[0].clientX, event.touches[0].clientY);
        }
        else {
            return new Point(event.clientX, event.clientY);
        }
    }
}
