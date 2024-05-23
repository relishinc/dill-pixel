import { AssetExtension, TextureSource } from 'pixi.js';
import { TextureAtlas } from '../../spine-core';

type RawAtlas = string;
export declare const spineTextureAtlasLoader: AssetExtension<RawAtlas | TextureAtlas, ISpineAtlasMetadata>;
export interface ISpineAtlasMetadata {
    imageMetadata?: any;
    images?: TextureSource | string | Record<string, TextureSource | string>;
}
export {};
//# sourceMappingURL=atlasLoader.d.ts.map