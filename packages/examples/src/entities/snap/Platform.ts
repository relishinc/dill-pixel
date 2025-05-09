import { Actor, Solid as SnapSolid, System } from '@dill-pixel/plugin-snap-physics';
import { PointLike, resolvePointLike } from 'dill-pixel';

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
  oneWay?: boolean;
  movementConfig?: PlatformMovementConfig;
};
export type PlatformConfigOpts = {
  width: number | (() => number);
  height: number | (() => number);
  color: number;
  moving: boolean;
  oneWay?: boolean;
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
  oneWay: false,
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

  get oneWay() {
    return this.config.oneWay;
  }

  get moving() {
    return this.config.moving;
  }

  static resolveWidthOrHeight(widthOrHeight: number | (() => number)): number {
    return typeof widthOrHeight === 'function' ? widthOrHeight() : widthOrHeight;
  }

  static resolveConfig(config: Partial<PlatformConfigOpts>): PlatformConfig {
    return {
      x: config.x ?? 0,
      y: config.y ?? 0,
      width: config.width ? Platform.resolveWidthOrHeight(config.width) : defaults.width,
      height: config.height ? Platform.resolveWidthOrHeight(config.height) : defaults.height,
      color: config.color ?? defaults.color,
      moving: config.moving ?? defaults.moving,
      oneWay: config?.oneWay === true,
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

  reset() {
    this.removeChildren();
  }

  added() {
    const pt = this.position.clone();
    this._startPos = new Point(Math.round(pt.x), Math.round(pt.y));
    super.added();
  }

  fixedUpdate() {
    if (!this.config.moving || !this.config.movementConfig) return;

    this.move(
      this.config.movementConfig.speed.x * this.config.movementConfig.startingDirection.x,
      this.config.movementConfig.speed.y * this.config.movementConfig.startingDirection.y,
    );
  }

  postFixedUpdate() {
    let isBeingRidden = false;
    for (const actor of this.getCollideables<Actor>()) {
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
      if (
        Math.round(Math.abs(this.x - this._startPos.x)) >=
        Math.round(Math.abs(this.config.movementConfig.range.x * 0.5 - this.config.movementConfig.speed.x))
      ) {
        this.config.movementConfig.startingDirection.x *= -1;
      }
    }
    if (this.y !== this._lastPos.y) {
      if (
        Math.round(Math.abs(this.y - this._startPos.y)) >=
        Math.round(Math.abs(this.config.movementConfig.range.y * 0.5 - this.config.movementConfig.speed.y))
      ) {
        this.config.movementConfig.startingDirection.y *= -1;
      }
    }

    this._lastPos.x = this.x;
    this._lastPos.y = this.y;
  }

  protected initialize() {
    this.view = this.add
      .graphics({ x: Math.round(-this.config.width / 2), y: Math.round(-this.config.height / 2) })
      .rect(0, 0, this.config.width, this.config.height)
      .fill({ color: this.config.color });

    this.position.set(this.config.x, this.config.y);
  }
}
