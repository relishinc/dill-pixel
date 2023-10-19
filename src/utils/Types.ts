import { Point } from 'pixi.js';

export type SpritesheetLike = string | undefined;
export type PointLike = { x: number; y: number } | [number, number?] | number | Point;
