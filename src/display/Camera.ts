import { Container, Point } from 'pixi.js';
import { ContainerLike, PointLike } from '../utils/types';
import { Signal } from '../signals';
import { Application, IApplication } from '../core/Application';
import { bindAllMethods } from '../utils/methodBinding';
import { Logger } from '../utils/console/Logger';
import { resolvePointLike } from '../utils/functions';
import { KeyboardEventDetail } from '../plugins/KeyboardManager';

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

export interface ICamera {
  onZoom: Signal<(camera: ICamera) => void>;
  container: Container;
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  viewportWidth: number;
  viewportHeight: number;
  worldWidth: number;
  worldHeight: number;
  readonly targetPivot: Point;
  readonly targetScale: Point;
  readonly zooming: boolean;
  readonly zoomLerp: number;
  readonly lerp: number;
  readonly target: ContainerLike | null;
  readonly followOffset: Point;
  app: Application;

  follow(target: ContainerLike, offset: PointLike): void;

  pan(deltaX: number, deltaY: number): void;

  zoom(scale: number, lerp?: number): void;

  update(): void;
}

export class Camera extends Container implements ICamera {
  public onZoom = new Signal<(camera: ICamera) => void>();
  public onZoomComplete = new Signal<(camera: ICamera) => void>();
  public container: Container;
  public minX: number = 0;
  public minY: number = 0;
  public maxX: number;
  public maxY: number;
  public viewportWidth: number;
  public viewportHeight: number;
  public worldWidth: number;
  public worldHeight: number;

  constructor(public config: CustomCameraConfig) {
    super({ isRenderGroup: true });
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

  protected _zooming: boolean = false;

  get zooming(): boolean {
    return this._zooming;
  }

  protected _zoomLerp: number = 0.1;

  get zoomLerp(): number {
    return this._zoomLerp;
  }

  protected _targetPivot: Point = new Point(0, 0);

  get targetPivot(): Point {
    return this._targetPivot;
  }

  protected _targetScale: Point = new Point(1, 1);

  get targetScale(): Point {
    return this._targetPivot;
  }

  private _lerp: number = 0;

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

  protected _target: ContainerLike | null = null;

  get target(): ContainerLike | null {
    return this._target;
  }

  set target(value: ContainerLike | null) {
    this._target = value;
    if (this._target) {
      this.focusOn(this._target);
    }
  }

  protected _followOffset: Point = new Point(0, 0);
  get followOffset(): Point {
    return this._followOffset;
  }

  set followOffset(value: PointLike) {
    this._followOffset = resolvePointLike(value, true);
  }

  get app(): Application {
    return Application.getInstance();
  }

  follow(target: ContainerLike, offset: PointLike) {
    this.followOffset = offset;
    this.target = target;
  }

  pan(deltaX: number, deltaY: number) {
    let newPivotX = this.pivot.x + deltaX;
    let newPivotY = this.pivot.y + deltaY;

    // Clamp pivot to min and max values
    newPivotX = Math.max(this.minX, Math.min(newPivotX, this.maxX));
    newPivotY = Math.max(this.minY, Math.min(newPivotY, this.maxY));

    this._targetPivot.set(newPivotX, newPivotY);
  }

  zoom(scale: number, lerp: number = 0.1) {
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
    if (
      this._zooming &&
      Math.abs(this.scale.x - this._targetScale.x) < 0.001 &&
      Math.abs(this.scale.y - this._targetScale.y) < 0.001
    ) {
      this.onZoom.emit(this);
      this._zooming = false;
      this.scale.set(this._targetScale.x, this._targetScale.y);
      this.onZoomComplete.emit(this);
    } else if (this._zooming) {
      this.onZoom.emit(this);
    }
  }

  private focusOn(entity: ContainerLike) {
    // Get the global position of the entity and convert it to the local position within the container.
    const globalPosition = entity.getGlobalPosition();
    const spritePosition = this.toLocal(globalPosition);

    const posXModifier = this.position.x / this.scale.x - this.viewportWidth / 2;
    const posYModifier = this.position.y / this.scale.y - this.viewportHeight / 2;

    const offsetX = this.followOffset.x / this.scale.x;
    const offsetY = this.followOffset.y / this.scale.y;

    this._targetPivot.x = (spritePosition.x * this.scale.x + this.viewportWidth / 2) * (1 / this.scale.x) + offsetX;

    const tMinX = this.viewportWidth / this.scale.x / 2 + posXModifier + this.minX;
    const tMaxX = this.worldWidth - this.viewportWidth / this.scale.x / 2 + posXModifier + this.maxX;

    if (this._targetPivot.x < tMinX) {
      this._targetPivot.x = tMinX;
    } else if (this._targetPivot.x > tMaxX) {
      this._targetPivot.x = tMaxX;
    }

    this._targetPivot.y = (spritePosition.y * this.scale.y + this.viewportHeight / 2) * (1 / this.scale.y) + offsetY;

    const tMinY = this.viewportHeight / this.scale.y / 2 + posYModifier + this.minY;
    const tMaxY = this.worldHeight - this.viewportHeight / this.scale.y / 2 + posYModifier + this.maxY - offsetY;

    if (this._targetPivot.y < tMinY) {
      this._targetPivot.y = tMinY;
    } else if (this._targetPivot.y > tMaxY) {
      this._targetPivot.y = tMaxY;
    }
  }

  private updateZoom() {
    const currentScaleX = this.scale.x;
    const currentScaleY = this.scale.y;

    const interpolatedScaleX = currentScaleX + this._zoomLerp * (this._targetScale.x - currentScaleX);
    const interpolatedScaleY = currentScaleY + this._zoomLerp * (this._targetScale.y - currentScaleY);

    this.scale.set(Math.max(0, interpolatedScaleX), Math.max(0, interpolatedScaleY));
  }

  private updatePosition(skipLerp: boolean = false) {
    if (this.lerp > 0 && !skipLerp) {
      // Current pivot positions
      const currentPivotX = this.pivot.x;
      const currentPivotY = this.pivot.y;

      // Calculate interpolated pivot positions
      const interpolatedPivotX = currentPivotX + this.lerp * (this._targetPivot.x - currentPivotX);
      const interpolatedPivotY = currentPivotY + this.lerp * (this._targetPivot.y - currentPivotY);

      // Set the pivot to the interpolated position to smooth out the camera movement
      this.pivot.set(interpolatedPivotX, interpolatedPivotY);
    } else {
      this.pivot.set(this._targetPivot.x, this._targetPivot.y);
    }

    this.position.set(this.viewportWidth / 2, this.viewportHeight / 2);
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

  get app(): IApplication {
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
