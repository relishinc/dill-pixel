import { Application, filterSet } from 'dill-pixel';
import { gsap } from 'gsap';
import { Actor } from './Actor';
import { Entity } from './Entity';
import { System } from './System';

export class Solid<T = any, A extends Application = Application> extends Entity<T, A> {
  type = 'Solid';
  isSolid = true;
  riding: Set<Actor> = new Set();
  protected _animations: Set<gsap.core.Tween | gsap.core.Timeline> = new Set<gsap.core.Tween | gsap.core.Timeline>();
  protected _positionAnimation: {
    targetX: number;
    targetY: number;
    startX: number;
    startY: number;
    duration: number;
    elapsed: number;
    ease: gsap.EaseString;
    repeat: number;
    yoyo: boolean;
    repeatDelay: number;
    delayRemaining: number;
    iteration: number;
    isReversed: boolean;
  } | null = null;

  getCollideables<T extends Entity = Entity>(dx: number = 0, dy: number = 0): Set<T> {
    return System.getNearbyEntities<T>(this, 'actor', dx, dy) as Set<T>;
  }

  added() {
    System.addSolid(this);
    this.addSignalConnection(this.system.onSystemEnabledChanged.connect(this._handleSystemEnabledChanged));
  }

  private _handleSystemEnabledChanged(enabled: boolean) {
    if (enabled) {
      if (this._animations?.size > 0) {
        this._animations.forEach((animation) => animation?.resume());
      }
    } else {
      if (this._animations?.size > 0) {
        this._animations.forEach((animation) => animation?.pause());
      }
    }
  }

  removed() {
    System.removeSolid(this);
    if (this._animations?.size > 0) {
      this._animations.forEach((animation) => animation?.kill());
    }
  }

  getAllRiding(dx: number = 0, dy: number = 0) {
    return filterSet<Actor>(
      this.getCollideables(dx, dy),
      (entity: Actor) => entity.isActor && entity.isRiding(this),
    ) as Set<Actor>;
  }

  move(x: number, y: number): void {
    this.xRemainder += x;
    this.yRemainder += y;
    const moveX = Math.round(this.xRemainder);
    const moveY = Math.round(this.yRemainder);

    if (moveX !== 0 || moveY !== 0) {
      // Get all potential collisions before moving
      const ridingActors = this.getAllRiding(moveX, moveY);
      const potentialCollisions = this.getCollideables<Actor>(moveX, moveY);

      // First move riding actors with the platform
      for (const actor of ridingActors) {
        if (actor.mostRiding === this) {
          // Move riding actors first to maintain contact
          actor.moveY(moveY);
          actor.moveX(moveX);
        }
      }

      // Then move the platform
      this.x += moveX;
      this.y += moveY;
      this.xRemainder -= moveX;
      this.yRemainder -= moveY;

      // Finally handle any collisions
      this.handleActorInteractions(moveX, moveY, ridingActors, potentialCollisions);
    }
    System.updateEntity(this);
  }

  animatePosition(x?: number | null, y?: number | null, vars: gsap.TweenVars = {}): gsap.core.Tween {
    const pos = this.position.clone();
    const tweenVars = Object.assign({ duration: 1, ease: 'linear.none' }, vars);

    const targetX = x === undefined || x === null ? pos.x : x;
    const targetY = y === undefined || y === null ? pos.y : y;

    // Store animation data for physics update
    this._positionAnimation = {
      targetX,
      targetY,
      startX: pos.x,
      startY: pos.y,
      duration: tweenVars.duration as number,
      elapsed: 0,
      ease: (tweenVars.ease?.toString() || 'linear.none') as gsap.EaseString,
      repeat: (tweenVars.repeat as number) || 0,
      yoyo: tweenVars.yoyo || false,
      repeatDelay: (tweenVars.repeatDelay as number) || 0,
      delayRemaining: 0,
      iteration: 0,
      isReversed: false,
    };

    // Create a dummy tween for compatibility
    const tween = gsap.to({}, tweenVars);
    this._animations.add(tween);
    return tween;
  }

  fixedUpdate(deltaTime: number) {
    super.fixedUpdate(deltaTime);

    // Update position animation in sync with physics
    if (this._positionAnimation) {
      // Handle repeat delay
      if (this._positionAnimation.delayRemaining > 0) {
        this._positionAnimation.delayRemaining -= deltaTime;
        return;
      }

      this._positionAnimation.elapsed += deltaTime;
      const progress = Math.min(this._positionAnimation.elapsed / this._positionAnimation.duration, 1);

      // Calculate the new position using GSAP's easing
      const easedProgress = gsap.parseEase(this._positionAnimation.ease)(
        this._positionAnimation.isReversed ? 1 - progress : progress,
      );

      const newX =
        this._positionAnimation.startX +
        (this._positionAnimation.targetX - this._positionAnimation.startX) * easedProgress;
      const newY =
        this._positionAnimation.startY +
        (this._positionAnimation.targetY - this._positionAnimation.startY) * easedProgress;

      // Apply movement through physics system
      this.move(newX - this.x, newY - this.y);

      // Handle completion of current iteration
      if (progress >= 1) {
        // Reset elapsed time
        this._positionAnimation.elapsed = 0;

        // Handle repeat logic
        if (
          this._positionAnimation.repeat === -1 ||
          this._positionAnimation.iteration < this._positionAnimation.repeat
        ) {
          this._positionAnimation.iteration++;

          // Handle yoyo
          if (this._positionAnimation.yoyo) {
            this._positionAnimation.isReversed = !this._positionAnimation.isReversed;
          }

          // Apply repeat delay
          if (this._positionAnimation.repeatDelay > 0) {
            this._positionAnimation.delayRemaining = this._positionAnimation.repeatDelay;
          }
        } else {
          // Animation complete
          this._positionAnimation = null;
        }
      }
    }
  }

  public handleActorInteractions(
    deltaX: number,
    deltaY: number,
    ridingActors = this.getAllRiding(),
    potentialCollisions = this.getCollideables<Actor>(deltaX, deltaY),
  ): void {
    for (const actor of potentialCollisions) {
      // Skip actors that are already riding (they were moved with the platform)
      if (ridingActors.has(actor)) continue;

      if (!actor.passThroughTypes.includes(this.type) && !actor.isPassingThrough(this)) {
        if (this.collidesWith(actor, deltaX, deltaY)) {
          // Calculate overlaps
          const overlapX =
            deltaX !== 0
              ? deltaX > 0
                ? this.boundingRect.right - actor.boundingRect.left
                : this.boundingRect.left - actor.boundingRect.right
              : 0;

          const overlapY =
            deltaY !== 0
              ? deltaY > 0
                ? this.boundingRect.bottom - actor.boundingRect.top
                : this.boundingRect.top - actor.boundingRect.bottom
              : 0;

          // For diagonal movement, resolve both axes
          if (overlapX !== 0) {
            actor.moveX(overlapX, actor.squish, null, this);
          }
          if (overlapY !== 0) {
            actor.moveY(overlapY, actor.squish, null, this);
          }
        }
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected handleCollisionChange(_isColliding?: boolean) {}
}
