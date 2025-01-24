import { Application, bindAllMethods } from 'dill-pixel';
import { System } from './System';
import TowerfallPhysicsPlugin from './TowerfallPhysicsPlugin';
import { PhysicsObjectView, Rectangle } from './types';

export class Entity<A extends Application = Application> {
  protected _xRemainder: number = 0;
  protected _yRemainder: number = 0;
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

  get app(): A {
    return Application.getInstance() as A;
  }

  get physics(): TowerfallPhysicsPlugin {
    return this.app.getPlugin('towerfall-physics') as TowerfallPhysicsPlugin;
  }

  constructor() {
    bindAllMethods(this);
  }

  protected initialize() {
    // Override in subclass
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
