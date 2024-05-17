import { Texture } from 'pixi.js';
/**
 * Creates a linear gradient texture.
 *
 * @param {number} width - The width of the texture.
 * @param {Array<{offset: number, color: string}>} colorStops - An array of objects, each with an offset and a color.
 * @returns {Texture} - A PIXI texture of the linear gradient.
 */
export declare function createLinearGradientTexture(width: number, colorStops: {
    offset: number;
    color: string;
}[]): Texture<import("pixi.js").Resource> | undefined;
export declare const createGradientTexture: typeof createLinearGradientTexture;
/**
 * Creates a radial gradient texture.
 *
 * @param {number} radius - The radius of the texture.
 * @param {Array<{offset: number, color: string}>} colorStops - An array of objects, each with an offset and a color.
 * @returns {Texture} - A PIXI texture of the radial gradient.
 */
export declare function createRadialGradientTexture(radius: number, colorStops: {
    offset: number;
    color: string;
}[]): Texture<import("pixi.js").Resource> | undefined;
//# sourceMappingURL=TextureUtils.d.ts.map