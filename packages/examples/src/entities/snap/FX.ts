import { Collision, Entity, Actor as SnapActor, System } from '@dill-pixel/plugin-snap-physics';
import { Point, Pool, Texture } from 'pixi.js';

export class FX extends SnapActor {
  static pool = new Pool<FX>(FX, 200);
  type = 'FX';
  passThroughTypes = ['FX', 'Player'];
  vertVector: number = 0;
  enabled = false;
  speed = 100;
  dir = Math.random() > 0.5 ? 1 : -1;
  elapsed = 0;
  numBounces = 0;

  constructor() {
    super();

    this.view = this.add.sprite({
      asset: Texture.WHITE,
      width: 5,
      height: 5,
    });
  }

  fixedUpdate(deltaTime: number) {
    if (!this.enabled) {
      return;
    }
    this.moveX(this.dir * 100 * this.speed * deltaTime, this._reduceSpeed);

    this.moveY((System.gravity * 100 - this.vertVector) * deltaTime, this._reduceSpeedAndBounce);
    if (this.vertVector > 0) {
      this.vertVector -= 100;
    }
    this.alpha -= 0.005;
    this.elapsed += deltaTime;
    if (this.elapsed > 100) {
      this.die();
    }
  }

  init(config: { speed: number; color: number }) {
    this.alpha = 1;
    this.speed = config.speed;
    this.elapsed = 0;
    this.view.tint = config.color;
    this.system.container.addChild(this);
    this.enabled = true;
    this.vertVector = this.system.gravity * 100;
  }

  reset() {
    this.enabled = false;
    this.elapsed = 0;
    this.numBounces = 0;
  }

  die() {
    this.system.container.removeChild(this);
    FX.pool.return(this);
  }

  private _reduceSpeed() {
    this.speed *= 0.5;
  }

  private _reduceSpeedAndBounce(_collision: Collision, _pushingEntity?: Entity, direction?: Point) {
    if (direction && direction.y > 0 && _collision.entity2.top >= this.bottom - 1) {
      this._reduceSpeed();
      this.numBounces++;
      this.vertVector = (this.system.gravity * 100) / this.numBounces + this.system.gravity * 0.95;
    }
  }
}
