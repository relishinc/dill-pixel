import { Point } from 'pixi.js';
import { PointLike, SpriteSheetLike, TextureLike } from './types';
export declare function resolvePointLike(position?: PointLike, asPoint?: false, x?: number, y?: number): {
    x: number;
    y: number;
};
export declare function resolvePointLike(position?: PointLike, asPoint?: true, x?: number, y?: number): Point;
export declare function getSheetLikeString(sheet: SpriteSheetLike): SpriteSheetLike;
export declare function setObjectName(object: any, texture: TextureLike, sheet: SpriteSheetLike): void;
//# sourceMappingURL=functions.d.ts.map