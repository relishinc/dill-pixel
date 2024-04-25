import { PointLike, resolvePointLike } from 'dill-pixel';
import { Point, Sprite, Texture } from 'pixi.js';
import { Solid as TowerFallSolid } from '../../../../src/plugins/physics/towerfall';

type Direction = -1 | 0 | 1;

export type PlatformMovementConfigOpts = {
  speed: PointLike;
  startingDirection: { x: Direction; y: Direction };
  range: PointLike;
};

export type PlatformMovementConfig = {
  speed: Point;
  startingDirection: { x: Direction; y: Direction };
  range: Point;
};

export type PlatformConfig = {
  width: number;
  height: number;
  color: number;
  moving: boolean;
  movementConfig: PlatformMovementConfig;
};
export type PlatformConfigOpts = {
  width: number;
  height: number;
  color: number;
  moving: boolean;
  movementConfig: PlatformMovementConfigOpts;
};

const defaults: PlatformConfig = {
  width: 100,
  height: 10,
  color: 0x00ff00,
  moving: false,
  movementConfig: null,
};

export class Platform extends TowerFallSolid<PlatformConfig> {
  public view: Sprite;
  private _startPos: Point;

  static resolveConfig(config: Partial<PlatformConfigOpts>): PlatformConfig {
    return {
      width: config.width || defaults.width,
      height: config.height || defaults.height,
      color: config.color || defaults.color,
      moving: config.moving || defaults.moving,
      movementConfig: config.movementConfig
        ? {
            speed: resolvePointLike(config.movementConfig.speed, true),
            startingDirection: config.movementConfig.startingDirection || { x: 1, y: 0 },
            range: resolvePointLike(config.movementConfig.range, true),
          }
        : null,
    };
  }

  constructor(config: Partial<PlatformConfigOpts> = {}) {
    super(Platform.resolveConfig(config));
    this.initialize();
  }

  get offset() {
    if (!this.view) return { x: 0, y: 0 };
    return { x: -this.view.width * 0.5, y: -this.view.height * 0.5 };
  }

  protected initialize() {
    this._startPos = this.position.clone();
    this.view = this.add.sprite({
      asset: Texture.WHITE,
      width: this.config.width,
      height: this.config.height,
      tint: this.config.color,
      anchor: 0.5,
    });
  }

  update(deltaTime: number) {
    if (!this.config.moving) return;
    if (Math.abs(this.x - this._startPos.x) > this.config.movementConfig.range.x) {
      this.config.movementConfig.startingDirection.x *= -1;
    }

    if (Math.abs(this.y - this._startPos.y) > this.config.movementConfig.range.y) {
      this.config.movementConfig.startingDirection.y *= -1;
    }
    this.move(
      this.config.movementConfig.speed.x * deltaTime * this.config.movementConfig.startingDirection.x,
      this.config.movementConfig.speed.y * deltaTime * this.config.movementConfig.startingDirection.y,
    );
  }
}
