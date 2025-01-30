import { Circle, Point, Rectangle } from 'pixi.js';
import { Entity } from './Entity';
import { ICollider } from './ICollider';
import { System } from './System';
import { Collision, CollisionDirection } from './types';

export function checkPointIntersection(point: Point, collider: ICollider): boolean {
  return point.x > collider.left && point.x < collider.right && point.y > collider.top && point.y < collider.bottom;
}

type Overlap = {
  x: number;
  y: number;
  area: number;
};

const EPSILON = 1e-10;

export function getRectToRectIntersectionArea(rectA: Rectangle, rectB: Rectangle): Overlap {
  const xOverlap = Math.max(0, Math.min(rectA.right, rectB.right) - Math.max(rectA.left, rectB.left));
  const yOverlap = Math.max(0, Math.min(rectA.bottom, rectB.bottom) - Math.max(rectA.top, rectB.top));
  const area = xOverlap * yOverlap;
  return { x: xOverlap, y: yOverlap, area };
}

export function getRectToCircleIntersectionArea(rect: Rectangle, circle: Circle): Overlap {
  const closestX = Math.max(rect.x, Math.min(rect.x + rect.width, circle.x));
  const closestY = Math.max(rect.y, Math.min(rect.y + rect.height, circle.y));
  const dx = circle.x - closestX;
  const dy = circle.y - closestY;
  const distanceSquared = dx * dx + dy * dy;

  const distance = Math.sqrt(distanceSquared);
  const angle = Math.acos(distance / circle.radius);
  const sectorArea = angle * circle.radius * circle.radius;
  const triangleArea = distance * Math.sqrt(circle.radius * circle.radius - distanceSquared);
  const intersectionArea = sectorArea - triangleArea;
  return { x: 0, y: 0, area: Math.max(0, intersectionArea) };
}

export function getCircleToCircleIntersectionArea(circleA: Circle, circleB: Circle): Overlap {
  const dx = circleB.x - circleA.x;
  const dy = circleB.y - circleA.y;
  const distanceSquared = dx * dx + dy * dy;
  const distance = Math.sqrt(distanceSquared);

  const r1 = circleA.radius;
  const r2 = circleB.radius;
  const radiiSum = r1 + r2;

  // No overlap if the distance is greater than or equal to the sum of the radii
  if (distance >= radiiSum - EPSILON) {
    return { x: 0, y: 0, area: 0 };
  }

  // One circle is completely within the other
  if (distance <= Math.abs(r1 - r2) + EPSILON) {
    const smallerRadius = Math.min(r1, r2);
    const area = Math.PI * smallerRadius * smallerRadius;
    return { x: circleA.x, y: circleA.y, area };
  }

  // Calculate intersection area
  const a = (r1 * r1 - r2 * r2 + distanceSquared) / (2 * distance);
  const h = Math.sqrt(r1 * r1 - a * a);
  const area = r1 * r1 * Math.acos(a / r1) + r2 * r2 * Math.acos((distance - a) / r2) - distance * h;

  const cx = circleA.x + (a * dx) / distance;
  const cy = circleA.y + (a * dy) / distance;

  return { x: cx, y: cy, area: Math.max(0, area) };
}

