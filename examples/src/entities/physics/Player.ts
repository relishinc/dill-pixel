import { ActionDetail, Logger, Signal } from 'dill-pixel';
import { Sprite, Texture } from 'pixi.js';
import { Actor as TowerFallActor, World } from '../../../../src/plugins/physics/towerfall';
import { OverlapResult } from '../../../../src/plugins/physics/towerfall/types.ts';

export class Player extends TowerFallActor {
  public view: Sprite;
  public onKilled = new Signal();
  private _canJump: boolean = false;
  private _isJumping: boolean = false;
  private _jumpPower: number = 0;
  private _jumpTimeElapsed: number = 0;

  constructor() {
    super();
    this.initialize();
  }

  get offset() {
    if (!this.view) {
      return { x: 0, y: 0 };
    }
    return { x: -this.view.width * 0.5, y: -this.view.height * 0.5 };
  }

  protected initialize() {
    this.view = this.add.sprite({
      asset: Texture.WHITE,
      width: 50,
      height: 75,
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
      this._jumpPower -= this._jumpTimeElapsed > 15 ? 0.75 : 1.25;
      if (this._jumpPower <= 0) {
        this._jumpPower = 0;
      }
    }
    if (this.affectedByGravity) {
      this.moveY(World.gravity - this._jumpPower, this._handleCollideBottom, this._disableJump);
    }
  }

  public squish(collisions?: OverlapResult[]) {
    Logger.log('squished', collisions);
    this.onKilled.emit();
  }

  private _disableJump() {
    this._canJump = false;
  }

  private _handleCollideBottom(collisions: OverlapResult[]) {
    if (collisions.find((c) => c && c.top)) {
      this._resetJump();
    }
  }

  private _handleCollideX(collisions: OverlapResult[]) {}

  private _resetJump() {
    this._canJump = true;
    this._isJumping = false;
    this._jumpPower = 0;
    this._jumpTimeElapsed = 0;
  }

  private _handleAction(actionDetail: ActionDetail) {
    switch (actionDetail.id) {
      case 'move_left':
        this.moveX(-5, this._handleCollideX);
        break;
      case 'move_right':
        this.moveX(5, this._handleCollideX);
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
