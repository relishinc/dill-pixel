import { ActionDetail, PointLike, Signal, resolvePointLike } from '@relish-studios/dill-pixel';
import { Collision, System, Actor as TowerFallActor } from '../../../../src/plugins/physics/towerfall';
import { Point, Pool, Texture } from 'pixi.js';

import { gsap } from 'gsap';

export class Player extends TowerFallActor {
  type = 'Player';
  passThroughTypes = ['FX'];
  onKilled = new Signal();
  speed: number = 3;
  private _velocity: Point = new Point(0, 0);
  private _canJump: boolean = false;
  private _isJumping: boolean = false;
  private _jumpPower: number = 0;
  private _jumpTimeElapsed: number = 0;
  private _hitHead: boolean = false;

  constructor() {
    super();
    this.initialize();
  }

  protected initialize() {
    this.view = this.add.sprite({
      asset: Texture.WHITE,
      width: 40,
      height: 80,
      tint: 0xff0000,
      anchor: 0.5,
    });

    this.app.actions('move_left').connect(this._handleAction);
    this.app.actions('move_right').connect(this._handleAction);
    this.app.actions('jump').connect(this._handleAction);
  }

  public update(deltaTime: number) {
    if (this._isJumping) {
      this._jumpTimeElapsed += deltaTime;
      this._jumpPower /= this._velocity.y >= 0 ? 2 : 1.1;
      if (this._jumpPower <= 0) {
        this._jumpPower = 0;
        this._resetJump();
      }
    }
    this._velocity.y =
      this.system.gravity * deltaTime - (this._velocity.y < 0 ? this._jumpPower : -this.system.gravity * 0.5);
    this.moveY(this._velocity.y, this._handleCollision, this._disableJump);
  }

  public squish() {
    this.onKilled.emit();
  }

  public spawn(position: PointLike, delay: number = 0.5) {
    const { x, y } = resolvePointLike(position);
    this.alpha = 0;
    this.x = x;
    this.y = y;

    gsap.to(this, { alpha: 1, duration: 0.5, delay });
  }

  private _disableJump() {
    this._canJump = false;
  }

  private _handleCollision(collision: Collision) {
    if (collision.bottom) {
      if (this.isRiding(collision.entity2)) {
        this._resetJump();
      }
    } else if (collision.top) {
      this._hitHead = true;
    }
  }

  private _resetJump() {
    this._canJump = true;
    this._isJumping = false;
    this._jumpPower = 0;
    this._jumpTimeElapsed = 0;
    this._hitHead = false;
  }

  private _handleAction(actionDetail: ActionDetail) {
    switch (actionDetail.id) {
      case 'move_left':
        this.moveX(-this.speed, this._handleCollision);
        break;
      case 'move_right':
        this.moveX(this.speed, this._handleCollision);
        break;
      case 'jump':
        this._jump();
        break;
    }
  }

  private _jump() {
    if (!this._isJumping && this._canJump) {
      this._canJump = false;
      this._isJumping = true;
      this._jumpPower = this.system.gravity * 5;
      this._velocity.y = this.system.gravity - this._jumpPower;
      this._spawnJumpFx();
    }
  }

  private _spawnJumpFx() {
    for (let i = 0; i < 10; i++) {
      const jumpFx = FX.pool.get({
        speed: Math.random() * 4 + 1,
        color: Math.random() * 0xffffff,
      });
      jumpFx.position.set(this.x, this.y - this.height * 0.5 - 50);
    }
  }
}

class FX extends TowerFallActor {
  type = 'FX';
  passThroughTypes = ['FX', 'Player'];
  static pool = new Pool<FX>(FX, 200);
  vertVector: number = 0;
  enabled = false;
  speed = 2;
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

  update(deltaTime: number) {
    if (!this.enabled) {
      return;
    }
    this.moveX(this.dir * this.speed * deltaTime, this._reduceSpeed);
    this.moveY((System.gravity - this.vertVector) * deltaTime, this._reduceSpeedAndBounce);
    if (this.vertVector > 0) {
      this.vertVector -= 1;
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

  private _reduceSpeedAndBounce() {
    this._reduceSpeed();
    this.numBounces++;
    this.vertVector = 20 / this.numBounces + this.system.gravity * 0.95;
  }
}
