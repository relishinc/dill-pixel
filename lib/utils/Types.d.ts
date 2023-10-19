import { Point } from 'pixi.js';
export type SpritesheetLike = string | undefined;
export type PointLike = {
    x: number;
    y: number;
} | [number, number?] | number | Point;
export type WithPointLike<T extends keyof any> = {
    [P in T]: PointLike;
};
//# sourceMappingURL=Types.d.ts.map