import { ActionDetail, PointLike, resolvePointLike, Signal } from 'dill-pixel';
import { gsap } from 'gsap';
import { Texture } from 'pixi.js';
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
      this._jumpPower -= this._jumpTimeElapsed > 15 ? 1.25 : 0.75;
      if (this._jumpPower <= 0) {
        this._jumpPower = 0;
        this._resetJump();
      }
    }
    if (this.affectedByGravity) {
      this.moveY(System.gravity - this._jumpPower, this._handleCollision, this._disableJump);
    }
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
    this._jumpPower = 30;
  }
}
