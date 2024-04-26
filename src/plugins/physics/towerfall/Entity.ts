import { Bounds, Rectangle, Sprite } from 'pixi.js';
import { Application } from '../../../core/Application';
import { Container } from '../../../display/Container';
import { PIXIContainer } from '../../../pixi';
import { ICollider } from './ICollider';
import { System } from './System';
import { EntityType } from './types';

export class Entity<T = any, A extends Application = Application> extends Container<A> implements ICollider {
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

  get collideables(): Entity[] {
    return [];
  }

  getWorldBounds(): Bounds {
    const pos = System.container.toLocal(this.view.getGlobalPosition());
    const bounds = this.view.getBounds();
    bounds.x = pos.x;
    bounds.y = pos.y;
    // Adjust bounds based on the view's anchor if it's a sprite
    if (this.view instanceof Sprite && this.view.anchor) {
      bounds.x -= this.view.width * this.view.anchor.x;
      bounds.y -= this.view.height * this.view.anchor.y;
    }
    return bounds;
  }

  getBoundingBox(): Rectangle {
    return this.getWorldBounds().rectangle;
  }

  getOuterBoundingBox(): Rectangle | null {
    return null;
  }

  protected initialize() {}
}
