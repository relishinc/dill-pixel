import { Application } from 'dill-pixel';
import { Container, ViewContainer } from 'pixi.js';
import { System } from './System';
import TowerfallPhysicsPlugin from './TowerfallPhysicsPlugin';
export interface Vector2 {
  x: number;
  y: number;
}

export interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Circle {
  x: number;
  y: number;
  radius: number;
}

export type CollisionShape = 'rectangle' | 'circle';

export interface PhysicsBodyConfig {
  shape: CollisionShape;
  width?: number;
  height?: number;
  radius?: number;
  restitution?: number;
}

export type PhysicsObjectView = Container | ViewContainer;

export class PhysicsObject<A extends Application = Application> {
  protected _x: number;
  protected _y: number;
  get x(): number {
    return this._x;
  }
  get y(): number {
    return this._y;
  }
  set x(value: number) {
    this._x = value;
  }
  set y(value: number) {
    this._y = value;
  }

  shape: CollisionShape;
  width: number;
  height: number;
  radius?: number;
  view?: PhysicsObjectView;

  get app(): A {
    return Application.getInstance() as A;
  }

  get physics(): TowerfallPhysicsPlugin {
    return this.app.getPlugin('towerfall-physics') as TowerfallPhysicsPlugin;
  }

  get system(): System {
    return this.physics.system;
  }

  public setView(view: PhysicsObjectView): void {
    this.view = view;
    this.updateView();
  }

  updateView(): void {
    if (this.view) {
      this.view.position.set(this.x, this.y);
    }
  }

  public getBounds(): Rectangle {
    if (this.shape === 'circle') {
      return {
        x: this.x - this.radius!,
        y: this.y - this.radius!,
        width: this.radius! * 2,
        height: this.radius! * 2,
      };
    }
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    };
  }

  public getCircle(): Circle {
    if (this.shape === 'circle') {
      return {
        x: this.x,
        y: this.y,
        radius: this.radius!,
      };
    }
    // For rectangular bodies, return a circle that encompasses the rectangle
    return {
      x: this.x + this.width / 2,
      y: this.y + this.height / 2,
      radius: Math.sqrt((this.width * this.width + this.height * this.height) / 4),
    };
  }
}
