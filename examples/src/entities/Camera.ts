import { Application, ContainerLike, KeyboardEventDetail, Logger, bindAllMethods } from '@relish-studios/dill-pixel';
import { Container, Point } from 'pixi.js';

import { V8Application } from '../V8Application';

type CameraCOnfig = {
  container: Container;
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  viewportWidth: number;
  viewportHeight: number;
  worldWidth: number;
  worldHeight: number;
  target: ContainerLike | null;
  targetPivot: Point;
  lerp: number;
};

// require container to be set
type OptionalCameraConfig = Partial<CameraCOnfig>;
type RequiredCameraConfig = Required<Pick<CameraCOnfig, 'container'>>;
type CustomCameraConfig = OptionalCameraConfig & RequiredCameraConfig;

export class Camera {
  container: Container;
  minX: number = 0;
  minY: number = 0;
  maxX: number;
  maxY: number;
  _lerp: number = 0;
  viewportWidth: number;
  viewportHeight: number;
  worldWidth: number;
  worldHeight: number;
  //
  protected _target: ContainerLike | null = null;
  protected targetPivot: Point = new Point(0, 0);

  constructor(config: CustomCameraConfig) {
    bindAllMethods(this);
    if (config) {
      this.container = config.container;
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

    this.targetPivot.set(this.viewportWidth * 0.5, this.viewportHeight * 0.5);
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

  get lerp(): number {
    return this._lerp;
  }

  set lerp(value: number) {
    // if the value is less than 0 or greater than 1, clamp it to the range [0, 1], and log an error
    if (value < 0 || value > 1) {
      Logger.error('Camera lerp value must be in the range [0, 1]');
    }
    this._lerp = Math.max(0, Math.min(value, 1));
  }

  get app(): Application {
    return Application.getInstance();
  }

  get target(): ContainerLike | null {
    return this._target;
  }

  set target(value: ContainerLike | null) {
    this._target = value;
    if (this._target) {
      this.focusOn(this._target);
    }
  }

  follow(target: ContainerLike) {
    this.target = target;
  }

  pan(deltaX: number, deltaY: number) {
    let newPivotX = this.container.pivot.x + deltaX;
    let newPivotY = this.container.pivot.y + deltaY;

    // Clamp pivot to min and max values
    newPivotX = Math.max(this.minX, Math.min(newPivotX, this.maxX));
    newPivotY = Math.max(this.minY, Math.min(newPivotY, this.maxY));

    this.targetPivot.set(newPivotX, newPivotY);
  }

  zoom(scaleFactor: number) {
    const newScale = Math.max(
      0.1,
      Math.min(
        this.container.scale.x * scaleFactor,
        Math.max(this.worldWidth / this.viewportWidth, this.worldHeight / this.viewportHeight),
      ),
    );
    this.container.scale.set(newScale, newScale);
    this.updatePosition();
  }

  update() {
    if (this._target) {
      this.focusOn(this._target);
    }
    this.updatePosition();
  }

  private focusOn(entity: ContainerLike) {
    // Get the global position of the entity and convert it to the local position within the container.
    const globalPosition = entity.getGlobalPosition();
    const spritePosition = this.container.toLocal(globalPosition, null, null, false);
    // Calculate the pivot necessary to center the sprite in the viewport.
    // Adjusting calculations to consider the container's current position
    // Assume for now that the container should be centered at the target's position
    this.targetPivot.x = spritePosition.x + this.viewportWidth / 2;
    this.targetPivot.y = spritePosition.y + this.viewportHeight / 2;
  }

  private updatePosition() {
    if (this.lerp > 0) {
      // Current pivot positions
      const currentPivotX = this.container.pivot.x;
      const currentPivotY = this.container.pivot.y;

      // Calculate interpolated pivot positions
      const interpolatedPivotX = currentPivotX + this.lerp * (this.targetPivot.x - currentPivotX);
      const interpolatedPivotY = currentPivotY + this.lerp * (this.targetPivot.y - currentPivotY);

      // Set the pivot to the interpolated position to smooth out the camera movement
      this.container.pivot.set(interpolatedPivotX, interpolatedPivotY);
    } else {
      this.container.pivot.set(this.targetPivot.x, this.targetPivot.y);
    }
    this.container.position.set(this.viewportWidth / 2, this.viewportHeight / 2);
  }
}

export class CameraController {
  private dragging: boolean = false;
  private previousPointerPosition: Point | null = null;

  constructor(
    public camera: Camera,
    public interactiveArea: Container,
  ) {
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

  get app(): V8Application {
    return Application.getInstance();
  }

  destroy() {
    // Mouse and touch events
    this.interactiveArea.removeAllListeners();
    this.app.stage.off('pointerup', this.onPointerUp.bind(this));
    this.app.stage.off('pointerupoutside', this.onPointerUp.bind(this));
  }

  private handleKeyDown(detail: KeyboardEventDetail) {
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

  private onPointerDown(event: MouseEvent | TouchEvent) {
    this.dragging = true;
    this.previousPointerPosition = this.getEventPosition(event);
  }

  private onPointerMove(event: MouseEvent | TouchEvent) {
    if (!this.dragging || !this.previousPointerPosition) return;

    const currentPosition = this.getEventPosition(event);
    const deltaX = currentPosition.x - this.previousPointerPosition.x;
    const deltaY = currentPosition.y - this.previousPointerPosition.y;

    this.camera.pan(deltaX, deltaY);
    this.previousPointerPosition = currentPosition;
  }

  private onPointerUp() {
    this.dragging = false;
    this.previousPointerPosition = null;
  }

  private getEventPosition(event: MouseEvent | TouchEvent): Point {
    if (event instanceof TouchEvent) {
      return new Point(event.touches[0].clientX, event.touches[0].clientY);
    } else {
      return new Point(event.clientX, event.clientY);
    }
  }
}
