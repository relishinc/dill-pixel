import { PointLike, resolvePointLike } from '@relish-studios/dill-pixel';
import { Point, Texture } from 'pixi.js';
import { Solid as TowerFallSolid, System } from '../../../../src/plugins/physics/towerfall';
import { gsap } from 'gsap';

type Direction = -1 | 0 | 1;

export type PlatformMovementConfigOpts = {
  duration: number;
  startingDirection: { x: Direction; y: Direction };
  range: PointLike;
};

export type PlatformMovementConfig = {
  startingDirection: { x: Direction; y: Direction };
  range: Point;
  duration: number;
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
            duration: config.movementConfig.duration || 3,
            startingDirection: config.movementConfig.startingDirection || { x: 1, y: 0 },
            range: resolvePointLike(config.movementConfig.range, true),
          }
        : undefined,
    };
  }

  added() {
    this._startPos = this.position.clone();
    super.added();
    if (!this.config.moving || !this.config.movementConfig) return;
    const move: { x: number; y: number } = { x: this._startPos.x, y: this._startPos.y };
    gsap.to(move, {
      x: move.x + this.config.movementConfig.range.x,
      y: move.y + this.config.movementConfig.range.y,
      duration: this.config.movementConfig.duration || 3,
      repeat: -1,
      yoyo: true,
      ease: 'none',
      onUpdate: () => {
        this.move(move.x - this.position.x, move.y - this.position.y);
      },
    });
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
