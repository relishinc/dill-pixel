import { Texture } from 'pixi.js';
import { Solid as TowerFallSolid } from './Solid';

export type WallConfig = {
  width: number;
  height: number;
  debugColor: number;
};

const defaults: WallConfig = {
  width: 10,
  height: 10,
  // debug neon blue
  debugColor: 0x00ffff,
};

export class Wall extends TowerFallSolid<WallConfig> {
  type = 'Wall';

  constructor(config: Partial<WallConfig> = {}) {
    super({ ...defaults, ...config });
    this.initialize();
  }

  protected initialize() {
    this.view = this.add.sprite({
      asset: Texture.WHITE,
      width: this.config.width,
      height: this.config.height,
      tint: this.config.debugColor,
      anchor: 0.5,
    });
  }
}
