import { Point } from 'pixi.js';
import { PointLike, Size, SizeLike, SpriteSheetLike, TextureLike } from './types';
export declare function resolvePointLike(position?: PointLike, asPoint?: false, x?: number, y?: number): {
    x: number;
    y: number;
};
export declare function resolvePointLike(position?: PointLike, asPoint?: true, x?: number, y?: number): Point;
export declare function resolveSizeLike(size?: SizeLike): Size;
export declare function getSheetLikeString(sheet: SpriteSheetLike): SpriteSheetLike;
export declare function setObjectName(object: any, texture: TextureLike, sheet: SpriteSheetLike): void;
