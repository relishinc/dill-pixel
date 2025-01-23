import { Application, Container } from 'dill-pixel';
import {
  Bounds,
  Circle,
  ObservablePoint,
  Container as PIXIContianer,
  Point,
  PointData,
  Rectangle,
  Sprite,
} from 'pixi.js';
import { ICollider } from './ICollider';
import { System } from './System';
import { EntityType, SnapBoundary } from './types';

export class Entity<T = any, A extends Application = Application> extends Container<A> implements ICollider {
  view: PIXIContianer;
  isActor: boolean = false;
  isSolid: boolean = false;
  isSensor: boolean = false;
  debug: boolean = false;
  debugColors = {
    bounds: 0xff0000,
    outerBounds: 0x00ff00,
  };
  type: EntityType = 'Solid';
  isCircle: boolean = false;
  isCollideable: boolean = true;
  xRemainder: number = 0;
  yRemainder: number = 0;
  config: T;

  protected subpixelX: number = 0;
  protected subpixelY: number = 0;
  protected remainder: Point = new Point(0, 0);

  constructor(config?: Partial<T>) {
    super({ autoUpdate: true });
    this.config = config as T;
  }

  protected _cachedBounds: SnapBoundary | null = null;

  get cachedBounds(): SnapBoundary {
    if (!this._cachedBounds || this._dirtyBounds) {
      const bounds = this.view.getBounds();
      bounds.scale(1 / this.system.container.worldTransform.d);
      if (this.isCircle) {
        bounds.width = bounds.height = Math.max(bounds.width, bounds.height);
        this._cachedBounds = new Circle(
          bounds.x + bounds.width * 0.5,
          bounds.y * bounds.width * 0.5,
          bounds.width * 0.5,
        );
      } else {
        this._cachedBounds = bounds;
      }
    }
    return this._cachedBounds ?? (this.isCircle ? new Circle() : new Rectangle());
  }

  set cachedBounds(value: Bounds) {
    this._cachedBounds = value;
  }

  get position(): ObservablePoint {
    return super.position;
  }

  set position(value: PointData) {
    value.x = Math.round(value.x);
    value.y = Math.round(value.y);
    super.position = value;
  }

  get x(): number {
    return super.x;
  }

  set x(value: number) {
    super.x = Math.round(value);
  }

  get y(): number {
    return super.y;
  }

  set y(value: number) {
    super.y = Math.round(value);
  }

  protected _dirtyBounds: boolean = true;

  get dirtyBounds() {
    return this._dirtyBounds;
  }

  set dirtyBounds(value: boolean) {
    this._dirtyBounds = value;
  }

  get boundingRect(): Rectangle {
    const bb = this.getBoundingBox();
    if (this.isCircle) {
      return bb.getBounds();
    }
    return bb as Rectangle;
  }

  get top(): number {
    return this.boundingRect.top;
  }

  get bottom(): number {
    return this.boundingRect.bottom;
  }

  get left(): number {
    return this.boundingRect.left;
  }

  get right(): number {
    return this.boundingRect.right;
  }

  get system(): typeof System {
    return System;
  }

  getCollideables<T extends Entity = Entity>(dx: number = 0, dy: number = 0): Set<T> {
    void dx;
    void dy;
    return new Set<T>();
  }

  preFixedUpdate() {}

  fixedUpdate(deltaTime?: number) {
    void deltaTime;
  }

  postFixedUpdate() {}

  getWorldBounds(): SnapBoundary {
    const pos = this.system.container.toLocal(this.view.getGlobalPosition());
    const bounds = this.cachedBounds;
    bounds.x = pos.x;
    bounds.y = pos.y;

    if (this.view instanceof Sprite && this.view.anchor) {
      if (!this.isCircle) {
        bounds.x -= this.view.width * this.view.anchor.x;
        bounds.y -= this.view.height * this.view.anchor.y;
      }
    }
    return bounds;
  }

  getBoundingBox(): Rectangle | Circle {
    const bounds = this.getWorldBounds();
    return bounds instanceof Bounds ? bounds.rectangle : bounds;
  }

  getOuterBoundingBox(): Rectangle | Circle | null {
    return null;
  }

  moveX(amount: number): void {
    this.remainder.x += amount;
    const move = Math.round(this.remainder.x);
    if (move !== 0) {
      this.remainder.x -= move;
      this.x += move;
    }
  }

  moveY(amount: number): void {
    this.remainder.y += amount;
    const move = Math.round(this.remainder.y);
    if (move !== 0) {
      this.remainder.y -= move;
      this.y += move;
    }
  }

  // Improved collision detection with subpixel precision
  collidesWith(entity: Entity, dx: number = 0, dy: number = 0): boolean {
    if (!entity) {
      return false;
    }

    // Add subpixel remainders to the collision check
    const totalDx = dx + this.remainder.x;
    const totalDy = dy + this.remainder.y;

    if (this.isCircle) {
      if (entity.isCircle) {
        return System.getCircleToCircleIntersection(entity, this, totalDx, totalDy);
      } else {
        return System.getRectToCircletIntersection(entity, this, totalDx, totalDy);
      }
    }
    if (entity.isCircle) {
      return System.getRectToCircletIntersection(this, entity, totalDx, totalDy);
    }
    return System.getRectangleIntersection(entity, this, totalDx, totalDy);
  }

  protected initialize() {
    // noop
  }
}
