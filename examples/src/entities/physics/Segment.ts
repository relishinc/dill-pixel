import { Platform, PlatformConfig } from '@/entities/physics/Platform';
import { Container } from '@relish-studios/dill-pixel';
import { EndlessRunner } from '@/entities/physics/EndlessRunner';
import { Pool } from 'pixi.js';

export type SegmentConfig = {
  width?: number;
  height?: number;
  platforms: PlatformConfig[];
};

export class Segment extends Container {
  static pool: Pool<Platform> = new Pool(Platform, 50);
  private _platforms: Platform[] = [];
  private _config: SegmentConfig;

  get width() {
    return this._config.width ?? this.getLocalBounds().width;
  }

  init(config: SegmentConfig) {
    config.platforms.forEach((platformConfig) => {
      const pl = Segment.pool.get(platformConfig);
      this.add.existing(pl);
      this._platforms.push(pl);
    });
    this._config = config;
  }

  reset() {
    this._platforms = [];
    this.removeChildren();
  }

  update(deltaTime: number) {
    this.position.x -= Math.ceil(EndlessRunner.movement.x * deltaTime);
    this.position.y -= Math.ceil(EndlessRunner.movement.y * deltaTime);
    if (EndlessRunner.movement.x !== 0 || EndlessRunner.movement.y !== 0) {
      this._platforms.forEach((platform) => {
        platform.handleActorInteractions(
          -Math.ceil(EndlessRunner.movement.x * deltaTime),
          -Math.ceil(EndlessRunner.movement.y * deltaTime),
        );
      });
    }

    if (this.getGlobalPosition().x + this.width < -1000) {
      EndlessRunner.removeSegment(this);
    }
  }
}
