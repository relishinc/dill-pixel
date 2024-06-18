import { Platform, PlatformConfig } from '@/entities/physics/Platform';
import { EndlessRunner } from '@/entities/physics/EndlessRunner';
import { Graphics, Point, Pool } from 'pixi.js';
import { Application, Container, IApplication } from 'dill-pixel';
import SnapPhysicsPlugin from '@dill-pixel/plugin-snap-physics';

export type SegmentConfig = {
  width: number;
  height?: number;
  container?: Container;
  platforms: PlatformConfig[];
};

export class Segment {
  static pool: Pool<Platform> = new Pool(Platform, 50);

  position: Point = new Point();
  private _platforms: Platform[] = [];
  private _config: SegmentConfig;
  private _container: Container;
  private _gfx: Graphics | null;
  private _canUpdate: boolean = false;

  get app(): IApplication {
    return Application.getInstance();
  }

  get system() {
    return (this.app.getPlugin('physics') as unknown as SnapPhysicsPlugin).system;
  }

  get x(): number {
    return this.position.x;
  }

  set x(value: number) {
    this.position.x = value;
  }

  get y(): number {
    return this.position.y;
  }

  set y(value: number) {
    this.position.y = value;
  }

  get width() {
    return this._config.width ?? 0;
  }

  get height() {
    return this._config.height ?? 0;
  }

  init(config: SegmentConfig) {
    this._container = config.container ?? this.app.scenes.currentScene;
    this._config = config;
    this._config.platforms.forEach((platformConfig) => {
      const pl = Segment.pool.get(platformConfig);
      this._container.add.existing(pl);
      this._platforms.push(pl);
    });
    this._canUpdate = true;
  }

  setPosition(x: number, y: number = 0) {
    this.x = x;
    this.y = y;

    this._platforms.forEach((platform) => {
      platform.x += x;
      platform.y += y;
    });
  }

  reset() {
    if (this._gfx) {
      this._canUpdate = false;
      this._container.removeChild(this._gfx);
      this._gfx.destroy();
      this._gfx = null;
    }
    this._platforms.forEach((p) => this._container.removeChild(p));
    this._platforms = [];
  }

  update() {
    if (!this._canUpdate) return;
    if (EndlessRunner.movement.x !== 0 || EndlessRunner.movement.y !== 0) {
      this.x -= EndlessRunner.movement.x;
      this.y -= EndlessRunner.movement.y;

      this._platforms.forEach((platform) => {
        platform.move(-EndlessRunner.movement.x, -EndlessRunner.movement.y);
      });

      if (this.system.debug) {
        this._drawDebug();
      } else {
        if (this._gfx) {
          this._container.removeChild(this._gfx);
          this._gfx.destroy();
          this._gfx = null;
        }
      }
    }
  }

  private _drawDebug() {
    if (!this._gfx) {
      this._gfx = new Graphics();
      this._container.addChild(this._gfx);
    }
    if (this._gfx) {
      this._gfx.clear();
      this._gfx.rect(this.x, this.app.size.height - 100, this.width, this.height ?? 10);
      this._gfx.rect(this.x, this.app.size.height - 120, 1, 20);
      this._gfx.stroke({ color: 0xff0000, width: 1 });
    }
  }
}
