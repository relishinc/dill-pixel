import { BLEND_MODES, TextureSource, Texture as PixiTexture } from 'pixi.js';
import { BlendMode, Texture, TextureFilter, TextureWrap } from '../spine-core';

export declare class SpineTexture extends Texture {
    private static readonly textureMap;
    readonly texture: PixiTexture;
    private constructor();
    static from(texture: TextureSource): SpineTexture;
    static toPixiBlending(blend: BlendMode): BLEND_MODES;
    private static toPixiMipMap;
    private static toPixiTextureFilter;
    private static toPixiTextureWrap;
    setFilters(minFilter: TextureFilter, magFilter: TextureFilter): void;
    setWraps(uWrap: TextureWrap, vWrap: TextureWrap): void;
    dispose(): void;
}
//# sourceMappingURL=SpineTexture.d.ts.map