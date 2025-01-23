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
    const ridingActors = this.getAllRiding(moveX, moveY);

    if (moveX !== 0 || moveY !== 0) {
      // Temporarily make this solid non-collidable
      this.isCollideable = false;
      // Move on the Y axis
      this.y += moveY;
      this.yRemainder -= moveY;
      this.handleActorInteractions(0, moveY, ridingActors);

      // Move on the X axis
      this.x += moveX;
      this.xRemainder -= moveX;
      this.handleActorInteractions(moveX, 0, ridingActors);

      // Re-enable collisions
      this.isCollideable = true;
    }
    System.updateEntity(this);
  }

  animatePosition(x?: number | null, y?: number | null, vars: gsap.TweenVars = {}): gsap.core.Tween {
    const pos = this.position.clone();
    const initialPosition = { x: Math.round(pos.x), y: Math.round(pos.y) };
    const tweenVars = Object.assign({ duration: 1, ease: 'linear.none' }, vars);
    if (x === undefined || isNaN(x as number)) {
      x = initialPosition.x;
    }
    if (y === undefined || isNaN(y as number)) {
      y = initialPosition.y;
    }
    const anim = gsap.to(initialPosition, {
      x: Math.round(x!),
      y: Math.round(y!),
      ...tweenVars,
      onUpdate: () => {
        const dx = initialPosition.x - this.position.x;
        const dy = initialPosition.y - this.position.y;
        this.move(dx, dy);
      },
    });

    this._animations.add(anim);

    return anim;
  }

  public handleActorInteractions(deltaX: number, deltaY: number, ridingActors = this.getAllRiding()): void {
    const collideables = this.getCollideables<Actor>(deltaX, deltaY);
    for (const actor of collideables) {
      if (
        !actor.passThroughTypes.includes(this.type) &&
        !actor.isPassingThrough(this) &&
        this.collidesWith(actor, deltaX, deltaY)
      ) {
        // Push actors only the minimum amount necessary to avoid overlap
        const overlapX =
          deltaX !== 0
            ? deltaX > 0
              ? this.boundingRect.right - actor.boundingRect.left
              : this.boundingRect.left - actor.boundingRect.right
            : 0;

        if (overlapX !== 0) {
          actor.moveX(overlapX, actor.squish, null, this);
        }

        const overlapY =
          deltaY !== 0
            ? deltaY > 0
              ? this.boundingRect.bottom - actor.boundingRect.top
              : this.boundingRect.top - actor.boundingRect.bottom
            : 0;

        if (overlapY !== 0) {
          actor.moveY(overlapY, actor.squish, null, this);
        }
      } else if (ridingActors.has(actor)) {
        // Move riding actors along with this solid
        if (actor.mostRiding === this) {
          actor.moveY(deltaY);
          actor.moveX(deltaX);
        }
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected handleCollisionChange(_isColliding?: boolean) {}
}
