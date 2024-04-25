import { Point, Rectangle } from 'pixi.js';
import { Entity } from './Entity';
import { ICollider } from './ICollider';
import { Collision } from './types';

export function checkPointIntersection(point: Point, collider: ICollider): boolean {
  return point.x > collider.left && point.x < collider.right && point.y > collider.top && point.y < collider.bottom;
}

export function checkCollision(
  rectA: Rectangle,
  rectB: Rectangle,
  entity1?: Entity,
  entity2?: Entity,
): Collision | false {
  const overlap: Collision = {
    top: false,
    bottom: false,
    left: false,
    right: false,
    entity1,
    entity2,
    type: `${entity1?.type}|${entity2?.type}`,
  };

  if (rectA.intersects(rectB)) {
    overlap.left = rectA.left < rectB.right && rectA.left > rectB.left;
    overlap.right = rectA.right > rectB.left && rectA.right < rectB.right;
    overlap.top = rectA.top < rectB.bottom && rectA.top > rectB.top;
    overlap.bottom = rectA.bottom > rectB.top && rectA.bottom < rectB.bottom;
    return overlap;
  }
  return false;
}
