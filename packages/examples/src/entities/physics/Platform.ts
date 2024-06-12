import { PointLike, resolvePointLike } from 'dill-pixel';
import { Solid as SnapSolid, System } from '@dill-pixel/plugin-snap-physics';

import { Point } from 'pixi.js';

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
  x: number;
  y: number;
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
  x: number;
  y: number;
};

const defaults: PlatformConfig = {
  x: 0,
  y: 0,
  width: 100,
  height: 10,
  color: 0x00ff00,
  canJumpThroughBottom: false,
  moving: false,
};

export class Platform extends SnapSolid<PlatformConfig> {
  type = 'Platform';
  private _startPos: Point;
  private _lastPos: Point = new Point();

  constructor(config?: Partial<PlatformConfigOpts>) {
    const hasConfig = config !== undefined;
    super(hasConfig ? Platform.resolveConfig(config) : {});
    if (hasConfig) {
      this.initialize();
    }
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
      x: config.x ?? 0,
      y: config.y ?? 0,
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

  init(config: Partial<PlatformConfigOpts> = {}) {
    this.config = Platform.resolveConfig(config);
    this.initialize();
  }

  added() {
    const pt = this.position.clone();
    this._startPos = new Point(Math.round(pt.x), Math.round(pt.y));
    super.added();
  }

  update() {
    if (!this.config.moving || !this.config.movementConfig) return;

    this.move(
      this.config.movementConfig.speed.x * this.config.movementConfig.startingDirection.x,
      this.config.movementConfig.speed.y * this.config.movementConfig.startingDirection.y,
    );
  }

  reset() {
    this.removeChildren();
  }

  postUpdate() {
    let isBeingRidden = false;
    for (const actor of this.collideables) {
      if (actor.riding.has(this)) {
        isBeingRidden = true;
        break;
      }
    }
    if (isBeingRidden) {
      this.view.tint = 0x0;
    } else {
      this.view.tint = this.config.color;
    }

    if (!this.config.moving || !this.config.movementConfig) return;
    if (this.x !== this._lastPos.x) {
      if (Math.round(Math.abs(this.x - this._startPos.x)) >= Math.round(this.config.movementConfig.range.x * 0.5)) {
        this.config.movementConfig.startingDirection.x *= -1;
      }
    }
    if (this.y !== this._lastPos.y) {
      if (Math.round(Math.abs(this.y - this._startPos.y)) >= Math.round(this.config.movementConfig.range.y * 0.5)) {
        this.config.movementConfig.startingDirection.y *= -1;
      }
    }

    this._lastPos.x = this.x;
    this._lastPos.y = this.y;
  }

  protected initialize() {
    this.view = this.add
      .graphics({ x: -this.config.width / 2, y: -this.config.height / 2 })
      .rect(0, 0, this.config.width, this.config.height)
      .fill({ color: this.config.color });

    this.position.set(this.config.x, this.config.y);
  }
}
