import { ActionDetail, PointLike, resolvePointLike, Signal, SpineAnimation } from 'dill-pixel';

import { gsap } from 'gsap';
import { Bounds, Point, Rectangle } from 'pixi.js';
import { Actor as SnapActor, Collision, Entity } from '@dill-pixel/plugin-snap-physics';
import { Platform } from './Platform';
import { FX } from '@/entities/physics/FX';
import { Portal, PortalEnterDetail } from '@/entities/physics/Portal';

export class Player extends SnapActor {
  declare view: SpineAnimation;
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
  private _inPlay: boolean = false;
  private _moveAmount: number = 0;
  private _warpAnimation: gsap.core.Tween;
  private _isWarping: boolean = false;
  private _paused: boolean = false;

  constructor() {
    super();
    this.initialize();
  }

  private _velocity: Point = new Point(0, 0);

  get velocity() {
    return this._velocity;
  }

  get ridingAllowed(): boolean {
    return !this._isJumping;
  }

  get cachedBounds() {
    if (!this._cachedBounds || this._dirtyBounds) {
      this._cachedBounds = new Rectangle(0, 0, 60, 120);
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
    if (!this._inPlay || !this.system.enabled) {
      return;
    }

    this._velocity.y = this.system.gravity - (this._velocity.y < 0 ? this._jumpPower : -this.system.gravity * 0.25);

    if (this._moveAmount === 0) {
      if (!this._isWarping) {
        if (this.view.getCurrentAnimation() !== 'idle') {
          this.view.setAnimation('idle', true);
        }
      }
    } else if (!this._isWarping) {
      if (this.view.getCurrentAnimation() !== 'run') {
        this.view.setAnimation('run', true);
      }
      if (this._checkConstraints()) {
        this._moveAmount = 0;
      } else {
        this.view.spine.scale.x = Math.sign(this._moveAmount);
        if (this._moveAmount !== 0) {
          this.moveX(this._moveAmount, this._handleCollision);
        }
      }
    }
    if (this._isWarping) {
      if (this.view.getCurrentAnimation() !== 'hoverboard') {
        this.view.setAnimation('hoverboard', true);
      }
      this._velocity.y = 0;
    } else if (this._isJumping) {
      if (this.view.getCurrentAnimation() !== 'run') {
        this.view.setAnimation('run', true);
      }
      this._jumpTimeElapsed += deltaTime;
      this._jumpPower -= this._velocity.y < 0 ? 1 : 3;
    }

    this.moveY(this._velocity.y, this._handleCollision, this._disableJump);

    if (this._hitHead && this._velocity.y < 0) {
      this._jumpPower = 0;
      this._hitHead = false;
    }

    if (this.mostRiding && this.mostRiding.type === 'Platform') {
      this.mostRiding.view.tint = 0x0;
    }

    this._moveAmount = 0;
  }

  public squish(collision: Collision, pushingEntity: Entity, direction?: Point) {
    if (collision.bottom && pushingEntity.type === 'Platform' && (pushingEntity as Platform).oneWay) {
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
    bounds.x = this.view.spine.scale.x >= 1 ? pos.x - 22 : pos.x - 38;
    bounds.y = pos.y - 122;
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
    this._canJump = this._isJumping = false;
    this._jumpPower = 0;
    this._jumpTimeElapsed = 0;
    this._isWarping = false;
    this.cancelWarp();
    this.view.setAnimation('idle');
    this._spawnFX();
    this.onKilled.emit();
  }

  public lookRight() {
    this.view.spine.scale.x = 1;
  }

  public cancelWarp() {
    this._isWarping = false;
    this._warpAnimation?.kill();
  }

  destroy() {
    this.cancelWarp();
    super.destroy();
  }

  _onEnterPortal({ entity }: PortalEnterDetail) {
    if (entity && (entity as unknown as Player) === this) {
      this.cancelWarp();
    }
  }

  _handleTogglePause() {
    this._paused = !this._paused;
    this._warpAnimation?.paused(this._paused);
  }

  protected initialize() {
    this.view = this.add.spineAnimation({
      data: 'spine/spineboy-pro',
      animationName: 'idle',
      loop: true,
    });
    this.view.scale.set(0.2);

    this.addSignalConnection(
      this.app.actions('toggle_pause').connect(this._handleTogglePause),
      this.app.actions('move_left').connect(this._handleAction),
      this.app.actions('move_right').connect(this._handleAction),
      this.app.actions('jump').connect(this._handleAction),
      this.app.actions('warp').connect(this._handleAction),
      Portal.onEnter.connect(this._onEnterPortal),
    );
  }

  private _checkConstraints(dx = this._moveAmount) {
    return (
      (dx < 0 && this.constraints?.x?.min !== undefined && this.x - dx < this.constraints.x.min) ||
      (dx > 0 && this.constraints?.x?.max !== undefined && this.x + dx > this.constraints.x.max)
    );
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
    if (!this._inPlay || !this.system.enabled) {
      return;
    }
    switch (actionDetail.id) {
      case 'move_left':
        this._moveAmount = -this.speed;
        break;
      case 'move_right':
        this._moveAmount = this.speed;
        break;
      case 'jump':
        this._jump();
        break;
      case 'warp':
        this._warp();
        break;
    }
  }

  private _warp() {
    if (!this._isWarping) {
      this._warpAnimation = this.animateX(this.x + 400 * this.view.spine.scale.x, {
        duration: 1,
        ease: 'power3.out',
        onComplete: () => {
          this._isWarping = false;
        },
      });
      this._isWarping = true;
    }
  }

  private _jump() {
    if (!this._isJumping && this._canJump) {
      this.cancelWarp();
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
