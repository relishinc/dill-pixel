import { Application, bindAllMethods, ContainerLike, KeyboardEventDetail } from 'dill-pixel';
import { Container, Point, Ticker } from 'pixi.js';
import { V8Application } from '../V8Application';
import { BaseScene } from './BaseScene';

class Camera {
  constructor(
    public container: Container,
    public viewportWidth: number,
    public viewportHeight: number,
    public worldWidth: number,
    public worldHeight: number,
  ) {
    this.container.pivot.set(this.viewportWidth / 2, this.viewportHeight / 2);
    this.updatePosition();
    return this;
  }

  pan(deltaX: number, deltaY: number) {
    const newPivotX = Math.min(
      this.container.pivot.x + deltaX,
      this.worldWidth - this.viewportWidth / this.container.scale.x,
    );
    const newPivotY = Math.min(
      this.container.pivot.y + deltaY,
      this.worldHeight - this.viewportHeight / this.container.scale.y,
    );

    this.container.pivot.set(newPivotX, newPivotY);
    // Ensuring the container position is updated to handle edge cases
    this.updatePosition();
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

    // Re-adjust the pivot and position to ensure content remains within bounds
    this.updatePosition();
  }

  focusOn(entity: ContainerLike) {
    const spritePosition = entity.getGlobalPosition();
    const centeredPivotX = spritePosition.x - this.viewportWidth / 2 / this.container.scale.x;
    const centeredPivotY = spritePosition.y - this.viewportHeight / 2 / this.container.scale.y;

    this.container.pivot.set(centeredPivotX, centeredPivotY);
    this.updatePosition();
  }

  private updatePosition() {
    // Adjust pivot to keep within bounds
    const maxPivotX = Math.max(0, this.worldWidth - this.viewportWidth / this.container.scale.x);
    const maxPivotY = Math.max(0, this.worldHeight - this.viewportHeight / this.container.scale.y);
    this.container.pivot.x = Math.min(this.container.pivot.x, maxPivotX);
    this.container.pivot.y = Math.min(this.container.pivot.y, maxPivotY);

    // Ensure container is correctly positioned within viewport
    this.container.position.set(this.viewportWidth / 2, this.viewportHeight / 2);
  }
}

class CameraController {
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

export class CameraScene extends BaseScene {
  protected readonly title = 'Camera Scene';
  private camera: Camera;
  private cameraController: CameraController;

  constructor() {
    super();
    this.alpha = 0;
    this.app.stage.eventMode = 'static';
  }

  public async initialize() {
    await super.initialize();
    this.camera = new Camera(this, this.app.screen.width, this.app.screen.height, 4000, 4000);
    this.cameraController = new CameraController(this.camera, this.app.stage);
  }

  update(ticker: Ticker) {}

  resize() {}

  destroy() {
    this.cameraController.destroy();
    super.destroy();
  }
}
