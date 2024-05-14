import { Bounds, Rectangle, Sprite } from 'pixi.js';
import { Application } from '../../../core/Application';
import { Container } from '../../../display/Container';
import { PIXIContainer } from '../../../pixi';
import { ICollider } from './ICollider';
import { System } from './System';
import { EntityType } from './types';

export class Entity<T = any, A extends Application = Application> extends Container<A> implements ICollider {
  isActor: boolean = false;
  isSolid: boolean = false;
  isSensor: boolean = false;
  debug: boolean = false;
  debugColors = {
    bounds: 0xff0000,
    outerBounds: 0x00ff00,
  };
  type: EntityType = 'Solid';
  view: PIXIContainer;
  isCollideable: boolean = true;
  xRemainder: number = 0;
  yRemainder: number = 0;
  config: T;

  constructor(config?: Partial<T>) {
    super();
    this.config = config as T;
  }

  protected _cachedBounds: Bounds | Rectangle | null = null;

  get cachedBounds(): Bounds | Rectangle {
    if (!this._cachedBounds || this._dirtyBounds) {
      const bounds = this.view.getBounds();
      bounds.scale(1 / this.system.container.worldTransform.d);
      this._cachedBounds = bounds;
    }
    return this._cachedBounds;
  }

  set cachedBounds(value: Bounds) {
    this._cachedBounds = value;
  }

  protected _dirtyBounds: boolean = true;

  get dirtyBounds() {
    return this._dirtyBounds;
  }

  set dirtyBounds(value: boolean) {
    this._dirtyBounds = value;
  }

  get top(): number {
    return this.getBoundingBox().top;
  }

  get bottom(): number {
    return this.getBoundingBox().bottom;
  }

  get left(): number {
    return this.getBoundingBox().left;
  }

  get right(): number {
    return this.getBoundingBox().right;
  }

  get system(): typeof System {
    return System;
  }

  get collideables(): Entity[] {
    return [];
  }

  getWorldBounds(): Bounds | Rectangle {
    const pos = this.system.container.toLocal(this.view.getGlobalPosition());
    const bounds = this.cachedBounds;
    bounds.x = pos.x;
    bounds.y = pos.y;

    if (this.view instanceof Sprite && this.view.anchor) {
      bounds.x -= this.view.width * this.view.anchor.x;
      bounds.y -= this.view.height * this.view.anchor.y;
    }

    return bounds;
  }

  getBoundingBox(): Rectangle {
    const bounds = this.getWorldBounds();
    return bounds instanceof Bounds ? bounds.rectangle : bounds;
  }

  getOuterBoundingBox(): Rectangle | null {
    return null;
  }

  protected initialize() {}
}
