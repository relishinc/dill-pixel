import { Application } from 'dill-pixel';
import { Actor } from './Actor';
import { Entity } from './Entity';
import { Solid } from './Solid';
import { PhysicsEntityConfig, SensorOverlap, Vector2 } from './types';

export class Sensor<T extends Application = Application> extends Entity<T> {
  public shouldRemoveOnCull = false;
  public collidableTypes: string[] = [];
  public velocity: Vector2 = { x: 0, y: 0 };
  public isStatic: boolean = false;
  private overlappingActors: Set<Actor> = new Set();
  private _isRidingSolidCache: boolean | null = null;

  constructor(config?: PhysicsEntityConfig) {
    super(config);
  }

  public init(config: PhysicsEntityConfig): void {
    super.init(config);
    if (!this.velocity) {
      this.velocity = { x: 0, y: 0 };
    }
    this.velocity.x = 0;
    this.velocity.y = 0;
    if (!this.overlappingActors) {
      this.overlappingActors = new Set();
    }
    this.overlappingActors.clear();
    this._isRidingSolidCache = null;
  }

  /**
   * Check if this sensor is riding the given solid
   */
  public isRiding(solid: Solid): boolean {
    const gravityDirection = Math.sign(this.system.gravity);
    if (gravityDirection > 0) {
      // Normal gravity - check if we're on top of the solid
      const sensorBottom = this.y + this.height;
      const onTop = Math.abs(sensorBottom - solid.y) <= 1;
      const overlap = this.x + this.width > solid.x && this.x < solid.x + solid.width;
      return onTop && overlap;
    } else {
      // Reversed gravity - check if we're on bottom of the solid
      const sensorTop = this.y;
      const onBottom = Math.abs(sensorTop - (solid.y + solid.height)) <= 1;
      const overlap = this.x + this.width > solid.x && this.x < solid.x + solid.width;
      return onBottom && overlap;
    }
  }

  /**
   * Check if this sensor is riding any solid
   */
  public isRidingSolid(): boolean {
    // Return cached value if available
    if (this._isRidingSolidCache !== null) {
      return this._isRidingSolidCache;
    }

    // Calculate and cache the result
    const solids = this.getSolidsAt(this.x, this.system.gravity > 0 ? this.y + 1 : this.y - 1);
    this._isRidingSolidCache = solids.some((solid) => this.isRiding(solid));
    return this._isRidingSolidCache;
  }

  /**
   * Force move the sensor, ignoring static state and collisions
   */
  public moveStatic(x: number, y: number): void {
    this._x = x;
    this._y = y;
    this._xRemainder = 0;
    this._yRemainder = 0;
    this.updateView();
    this.checkActorOverlaps();
  }

  /**
   * Move the sensor horizontally - pass through solids
   */
  public moveX(amount: number): void {
    if (this.isStatic) {
      return;
    }

    this._xRemainder += amount;
    const move = Math.round(this._xRemainder);

    if (move !== 0) {
      this._xRemainder -= move;
      const sign = Math.sign(move);
      let remaining = Math.abs(move);
      while (remaining > 0) {
        const step = sign;
        const nextX = this.x + step;

        // Check for collision with any solid
        let collided = false;
        for (const solid of this.getSolidsAt(nextX, this.y)) {
          if (solid.collidable) {
            collided = true;
            break;
          }
        }

        if (!collided) {
          this._x = nextX;
          remaining--;
          this.updateView();
          this.checkActorOverlaps();
        } else {
          // Stop horizontal movement when hitting a solid
          this.velocity.x = 0;
          break;
        }
      }
    }
  }

  /**
   * Move the sensor vertically - collide with solids for riding
   */
  public moveY(amount: number): void {
    if (this.isStatic) {
      return;
    }

    this._yRemainder += amount;
    const move = Math.round(this._yRemainder);

    if (move !== 0) {
      this._yRemainder -= move;
      const sign = Math.sign(move);

      let remaining = Math.abs(move);
      while (remaining > 0) {
        const step = sign;
        const nextY = this.y + step;

        // Check for collision with any solid
        let collided = false;
        // Only check collisions when moving in the direction of gravity
        if (Math.sign(this.system.gravity) === sign) {
          for (const solid of this.getSolidsAt(this.x, nextY)) {
            if (solid.collidable) {
              collided = true;
              break;
            }
          }
        }

        if (!collided) {
          this._y = nextY;
          remaining--;
          this.updateView();
          this.checkActorOverlaps();
        } else {
          // Stop vertical movement when landing on a solid
          this.velocity.y = 0;
          break;
        }
      }
    }
  }

  /**
   * Update sensor position and check for overlapping actors
   */
  public update(deltaTime: number): void {
    // Reset the cache at the start of each update
    this._isRidingSolidCache = null;

    if (!this.active) {
      return;
    }

    // Only apply gravity if not static and not riding a solid
    if (!this.isStatic && !this.isRidingSolid()) {
      this.velocity.y += this.system.gravity * deltaTime;
    }

    // Move
    if (this.velocity.x !== 0) {
      this.moveX(this.velocity.x * deltaTime);
    }
    if (this.velocity.y !== 0) {
      this.moveY(this.velocity.y * deltaTime);
    }
  }

  /**
   * Check for overlapping actors and trigger callbacks
   */
  public checkActorOverlaps(): Set<SensorOverlap> {
    const currentSensorOverlaps = new Set<SensorOverlap>();
    const currentOverlaps = new Set<Actor>();

    // Get all actors at current position
    const nearbyActors = this.system.getActorsByType(this.collidableTypes);

    for (const actor of nearbyActors) {
      if (this.overlaps(actor)) {
        currentOverlaps.add(actor);
        if (!this.overlappingActors.has(actor)) {
          // New overlap
          currentSensorOverlaps.add({
            actor,
            sensor: this,
            type: `${actor.type}|${this.type}`,
          });
          this.onActorEnter(actor);
        }
      }
    }

    // Check for actors that are no longer overlapping
    for (const actor of this.overlappingActors) {
      if (!currentOverlaps.has(actor)) {
        this.onActorExit(actor);
      }
    }

    this.overlappingActors = currentOverlaps;

    return currentSensorOverlaps;
  }

  /**
   * Called when an actor starts overlapping with this sensor
   */
  public onActorEnter(actor: Actor): void {
    // Override in subclass
    void actor;
  }

  /**
   * Called when an actor stops overlapping with this sensor
   */
  public onActorExit(actor: Actor): void {
    // Override in subclass
    void actor;
  }

  private overlaps(actor: Actor): boolean {
    return (
      this.x < actor.x + actor.width &&
      this.x + this.width > actor.x &&
      this.y < actor.y + actor.height &&
      this.y + this.height > actor.y
    );
  }

  protected getSolidsAt(x: number, y: number): Solid[] {
    return this.system.getSolidsAt(x, y, this);
  }
}
