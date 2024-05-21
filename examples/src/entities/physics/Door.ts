import { Texture } from 'pixi.js';
import { Entity, Sensor, System } from '@dill-pixel/plugin-snap-physics';

export type DoorConfig = {
  width: number;
  height: number;
  color: number;
};

const defaults: DoorConfig = {
  width: 75,
  height: 130,
  color: 0x000ff0,
};

export class Door extends Sensor<DoorConfig> {
  type = 'Door';
  passThroughTypes = ['Player'];

  constructor(config: Partial<DoorConfig> = {}) {
    super({ ...defaults, ...config });
    this.initialize();
  }

  get collideables(): Entity[] {
    return System.getNearbyEntities(this, (entity) => !entity.isSensor);
  }

  update(deltaTime: number) {
    this.moveY(System.gravity * deltaTime, null);
  }

  protected initialize() {
    this.view = this.add.sprite({
      asset: Texture.WHITE,
      width: this.config.width,
      height: this.config.height,
      tint: this.config.color,
      anchor: 0.5,
    });
  }

  protected handleCollisionChange(isColliding: boolean) {
    if (isColliding) {
      this.view.tint = 0x0;
    } else {
      this.view.tint = this.config.color;
    }
  }
}
