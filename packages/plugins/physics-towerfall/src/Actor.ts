import { Solid } from './Solid';
import { PhysicsBodyConfig, PhysicsObject, PhysicsObjectView, Vector2 } from './types';

export class Actor extends PhysicsObject {
  public velocity: Vector2 = { x: 0, y: 0 };
  public restitution: number;
  private xRemainder: number = 0;
  private yRemainder: number = 0;

  public onCollideX?: (direction: number, normal?: Vector2, penetration?: number) => void;
  public onCollideY?: (direction: number, normal?: Vector2, penetration?: number) => void;

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
    this.restitution = bodyConfig.restitution ?? 0;
    this.updateView();
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
    this.xRemainder += amount;
    const move = Math.round(this.xRemainder);

    if (move !== 0) {
      this.xRemainder -= move;
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
        } else {
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
    this.yRemainder += amount;
    const move = Math.round(this.yRemainder);

    if (move !== 0) {
      this.yRemainder -= move;
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
            break;
          }
        }

        if (!collided) {
          this._y = nextY;
          remaining--;
          this.updateView();
        } else {
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
