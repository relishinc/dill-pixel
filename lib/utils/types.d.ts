import { Point, Texture } from 'pixi.js';
export type Constructor<T> = new (...args: any[]) => T;
export type WithRequiredProps<T, K extends keyof T> = Partial<T> & Pick<T, K>;
export type SpriteSheetLike = string | undefined;
export type Size = {
    width: number;
    height: number;
};
export type PointLike = number | {
    x: number;
    y: number;
} | [number, number?] | [number] | number[] | Point;
export type RectLike = {
    x: number;
    y: number;
    width: number;
    height: number;
};
export type WithPointLike<T extends keyof any> = {
    [P in T]: PointLike;
};
export type ContainerLike = {
    x: number;
    y: number;
    width: number;
    height: number;
};
export type TextureLike = string | Texture;
//# sourceMappingURL=types.d.ts.map