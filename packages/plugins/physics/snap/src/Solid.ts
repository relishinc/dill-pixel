import { Application } from 'dill-pixel';
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
    const ridingActors = this.getAllRidingActors();
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

  getAllRidingActors(): Actor[] {
    // Implement logic to get all actors riding this solid
    return (this.collideables as Actor[]).filter((actor: Actor) => {
      return actor.riding.has(this);
    });
  }

  // Simple collision detection between this solid and an actor
  collidesWith(entity: Entity, dx: number, dy: number): boolean {
    return System.getRectangleIntersection(entity, this, dx, dy);
  }

  public handleActorInteractions(
    deltaX: number,
    deltaY: number,
    ridingActors: Actor[] = this.getAllRidingActors(),
  ): void {
    (this.collideables as Actor[]).forEach((actor) => {
      if (ridingActors.includes(actor)) {
        // Move riding actors along with this solid
        if (actor.mostRiding === this) {
          actor.moveY(deltaY);
          actor.moveX(deltaX);
        }
      } else if (
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

        if (overlapX !== 0) {
          actor.moveX(overlapX, actor.squish, null, this);
        }

        const overlapY =
          deltaY !== 0
            ? deltaY > 0
              ? this.getBoundingBox().bottom - actor.getBoundingBox().top
              : this.getBoundingBox().top - actor.getBoundingBox().bottom
            : 0;

        if (overlapY !== 0) {
          actor.moveY(overlapY, actor.squish, null, this);
        }
      }
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected handleCollisionChange(_isColliding?: boolean) {}
}
