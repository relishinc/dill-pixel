import { ActionDetail, PointLike, resolvePointLike, Signal } from 'dill-pixel';
import { gsap } from 'gsap';
import { Pool, Texture } from 'pixi.js';
import { Actor as TowerFallActor, Collision, System } from '../../../../src/plugins/physics/towerfall';

export class Player extends TowerFallActor {
  type = 'Player';
  onKilled = new Signal();
  speed: number = 3;

  private _canJump: boolean = false;
  private _isJumping: boolean = false;
  private _jumpPower: number = 0;
  private _jumpTimeElapsed: number = 0;

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
      this._jumpPower -= this._jumpTimeElapsed > 15 ? 1 : 2;
      if (this._jumpPower <= 0) {
        this._jumpPower = 0;
        this._resetJump();
      }
    }
    this.moveY((System.gravity * 2 - this._jumpPower) * deltaTime, this._handleCollision, this._disableJump);
  }

  public squish(collision: Collision) {
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
        // reset the jump if we're sure we're on top of the solid
        this._resetJump();
      }
    }
  }

  private _handleCollideX(collision: Collision) {}

  private _resetJump() {
    this._canJump = true;
    this._isJumping = false;
    this._jumpPower = 0;
    this._jumpTimeElapsed = 0;
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
        if (this._canJump && !this._isJumping) {
          this._isJumping = true;
          this._jump();
        }
        break;
    }
  }

  private _jump() {
    this._jumpPower = 70;
    this._spawnJumpFx();
  }

  private _spawnJumpFx() {
    for (let i = 0; i < 20; i++) {
      const jumpFx = FX.pool.get({
        speed: Math.random() * 4 + 1,
        color: Math.random() * 0xffffff,
      });
      jumpFx.position.set(this.x, this.y - 100);
    }
  }
}

class FX extends TowerFallActor {
  static pool = new Pool<FX>(FX, 100);
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
