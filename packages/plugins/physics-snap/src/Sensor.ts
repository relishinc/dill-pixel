import { Application } from 'dill-pixel';
import { Actor } from './Actor';
import { Entity } from './Entity';
import { System } from './System';
import { checkCollision } from './utils';
import { Collision, EntityType } from './types';

export class Sensor<T = any, A extends Application = Application> extends Actor<T, A> {
  type = 'Sensor';
  isSensor = true;
  isColliding = false;
  /**
   * Types of entities that can pass through this sensor without triggering a collision
   * All actors by default, so sensors can still be pushed by and ride on solids,
   * but we don't check collisions with other actors in the moveX and moveY methods
   * You can call "resolveAllCollisions" to still resolve collisions for actors,
   * but not have this sensor be "pushed" by them
   */
  passThroughTypes: EntityType[] = ['Actor', 'Player'];

  getCollideables<T extends Entity = Entity>(): Set<T> {
    return System.getNearbyEntities<T>(this, 'actor') as Set<T>;
  }

  added() {
    System.addSensor(this);
  }

  removed() {
    System.removeSensor(this);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(_deltaTime?: number) {
    this.activeCollisions = this.resolveAllCollisions() || [];
    this.isColliding = this.activeCollisions ? this.activeCollisions.length > 0 : false;
  }

  /**
   * Resolve all collisions for this sensor
   * ignores passThroughTypes
   */
  resolveAllCollisions(): null | Collision[] {
    const collisions = [];
    // Iterate through all solids in the level to check for collisions
    for (const entity of this.getCollideables()) {
      if (!entity.isCollideable) {
        continue;
      }
      const collisionResult = checkCollision(this.getBoundingBox(), entity.getBoundingBox(), this, entity);
      if (collisionResult) {
        collisions.push(collisionResult);
      }
      if (collisionResult) {
        System.collide(collisionResult);
        // if the collision resolver returns true,
        // we should stop and return this collision
        // this will stop actor movement if returned
        if (System.resolveCollision(collisionResult)) {
          collisions.push(collisionResult);
        }
      }
    }
    return collisions.length ? collisions : null;
  }

  getOuterCollisions(collideables = this.getCollideables()) {
    const outerBoundingBox = this.getOuterBoundingBox();
    if (!outerBoundingBox) {
      // Logger.error(this.type, 'has no outer bounding box. Returning empty array.');
      return [];
    }
    const collisions: Collision[] = [];
    for (const entity of collideables) {
      if (!entity.isCollideable) {
        continue;
      }
      const collisionResult = checkCollision(outerBoundingBox, entity.getBoundingBox(), this, entity);
      if (collisionResult) {
        collisions.push(collisionResult);
      }
    }
    return collisions;
  }
}
