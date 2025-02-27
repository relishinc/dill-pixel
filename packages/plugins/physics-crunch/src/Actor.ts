import { Application } from 'dill-pixel';
import { Entity } from './Entity';
import { Solid } from './Solid';
import {
  ActorCollisionResult,
  CollisionResult,
  EntityData,
  PhysicsEntityConfig,
  PhysicsEntityType,
  Vector2,
} from './types';

/**
 * Dynamic physics entity that can move and collide with other entities.
 * Actors are typically used for players, enemies, projectiles, and other moving game objects.
 *
 * Features:
 * - Velocity-based movement with gravity
 * - Collision detection and response
 * - Solid surface detection (riding)
 * - Automatic culling when out of bounds
 * - Actor-to-actor collision detection
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
 *   // Handle actor-to-actor collisions
 *   onActorCollide(result: ActorCollisionResult) {
 *     if (result.actor.type === 'Enemy') {
 *       this.takeDamage(10);
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
export class Actor<T extends Application = Application, D extends EntityData = EntityData> extends Entity<T, D> {
  public readonly entityType: PhysicsEntityType = 'Actor';

  /** Current velocity in pixels per second */
  public velocity: Vector2 = { x: 0, y: 0 };

  /** Whether the actor should be removed when culled (out of bounds) */
  public shouldRemoveOnCull: boolean = true;

  /** List of current frame collisions */
  public collisions: CollisionResult[] = [];

  /** List of current frame actor-to-actor collisions */
  public actorCollisions: ActorCollisionResult[] = [];

  /** Cache for isRidingSolid check */
  private _isRidingSolidCache: boolean | null = null;

  /** Tracks which solid is currently carrying this actor in the current frame */
  private _carriedBy: Solid | null = null;
  private _carriedByOverlap: number = 0;

  /**
   * Initialize or reinitialize the actor with new configuration.
   *
   * @param config - Configuration for the actor
   */
  public init(config: PhysicsEntityConfig): void {
    super.init(config);
    // Reset velocity and carried state
    this.velocity = { x: 0, y: 0 };
    this._isRidingSolidCache = null;
    this._carriedBy = null;
    this._carriedByOverlap = 0;
    this.actorCollisions = [];
  }

  /**
   * Called at the start of each update to prepare for collision checks.
   */
  public preUpdate(): void {
    if (!this.active) return;

    this.collisions = [];
    this.actorCollisions = [];
    // Reset the cache at the start of each update
    this._isRidingSolidCache = null;
    this._carriedBy = null;
    this._carriedByOverlap = 0;
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

    this._isRidingSolidCache = null;
    this._carriedBy = null;
    this._carriedByOverlap = 0;
    this.velocity = { x: 0, y: 0 };

    this.updatePosition();
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
   * Called when this actor collides with a solid.
   * Override this method to implement custom collision response.
   *
   * @param result - Information about the collision
   */
  public onCollide(result: CollisionResult): void {
    // Default implementation does nothing
    // Override this in your actor subclass to handle collisions
    void result;
  }

  /**
   * Called when this actor collides with another actor.
   * Override this method to implement custom actor-to-actor collision response.
   *
   * @param result - Information about the actor collision
   */
  public onActorCollide(result: ActorCollisionResult): void {
    // Default implementation does nothing
    // Override this in your actor subclass to handle actor-to-actor collisions
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
    // Skip if solid has no collisions
    if (!solid.collideable) return false;

    // Check collision layers and masks
    // An actor can only ride a solid if their collision layers/masks allow interaction
    if ((this.collisionLayer & solid.collisionMask) === 0 || (solid.collisionLayer & this.collisionMask) === 0) {
      return false;
    }

    // If we're already being carried by a different solid this frame,
    // we can't be riding this one
    if (this._carriedBy && this._carriedBy !== solid) {
      return false;
    }

    // Must be directly above the solid (within 1 pixel)
    const actorBottom = this.y + this.height;
    const onTop = Math.abs(actorBottom - solid.y) <= 1;

    // Must be horizontally overlapping
    const overlap = this.x + this.width > solid.x && this.x < solid.x + solid.width;
    const overlapWidth = Math.min(this.x + this.width, solid.x + solid.width) - Math.max(this.x, solid.x);

    const isRiding = onTop && overlap;

    if (isRiding && overlapWidth > this._carriedByOverlap) {
      this._carriedBy = solid;
      this._carriedByOverlap = overlapWidth;
    }
    return isRiding;
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
  public squish(result: CollisionResult): void {
    void result;
    // do something
  }

  /**
   * Moves the actor horizontally, checking for collisions with solids.
   *
   * @param amount - Distance to move in pixels
   * @param collisionHandler - Optional callback for handling collisions
   * @returns Array of collision results
   */
  public moveX(
    amount: number,
    collisionHandler?: (result: CollisionResult) => void,
    pushingSolid?: Solid,
  ): CollisionResult[] {
    // Early return if inactive or zero movement
    if (!this.active || amount === 0) return [];

    this._xRemainder += amount;
    const move = Math.round(this._xRemainder);

    // Early return if rounded movement is zero
    if (move === 0) return [];

    const collisions: CollisionResult[] = [];

    // Cache collision layer and mask for faster access
    const actorLayer = this.collisionLayer;
    const actorMask = this.collisionMask;

    // Skip collision checks if no collision mask
    if (actorMask === 0) {
      // Just move without checking collisions
      this._xRemainder -= move;
      this._x += move;
      this.updateView();
      return [];
    }

    this._xRemainder -= move;
    const sign = Math.sign(move);
    let remaining = Math.abs(move);
    const step = sign;

    // If we're being pushed by a solid, temporarily make it non-collidable
    if (pushingSolid) {
      pushingSolid.collideable = false;
    }

    // Move one pixel at a time, checking for collisions
    while (remaining > 0) {
      const nextX = this._x + step;

      // Get solids at the next position
      const solids = this.getSolidsAt(nextX, this._y);
      let collided = false;

      // Check for collisions with each solid
      for (const solid of solids) {
        // Skip if solid can't collide
        if (!solid.canCollide) continue;

        // Skip if collision layers don't match
        if ((actorLayer & solid.collisionMask) === 0 || (solid.collisionLayer & actorMask) === 0) {
          continue;
        }

        // Calculate collision details
        const result: CollisionResult = {
          collided: true,
          solid,
          normal: { x: -sign, y: 0 },
          penetration: step > 0 ? this.x + this.width - solid.x : solid.x + solid.width - this.x,
          pushingSolid,
        };

        // Add to collisions array
        collisions.push(result);

        // Call collision handler if provided
        if (collisionHandler) {
          collisionHandler(result);
        }

        // Call actor's collision handler
        this.onCollide(result);

        collided = true;
      }

      if (collided) {
        // Stop movement on collision
        break;
      } else {
        // Move to next position
        this._x = nextX;
        remaining--;

        // Update view every few pixels for better performance
        // This reduces the number of view updates during movement
        if (remaining % 4 === 0 || remaining === 0) {
          this.updateView();
        }
      }
    }

    // Restore solid's collidable state
    if (pushingSolid) {
      pushingSolid.collideable = true;
    }

    // Final view update if we moved
    if (Math.abs(move) - remaining > 0) {
      this.updateView();
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
  public moveY(
    amount: number,
    collisionHandler?: (result: CollisionResult) => void,
    pushingSolid?: Solid,
  ): CollisionResult[] {
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
        const solidsAtPosition = this.getSolidsAt(this.x, nextY);

        // Debug log for collision detection

        for (const solid of solidsAtPosition) {
          // Check if the solid can collide with this actor based on collision layers/masks
          if (
            solid.canCollide &&
            (this.collisionLayer & solid.collisionMask) !== 0 &&
            (solid.collisionLayer & this.collisionMask) !== 0
          ) {
            collided = true;
            const result: CollisionResult = {
              collided: true,
              normal: { x: 0, y: -sign },
              penetration: Math.abs(nextY - (solid.y + (sign > 0 ? 0 : solid.height))),
              solid,
              pushingSolid,
            };
            collisions.push(result);
            this.collisions.push(result);
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

  /**
   * Checks if this actor is colliding with another actor.
   *
   * @param actor - The actor to check collision with
   * @returns Collision result with information about the collision
   */
  public checkActorCollision(actor: Actor): ActorCollisionResult {
    // Skip if either actor is not active
    if (!this.active || !actor.active) {
      return { collided: false, actor };
    }

    // Skip if the actors can't collide based on collision layers
    if ((this.collisionLayer & actor.collisionMask) === 0 || (actor.collisionLayer & this.collisionMask) === 0) {
      return { collided: false, actor };
    }

    // Simple AABB collision check
    const thisLeft = this.x;
    const thisRight = this.x + this.width;
    const thisTop = this.y;
    const thisBottom = this.y + this.height;

    const otherLeft = actor.x;
    const otherRight = actor.x + actor.width;
    const otherTop = actor.y;
    const otherBottom = actor.y + actor.height;

    // Check if the bounding boxes overlap
    if (thisRight > otherLeft && thisLeft < otherRight && thisBottom > otherTop && thisTop < otherBottom) {
      // Calculate penetration and normal
      const overlapX = Math.min(thisRight - otherLeft, otherRight - thisLeft);
      const overlapY = Math.min(thisBottom - otherTop, otherBottom - thisTop);

      let normal: Vector2;
      let penetration: number;

      // Determine the collision normal based on the smallest overlap
      if (overlapX < overlapY) {
        penetration = overlapX;
        normal = {
          x: thisLeft < otherLeft ? -1 : 1,
          y: 0,
        };
      } else {
        penetration = overlapY;
        normal = {
          x: 0,
          y: thisTop < otherTop ? -1 : 1,
        };
      }

      return {
        collided: true,
        actor,
        normal,
        penetration,
      };
    }

    return { collided: false, actor };
  }

  /**
   * Resolves a collision with another actor.
   *
   * @param result - The collision result to resolve
   * @param shouldMove - Whether this actor should move to resolve the collision
   * @returns The updated collision result
   */
  public resolveActorCollision(result: ActorCollisionResult, shouldMove: boolean = true): ActorCollisionResult {
    if (!result.collided || !result.normal || !result.penetration) {
      return result;
    }

    // Call the collision handler
    this.onActorCollide(result);

    // Move this actor to resolve the collision if requested
    if (shouldMove) {
      this.x += result.normal.x * result.penetration * 0.5;
      this.y += result.normal.y * result.penetration * 0.5;
    }

    return result;
  }
}
