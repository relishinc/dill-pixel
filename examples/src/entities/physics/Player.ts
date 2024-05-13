import { ActionDetail, ISpineAnimation, PointLike, resolvePointLike, Signal } from '@relish-studios/dill-pixel';

import { gsap } from 'gsap';
import { Bounds, Point, Pool, Rectangle, Texture } from 'pixi.js';
import { Actor as SnapActor, Collision, Entity, System } from '../../../../src/plugins/physics/snap';
import { Platform } from './Platform';

export class Player extends SnapActor {
  declare view: ISpineAnimation;
  type = 'Player';
  passThroughTypes = ['FX'];
  onKilled = new Signal();
  speed: number = 6;
  private _canJump: boolean = false;
  private _isJumping: boolean = false;
  private _jumpPower: number = 0;
  private _jumpTimeElapsed: number = 0;
  private _hitHead: boolean = false;
  private _isMoving: boolean = false;

  constructor() {
    super();
    this.initialize();
  }

  private _velocity: Point = new Point(0, 0);

  get velocity() {
    return this._velocity;
  }

  get cachedBounds() {
    if (!this._cachedBounds || this._dirtyBounds) {
      const bounds = new Rectangle(0, 0, 44, 90);
      this._cachedBounds = bounds;
    }
    return this._cachedBounds;
  }

  public update(deltaTime: number) {
    if (this._isJumping) {
      this._jumpTimeElapsed += deltaTime;

      this._jumpPower -= this._velocity.y < 0 ? this.speed * 0.3 : this.speed * this._jumpPower * 2;
      if (this._jumpPower <= 0) {
        this._jumpPower = 0;
        this._resetJump();
      }
    }

    this._velocity.y =
      this.system.gravity * deltaTime - (this._velocity.y < 0 ? this._jumpPower : -this.system.gravity * 0.5);

    this.moveY(this._velocity.y, this._handleCollision, this._disableJump);

    if (!this._isJumping && !this._isMoving) {
      if (this.view.getCurrentAnimation() !== 'idle') {
        this.view.setAnimation('idle', true);
      }
    }
    if (this._hitHead && this._velocity.y < 0) {
      this._jumpPower *= 0.25;
      this._hitHead = false;
    }
    this._isMoving = false;
  }

  public squish(collision: Collision, pushingEntity: Entity) {
    if (collision.bottom && pushingEntity.type === 'Platform' && (pushingEntity as Platform).canJumpThroughBottom) {
      return;
    }
    this.onKilled.emit();
  }

  getWorldBounds(): Bounds | Rectangle {
    const pos = this.system.container.toLocal(this.getGlobalPosition());
    const bounds = this.cachedBounds;
    bounds.x = pos.x - 22;
    bounds.y = pos.y - 85;
    return bounds;
  }

  public spawn(position: PointLike, delay: number = 0.5) {
    const { x, y } = resolvePointLike(position);
    this.alpha = 0;
    this.x = x;
    this.y = y;

    gsap.to(this, { alpha: 1, duration: 0.5, delay });
  }

  protected initialize() {
    this.view = this.add.spineAnimation({
      data: 'spine/xavier',
      animationName: 'idle',
      loop: true,
    });

    // console.log(this.view.animationNames);
    this.view.scale.set(0.15);
    this.app.actions('move_left').connect(this._handleAction);
    this.app.actions('move_right').connect(this._handleAction);
    this.app.actions('jump').connect(this._handleAction);
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
        this.view.spine.scale.x = -1;
        this.moveX(-this.speed, this._handleCollision);
        if (this.view.getCurrentAnimation() !== 'run') {
          this.view.setAnimation('run', true);
        }
        this._isMoving = true;
        break;
      case 'move_right':
        this.view.spine.scale.x = 1;
        this.moveX(this.speed, this._handleCollision);
        if (this.view.getCurrentAnimation() !== 'run') {
          this.view.setAnimation('run', true);
        }
        this._isMoving = true;
        break;
      case 'jump':
        this.view.setAnimation('Jump');
        this._jump();
        break;
    }
  }

  private _jump() {
    if (!this._isJumping && this._canJump) {
      this._canJump = false;
      this._isJumping = true;
      this._jumpPower = this.system.gravity * 4;
      this._velocity.y = this.system.gravity - this._jumpPower;
      this._spawnJumpFx();
    }
  }

  private _spawnJumpFx() {
    for (let i = 0; i < 5; i++) {
      const jumpFx = FX.pool.get({
        speed: Math.random() * 4 + 1,
        color: Math.random() * 0xffffff,
      });
      jumpFx.position.set(this.x, this.y - this.height * 0.5 - 50);
    }
  }
}

class FX extends SnapActor {
  static pool = new Pool<FX>(FX, 200);
  type = 'FX';
  passThroughTypes = ['FX', 'Player'];
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
    this.vertVector = this.system.gravity / this.numBounces + this.system.gravity * 0.95;
  }
}
