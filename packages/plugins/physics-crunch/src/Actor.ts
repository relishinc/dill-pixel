import { Application } from 'dill-pixel';
import { Entity } from './Entity';
import { Solid } from './Solid';
import { CollisionResult, PhysicsEntityConfig, Vector2 } from './types';

/**
 * Dynamic physics entity that can move and collide with other entities.
 * Actors are typically used for players, enemies, projectiles, and other moving game objects.
 *
 * Features:
 * - Velocity-based movement with gravity
 * - Collision detection and response
 * - Solid surface detection (riding)
 * - Automatic culling when out of bounds
 *
 * @typeParam T - Application type, defaults to base Application
 *
 * @example
 * ```typescript
 * // Create a player actor
 * class Player extends Actor {
 *   constructor() {
 *     super({
 *       type: 'Player',
 *       position: [100, 100],
 *       size: [32, 64],
 *       view: playerSprite
 *     });
 *   }
 *
 *   // Handle collisions
 *   onCollide(result: CollisionResult) {
 *     if (result.solid.type === 'Spike') {
 *       this.die();
 *     }
 *   }
 *
 *   // Custom movement
 *   update(dt: number) {
 *     super.update(dt);
 *
 *     // Move left/right
 *     if (this.app.input.isKeyDown('ArrowLeft')) {
 *       this.velocity.x = -200;
 *     } else if (this.app.input.isKeyDown('ArrowRight')) {
 *       this.velocity.x = 200;
 *     }
 *
 *     // Jump when on ground
 *     if (this.app.input.isKeyPressed('Space') && this.isRidingSolid()) {
 *       this.velocity.y = -400;
 *     }
 *   }
 * }
 * ```
 */
export class Actor<T extends Application = Application> extends Entity<T> {
  /** Current velocity in pixels per second */
  public velocity: Vector2 = { x: 0, y: 0 };

  /** Whether the actor should be removed when culled (out of bounds) */
  public shouldRemoveOnCull: boolean = true;

  /** List of current frame collisions */
  public collisions: CollisionResult[] = [];

  /** Cache for isRidingSolid check */
  private _isRidingSolidCache: boolean | null = null;

  /**
   * Initialize or reinitialize the actor with new configuration.
   *
   * @param config - Configuration for the actor
   */
  public init(config: PhysicsEntityConfig): void {
    super.init(config);
    // Reset velocity
    this.velocity = { x: 0, y: 0 };
    this._isRidingSolidCache = null;
  }

  /**
   * Called at the start of each update to prepare for collision checks.
   */
  public preUpdate(): void {
    if (!this.active) return;

    this.collisions = [];
    // Reset the cache at the start of each update
    this._isRidingSolidCache = null;
  }

  /**
   * Updates the actor's position based on velocity and handles collisions.
   *
   * @param dt - Delta time in seconds
   */
  public update(dt: number): void {
    if (!this.active) return;

    // Ensure velocity is valid
    if (!this.isRidingSolid()) {
      this.velocity.y += this.system.gravity * dt;
    }

    // Clamp velocity
    this.velocity.x = Math.min(Math.max(this.velocity.x, -this.system.maxVelocity), this.system.maxVelocity);
    this.velocity.y = Math.min(Math.max(this.velocity.y, -this.system.maxVelocity), this.system.maxVelocity);

    // Move horizontally
    if (this.velocity.x !== 0) {
      this.moveX(this.velocity.x * dt);
    }

    // Move vertically
    if (this.velocity.y !== 0) {
      this.moveY(this.velocity.y * dt);
    }

    // Update view
    this.updateView();
  }

  /**
   * Called after update to handle post-movement effects.
   */
  public postUpdate(): void {
    if (!this.active) return;

    if (this.isRidingSolid()) {
      this.velocity.y = 0;
    }
  }

  /**
   * Resets the actor to its initial state.
   */
  public reset(): void {
    super.reset();

    this.group = null;
    this.updatePosition();

    this._x = -Number.MAX_SAFE_INTEGER;
    this._y = -Number.MAX_SAFE_INTEGER;

    if (this.view) {
      this.view.visible = false;
    }
  }

  /**
   * Called when the actor is culled (goes out of bounds).
   * Override this to handle culling differently.
   */
  public onCull(): void {
    // Default behavior: destroy the view
    this.view?.destroy();
  }

