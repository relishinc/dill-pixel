import { Point, Texture } from 'pixi.js';
/**
 * A generic constructor type.
 * @template T The type of the instance that the constructor creates.
 */
export type Constructor<T> = new (...args: any[]) => T;
/**
 * A type that requires certain properties of another type.
 * @template T The original type.
 * @template K The keys of the properties that should be required.
 */
export type WithRequiredProps<T, K extends keyof T> = Partial<T> & Pick<T, K>;
/**
 * A type that represents a sprite sheet, which can be a string or undefined.
 */
export type SpriteSheetLike = string | undefined;
/**
 * A type that represents a size, with width and height properties.
 */
export type Size = {
    width: number;
    height: number;
};
/**
 * A type that represents a point, which can be a number, an object with x and y properties, an array of two numbers, or a Point instance.
 */
export type PointLike = number | {
    x: number;
    y: number;
} | [number, number?] | [number] | number[] | Point;
export type SizeLike = PointLike | {
    width: number;
    height: number;
} | Size;
/**
 * A type that represents a rectangle, with x, y, width, and height properties.
 */
export type RectLike = Size & {
    x: number;
    y: number;
};
/**
 * A type that maps keys to PointLike values.
 * @template T The keys of the properties that should be PointLike.
 */
export type WithPointLike<T extends keyof any> = {
    [P in T]: PointLike;
};
/**
 * A type that represents a container, with position and getGlobalPosition properties, and x, y, width, and height properties.
 */
export type ContainerLike = RectLike & {
    position: Point;
    getGlobalPosition: () => Point;
};
/**
 * A type that represents a texture, which can be a string or a Texture instance.
 */
export type TextureLike = string | Texture;
export type ImportListItemModule<T> = (() => Promise<any>) | Promise<any> | Constructor<T> | T;
/**+
 * A type that represents an item in an import list.
 * @template T The type of the instance that the constructor creates.
 */
export type ImportListItem<T> = {
    id: string;
    namedExport?: string;
    options?: any;
    module: ImportListItemModule<T>;
};
/**
 * A type that represents an import list.
 * @template T The type of the instance that the constructor creates.
 */
export type ImportList<T> = ImportListItem<T>[];
export type AppSize = {
    width: number;
    height: number;
    screenWidth: number;
    screenHeight: number;
};
//# sourceMappingURL=types.d.ts.map