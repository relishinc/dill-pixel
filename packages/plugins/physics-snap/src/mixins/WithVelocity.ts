// adds a velocity mixin to any entity, which moves the entity by the desired x and y velocity in its update method

import type { Entity } from '../Entity';
import type { Actor } from '../Actor';
import type { Solid } from '../Solid';
import { Constructor } from 'dill-pixel';
import { Collision } from '../types';
import { Point } from 'pixi.js';

export const WithVelocity = <TBase extends Constructor<Actor> | Constructor<Solid>>(Base: TBase) => {
  return class extends Base {
    public velocity: Point = new Point(0, 0);
    public ricochetAngle: number = Math.PI;

    update(deltaTime: number) {
      super.update(deltaTime);
      this.moveByVelocity(deltaTime);
    }

    moveByVelocity(
      deltaTime: number,
      onCollide?: ((collision: Collision, pushingEntity?: Entity, direction?: Point) => void) | null,
      onNoCollisions?: (() => void) | null,
    ) {
      if ((this as unknown as Entity).isSolid) {
        (this as unknown as Solid).move(this.velocity.x * deltaTime, this.velocity.y * deltaTime);
      } else {
        (this as unknown as Actor).moveX(this.velocity.x * deltaTime, onCollide, onNoCollisions);
        (this as unknown as Actor).moveY(this.velocity.y * deltaTime, onCollide, onNoCollisions);
      }
    }

    reflect(collision: Collision, energyLoss: number = 0, angleVariation: number = 0) {
      // Calculate the normal vector based on the collision side
      const normal = new Point(
        (collision.left ? 1 : 0) + (collision.right ? -1 : 0),
        (collision.top ? 1 : 0) + (collision.bottom ? -1 : 0),
      );

      // Normalize the normal vector
      const normalLength = Math.sqrt(normal.x * normal.x + normal.y * normal.y);
      normal.x /= normalLength;
      normal.y /= normalLength;

      // Apply angle variation if specified
      if (angleVariation > 0) {
        const angle = Math.atan2(normal.y, normal.x) + (Math.random() - 0.5) * angleVariation;
        normal.x = Math.cos(angle);
        normal.y = Math.sin(angle);
      }

      // Calculate the dot product of velocity and normal
      const dotProduct = this.velocity.x * normal.x + this.velocity.y * normal.y;

      // Calculate the reflection vector
      this.velocity.x = this.velocity.x - 2 * dotProduct * normal.x;
      this.velocity.y = this.velocity.y - 2 * dotProduct * normal.y;

      // Apply energy loss if specified
      if (energyLoss > 0) {
        const factor = 1 - energyLoss;
        this.velocity.x *= factor;
        this.velocity.y *= factor;
      }
    }
  };
};
