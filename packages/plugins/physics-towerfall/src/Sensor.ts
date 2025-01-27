import { Application } from 'dill-pixel';
import { Actor } from './Actor';
import { Entity } from './Entity';
import { Solid } from './Solid';
import { PhysicsEntityConfig, Vector2 } from './types';
import { resolveEntityPosition, resolveEntitySize } from './utils';

export class Sensor<T extends Application = Application> extends Entity<T> {
  public type = 'Sensor';
  public velocity: Vector2 = { x: 0, y: 0 };
  public shouldRemoveOnCull: boolean = false; // Sensors typically persist
  private overlappingActors: Set<Actor> = new Set();

  constructor(config?: PhysicsEntityConfig) {
    super(config);
  }

  public init(config: PhysicsEntityConfig): void {
    if (config) {
      if (config.type) {
        this.type = config.type;
      }

      const { x, y } = resolveEntityPosition(config);
      const { width, height } = resolveEntitySize(config);

      this._x = Math.round(x);
      this._y = Math.round(y);
      this.width = Math.round(width);
      this.height = Math.round(height);

      // Reset physics properties
      this._xRemainder = 0;
      this._yRemainder = 0;
      this.velocity.x = 0;
      this.velocity.y = 0;
    }

    if (config?.view) {
      this.view = config.view;
      this.updateView();
    }

    this.overlappingActors.clear();
  }

  /**
   * Check if this sensor is riding the given solid
   */
  public isRiding(solid: Solid): boolean {
    // Must be directly above the solid (within 1 pixel)
    const sensorBottom = this.y + this.height;
    const onTop = Math.abs(sensorBottom - solid.y) <= 1;

    // Must be horizontally overlapping
    const overlap = this.x + this.width > solid.x && this.x < solid.x + solid.width;

    return onTop && overlap;
  }

  /**
   * Check if this sensor is riding any solid
   */
  public isRidingSolid(): boolean {
    const solids = this.getSolidsAt(this.x, this.y + 1);
    return solids.some((solid) => this.isRiding(solid));
  }

  /**
   * Move the sensor horizontally, checking for collisions
   */
  public moveX(amount: number): void {
    this._xRemainder += amount;
    const move = Math.round(this._xRemainder);

    if (move !== 0) {
      this._xRemainder -= move;
      this._x += move;
      this.updateView();
      this.checkActorOverlaps();
    }
  }

  /**
   * Move the sensor vertically, checking for collisions
   */
  public moveY(amount: number): void {
    this._yRemainder += amount;
    const move = Math.round(this._yRemainder);

    if (move !== 0) {
      this._yRemainder -= move;
      this._y += move;
      this.updateView();
      this.checkActorOverlaps();
    }
  }

  /**
   * Update sensor position and check for overlapping actors
   */
  public update(deltaTime: number): void {
    // Apply gravity if not riding a solid
    if (!this.isRidingSolid()) {
      this.velocity.y += this.system.gravity * deltaTime;
    }

    // Move
    if (this.velocity.x !== 0) {
      this.moveX(this.velocity.x * deltaTime);
    }
    if (this.velocity.y !== 0) {
      this.moveY(this.velocity.y * deltaTime);
    }

    this.checkActorOverlaps();
  }

  /**
   * Check for overlapping actors and trigger callbacks
   */
  private checkActorOverlaps(): void {
    const currentOverlaps = new Set<Actor>();

    // Get all actors at current position
    const nearbyActors = this.system.getActorsByType('Actor');

    for (const actor of nearbyActors) {
      if (this.overlaps(actor)) {
        currentOverlaps.add(actor);
        if (!this.overlappingActors.has(actor)) {
          // New overlap
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
  }

  /**
   * Called when an actor starts overlapping with this sensor
   */
  protected onActorEnter(actor: Actor): void {
    // Override in subclass
    void actor;
  }

  /**
   * Called when an actor stops overlapping with this sensor
   */
  protected onActorExit(actor: Actor): void {
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
