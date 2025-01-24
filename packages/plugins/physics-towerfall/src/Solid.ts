import { Application } from 'dill-pixel';
import { Container } from 'pixi.js';
import { CollisionShape, PhysicsBodyConfig, PhysicsObject, PhysicsObjectView } from './types';

export class Solid extends PhysicsObject<Application> {
  public view?: Container;
  public shape: CollisionShape;
  public radius?: number;
  public width: number;
  public height: number;
  public restitution: number = 0;

  private _moving = false;
  public lastX: number;
  public lastY: number;

  set moving(value: boolean) {
    this._moving = value;
    if (this._moving) {
      this.system.addMovingSolid(this);
    } else {
      this.system.removeMovingSolid(this);
    }
  }

  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }

  set x(value: number) {
    if (this._x !== value) {
      this.lastX = this._x;
      this.updatePosition({ x: value, y: this._y });
    }
    this._x = value;
  }

  set y(value: number) {
    if (this._y !== value) {
      this.lastY = this._y;
      this.updatePosition({ x: this._x, y: value });
    }
    this._y = value;
  }

  constructor(
    protected _x: number,
    protected _y: number,
    bodyConfig: PhysicsBodyConfig,
    view?: PhysicsObjectView,
  ) {
    super();
    this.lastX = _x;
    this.lastY = _y;
    this.shape = bodyConfig.shape;
    this.restitution = bodyConfig.restitution ?? 0;

    if (this.shape === 'circle') {
      if (!bodyConfig.radius) throw new Error('Radius is required for circular bodies');
      this.radius = bodyConfig.radius;
      this.width = this.height = this.radius * 2;
    } else {
      if (!bodyConfig.width || !bodyConfig.height)
        throw new Error('Width and height are required for rectangular bodies');
      this.width = bodyConfig.width;
      this.height = bodyConfig.height;
    }

    if (view) {
      this.setView(view);
    }
  }

  public updatePosition(newPosition: { x: number; y: number }): void {
    this.system.updateSolidPosition(this, newPosition);
  }
}
