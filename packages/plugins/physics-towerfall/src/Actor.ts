import { Application } from 'dill-pixel';
import { Entity } from './Entity';
import { Solid } from './Solid';
import { CollisionResult, PhysicsEntityConfig, Vector2 } from './types';

export class Actor<T extends Application = Application> extends Entity<T> {
  public velocity: Vector2 = { x: 0, y: 0 };
  public shouldRemoveOnCull: boolean = true;
  public collisions: CollisionResult[] = [];
  private _isRidingSolidCache: boolean | null = null;

  public init(config: PhysicsEntityConfig): void {
    super.init(config);
    // Reset velocity
    this.velocity = { x: 0, y: 0 };
    this._isRidingSolidCache = null;
  }
  public preUpdate(): void {
    if (!this.active) return;

    this.collisions = [];
    // Reset the cache at the start of each update
    this._isRidingSolidCache = null;
  }

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

  public postUpdate(): void {
    if (!this.active) return;

    if (this.isRidingSolid()) {
      this.velocity.y = 0;
    }
  }

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
   * Called when the actor is culled (goes out of bounds)
   * Override this to handle culling differently (e.g., hide instead of destroy)
   */
  public onCull(): void {
    // Default behavior: destroy the view
    this.view?.destroy();
  }

  /**
   * Called when the actor collides with anything
   * @param result The collision result containing information about the collision
   */
  public onCollide(result: CollisionResult): void {
    // Override in subclass
    void result;
  }

  /**
   * Check if this actor is riding the given solid
   * By default, an actor is riding if it's directly above the solid
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
   * Check if this actor is riding any solid in the physics system
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
   * Called when the actor is squeezed between solids
   * By default, just stops movement
   */
  public squish(): void {
    this.velocity.x = 0;
    this.velocity.y = 0;
  }

  /**
   * Move the actor horizontally, checking for collisions with solids
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
   * Move the actor vertically, checking for collisions with solids
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

  public updateView(): void {
    if (this.view && this.view.visible) {
      this.view.x = this._x;
      this.view.y = this._y;
    }
  }

  // This would be implemented by the physics system to provide the solids at a given position
  protected getSolidsAt(_x: number, _y: number): Solid[] {
    return this.system.getSolidsAt(_x, _y, this);
  }
}
