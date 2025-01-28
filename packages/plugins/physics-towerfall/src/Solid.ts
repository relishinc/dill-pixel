import { Application } from 'dill-pixel';
import { Actor } from './Actor';
import { Entity } from './Entity';
import { Sensor } from './Sensor';
import { PhysicsEntityConfig } from './types';

export class Solid<T extends Application = Application> extends Entity<T> {
  public shouldRemoveOnCull = false;
  public collidable: boolean = true;
  public moving: boolean = false;

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

  public init(config: PhysicsEntityConfig): void {
    super.init(config);
    if (config) {
      this._nextX = this._x;
      this._nextY = this._y;
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

  public move(
    x: number,
    y: number,
    actors: Set<Actor> = this.system.actors,
    sensors: Set<Sensor> = this.system.sensors,
  ): void {
    // Calculate total movement including remainder
    const totalX = x + (this._nextX - this._x);
    const totalY = y + (this._nextY - this._y);

    this._xRemainder += totalX;
    this._yRemainder += totalY;

    const moveX = Math.round(this._xRemainder);
    const moveY = Math.round(this._yRemainder);

    if (moveX !== 0 || moveY !== 0) {
      // Get all riding actors and sensors before movement
      const ridingActors = new Set<Actor>();
      const ridingSensors = new Set<Sensor>();

      for (const actor of actors) {
        if (actor.isRiding(this)) {
          ridingActors.add(actor);
        }
      }

      for (const sensor of sensors) {
        if (sensor.isRiding(this)) {
          ridingSensors.add(sensor);
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
            } else if (ridingActors.has(actor)) {
              // Carry right
              actor.moveX(moveX);
            }
          }
          for (const sensor of sensors) {
            if (this.overlaps(sensor)) {
              // Push right
              sensor.moveX(this.right - sensor.x);
            } else if (ridingSensors.has(sensor)) {
              // Carry right
              sensor.moveX(moveX);
            }
          }
        } else {
          // Moving left
          for (const actor of actors) {
            if (this.overlaps(actor)) {
              // Push left
              actor.moveX(this.left - (actor.x + actor.width), () => actor.squish());
            } else if (ridingActors.has(actor)) {
              // Carry left
              actor.moveX(moveX);
            }
          }
          for (const sensor of sensors) {
            if (this.overlaps(sensor)) {
              // Push left
              sensor.moveX(this.left - (sensor.x + sensor.width));
            } else if (ridingSensors.has(sensor)) {
              // Carry left
              sensor.moveX(moveX);
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
              actor.moveY(this.bottom - actor.y, actor.squish);
            } else if (ridingActors.has(actor)) {
              // Carry down
              actor.moveY(moveY);
            }
          }
          for (const sensor of sensors) {
            if (this.overlaps(sensor)) {
              // Push down
              sensor.moveY(this.bottom - sensor.y);
            } else if (ridingSensors.has(sensor)) {
              // Carry down
              sensor.moveY(moveY);
            }
          }
        } else {
          // Moving up
          for (const actor of actors) {
            if (this.overlaps(actor)) {
              // Push up
              actor.moveY(this.top - (actor.y + actor.height), actor.squish);
            } else if (ridingActors.has(actor)) {
              // Carry up
              actor.moveY(moveY);
            }
          }
          for (const sensor of sensors) {
            if (this.overlaps(sensor)) {
              // Push up
              sensor.moveY(this.top - (sensor.y + sensor.height));
            } else if (ridingSensors.has(sensor)) {
              // Carry up
              sensor.moveY(moveY);
            }
          }
        }
      }

      // Re-enable collisions
      this.collidable = true;

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

  private overlaps(entity: Actor | Sensor): boolean {
    return (
      this.x < entity.x + entity.width &&
      this.x + this.width > entity.x &&
      this.y < entity.y + entity.height &&
      this.y + this.height > entity.y
    );
  }
}
