import { Point } from 'pixi.js';
export type WithRequiredProps<T, K extends keyof T> = Partial<T> & Pick<T, K>;
export type SpritesheetLike = string | undefined;
export type PointLike = {
    x: number;
    y: number;
} | [number, number?] | number | Point;
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
//# sourceMappingURL=Types.d.ts.map