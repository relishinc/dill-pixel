import { LoadFontData } from 'pixi.js';
import { AssetMapData } from '../AssetMapData';
import { IAsset } from './IAsset';
export declare class WebFontAsset extends AssetMapData implements IAsset<Partial<LoadFontData>> {
    constructor(assetName: string, data?: any, assetPath?: string);
    getAsset(): LoadFontData;
    isLoaded(): boolean;
}
//# sourceMappingURL=WebFontAsset.d.ts.map