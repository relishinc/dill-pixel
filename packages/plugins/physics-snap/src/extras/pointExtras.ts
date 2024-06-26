import { Point, PointData } from 'pixi.js';

export const pointExtras = {
  /**
   * Adds `other` to `this` point and outputs into `outPoint` or a new Point.
   *
   * _Note: Only available with **pixi.js/math-extras**._
   * @method add
   * @memberof Point#
   * @param {PointData} other - The point to add to `this`.
   * @param {PointData} [outPoint] - A Point-like object in which to store the value,
   * optional (otherwise will create a new Point).
   * @returns {PointData} The `outPoint` reference or a new Point, with the result of the addition.
   */
  /**
   * Adds `other` to `this` point and outputs into `outPoint` or a new Point.
   *
   * _Note: Only available with **pixi.js/math-extras**._
   * @method add
   * @memberof ObservablePoint#
   * @param {PointData} other - The point to add to `this`.
   * @param {PointData} [outPoint] - A Point-like object in which to store the value,
   * optional (otherwise will create a new Point).
   * @returns {PointData} The `outPoint` reference or a new Point, with the result of the addition.
   */
  add(other: PointData, outPoint: PointData) {
    if (!outPoint) {
      outPoint = new Point();
    }
    outPoint.x = (this as Point).x + other.x;
    outPoint.y = (this as Point).y + other.y;
    return outPoint;
  },
  /**
   * Subtracts `other` from `this` point and outputs into `outPoint` or a new Point.
   *
   * _Note: Only available with **pixi.js/math-extras**._
   * @method subtract
   * @memberof Point#
   * @param {PointData} other - The point to subtract to `this`.
   * @param {PointData} [outPoint] - A Point-like object in which to store the value,
   * optional (otherwise will create a new Point).
   * @returns {PointData} The `outPoint` reference or a new Point, with the result of the subtraction.
   */
  /**
   * Subtracts `other` from `this` point and outputs into `outPoint` or a new Point.
   *
   * _Note: Only available with **pixi.js/math-extras**._
   * @method subtract
   * @memberof ObservablePoint#
   * @param {PointData} other - The point to subtract to `this`.
   * @param {PointData} [outPoint] - A Point-like object in which to store the value,
   * optional (otherwise will create a new Point).
   * @returns {PointData} The `outPoint` reference or a new Point, with the result of the subtraction.
   */
  subtract(other: PointData, outPoint: PointData) {
    if (!outPoint) {
      outPoint = new Point();
    }
    outPoint.x = (this as Point).x - other.x;
    outPoint.y = (this as Point).y - other.y;
    return outPoint;
  },
  /**
   * Multiplies component-wise `other` and `this` points and outputs into `outPoint` or a new Point.
   *
   * _Note: Only available with **pixi.js/math-extras**._
   * @method multiply
   * @memberof Point#
   * @param {PointData} other - The point to multiply with `this`.
   * @param {PointData} [outPoint] - A Point-like object in which to store the value,
   * optional (otherwise will create a new Point).
   * @returns {PointData} The `outPoint` reference or a new Point, with the component-wise multiplication.
   */
  /**
   * Multiplies component-wise `other` and `this` points and outputs into `outPoint` or a new Point.
   *
   * _Note: Only available with **pixi.js/math-extras**._
   * @method multiply
   * @memberof ObservablePoint#
   * @param {PointData} other - The point to multiply with `this`.
   * @param {PointData} [outPoint] - A Point-like object in which to store the value,
   * optional (otherwise will create a new Point).
   * @returns {PointData} The `outPoint` reference or a new Point, with the component-wise multiplication.
   */
  multiply(other: PointData, outPoint: PointData) {
    if (!outPoint) {
      outPoint = new Point();
    }
    outPoint.x = (this as Point).x * other.x;
    outPoint.y = (this as Point).y * other.y;
    return outPoint;
  },
  /**
   * Multiplies each component of `this` point with the number `scalar` and outputs into `outPoint` or a new Point.
   *
   * _Note: Only available with **pixi.js/math-extras**._
   * @method multiplyScalar
   * @memberof Point#
   * @param {number} scalar - The number to multiply both components of `this`.
   * @param {PointData} [outPoint] - A Point-like object in which to store the value,
   * optional (otherwise will create a new Point).
   * @returns {PointData} The `outPoint` reference or a new Point, with the multiplication.
   */
  /**
   * Multiplies each component of `this` point with the number `scalar` and outputs into `outPoint` or a new Point.
   *
   * _Note: Only available with **pixi.js/math-extras**._
   * @method multiplyScalar
   * @memberof ObservablePoint#
   * @param {number} scalar - The number to multiply both components of `this`.
   * @param {PointData} [outPoint] - A Point-like object in which to store the value,
   * optional (otherwise will create a new Point).
   * @returns {PointData} The `outPoint` reference or a new Point, with the multiplication.
   */
  multiplyScalar(scalar: number, outPoint: PointData) {
    if (!outPoint) {
      outPoint = new Point();
    }
    outPoint.x = (this as Point).x * scalar;
    outPoint.y = (this as Point).y * scalar;
    return outPoint;
  },
  /**
   * Computes the dot product of `other` with `this` point.
   * The dot product is the sum of the products of the corresponding components of two vectors.
   *
   * _Note: Only available with **pixi.js/math-extras**._
   * @method dot
   * @memberof Point#
   * @param {PointData} other - The other point to calculate the dot product with `this`.
   * @returns {number} The result of the dot product. This is an scalar value.
   */
  /**
   * Computes the dot product of `other` with `this` point.
   * The dot product is the sum of the products of the corresponding components of two vectors.
   *
   * _Note: Only available with **pixi.js/math-extras**._
   * @method dot
   * @memberof ObservablePoint#
   * @param {PointData} other - The other point to calculate the dot product with `this`.
   * @returns {number} The result of the dot product. This is an scalar value.
   */
  dot(other: PointData) {
    return (this as Point).x * other.x + (this as Point).y * other.y;
  },
  /**
   * Computes the cross product of `other` with `this` point.
   * Given two linearly independent R3 vectors a and b, the cross product, a × b (read "a cross b"),
   * is a vector that is perpendicular to both a and b, and thus normal to the plane containing them.
   * While cross product only exists on 3D space, we can assume the z component of 2D to be zero and
   * the result becomes a vector that will only have magnitude on the z axis.
   *
   * This function returns the z component of the cross product of the two points.
   *
   * _Note: Only available with **pixi.js/math-extras**._
   * @method cross
   * @memberof Point#
   * @param {PointData} other - The other point to calculate the cross product with `this`.
   * @returns {number} The z component of the result of the cross product.
   */
  /**
   * Computes the cross product of `other` with `this` point.
   * Given two linearly independent R3 vectors a and b, the cross product, a × b (read "a cross b"),
   * is a vector that is perpendicular to both a and b, and thus normal to the plane containing them.
   * While cross product only exists on 3D space, we can assume the z component of 2D to be zero and
   * the result becomes a vector that will only have magnitude on the z axis.
   *
   * This function returns the z component of the cross product of the two points.
   *
   * _Note: Only available with **pixi.js/math-extras**._
   * @method cross
   * @memberof ObservablePoint#
   * @param {PointData} other - The other point to calculate the cross product with `this`.
   * @returns {number} The z component of the result of the cross product.
   */
  cross(other: PointData) {
    return (this as Point).x * other.y - (this as Point).y * other.x;
  },
  /**
   * Computes a normalized version of `this` point.
   *
   * A normalized vector is a vector of magnitude (length) 1
   *
   * _Note: Only available with **pixi.js/math-extras**._
   * @method normalize
   * @memberof Point#
   * @param {PointData} [outPoint] - A Point-like object in which to store the value,
   * optional (otherwise will create a new Point).
   * @returns {PointData} The normalized point.
   */
  /**
   * Computes a normalized version of `this` point.
   *
   * A normalized vector is a vector of magnitude (length) 1
   *
   * _Note: Only available with **pixi.js/math-extras**._
   * @method normalize
   * @memberof ObservablePoint#
   * @param {PointData} [outPoint] - A Point-like object in which to store the value,
   * optional (otherwise will create a new Point).
   * @returns {PointData} The normalized point.
   */
  normalize(outPoint: PointData) {
    if (!outPoint) {
      outPoint = new Point();
    }
    const magnitude = Math.sqrt((this as Point).x * (this as Point).x + (this as Point).y * (this as Point).y);
    outPoint.x = (this as Point).x / magnitude;
    outPoint.y = (this as Point).y / magnitude;
    return outPoint;
  },
  /**
   * Computes the magnitude of this point (Euclidean distance from 0, 0).
   *
   * Defined as the square root of the sum of the squares of each component.
   *
   * _Note: Only available with **pixi.js/math-extras**._
   * @method magnitude
   * @memberof Point#
   * @returns {number} The magnitude (length) of the vector.
   */
  /**
   * Computes the magnitude of this point (Euclidean distance from 0, 0).
   *
   * Defined as the square root of the sum of the squares of each component.
   *
   * _Note: Only available with **pixi.js/math-extras**._
   * @method magnitude
   * @memberof ObservablePoint#
   * @returns {number} The magnitude (length) of the vector.
   */
  magnitude() {
    return Math.sqrt((this as Point).x * (this as Point).x + (this as Point).y * (this as Point).y);
  },
  /**
   * Computes the square magnitude of this point.
   * If you are comparing the lengths of vectors, you should compare the length squared instead
   * as it is slightly more efficient to calculate.
   *
   * Defined as the sum of the squares of each component.
   *
   * _Note: Only available with **pixi.js/math-extras**._
   * @method magnitudeSquared
   * @memberof Point#
   * @returns {number} The magnitude squared (length squared) of the vector.
   */
  /**
   * Computes the square magnitude of this point.
   * If you are comparing the lengths of vectors, you should compare the length squared instead
   * as it is slightly more efficient to calculate.
   *
   * Defined as the sum of the squares of each component.
   *
   * _Note: Only available with **pixi.js/math-extras**._
   * @method magnitudeSquared
   * @memberof ObservablePoint#
   * @returns {number} The magnitude squared (length squared) of the vector.
   */
  magnitudeSquared() {
    return (this as Point).x * (this as Point).x + (this as Point).y * (this as Point).y;
  },
  /**
   * Computes vector projection of `this` on `onto`.
   *
   * Imagine a light source, parallel to `onto`, above `this`.
   * The light would cast rays perpendicular to `onto`.
   * `(this as Point).project(onto)` is the shadow cast by `this` on the line defined by `onto` .
   *
   * _Note: Only available with **pixi.js/math-extras**._
   * @method project
   * @memberof Point#
   * @param {PointData} onto - A non zero vector describing a line on which to project `this`.
   * @param {PointData} [outPoint] - A Point-like object in which to store the value,
   * optional (otherwise will create a new Point).
   * @returns {PointData} The `this` on `onto` projection.
   */
  /**
   * Computes vector projection of `this` on `onto`.
   *
   * Imagine a light source, parallel to `onto`, above `this`.
   * The light would cast rays perpendicular to `onto`.
   * `(this as Point).project(onto)` is the shadow cast by `this` on the line defined by `onto` .
   *
   * _Note: Only available with **pixi.js/math-extras**._
   * @method project
   * @memberof ObservablePoint#
   * @param {PointData} onto - A non zero vector describing a line on which to project `this`.
   * @param {PointData} [outPoint] - A Point-like object in which to store the value,
   * optional (otherwise will create a new Point).
   * @returns {PointData} The `this` on `onto` projection.
   */
  project(onto: PointData, outPoint: PointData) {
    if (!outPoint) {
      outPoint = new Point();
    }
    const normalizedScalarProjection =
      ((this as Point).x * onto.x + (this as Point).y * onto.y) / (onto.x * onto.x + onto.y * onto.y);
    outPoint.x = onto.x * normalizedScalarProjection;
    outPoint.y = onto.y * normalizedScalarProjection;
    return outPoint;
  },
  /**
   * Reflects `this` vector off of a plane orthogonal to `normal`.
   * `normal` is not normalized during this process. Consider normalizing your `normal` before use.
   *
   * Imagine a light source bouncing onto a mirror.
   * `this` vector is the light and `normal` is a vector perpendicular to the mirror.
   * `(this as Point).reflect(normal)` is the reflection of `this` on that mirror.
   *
   * _Note: Only available with **pixi.js/math-extras**._
   * @method reflect
   * @memberof Point#
   * @param {PointData} normal - The normal vector of your reflecting plane.
   * @param {PointData} [outPoint] - A Point-like object in which to store the value,
   * optional (otherwise will create a new Point).
   * @returns {PointData} The reflection of `this` on your reflecting plane.
   */
  /**
   * Reflects `this` vector off of a plane orthogonal to `normal`.
   * `normal` is not normalized during this process. Consider normalizing your `normal` before use.
   *
   * Imagine a light source bouncing onto a mirror.
   * `this` vector is the light and `normal` is a vector perpendicular to the mirror.
   * `(this as Point).reflect(normal)` is the reflection of `this` on that mirror.
   *
   * _Note: Only available with **pixi.js/math-extras**._
   * @method reflect
   * @memberof ObservablePoint#
   * @param {PointData} normal - The normal vector of your reflecting plane.
   * @param {PointData} [outPoint] - A Point-like object in which to store the value,
   * optional (otherwise will create a new Point).
   * @returns {PointData} The reflection of `this` on your reflecting plane.
   */
  reflect(normal: PointData, outPoint: PointData) {
    if (!outPoint) {
      outPoint = new Point();
    }
    const dotProduct = (this as Point).x * normal.x + (this as Point).y * normal.y;
    outPoint.x = (this as Point).x - 2 * dotProduct * normal.x;
    outPoint.y = (this as Point).y - 2 * dotProduct * normal.y;
    return outPoint;
  },

  rotate(angle: number, outPoint: PointData): Point {
    if (!outPoint) {
      outPoint = new Point();
    }
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const newX = (this as Point).x * cos - (this as Point).y * sin;
    const newY = (this as Point).x * sin + (this as Point).y * cos;
    outPoint.x = newX;
    outPoint.y = newY;

    return outPoint;
  },
  length(): number {
    return Math.sqrt((this as Point).x * (this as Point).x + (this as Point).y * (this as Point).y);
  },
};
