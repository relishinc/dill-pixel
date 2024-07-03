import { Texture } from 'pixi.js';
import { Actor, Entity, Sensor, Solid, System } from '@dill-pixel/plugin-snap-physics';

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

  getCollideables<T extends Entity = Entity>(): Set<T> {
    return System.getNearbyEntities<T>(this, (entity) => !entity.isSensor);
  }

  update(deltaTime: number) {
    super.update(deltaTime);
    this.moveY(System.gravity * deltaTime, null);
    const player = System.getNearbyEntities<Actor | Solid>(this, (entity) => entity.type === 'Player')
      .values()
      .next().value;
    if (this.collidesWith(player)) {
      this.view.tint = 0x0;
    } else {
      this.view.tint = this.config.color;
    }
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
}
