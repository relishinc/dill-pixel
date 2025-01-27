import { Application } from 'dill-pixel';
import { Entity } from './Entity';
import { Solid } from './Solid';
import { CollisionResult, PhysicsEntityConfig, Vector2 } from './types';
import { resolveEntityPosition, resolveEntitySize } from './utils';

export class Actor<T extends Application = Application> extends Entity<T> {
  public type = 'Actor';
  public velocity: Vector2 = { x: 0, y: 0 };
  public shouldRemoveOnCull: boolean = true;

  public init(config: PhysicsEntityConfig): void {
    if (config) {
      if (config.position !== undefined || (config.x !== undefined && config.y !== undefined)) {
        const { x, y } = resolveEntityPosition(config);
        this._x = Math.round(x);
        this._y = Math.round(y);
      }

      if (config.size !== undefined || (config.width !== undefined && config.height !== undefined)) {
        const { width, height } = resolveEntitySize(config);
        this.width = Math.round(width);
        this.height = Math.round(height);
      }
    }

    if (config?.view) {
      this.view = config.view;
    }
    if (this.view) {
      this.view.visible = true;
      this.updateView();
    }
  }

  public reset(): void {
    super.reset();

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
    const solids = this.getSolidsAt(this.x, this.y + 1);
    return solids.some((solid) => this.isRiding(solid));
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
            if (collisionHandler) {
              collisionHandler(result);
            }
            this.onCollide(result);
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
            if (collisionHandler) {
              collisionHandler(result);
            }
            this.onCollide(result);
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
    if (this.view) {
      this.view.x = this._x;
      this.view.y = this._y;
    }
  }

  // This would be implemented by the physics system to provide the solids at a given position
  protected getSolidsAt(_x: number, _y: number): Solid[] {
    return this.system.getSolidsAt(_x, _y, this);
  }
}
