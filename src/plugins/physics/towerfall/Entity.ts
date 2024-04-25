import { Point } from 'pixi.js';
import { Application } from '../../../core/Application';
import { Container } from '../../../display/Container';
import { ICollider } from './ICollider';
import { OverlapResult } from './types';
import { checkOverlap } from './utils';
import { World } from './World';

export class Entity<T = any, A extends Application = Application> extends Container<A> implements ICollider {
  xRemainder: number = 0;
  yRemainder: number = 0;
  config: T;

  constructor(config?: Partial<T>) {
    super();
    this.config = config as T;
  }

  get top(): number {
    return World.getEntityBounds(this).top;
  }

  get bottom(): number {
    return World.getEntityBounds(this).bottom;
  }

  get left(): number {
    return World.getEntityBounds(this).left;
  }

  get right(): number {
    return World.getEntityBounds(this).right;
  }

  get offset(): { x: number; y: number } {
    return { x: 0, y: 0 };
  }

  overlapCheck(entity: Entity, offset?: Point): OverlapResult {
    const bounds1 = World.getEntityBounds(this);
    const bounds2 = World.getEntityBounds(entity);
    if (offset) {
      bounds1.x += offset.x;
      bounds1.y += offset.y;
    }

    return checkOverlap(bounds1, bounds2, this, entity);
  }

  protected initialize() {}
}
