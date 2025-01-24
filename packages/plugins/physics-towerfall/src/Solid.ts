import { Actor } from './Actor';
import { PhysicsBodyConfig, PhysicsObject, PhysicsObjectView } from './types';

export class Solid extends PhysicsObject {
  public collidable: boolean = true;
  public moving: boolean = false;

  private _xRemainder: number = 0;
  private _yRemainder: number = 0;

  private _nextX: number;
  private _nextY: number;

  public set x(value: number) {
    this._nextX = Math.round(value);
    this.moving = true;
  }

  public set y(value: number) {
    this._nextY = Math.round(value);
    this.moving = true;
  }

  public get x(): number {
    return this._x;
  }

  public get y(): number {
    return this._y;
  }

  constructor(x: number, y: number, bodyConfig: PhysicsBodyConfig, view?: PhysicsObjectView) {
    super();

    if (!bodyConfig.width || !bodyConfig.height) {
      throw new Error('Width and height are required for bodies');
    }

    this._x = Math.round(x);
    this._y = Math.round(y);
    this._nextX = this._x;
    this._nextY = this._y;
    this.width = Math.round(bodyConfig.width);
    this.height = Math.round(bodyConfig.height);
    this.restitution = bodyConfig.restitution ?? 0;

    if (view) {
      this.view = view;
      this.updateView();
    }
  }

  public get right(): number {
    return this.x + this.width;
  }

  public get left(): number {
    return this.x;
  }

  public get top(): number {
    return this.y;
  }

  public get bottom(): number {
    return this.y + this.height;
  }

  public move(x: number, y: number, actors: Set<Actor>): void {
    // Calculate total movement including remainder
    const totalX = x + (this._nextX - this._x);
    const totalY = y + (this._nextY - this._y);

    this._xRemainder += totalX;
    this._yRemainder += totalY;

    const moveX = Math.round(this._xRemainder);
    const moveY = Math.round(this._yRemainder);

    if (moveX !== 0 || moveY !== 0) {
      // Get all riding actors before movement
      const riding = new Set<Actor>();
      for (const actor of actors) {
        if (actor.isRiding(this)) {
          riding.add(actor);
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
            } else if (riding.has(actor)) {
              // Carry right
              actor.moveX(moveX);
            }
          }
        } else {
          // Moving left
          for (const actor of actors) {
            if (this.overlaps(actor)) {
              // Push left
              actor.moveX(this.left - (actor.x + actor.width), () => actor.squish());
            } else if (riding.has(actor)) {
              // Carry left
              actor.moveX(moveX);
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
              actor.moveY(this.bottom - actor.y, () => actor.squish());
            } else if (riding.has(actor)) {
              // Carry down
              actor.moveY(moveY);
            }
          }
        } else {
          // Moving up
          for (const actor of actors) {
            if (this.overlaps(actor)) {
              // Push up
              actor.moveY(this.top - (actor.y + actor.height), () => actor.squish());
            } else if (riding.has(actor)) {
              // Carry up
              actor.moveY(moveY);
            }
          }
        }
      }

      // Re-enable collisions
      this.collidable = true;
      this.moving = false;

      // Update next positions to match current
      this._nextX = this._x;
      this._nextY = this._y;

      // Update the view position
      this.updateView();
    }
  }

  public updateView(): void {
    if (this.view) {
      this.view.x = this._x;
      this.view.y = this._y;
    }
  }

  private overlaps(actor: Actor): boolean {
    return (
      this.x < actor.x + actor.width &&
      this.x + this.width > actor.x &&
      this.y < actor.y + actor.height &&
      this.y + this.height > actor.y
    );
  }
}
