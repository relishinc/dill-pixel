import { Point, Rectangle } from 'pixi.js';
import { Entity } from './Entity';
import { ICollider } from './ICollider';
import { Collision } from './types';

export function checkPointIntersection(point: Point, collider: ICollider): boolean {
  return point.x > collider.left && point.x < collider.right && point.y > collider.top && point.y < collider.bottom;
}

type Overlap = {
  x: number;
  y: number;
  area: number;
};

export function getIntersectionArea(rectA: Rectangle, rectB: Rectangle): Overlap {
  // Calculate the coordinates of the intersection rectangle
  const xOverlap = Math.max(0, Math.min(rectA.x + rectA.width, rectB.x + rectB.width) - Math.max(rectA.x, rectB.x));
  const yOverlap = Math.max(0, Math.min(rectA.y + rectA.height, rectB.y + rectB.height) - Math.max(rectA.y, rectB.y));

  // The area of the intersection is the product of overlapping width and height
  return { x: xOverlap, y: yOverlap, area: xOverlap * yOverlap };
}

export function checkCollision(
  rectA: Rectangle,
  rectB: Rectangle,
  entity1: Entity,
  entity2: Entity,
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
