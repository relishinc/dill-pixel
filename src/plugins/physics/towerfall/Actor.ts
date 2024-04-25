import { Point } from 'pixi.js';
import { Application } from '../../../core/Application';
import { Entity } from './Entity';
import { Solid } from './Solid';
import { OverlapResult, OverlapResultObject } from './types';
import { checkPointIntersection } from './utils';
import { World } from './World';

export class Actor<T = any, A extends Application = Application> extends Entity<T, A> {
  public affectedByGravity: boolean = true;

  added() {
    World.addActor(this);
  }

  removed() {
    World.removeActor(this);
  }

  squish(collisions?: OverlapResult[]) {}

  moveX(
    amount: number,
    onCollide?: ((collisionResult: OverlapResult[]) => void) | null,
    onNoCollide?: (() => void) | null,
    movedBy?: Entity,
  ): void {
    this.xRemainder += amount;
    let move = Math.round(this.xRemainder);
    if (move !== 0) {
      this.xRemainder -= move;
      const sign = Math.sign(move);
      while (move !== 0) {
        const collisions = this.collideAt(0, sign);
        const definiteCollisions =
          collisions &&
          (collisions as OverlapResultObject[]).filter(
            (c) => c.entity2 !== movedBy && ((c.left && move > 0) || (c.right && move < 0)),
          );
        if (definiteCollisions && definiteCollisions?.length > 0) {
          // Hit a solid
          if (onCollide) {
            onCollide(collisions);
          }
          break;
        } else {
          this.x += sign;
          move -= sign;
        }
        if (!definiteCollisions) {
          if (onNoCollide) {
            onNoCollide();
          }
        }
      }
    } else {
      if (onNoCollide) {
        onNoCollide();
      }
    }
  }

  moveY(
    amount: number,
    onCollide?: ((collisionResult: OverlapResult[]) => void) | null,
    onNoCollide?: (() => void) | null,
    movedBy?: Entity,
  ): void {
    this.yRemainder += amount;
    let move = Math.round(this.yRemainder);
    if (move !== 0) {
      this.yRemainder -= move;
      const sign = Math.sign(move);
      while (move !== 0) {
        // console.log({ bottom: bounds.bottom, movementBottom: bounds.bottom + sign });
        const collisions = this.collideAt(0, sign);
        const definiteCollisions =
          collisions && (collisions as OverlapResultObject[]).filter((c) => c.entity2 !== movedBy);
        if (definiteCollisions && definiteCollisions?.length > 0) {
          // Hit a solid
          if (onCollide) {
            onCollide(definiteCollisions);
          }
          break;
        } else {
          this.y += sign;
          move -= sign;
        }
        if (!definiteCollisions) {
          if (onNoCollide) {
            onNoCollide();
          }
        }
      }
    } else {
      if (onNoCollide) {
        onNoCollide();
      }
    }
  }

  collideAt(x: number, y: number): false | OverlapResult[] {
    const collisions: OverlapResult[] = World.solids
      .map((solid: Solid) => {
        return this.overlapCheck(solid, new Point(x, y));
      })
      .filter(Boolean) as OverlapResult[];

    return collisions.filter(Boolean).length > 0 ? collisions : false;
  }

  intersection(x: number, y: number, entity: Entity) {
    return checkPointIntersection(new Point(x, y), entity);
  }

  isRiding(solid: Solid) {
    return (
      this.bottom >= solid.top - 5 &&
      this.bottom <= solid.bottom + 5 &&
      this.right >= solid.left &&
      this.left <= solid.right
    );
  }
}
