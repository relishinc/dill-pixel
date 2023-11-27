import { Texture } from 'pixi.js';
export declare function createLinearGradientTexture(width: number, colorStops: {
    offset: number;
    color: string;
}[]): Texture<import("pixi.js").Resource> | undefined;
export declare const createGradientTexture: typeof createLinearGradientTexture;
export declare function createRadialGradientTexture(radius: number, colorStops: {
    offset: number;
    color: string;
}[]): Texture<import("pixi.js").Resource> | undefined;
//# sourceMappingURL=TextureUtils.d.ts.map