import { Application } from '../../../core/Application';
import { Actor } from './Actor';
import { Entity } from './Entity';
import { EntityType } from './types';
import { World } from './World';

export class Solid<T = any, A extends Application = Application> extends Entity<T, A> {
  type = EntityType.Solid;

  isCollidable: boolean = true;

  protected _isColliding: boolean = false;

  get isColliding(): boolean {
    return this._isColliding;
  }

  set isColliding(value: boolean) {
    if (this._isColliding !== value) {
      this._isColliding = value;
      this.handleCollisionChange(value);
    }
  }

  added() {
    World.addSolid(this);
  }

  removed() {
    World.removeSolid(this);
  }

  move(x: number, y: number): void {
    this.xRemainder += x;
    this.yRemainder += y;
    const moveX = Math.round(this.xRemainder);
    const moveY = Math.round(this.yRemainder);

    if (moveX !== 0 || moveY !== 0) {
      // Temporarily make this solid non-collidable
      this.isCollidable = false;

      // Move on the X axis
      this.x += moveX;
      this.xRemainder -= moveX;
      this.handleActorInteractions(moveX, 0);

      // Move on the Y axis
      this.y += moveY;
      this.yRemainder -= moveY;
      this.handleActorInteractions(0, moveY);

      // Re-enable collisions
      this.isCollidable = true;
    }
  }

  getAllRidingActors(): Actor[] {
    // Implement logic to get all actors riding this solid
    return World.actors.filter((actor: Actor) => {
      return actor.isRiding(this);
    });
  }

  // Simple collision detection between this solid and an actor
  collidesWithActor(actor: Actor): boolean {
    return this.getBoundingBox().intersects(actor.getBoundingBox());
  }

  protected handleCollisionChange(isColliding: boolean) {}

  private handleActorInteractions(deltaX: number, deltaY: number): void {
    // Check for collisions with non-riding actors
    World.actors.forEach((actor) => {
      if (this.collidesWithActor(actor)) {
        // Push actors only the minimum amount necessary to avoid overlap
        const overlapX =
          deltaX !== 0
            ? deltaX > 0
              ? this.getBoundingBox().right - actor.getBoundingBox().left
              : this.getBoundingBox().left - actor.getBoundingBox().right
            : 0;

        const overlapY =
          deltaY !== 0
            ? deltaY > 0
              ? this.getBoundingBox().bottom - actor.getBoundingBox().top
              : this.getBoundingBox().top - actor.getBoundingBox().bottom
            : 0;

        if (overlapX !== 0) {
          actor.moveX(overlapX, actor.squish);
        }

        if (overlapY !== 0) {
          actor.moveY(overlapY, actor.squish);
        }
      } else if (actor.isRiding(this)) {
        actor.moveX(deltaX, () => {});
        actor.moveY(deltaY - World.gravity, () => {});
      }
    });
  }
}
