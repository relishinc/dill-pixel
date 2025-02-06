import { Application } from 'dill-pixel';
import { Actor } from './Actor';
import { Entity } from './Entity';
import { Solid } from './Solid';
import { EntityData, PhysicsEntityConfig, SensorOverlap, Vector2 } from './types';

/**
 * A trigger zone that can detect overlaps with actors.
 * Sensors are typically used for collectibles, triggers, and detection zones.
 *
 * Features:
 * - Overlap detection with specific actor types
 * - Optional gravity and movement
 * - Can be static or dynamic
 * - Callbacks for enter/exit events
 *
 * @typeParam T - Application type, defaults to base Application
 *
 * @example
 * ```typescript
 * // Create a coin pickup sensor
 * class Coin extends Sensor {
 *   constructor() {
 *     super({
 *       type: 'Coin',
 *       position: [100, 100],
 *       size: [32, 32],
 *       view: coinSprite
 *     });
 *
 *     // Only detect overlaps with player
 *     this.collidableTypes = ['Player'];
 *   }
 *
 *   // Called when a player enters the coin
 *   onActorEnter(actor: Actor) {
 *     if (actor.type === 'Player') {
 *       increaseScore(10);
 *       this.physics.removeSensor(this);
 *     }
 *   }
 * }
 *
 * // Create a damage zone
 * class Spikes extends Sensor {
 *   constructor() {
 *     super({
 *       type: 'Spikes',
 *       position: [300, 500],
 *       size: [100, 32],
 *       view: spikesSprite
 *     });
 *
 *     this.collidableTypes = ['Player', 'Enemy'];
 *     this.isStatic = true; // Don't move or fall
 *   }
 *
 *   onActorEnter(actor: Actor) {
 *     if (actor.type === 'Player') {
 *       actor.damage(10);
 *     }
 *   }
 * }
 * ```
 */
export class Sensor<T extends Application = Application, D extends EntityData = EntityData> extends Entity<T, D> {
  /** Whether this sensor should be removed when culled */
  public shouldRemoveOnCull = false;

  /** List of actor types this sensor can detect */
  public collidableTypes: string[] = [];

  /** Current velocity in pixels per second */
  public velocity: Vector2 = { x: 0, y: 0 };

  /** Whether this sensor should stay in place */
  public isStatic: boolean = false;

  /** Set of actors currently overlapping this sensor */
  private overlappingActors: Set<Actor> = new Set();

  /** Cache for isRidingSolid check */
  private _isRidingSolidCache: boolean | null = null;

  private _currentSensorOverlaps = new Set<SensorOverlap>();
  private _currentOverlaps = new Set<Actor>();

  set x(value: number) {
    super.x = value;
    if (this.isStatic) {
      this._xRemainder = 0;
      this.updateView();
      this.checkActorOverlaps();
    }
  }

  get x(): number {
    return super.x;
  }

  set y(value: number) {
    super.y = value;
    if (this.isStatic) {
      this._yRemainder = 0;
      this.updateView();
      this.checkActorOverlaps();
    }
  }

  get y(): number {
    return super.y;
  }

  /**
   * Initializes or reinitializes the sensor with new configuration.
   *
   * @param config - Configuration for the sensor
   */
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
    this._isRidingSolidCache = null;
  }

  /**
   * Checks if this sensor is riding the given solid.
   * Takes into account gravity direction for proper riding detection.
   *
   * @param solid - The solid to check against
   * @returns True if riding the solid
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
   * Checks if this sensor is riding any solid.
   * Uses caching to optimize multiple checks per frame.
   *
   * @returns True if riding any solid
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
   * Force moves the sensor to a new position, ignoring static state and collisions.
   *
   * @param x - New X position
   * @param y - New Y position
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
   * Moves the sensor horizontally, passing through solids.
   *
   * @param amount - Distance to move in pixels
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
          if (solid.canCollide) {
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
   * Moves the sensor vertically, colliding with solids for riding.
   *
   * @param amount - Distance to move in pixels
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
            if (solid.canCollide) {
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
   * Updates the sensor's position and checks for overlapping actors.
   *
   * @param deltaTime - Delta time in seconds
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
   * Checks for overlapping actors and triggers callbacks.
   *
   * @returns Set of current overlaps
   */
  public checkActorOverlaps(): Set<SensorOverlap> {
    this._currentSensorOverlaps.clear();
    this._currentOverlaps.clear();

    // Get all actors at current position
    const nearbyActors = this.system.getActorsByType(this.collidableTypes);

    for (const actor of nearbyActors) {
      if (this.overlaps(actor)) {
        this._currentOverlaps.add(actor);
        if (!this.overlappingActors.has(actor)) {
          // New overlap
          this._currentSensorOverlaps.add({
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
      if (!this._currentOverlaps.has(actor)) {
        this.onActorExit(actor);
      }
    }

    // Swap the sets to avoid unnecessary clear and forEach operations
    const temp = this.overlappingActors;
    this.overlappingActors = this._currentOverlaps;
    this._currentOverlaps = temp;
    this._currentOverlaps.clear();

    return this._currentSensorOverlaps;
  }

  /**
   * Called when an actor starts overlapping with this sensor.
   * Override this to handle overlap start events.
   *
   * @param actor - The actor that entered
   */
  public onActorEnter<A extends Actor = Actor>(actor: A): void {
    // Override in subclass
    void actor;
  }

  /**
   * Called when an actor stops overlapping with this sensor.
   * Override this to handle overlap end events.
   *
   * @param actor - The actor that exited
   */
  public onActorExit<A extends Actor = Actor>(actor: A): void {
    // Override in subclass
    void actor;
  }

  /**
   * Checks if this sensor overlaps with the given actor.
   *
   * @param actor - Actor to check for overlap
   * @returns True if overlapping
   */
  private overlaps(actor: Actor): boolean {
    return (
      this.x < actor.x + actor.width &&
      this.x + this.width > actor.x &&
      this.y < actor.y + actor.height &&
      this.y + this.height > actor.y
    );
  }

  /**
   * Gets all solids at the specified position.
   *
   * @param x - X position to check
   * @param y - Y position to check
   * @returns Array of solids at the position
   */
  protected getSolidsAt(x: number, y: number): Solid[] {
    return this.system.getSolidsAt(x, y, this);
  }
}