export function checkCollision(
  shapeA: Rectangle | Circle,
  shapeB: Rectangle | Circle,
  entity1: Entity,
  entity2: Entity,
): Collision | false {
  const collision: Collision = {
    type: `${entity1.type}|${entity2.type}`,
    entity1,
    entity2,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    area: 0,
    direction: undefined,
    overlap: { x: 0, y: 0 },
  };
  let hasCollision = false;

  if (entity1.isCircle && entity2.isCircle) {
    const circleA = shapeA as Circle;
    const circleB = shapeB as Circle;
    const dx = circleB.x - circleA.x;
    const dy = circleB.y - circleA.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < circleA.radius + circleB.radius) {
      hasCollision = true;
      circleToCircleCollision(circleA, circleB, collision);
    }
  } else if (entity1.isCircle !== entity2.isCircle) {
    // One shape is a circle, the other is a rectangle
    const circle = entity1.isCircle ? (shapeA as Circle) : (shapeB as Circle);
    const rect = entity1.isCircle ? (shapeB as Rectangle) : (shapeA as Rectangle);
    // Find the closest point on the rectangle to the circle's center
    const closestX = Math.max(rect.x, Math.min(circle.x, rect.x + rect.width));
    const closestY = Math.max(rect.y, Math.min(circle.y, rect.y + rect.height));
    const dx = circle.x - closestX;
    const dy = circle.y - closestY;
    const distanceSquared = dx * dx + dy * dy;

    if (distanceSquared <= circle.radius * circle.radius) {
      hasCollision = true;
      rectToCircleCollision(rect, circle, closestX, closestY, collision);
    }
  } else {
    // Both shapes are rectangles
    const rectA = shapeA as Rectangle;
    const rectB = shapeB as Rectangle;

    if (
      rectA.x < rectB.x + rectB.width &&
      rectA.x + rectA.width > rectB.x &&
      rectA.y < rectB.y + rectB.height &&
      rectA.y + rectA.height > rectB.y
    ) {
      hasCollision = true;
      rectToRectCollision(rectA, rectB, collision);
    }
  }

  if (hasCollision && collision.area > System.collisionThreshold) {
    collision.direction = getCollisionDirection(collision);
    return collision;
  }
  return false;
}

function getCollisionDirection(collision: Collision): CollisionDirection | undefined {
  // get the max value of all the collision sides
  let dir: CollisionDirection | undefined = undefined;
  let value = 0;

  if (collision.top > value) {
    value = collision.top;
    dir = 'top';
  }
  if (collision.bottom > value) {
    value = collision.bottom;
    dir = 'bottom';
  }
  if (collision.left > value) {
    value = collision.left;
    dir = 'left';
  }
  if (collision.right > value) {
    value = collision.right;
    dir = 'right';
  }
  return dir;
}

function rectToCircleCollision(
  rect: Rectangle,
  circle: Circle,
  closestX: number,
  closestY: number,
  collision: Collision,
) {
  const dx = circle.x - closestX;
  const dy = circle.y - closestY;
  const distanceSquared = dx * dx + dy * dy;

  if (distanceSquared >= circle.radius * circle.radius - EPSILON) {
    // No intersection
    return { x: 0, y: 0, area: 0 };
  }

  // Circle center is inside the rectangle
  if (circle.x >= rect.x && circle.x <= rect.x + rect.width && circle.y >= rect.y && circle.y <= rect.y + rect.height) {
    return { x: circle.x, y: circle.y, area: Math.PI * circle.radius * circle.radius };
  }

  // Partial intersection
  const distance = Math.sqrt(distanceSquared);
  const angle = Math.acos(distance / circle.radius);
  const sectorArea = angle * circle.radius * circle.radius;
  const triangleArea = distance * Math.sqrt(circle.radius * circle.radius - distanceSquared);
  const intersectionArea = sectorArea - triangleArea;

  collision.overlap = { x: closestX, y: closestY };
  collision.area = Math.max(0, intersectionArea);

  if (distance < circle.radius) {
    // Reset collision sides
    collision.top = 0;
    collision.bottom = 0;
    collision.left = 0;
    collision.right = 0;

    // Set collision sides based on overlap distances and circle's position relative to the rectangle
    if (dx > 0) {
      collision.left = Math.abs(dx);
    } else {
      collision.right = Math.abs(dx);
    }
    if (dy > 0) {
      collision.top = Math.abs(dy);
    } else {
      collision.bottom = Math.abs(dy);
    }
  }
}

