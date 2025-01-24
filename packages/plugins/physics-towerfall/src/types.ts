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

export type CollisionShape = 'rectangle';

export interface PhysicsBodyConfig {
  width?: number;
  height?: number;
  radius?: number;
  restitution?: number;
}

export type PhysicsObjectView = Container | ViewContainer;
export type PhysicsObjectType = 'actor' | 'solid' | (string & {});
export class PhysicsObject<A extends Application = Application> {
  protected _x: number;
  protected _y: number;

  get x(): number {
    return Math.round(this._x);
  }
  set x(value: number) {
    this._x = value;
  }

  get y(): number {
    return Math.round(this._y);
  }

  set y(value: number) {
    this._y = value;
  }

  width: number;
  height: number;
  view: PhysicsObjectView;
  restitution: number;

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

  public updateView(): void {
    if (this.view) {
      this.view.position.set(this.x, this.y);
    }
  }

  public getBounds(): Rectangle {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    };
  }
}
