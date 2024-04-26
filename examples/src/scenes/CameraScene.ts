import { Camera, CameraController } from '../entities/Camera.ts';
import { BaseScene } from './BaseScene';

export class CameraScene extends BaseScene {
  protected readonly title = 'Camera Scene';
  protected readonly subtitle = 'Arrows to pan, or click and drag';
  private camera: Camera;
  private cameraController: CameraController;

  constructor() {
    super();
    this.alpha = 0;
    this.app.stage.eventMode = 'static';
  }

  public async initialize() {
    await super.initialize();
    this.camera = new Camera({
      container: this,
      viewportWidth: this.app.screen.width,
      viewportHeight: this.app.screen.height,
      worldWidth: 4000,
      worldHeight: 4000,
      lerp: 0.1,
    });
    this.cameraController = new CameraController(this.camera, this.app.stage);
  }

  update() {
    this.camera?.update();
  }

  resize() {
    super.resize();
  }

  destroy() {
    this.cameraController.destroy();
    super.destroy();
  }
}
