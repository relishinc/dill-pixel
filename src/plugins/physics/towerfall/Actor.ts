import { Rectangle } from 'pixi.js';
import { Application } from '../../../core/Application';
import { Entity } from './Entity';
import { System } from './System';
import { Collision, EntityType } from './types';
import { checkCollision } from './utils';

export class Actor<T = any, A extends Application = Application> extends Entity<T, A> {
  type = 'Actor';
  affectedByGravity: boolean = true;
  passThroughTypes: EntityType[] = [];

  get collideables(): Entity[] {
    return System.solids;
  }

  added() {
    System.addActor(this);
  }

  removed() {
    System.removeActor(this);
  }

  squish(collision?: Collision) {}

  moveX(amount: number, onCollide: (collision: Collision) => void): void {
    this.xRemainder += amount;
    let move = Math.round(this.xRemainder);
    const sign = Math.sign(move);

    while (move !== 0) {
      const nextX = this.x + (move ? sign : 0); // Predict the next X position
      const collision: Collision | false = this.collideAt(nextX - this.x, 0, this.getBoundingBox());
      if (collision) {
        if (onCollide) onCollide(collision);
        this.xRemainder = 0; // Reset the remainder to prevent sliding
        break;
      } else {
        this.x = nextX;
        move -= sign;
        this.xRemainder -= sign;
      }
    }
  }

  moveY(amount: number, onCollide: (collision: Collision) => void, onNoCollisions?: () => void): void {
    this.yRemainder += amount;
    let move = Math.round(this.yRemainder);
    const sign = Math.sign(move);
    while (move !== 0) {
      const nextY = this.y + (move ? sign : 0); // Predict the next Y position
      const collision: Collision | false = this.collideAt(0, nextY - this.y, this.getBoundingBox());
      if (collision) {
        if (onCollide) onCollide(collision);
        this.yRemainder = 0;
        break;
      } else {
        this.y = nextY;
        move -= sign;
        this.yRemainder -= sign;
        if (onNoCollisions) {
          onNoCollisions();
        }
      }
    }
  }

  // Simple bounding box collision check
  collideAt(
    x: number,
    y: number,
    box: Rectangle,
    // sidesToCheck: Side[] = ['top', 'bottom', 'left', 'right'],
  ): Collision | false {
    const nextPosition = new Rectangle(box.x + x, box.y + y, box.width, box.height);
    // Iterate through all solids in the level to check for collisions
    // TOOD: Implement broad-phase collision detection
    let collision = null;
    for (const entity of this.collideables) {
      if (!entity.isCollideable || this.passThroughTypes.includes(entity.type)) {
        continue;
      }
      const solidBounds = entity.getBoundingBox();
      const collisionResult = checkCollision(nextPosition, solidBounds, this, entity);
      if (collisionResult && !collision /*&& sidesToCheck.some((side) => overlapResult[side] !== null)*/) {
        collision = collisionResult;
        System.collide(collision);
      }
    }
    return collision || false;
  }

  isRiding(solid: Entity): boolean {
    const actorBounds = this.getBoundingBox();
    const solidBounds = solid.getBoundingBox();

    // Basic check if actor is directly on top of the solid
    return (
      actorBounds.bottom >= solidBounds.top - 2 &&
      actorBounds.bottom <= solidBounds.top &&
      actorBounds.left < solidBounds.right &&
      actorBounds.right > solidBounds.left
    );
  }
}
