import { Application } from '../../../core/Application';
import { Actor } from './Actor';
import { Entity } from './Entity';
import { System } from './System';

export class Solid<T = any, A extends Application = Application> extends Entity<T, A> {
  type = 'Solid';
  isSolid = true;

  get collideables(): Entity[] {
    return System.getNearbyEntities(this, (entity) => entity.isActor);
  }

  added() {
    System.addSolid(this);
  }

  removed() {
    System.removeSolid(this);
  }

  move(x: number, y: number): void {
    this.xRemainder += x;
    this.yRemainder += y;
    const moveX = Math.round(this.xRemainder);
    const moveY = Math.round(this.yRemainder);

    if (moveX !== 0 || moveY !== 0) {
      // Temporarily make this solid non-collidable
      this.isCollideable = false;

      // Move on the X axis
      this.x += moveX;
      this.xRemainder -= moveX;
      this.handleActorInteractions(moveX, 0);

      this.y += moveY;
      this.yRemainder -= moveY;
      this.handleActorInteractions(0, moveY);

      // Re-enable collisions
      this.isCollideable = true;
    }
    System.updateEntity(this);
  }

  getAllRidingActors(): Actor[] {
    // Implement logic to get all actors riding this solid
    return System.actors.filter((actor: Actor) => {
      return actor.isRiding(this);
    });
  }

  // Simple collision detection between this solid and an actor
  collidesWith(entity: Entity, dx: number, dy: number): boolean {
    return System.getRectangleIntersection(entity, this, dx, dy);
  }

  public checkActorCollisions() {
    this.handleActorInteractions(0, 0);
  }

  public handleActorInteractions(deltaX: number, deltaY: number): void {
    // Check for collisions with non-riding actors
    (this.collideables as Actor[]).forEach((actor) => {
      if (
        !actor.passThroughTypes.includes(this.type) &&
        !actor.isPassingThrough(this) &&
        this.collidesWith(actor, deltaX, deltaY)
      ) {
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
          actor.moveX(overlapX, actor.squish, null, this);
        }
        if (overlapY !== 0) {
          actor.moveY(overlapY, actor.squish, null, this);
        }
      } else if (actor.isRiding(this) && deltaX !== 0) {
        actor.moveX(deltaX, () => {});
        actor.moveY(deltaY, () => {});
      }
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected handleCollisionChange(_isColliding?: boolean) {}
}
