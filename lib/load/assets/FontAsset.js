import { Assets } from 'pixi.js';
import { AssetType } from '../../utils';
import { AssetMapData } from '../AssetMapData';
export class FontAsset extends AssetMapData {
    constructor(assetName, assetPath) {
        super(assetName, AssetType.FONT);
        if (assetPath) {
            this.assetPath = assetPath;
        }
    }
    getAsset() {
        const data = Assets.get(this.assetName)?.data;
        if (!data) {
            throw new Error(`Font asset ${this.assetName} is not loaded.`);
        }
        return data;
    }
    isLoaded() {
        return !!Assets.get(this.assetName);
    }
}
//# sourceMappingURL=FontAsset.js.map