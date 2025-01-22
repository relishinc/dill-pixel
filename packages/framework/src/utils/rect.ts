import { Point, PointLike, Rectangle } from 'pixi.js';
/**
 *
 * @param rect
 * @param delta
 */
export function offset(rect: Rectangle, delta: Point): Rectangle {
  rect.x += delta.x;
  rect.y += delta.y;
  return rect;
}

/**
 *
 * @param rect
 * @param output
 */
export function center(rect: Rectangle, output?: Point): Point {
  if (output === undefined) {
    output = new Point();
  }
  output.set(rect.x + rect.width * 0.5, rect.y + rect.height * 0.5);
  return output;
}

/**
 * Scale a rectangle by a provided value
 * @param rect
 * @param scale
 */
export function scale(rect: Rectangle, scale: number): Rectangle {
  rect.x *= scale;
  rect.y *= scale;
  rect.width *= scale;
  rect.height *= scale;
  return rect;
}

/**
 * Returns a `Point` representing the width and height of the input Rectangle
 * @param rect
 * @param output
 */
export function size(rect: Rectangle, output?: Point): PointLike {
  if (output === undefined) {
    output = new Point();
  }
  output.set(rect.width, rect.height);
  return output;
}
