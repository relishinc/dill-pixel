import { Application } from 'dill-pixel';
import { Actor } from './Actor';
import { Entity } from './Entity';
import { Sensor } from './Sensor';
import { PhysicsEntityConfig } from './types';

/**
 * Static or moving solid object that other entities can collide with.
 * Solids are typically used for platforms, walls, and other obstacles.
 *
 * Features:
 * - Static collision boundaries
 * - Support for moving platforms
 * - Carries actors and sensors that are riding it
 * - Pushes overlapping entities out of the way
 *
 * @typeParam T - Application type, defaults to base Application
 *
 * @example
 * ```typescript
 * // Create a static platform
 * const platform = physics.createSolid({
 *   type: 'Platform',
 *   position: [0, 500],
 *   size: [800, 32],
 *   view: platformSprite
 * });
 *
 * // Create a moving platform
 * const movingPlatform = physics.createSolid({
 *   type: 'Platform',
 *   position: [100, 300],
 *   size: [200, 32],
 *   view: platformSprite
 * });
 *
 * // Move the platform back and forth
 * gsap.to(movingPlatform, {
 *   x: 500,
 *   duration: 2,
 *   yoyo: true,
 *   repeat: -1
 * });
 * ```
 */
export class Solid<T extends Application = Application> extends Entity<T> {
  /** Whether this solid should be removed when culled (typically false) */
  public shouldRemoveOnCull = false;

  /** Whether this solid can be collided with */
  public collidable: boolean = true;

  /** Whether this solid is currently moving */
  public moving: boolean = false;

  private _nextX: number;
  private _nextY: number;

  /**
   * Sets the solid's X position.
   * For moving solids, this queues the movement to be applied on next update.
   */
  public set x(value: number) {
    if (this.group) {
      this._nextX = value + this.group.x; // Store position relative to group
    } else {
      this._nextX = Math.round(value);
    }
    this.moving = true;
  }

  public get x(): number {
    return this._x;
  }

  /**
   * Sets the solid's Y position.
   * For moving solids, this queues the movement to be applied on next update.
   */
  public set y(value: number) {
    if (this.group) {
      this._nextY = value + this.group.y; // Store position relative to group
    } else {
      this._nextY = Math.round(value);
    }
    this.moving = true;
  }

  public get y(): number {
    return this._y;
  }

  /**
   * Initializes or reinitializes the solid with new configuration.
   *
   * @param config - Configuration for the solid
   */
  public init(config: PhysicsEntityConfig): void {
    super.init(config);
    if (config) {
      this._nextX = this._x;
      this._nextY = this._y;
    }
  }

  /** Right edge X coordinate */
  public get right(): number {
    return this.x + this.width;
  }

  /** Left edge X coordinate */
  public get left(): number {
    return this.x;
  }

  /** Top edge Y coordinate */
  public get top(): number {
    return this.y;
  }

  /** Bottom edge Y coordinate */
  public get bottom(): number {
    return this.y + this.height;
  }

  /**
   * Moves the solid by the specified amount, carrying any riding entities.
   * Also pushes any overlapping entities out of the way.
   *
   * @param x - X distance to move
   * @param y - Y distance to move
   * @param actors - Set of actors to check for riding/pushing
   * @param sensors - Set of sensors to check for riding/pushing
   */
  public move(
    x: number,
    y: number,
    actors: Set<Actor> = this.system.actors,
    sensors: Set<Sensor> = this.system.sensors,
  ): void {
    if (!this.active) {
      return;
    }
    // Calculate total movement including remainder
    const totalX = x + (this._nextX - this._x);
    const totalY = y + (this._nextY - this._y);

    this._xRemainder += totalX;
    this._yRemainder += totalY;

    const moveX = Math.round(this._xRemainder);
    const moveY = Math.round(this._yRemainder);

    if (moveX !== 0 || moveY !== 0) {
      // Get all riding actors and sensors before movement
      const ridingActors = new Set<Actor>();
      const ridingSensors = new Set<Sensor>();

      for (const actor of actors) {
        if (actor.isRiding(this)) {
          ridingActors.add(actor);
        }
      }

      for (const sensor of sensors) {
        if (sensor.isRiding(this)) {
          ridingSensors.add(sensor);
        }
      }

      // Make this solid non-collidable so actors don't get stuck
      this.collidable = false;

      if (moveX !== 0) {
        this._xRemainder -= moveX;
        this._x += moveX;

        if (moveX > 0) {
          // Moving right
          for (const actor of actors) {
            if (this.overlaps(actor)) {
              // Push right
              actor.moveX(this.right - actor.x, () => actor.squish());
            } else if (ridingActors.has(actor)) {
              // Carry right
              actor.moveX(moveX);
            }
          }
          for (const sensor of sensors) {
            if (this.overlaps(sensor)) {
              // Push right
              sensor.moveX(this.right - sensor.x);
            } else if (ridingSensors.has(sensor)) {
              // Carry right
              sensor.moveX(moveX);
            }
          }
        } else {
          // Moving left
          for (const actor of actors) {
            if (this.overlaps(actor)) {
              // Push left
              actor.moveX(this.left - (actor.x + actor.width), () => actor.squish());
            } else if (ridingActors.has(actor)) {
              // Carry left
              actor.moveX(moveX);
            }
          }
          for (const sensor of sensors) {
            if (this.overlaps(sensor)) {
              // Push left
              sensor.moveX(this.left - (sensor.x + sensor.width));
            } else if (ridingSensors.has(sensor)) {
              // Carry left
              sensor.moveX(moveX);
            }
          }
        }
      }

      if (moveY !== 0) {
        this._yRemainder -= moveY;
        this._y += moveY;

        if (moveY > 0) {
          // Moving down
          for (const actor of actors) {
            if (this.overlaps(actor)) {
              // Push down
              actor.moveY(this.bottom - actor.y, actor.squish);
            } else if (ridingActors.has(actor)) {
              // Carry down
              actor.moveY(moveY);
            }
          }
          for (const sensor of sensors) {
            if (this.overlaps(sensor)) {
              // Push down
              sensor.moveY(this.bottom - sensor.y);
            } else if (ridingSensors.has(sensor)) {
              // Carry down
              sensor.moveY(moveY);
            }
          }
        } else {
          // Moving up
          for (const actor of actors) {
            if (this.overlaps(actor)) {
              // Push up
              actor.moveY(this.top - (actor.y + actor.height), actor.squish);
            } else if (ridingActors.has(actor)) {
              // Carry up
              actor.moveY(moveY);
            }
          }
          for (const sensor of sensors) {
            if (this.overlaps(sensor)) {
              // Push up
              sensor.moveY(this.top - (sensor.y + sensor.height));
            } else if (ridingSensors.has(sensor)) {
              // Carry up
              sensor.moveY(moveY);
            }
          }
        }
      }

      // Re-enable collisions
      this.collidable = true;

      // Update next positions to match current
      this._nextX = this._x;
      this._nextY = this._y;

      // Update the view position
      this.updateView();
    }
  }

  /**
   * Checks if this solid overlaps with the given entity.
   *
   * @param entity - Entity to check for overlap
   * @returns True if overlapping
   */
  private overlaps(entity: Actor | Sensor): boolean {
    return (
      this.x < entity.x + entity.width &&
      this.x + this.width > entity.x &&
      this.y < entity.y + entity.height &&
      this.y + this.height > entity.y
    );
  }
}
