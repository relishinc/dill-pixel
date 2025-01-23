// adds a velocity mixin to any entity, which moves the entity by the desired x and y velocity in its update method

import { Constructor } from 'dill-pixel';
import { Point } from 'pixi.js';
import type { Actor } from '../Actor';
import type { Entity } from '../Entity';
import type { Solid } from '../Solid';
import { Collision } from '../types';

export const WithVelocity = <TBase extends Constructor<Actor> | Constructor<Solid>>(Base: TBase) => {
  return class extends Base {
    public velocity: Point = new Point(0, 0);
    public previousVelocity: Point = new Point(0, 0);
    public velocityRemainder: Point = new Point(0, 0);
    public maxVelocity: Point = new Point(1000, 1000);
    public friction: Point = new Point(0, 0);

    // Store velocity state for interpolation
    public velocityState = {
      current: new Point(0, 0),
      previous: new Point(0, 0),
      remainder: new Point(0, 0),
    };

    moveByVelocity(
      deltaTime: number,
      onCollide?: ((collision: Collision, pushingEntity?: Entity, direction?: Point) => void) | null,
      onNoCollisions?: (() => void) | null,
    ) {
      // Store previous velocity for interpolation
      this.velocityState.previous.copyFrom(this.velocityState.current);

      // Apply friction
      if (this.friction.x !== 0) {
        this.velocity.x *= 1 - this.friction.x * deltaTime;
      }
      if (this.friction.y !== 0) {
        this.velocity.y *= 1 - this.friction.y * deltaTime;
      }

      // Clamp velocity to max values
      this.velocity.x = Math.min(Math.max(this.velocity.x, -this.maxVelocity.x), this.maxVelocity.x);
      this.velocity.y = Math.min(Math.max(this.velocity.y, -this.maxVelocity.y), this.maxVelocity.y);

      // Calculate movement with remainder
      this.velocityRemainder.x += this.velocity.x * deltaTime;
      this.velocityRemainder.y += this.velocity.y * deltaTime;

      // Get integer movement amounts
      const moveX = Math.round(this.velocityRemainder.x);
      const moveY = Math.round(this.velocityRemainder.y);

      // Store remainder for next frame
      this.velocityRemainder.x -= moveX;
      this.velocityRemainder.y -= moveY;

      // Store current velocity state
      this.velocityState.current.copyFrom(this.velocity);
      this.velocityState.remainder.copyFrom(this.velocityRemainder);

      if ((this as unknown as Entity).isSolid) {
        (this as unknown as Solid).move(moveX, moveY);
      } else {
        // Move one axis at a time for better collision response
        if (moveX !== 0) {
          (this as unknown as Actor).moveX(moveX, onCollide, onNoCollisions);
        }
        if (moveY !== 0) {
          (this as unknown as Actor).moveY(moveY, onCollide, onNoCollisions);
        }
      }
    }

    reflect(collision: Collision, energyLoss: number = 0, angleVariation: number = 0) {
      // Calculate the normal vector based on the collision side
      const normal = new Point(
        (collision.left ? 1 : 0) + (collision.right ? -1 : 0),
        (collision.top ? 1 : 0) + (collision.bottom ? -1 : 0),
      );

      // Early exit if no normal was determined
      if (normal.x === 0 && normal.y === 0) {
        return;
      }

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

      // Calculate the reflection vector with energy loss
      const factor = 1 - Math.min(Math.max(energyLoss, 0), 1);
      this.velocity.x = (this.velocity.x - 2 * dotProduct * normal.x) * factor;
      this.velocity.y = (this.velocity.y - 2 * dotProduct * normal.y) * factor;

      // Clear remainder on the reflected axis to prevent "sticking"
      if (Math.abs(normal.x) > 0.1) {
        this.velocityRemainder.x = 0;
      }
      if (Math.abs(normal.y) > 0.1) {
        this.velocityRemainder.y = 0;
      }
    }

    // Helper method to get interpolated position for rendering
    getInterpolatedPosition(alpha: number): Point {
      return new Point(
        (this as unknown as Entity).x + (this.velocityState.current.x - this.velocityState.previous.x) * alpha,
        (this as unknown as Entity).y + (this.velocityState.current.y - this.velocityState.previous.y) * alpha,
      );
    }

    setMaxVelocity(x: number, y: number): void {
      this.maxVelocity.set(x, y);
    }

    setFriction(x: number, y: number): void {
      this.friction.set(x, y);
    }
  };
};