  /**
   * Called when the actor collides with a solid.
   * Override this to handle collisions.
   *
   * @param result - Information about the collision
   */
  public onCollide(result: CollisionResult): void {
    // Override in subclass
    void result;
  }

  /**
   * Checks if this actor is riding the given solid.
   * An actor is riding if it's directly above the solid.
   *
   * @param solid - The solid to check against
   * @returns True if riding the solid
   */
  public isRiding(solid: Solid): boolean {
    // Must be directly above the solid (within 1 pixel)
    const actorBottom = this.y + this.height;
    const onTop = Math.abs(actorBottom - solid.y) <= 1;

    // Must be horizontally overlapping
    const overlap = this.x + this.width > solid.x && this.x < solid.x + solid.width;

    return onTop && overlap;
  }

  /**
   * Checks if this actor is riding any solid in the physics system.
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
    const solids = this.getSolidsAt(this.x, this.y + 1);
    this._isRidingSolidCache = solids.some((solid) => this.isRiding(solid));
    return this._isRidingSolidCache;
  }

  /**
   * Called when the actor is squeezed between solids.
   * Override this to handle squishing differently.
   */
  public squish(): void {
    this.velocity.x = 0;
    this.velocity.y = 0;
  }

  /**
   * Moves the actor horizontally, checking for collisions with solids.
   *
   * @param amount - Distance to move in pixels
   * @param collisionHandler - Optional callback for handling collisions
   * @returns Array of collision results
   */
  public moveX(amount: number, collisionHandler?: (result: CollisionResult) => void): CollisionResult[] {
    if (!this.active) return [];

    this._xRemainder += amount;
    const move = Math.round(this._xRemainder);
    const collisions: CollisionResult[] = [];

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
            const result: CollisionResult = {
              collided: true,
              normal: { x: -sign, y: 0 },
              penetration: Math.abs(nextX - (solid.x + (sign > 0 ? 0 : solid.width))),
              solid,
            };
            collisions.push(result);
            this.onCollide(result);
            if (collisionHandler) {
              collisionHandler(result);
            }
            break;
          }
        }

        if (!collided) {
          this._x = nextX;
          remaining--;
          this.updateView();
        } else {
          break;
        }
      }
    }

    return collisions;
  }

  /**
   * Moves the actor vertically, checking for collisions with solids.
   *
   * @param amount - Distance to move in pixels
   * @param collisionHandler - Optional callback for handling collisions
   * @returns Array of collision results
   */
  public moveY(amount: number, collisionHandler?: (result: CollisionResult) => void): CollisionResult[] {
    if (!this.active) return [];

    this._yRemainder += amount;
    const move = Math.round(this._yRemainder);
    const collisions: CollisionResult[] = [];

    if (move !== 0) {
      this._yRemainder -= move;
      const sign = Math.sign(move);

      let remaining = Math.abs(move);
      while (remaining > 0) {
        const step = sign;
        const nextY = this.y + step;

        // Check for collision with any solid
        let collided = false;
        for (const solid of this.getSolidsAt(this.x, nextY)) {
          if (solid.collidable) {
            collided = true;
            const result: CollisionResult = {
              collided: true,
              normal: { x: 0, y: -sign },
              penetration: Math.abs(nextY - (solid.y + (sign > 0 ? 0 : solid.height))),
              solid,
            };
            collisions.push(result);
            this.onCollide(result);
            if (collisionHandler) {
              collisionHandler(result);
            }
            break;
          }
        }

        if (!collided) {
          this._y = nextY;
          remaining--;
          this.updateView();
        } else {
          break;
        }
      }
    }

    return collisions;
  }

  /**
   * Updates the actor's view position.
   */
  public updateView(): void {
    if (this.view && this.view.visible) {
      this.view.x = this._x;
      this.view.y = this._y;
    }
  }

  /**
   * Gets all solids at the specified position that could collide with this actor.
   *
   * @param _x - X position to check
   * @param _y - Y position to check
   * @returns Array of solids at the position
   */
  protected getSolidsAt(_x: number, _y: number): Solid[] {
    return this.system.getSolidsAt(_x, _y, this);
  }
}
