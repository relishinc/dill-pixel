import { Circle, Container, ContainerChild, Ellipse, Point, Polygon, Rectangle, RoundedRectangle } from 'pixi.js';
import { PointLike, Size } from './types';
import { resolvePointLike } from './point';

export type PixiSimpleShape = Rectangle | Circle | Ellipse | RoundedRectangle;
export type PixiShape = PixiSimpleShape | Polygon;

/**
 * Reassigns the displays object parent while maintaing it's world position
 * @param pChild
 * @param pParent
 */
export function reParent(pChild: ContainerChild, pParent: Container): void {
  pChild.parent.worldTransform.apply(pChild.position as Point, pChild.position as Point);
  pParent.worldTransform.applyInverse(pChild.position as Point, pChild.position as Point);
  pChild.parent.removeChild(pChild);
  pParent.addChild(pChild);
}

/**
 *
 * @param pObject
 */
export function objectDiagonal(pObject: Container): number {
  return Math.sqrt(pObject.width * pObject.width + pObject.height * pObject.height);
}

/**
 * Removes provided object from its parent and re-adds it.
 * @param pObject The object to send to the back.
 */
export function sendToFront(pObject: Container): void {
  const parent: Container = pObject.parent;
  parent.removeChild(pObject);
  parent.addChild(pObject);
}

/**
 * Removes provided object from its parent and re-adds it at index 0.
 * @param pObject The object to send to the back.
 */
export function sendToBack(pObject: Container): void {
  const parent: Container = pObject.parent;
  parent.removeChild(pObject);
  parent.addChildAt(pObject, 0);
}

/**
 *
 * @param pShape
 * @param pDelta
 */
export function offsetShape(pShape: PixiShape, pDelta: Point): PixiShape {
  if (pShape instanceof Polygon) {
    for (let i = 0; i < pShape.points.length; i += 2) {
      pShape.points[i] += pDelta.x;
      pShape.points[i + 1] += pDelta.y;
    }
    return pShape;
  } else {
    pShape.x += pDelta.x;
    pShape.y += pDelta.y;
    return pShape;
  }
}

/**
 *
 * @param pShape
 * @param pDelta
 */
export function offsetSimpleShape(pShape: PixiSimpleShape, pDelta: Point): PixiSimpleShape {
  pShape.x += pDelta.x;
  pShape.y += pDelta.y;
  return pShape;
}

export function scaleUniform(obj: any, scaleNum: number, scaleProp: 'width' | 'height' = 'width') {
  const scaleVal: 'x' | 'y' = scaleProp === 'width' ? 'y' : 'x';
  const otherScaleVal: 'x' | 'y' = scaleProp === 'width' ? 'x' : 'y';
  obj[scaleProp] = scaleNum;
  obj.scale[scaleVal] = obj.scale[otherScaleVal];
}

export function scaleToWidth(obj: Container, width: number) {
  scaleUniform(obj, width, 'width');
}

export function scaleToHeight(obj: Container, height: number) {
  scaleUniform(obj, height, 'height');
}

export function scaleToSize(obj: Container, size: PointLike | Size, firstProp: 'width' | 'height' = 'width') {
  let resolvedSize;
  if ((size as Size)?.width && (size as Size)?.height) {
    resolvedSize = { x: (size as Size).width, y: (size as Size).height };
  } else {
    resolvedSize = resolvePointLike(size as PointLike);
  }

  if (firstProp === 'width') {
    scaleToWidth(obj, resolvedSize.x);
    if (obj.height < resolvedSize.y) {
      scaleToHeight(obj, resolvedSize.y);
    }
  } else {
    scaleToHeight(obj, resolvedSize.y);
    if (obj.width < resolvedSize.x) {
      scaleToWidth(obj, resolvedSize.x);
    }
  }
}
