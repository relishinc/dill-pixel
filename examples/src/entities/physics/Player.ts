import { ActionDetail, ISpineAnimation, PointLike, resolvePointLike, Signal } from 'dill-pixel';

import { gsap } from 'gsap';
import { Bounds, Point, Rectangle } from 'pixi.js';
import { Actor as SnapActor, Collision, Entity } from '@dill-pixel/plugin-snap-physics';
import { Platform } from './Platform';
import { FX } from '@/entities/physics/FX';

export class Player extends SnapActor {
  declare view: ISpineAnimation;
  type = 'Player';
  passThroughTypes = ['FX'];
  onKilled = new Signal();
  speed: number = 6;
  constraints?: { x?: { min?: number; max?: number } };
  private _canJump: boolean = false;
  private _isJumping: boolean = false;
  private _jumpPower: number = 0;
  private _jumpTimeElapsed: number = 0;
  private _hitHead: boolean = false;
  private _isMoving: boolean = false;
  private _inPlay: boolean = false;

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

  public constrainX(min?: number, max?: number) {
    if (!this.constraints) {
      this.constraints = {};
    }
    if (!this.constraints.x) {
      this.constraints.x = {};
    }
    if (min !== undefined) {
      this.constraints.x.min = min;
    }
    if (max !== undefined) {
      this.constraints.x.max = max;
    }
  }

  public update(deltaTime: number) {
    if (!this._inPlay) {
      return;
    }

    this._velocity.y =
      this.system.gravity * deltaTime - (this._velocity.y < 0 ? this._jumpPower : -this.system.gravity * 0.25);

    if (this._isJumping) {
      this._jumpTimeElapsed += deltaTime;
      this._jumpPower -= this._velocity.y < 0 ? 1 : 3;
    }
    this.moveY(this._velocity.y, this._handleCollision, this._disableJump);
    if (!this._isJumping && !this._isMoving) {
      if (this.view.getCurrentAnimation() !== 'idle') {
        this.view.setAnimation('idle', true);
      }
    }

    if (this._hitHead && this._velocity.y < 0) {
      this._jumpPower = 0;
      this._hitHead = false;
    }

    this._isMoving = false;
  }

  public squish(collision: Collision, pushingEntity: Entity, direction?: Point) {
    if (collision.bottom && pushingEntity.type === 'Platform' && (pushingEntity as Platform).canJumpThroughBottom) {
      return;
    }
    let shouldKill = false;
    if (direction) {
      if (direction.x < 0 && collision.left && collision.entity2.right <= this.left + 1) {
        shouldKill = true;
      } else if (direction.x > 0 && collision.right && collision.entity2.left >= this.right - 1) {
        shouldKill = true;
      } else if (direction.y < 0 && collision.top && collision.entity2.bottom <= this.top + 1) {
        shouldKill = true;
      } else if (direction.y > 0 && collision.bottom && collision.entity2.top >= this.bottom - 1) {
        shouldKill = true;
      }
    }
    if (shouldKill) {
      this.kill();
    }
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
    gsap.to(this, {
      alpha: 1,
      yoyo: true,
      repeat: 4,
      duration: 0.5,
      delay,
      onComplete: () => {
        this._inPlay = true;
      },
    });
  }

  public kill() {
    if (!this._inPlay) {
      return;
    }
    this._inPlay = false;
    this._spawnFX();
    this.onKilled.emit();
  }

  public lookRight() {
    this.view.spine.scale.x = 1;
  }

  protected initialize() {
    this.view = this.add.spineAnimation({
      data: 'spine/xavier',
      animationName: 'idle',
      loop: true,
    });

    this.view.scale.set(0.15);
    this.app.actions('move_left').connect(this._handleAction);
    this.app.actions('move_right').connect(this._handleAction);
    this.app.actions('jump').connect(this._handleAction);
  }

  private _disableJump() {
    this._canJump = false;
  }

  private _handleCollision(collision: Collision) {
    if (
      (this._isJumping || !this._canJump) &&
      this.velocity.y >= 0 &&
      collision.bottom &&
      this.isRiding(collision.entity2)
    ) {
      this._resetJump();
    } else {
      if (collision.top && collision.entity2.bottom <= this.top + 1) {
        this._hitHead = true;
      }
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
    if (!this._inPlay) {
      return;
    }
    let amount;
    switch (actionDetail.id) {
      case 'move_left':
        amount = -this.speed;
        this.view.spine.scale.x = -1;
        if (this.constraints?.x?.min !== undefined && this.x - amount < this.constraints.x.min) {
          amount = 0;
        }
        this.moveX(amount, this._handleCollision);
        if (this.view.getCurrentAnimation() !== 'run') {
          this.view.setAnimation('run', true);
        }
        this._isMoving = true;
        break;
      case 'move_right':
        amount = this.speed;
        this.view.spine.scale.x = 1;
        if (this.constraints?.x?.max !== undefined && this.x + amount > this.constraints.x.max) {
          amount = 0;
        }
        this.moveX(amount, this._handleCollision);
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
      this._jumpPower = this.system.gravity * 3;
      this._velocity.y = this.system.gravity - this._jumpPower;
    }
  }

  private _spawnFX() {
    for (let i = 0; i < 20; i++) {
      const fx = FX.pool.get({
        speed: Math.random() * 4 + 1,
        color: Math.random() * 0xffffff,
      });
      fx.position.set(this.x, this.y - this.height * 0.5 + Math.random() * 50 * (Math.random() < 0.5 ? 1 : -1));
    }
  }
}
