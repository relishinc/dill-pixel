import {Point, Texture} from 'pixi.js';

/**
 * Type definition for an object with required properties.
 * @template T The type of the object.
 * @template K The keys of the required properties.
 */
export type WithRequiredProps<T, K extends keyof T> = Partial<T> & Pick<T, K>;

/**
 * Type definition for a spritesheet.
 * Can be a string or undefined.
 */
export type SpritesheetLike = string | undefined;

/**
 * Type definition for a texture.
 * Can be a string or a Texture object from 'pixi.js'.
 */
export type TextureLike = string | Texture;

/**
 * Type definition for a point.
 * Can be an object with x and y properties, an array with one or two numbers, a single number, or a Point object from 'pixi.js'.
 */
export type PointLike = { x: number; y: number } | [number, number?] | number | Point;

/**
 * Type definition for a rectangle.
 * Must be an object with x, y, width, and height properties.
 */
export type RectLike = {
  x: number;
  y: number;
  width: number;
  height: number;
};

/**
 * Type definition for an object with point-like properties.
 * @template T The keys of the point-like properties.
 */
export type WithPointLike<T extends keyof any> = { [P in T]: PointLike };

/**
 * Type definition for a container-like object.
 * Must be an object with x, y, width, and height properties.
 */
export type ContainerLike = {
  x: number;
  y: number;
  width: number;
  height: number;
};
