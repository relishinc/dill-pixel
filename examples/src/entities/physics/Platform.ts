import { PointLike, resolvePointLike } from '@relish-studios/dill-pixel';
import { Point, Texture } from 'pixi.js';
import { Solid as TowerFallSolid, System } from '../../../../src/plugins/physics/towerfall';

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
  canJumpThroughBottom?: boolean;
  movementConfig?: PlatformMovementConfig;
};
export type PlatformConfigOpts = {
  width: number;
  height: number;
  color: number;
  moving: boolean;
  canJumpThroughBottom?: boolean;
  movementConfig?: PlatformMovementConfigOpts;
};

const defaults: PlatformConfig = {
  width: 100,
  height: 10,
  color: 0x00ff00,
  canJumpThroughBottom: false,
  moving: false,
};

export class Platform extends TowerFallSolid<PlatformConfig> {
  type = 'Platform';
  private _startPos: Point;

  constructor(config: Partial<PlatformConfigOpts> = {}) {
    super(Platform.resolveConfig(config));
    this.initialize();
  }

  get collideables() {
    return [...System.actors, ...System.sensors];
  }

  get canJumpThroughBottom() {
    return this.config.canJumpThroughBottom;
  }

  get moving() {
    return this.config.moving;
  }

  static resolveConfig(config: Partial<PlatformConfigOpts>): PlatformConfig {
    return {
      width: config.width ?? defaults.width,
      height: config.height ?? defaults.height,
      color: config.color ?? defaults.color,
      moving: config.moving ?? defaults.moving,
      canJumpThroughBottom: config?.canJumpThroughBottom === true,
      movementConfig: config.movementConfig
        ? {
            speed: resolvePointLike(config.movementConfig.speed, true),
            startingDirection: config.movementConfig.startingDirection || { x: 1, y: 0 },
            range: resolvePointLike(config.movementConfig.range, true),
          }
        : undefined,
    };
  }

  added() {
    this._startPos = this.position.clone();
    super.added();
  }

  update(deltaTime: number) {
    if (!this.config.moving || !this.config.movementConfig) return;

    this.move(
      this.config.movementConfig.speed.x * deltaTime * this.config.movementConfig.startingDirection.x,
      this.config.movementConfig.speed.y * deltaTime * this.config.movementConfig.startingDirection.y,
    );

    if (Math.abs(this.x - this._startPos.x) >= this.config.movementConfig.range.x) {
      this.config.movementConfig.startingDirection.x *= -1;
    }
    if (Math.abs(this.y - this._startPos.y) >= this.config.movementConfig.range.y) {
      this.config.movementConfig.startingDirection.y *= -1;
    }
  }

  protected handleCollisionChange(isColliding: boolean) {
    if (isColliding) {
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
