import { Point } from 'pixi.js';
import { PointLike, Size, SizeLike, SpriteSheetLike, TextureLike } from './types';

export type PointLikeResult = {
    x: number;
    y: number;
} | Point;
export declare function resolvePointLike(position?: PointLike, asPoint?: false, x?: number, y?: number): {
    x: number;
    y: number;
};
export declare function resolvePointLike(position?: PointLike, asPoint?: true, x?: number, y?: number): Point;
export declare function resolveSizeLike(size?: SizeLike): Size;
export declare function getSheetLikeString(sheet: SpriteSheetLike): SpriteSheetLike;
export declare function setObjectName(object: any, texture: TextureLike, sheet: SpriteSheetLike): void;
type DebouncedFunction<T extends (...args: any[]) => any> = (...args: Parameters<T>) => void;
/**
 * Debounce a function
 * @param func - function to debounce
 * @param wait - time in milliseconds
 * @example const debounced = debounce(() => console.log('debounced'), 1000);
 * @example window.addEventListener('resize', debounced);
 */
export declare function debounce<T extends (...args: any[]) => any>(func: T, wait: number): DebouncedFunction<T>;
export {};
//# sourceMappingURL=functions.d.ts.map