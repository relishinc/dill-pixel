import { Application } from '../../../core/Application';
import { Actor } from './Actor';
import { Entity } from './Entity';
import { World } from './World';

export class Solid<T = any, A extends Application = Application> extends Entity<T, A> {
  isCollidable: boolean = true;

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
      this.isCollidable = false;
      if (moveX !== 0) {
        // riding = this.getAllRidingActors();
        this.moveInXDirection(moveX);
      }
      if (moveY !== 0) {
        // riding = this.getAllRidingActors();
        this.moveInYDirection(moveY);
      }
      this.isCollidable = true;
    }
  }

  moveInXDirection(moveX: number): void {
    this.xRemainder -= moveX;
    this.x += moveX;
    World.actors.forEach((actor: Actor) => {
      const overlap = this.overlapCheck(actor);
      if (overlap) {
        actor.moveX(
          overlap?.left ? this.right - actor.left : this.left - actor.right,
          overlap?.left ? actor.squish : null,
        );
      } else if (actor.isRiding(this)) {
        actor.moveX(moveX, null, null, this);
      }
    });
  }

  moveInYDirection(moveY: number): void {
    this.yRemainder -= moveY;
    this.y += moveY;
    const debug = moveY < 0;

    World.actors.forEach((actor: Actor) => {
      const overlap = this.overlapCheck(actor);
      actor.affectedByGravity = true;
      if (overlap) {
        actor.affectedByGravity = false;
        actor.moveY(
          overlap?.bottom ? this.top - actor.bottom - World.gravity : this.bottom - actor.top + World.gravity,
          actor.squish,
          null,
          this,
        );
      } else if (actor.isRiding(this)) {
        actor.affectedByGravity = false;
        actor.moveY(moveY, null);
      }
      actor.affectedByGravity = true;
    });
  }

  getAllRidingActors(): Actor[] {
    // Implement logic to get all actors riding this solid
    return World.actors.filter((actor: Actor) => {
      return actor.isRiding(this);
    });
  }
}
