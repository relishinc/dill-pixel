import { Application } from 'dill-pixel';
import { Entity } from './Entity';
import { Solid } from './Solid';
import { CollisionResult, PhysicsBodyConfig, PhysicsObjectView, Vector2 } from './types';

export class Actor<T extends Application = Application> extends Entity<T> {
  public velocity: Vector2 = { x: 0, y: 0 };

  constructor(
    x: number,
    y: number,
    bodyConfig: PhysicsBodyConfig,
    public view: PhysicsObjectView,
  ) {
    super();

    if (!bodyConfig.width || !bodyConfig.height) {
      throw new Error('Width and height are required for bodies');
    }

    this._x = Math.round(x);
    this._y = Math.round(y);
    this.width = Math.round(bodyConfig.width);
    this.height = Math.round(bodyConfig.height);
    this.updateView();

    this.initialize();
  }

  protected initialize() {
    // Override in subclass
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
  public moveX(amount: number, onCollide?: () => void): void {
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
        let collision: CollisionResult | null = null;
        for (const solid of this.getSolidsAt(nextX, this.y)) {
          if (solid.collidable) {
            collided = true;
            collision = {
              collided: true,
              normal: { x: -sign, y: 0 },
              penetration: Math.abs(nextX - (solid.x + (sign > 0 ? 0 : solid.width))),
            };
            break;
          }
        }

        if (!collided) {
          this._x = nextX;
          remaining--;
          this.updateView();
        } else {
          if (collision) {
            this.onCollide(collision);
          }
          if (onCollide) onCollide();
          break;
        }
      }
    }
  }

  /**
   * Move the actor vertically, checking for collisions with solids
   */
  public moveY(amount: number, onCollide?: () => void): void {
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
        let collision: CollisionResult | null = null;
        for (const solid of this.getSolidsAt(this.x, nextY)) {
          if (solid.collidable) {
            collided = true;
            collision = {
              collided: true,
              normal: { x: 0, y: -sign },
              penetration: Math.abs(nextY - (solid.y + (sign > 0 ? 0 : solid.height))),
            };
            break;
          }
        }

        if (!collided) {
          this._y = nextY;
          remaining--;
          this.updateView();
        } else {
          if (collision) {
            this.onCollide(collision);
          }
          if (onCollide) onCollide();
          break;
        }
      }
    }
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
