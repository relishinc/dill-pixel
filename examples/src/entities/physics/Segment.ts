import { Platform, PlatformConfig } from '@/entities/physics/Platform';
import { Container } from '@relish-studios/dill-pixel';
import { EndlessRunner } from '@/entities/physics/EndlessRunner';
import { Pool } from 'pixi.js';

export type SegmentConfig = {
  platforms: PlatformConfig[];
};

export class Segment extends Container {
  static pool: Pool<Platform> = new Pool(Platform, 50);
  private _platforms: Platform[] = [];

  init(config: SegmentConfig) {
    config.platforms.forEach((platformConfig) => {
      const pl = Segment.pool.get();
      pl.init(platformConfig);
      this.add.existing(pl);
      this._platforms.push(pl);
    });
  }

  reset() {
    this._platforms = [];
    this.removeChildren();
  }

  update(deltaTime: number) {
    this.position.x -= EndlessRunner.movement.x * deltaTime;
    this.position.y -= EndlessRunner.movement.y * deltaTime;
    if (EndlessRunner.movement.x !== 0 || EndlessRunner.movement.y !== 0) {
      this._platforms.forEach((platform) => {
        platform.handleActorInteractions(-EndlessRunner.movement.x * deltaTime, -EndlessRunner.movement.y * deltaTime);
      });
    }

    if (this.getGlobalPosition().x + this.getBounds().width < -100) {
      EndlessRunner.removeSegment(this);
    }
  }
}
