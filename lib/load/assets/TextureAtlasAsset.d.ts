import { AssetMapData } from '../AssetMapData';
import { IAsset } from './IAsset';
import { Texture } from 'pixi.js';
export declare class TextureAtlasAsset extends AssetMapData implements IAsset<{
    [name: string]: Texture;
}> {
    constructor(assetName: string, assetPath?: string);
    getAsset(): {
        [name: string]: Texture;
    };
}
//# sourceMappingURL=TextureAtlasAsset.d.ts.map