import { Bounds, Point } from 'pixi.js';
import { Entity } from './Entity';
import { ICollider } from './ICollider';
import { OverlapResult } from './types';

export function checkPointIntersection(point: Point, collider: ICollider): boolean {
  return point.x > collider.left && point.x < collider.right && point.y > collider.top && point.y < collider.bottom;
}

export function checkOverlap(rectA: Bounds, rectB: Bounds, entity1?: Entity, entity2?: Entity): OverlapResult {
  let overlap: OverlapResult = {
    top: false,
    bottom: false,
    left: false,
    right: false,
    entity1,
    entity2,
  };

  if (
    rectA.x < rectB.x + rectB.width &&
    rectA.x + rectA.width > rectB.x &&
    rectA.y < rectB.y + rectB.height &&
    rectA.y + rectA.height > rectB.y
  ) {
    overlap.left = rectA.x < rectB.x && rectA.x + rectA.width > rectB.x;
    overlap.right = rectA.x < rectB.x + rectB.width && rectA.x + rectA.width > rectB.x + rectB.width;
    overlap.top = rectA.y < rectB.y && rectA.y + rectA.height > rectB.y;
    overlap.bottom = rectA.y < rectB.y + rectB.height && rectA.y + rectA.height > rectB.y + rectB.height;
  }

  if (!overlap.left && !overlap.right && !overlap.top && !overlap.bottom) {
    overlap = false;
  }
  return overlap;
}