function circleToCircleCollision(circleA: Circle, circleB: Circle, collision: Collision) {
  const dx = circleB.x - circleA.x;
  const dy = circleB.y - circleA.y;
  const distanceSquared = dx * dx + dy * dy;
  const distance = Math.sqrt(distanceSquared);

  const r1 = circleA.radius;
  const r2 = circleB.radius;
  const radiiSum = r1 + r2;

  // Early exit if no collision
  if (distance >= radiiSum) {
    return;
  }

  // Calculate penetration depth
  const penetration = radiiSum - distance;

  // Calculate normalized collision normal
  const nx = dx / distance;
  const ny = dy / distance;

  // Set collision sides based on the normal vector
  // We use a larger threshold for circle collisions to ensure proper reflection
  if (Math.abs(nx) > 0.1) {
    if (nx > 0) {
      collision.left = penetration;
    } else {
      collision.right = penetration;
    }
  }
  if (Math.abs(ny) > 0.1) {
    if (ny > 0) {
      collision.top = penetration;
    } else {
      collision.bottom = penetration;
    }
  }

  // Calculate intersection area (for collision strength)
  if (distance <= Math.abs(r1 - r2)) {
    // One circle contains the other
    const smallerRadius = Math.min(r1, r2);
    collision.area = Math.PI * smallerRadius * smallerRadius;
  } else {
    // Partial intersection
    const a = (r1 * r1 - r2 * r2 + distanceSquared) / (2 * distance);
    const h = Math.sqrt(r1 * r1 - a * a);
    collision.area = r1 * r1 * Math.acos(a / r1) + r2 * r2 * Math.acos((distance - a) / r2) - distance * h;
  }

  // Set overlap point at the collision point
  collision.overlap = {
    x: circleA.x + nx * r1,
    y: circleA.y + ny * r1,
  };
}

function rectToRectCollision(r1: Rectangle, r2: Rectangle, collision: Collision) {
  const dx = r2.x - r1.x;
  const dy = r2.y - r1.y;
  const r1HalfWidth = r1.width / 2;
  const r1HalfHeight = r1.height / 2;
  const r2HalfWidth = r2.width / 2;
  const r2HalfHeight = r2.height / 2;

  const r1CenterX = r1.x + r1HalfWidth;
  const r1CenterY = r1.y + r1HalfHeight;
  const r2CenterX = r2.x + r2HalfWidth;
  const r2CenterY = r2.y + r2HalfHeight;

  const intersectX = Math.abs(r2CenterX - r1CenterX) - (r1HalfWidth + r2HalfWidth);
  const intersectY = Math.abs(r2CenterY - r1CenterY) - (r1HalfHeight + r2HalfHeight);

  // Calculate the coordinates of the intersection rectangle
  collision.overlap.x = Math.max(0, Math.min(r1.x + r1.width, r2.x + r2.width) - Math.max(r1.x, r2.x));
  collision.overlap.y = Math.max(0, Math.min(r1.y + r1.height, r2.y + r2.height) - Math.max(r1.y, r2.y));

  collision.area = collision.overlap.x * collision.overlap.y;

  if (intersectX < 0 && intersectY < 0) {
    const dx = r2CenterX - r1CenterX;
    const dy = r2CenterY - r1CenterY;

    if (dy > 0) {
      collision.bottom = Math.abs(dy);
    } else {
      collision.top = Math.abs(dy);
    }
    if (dx > 0) {
      collision.right = Math.abs(dx);
    } else {
      collision.left = Math.abs(dx);
    }
  } else {
    if (dx > 0) {
      collision.right = Math.abs(dx);
    } else {
      collision.left = Math.abs(dx);
    }
    if (dy > 0) {
      collision.bottom = Math.abs(dy);
    } else {
      collision.top = Math.abs(dy);
    }
  }
}

export function approach(current: number, target: number, step: number): number {
  if (current < target) {
    return Math.min(current + step, target);
  } else if (current > target) {
    return Math.max(current - step, target);
  }
  return current;
}
