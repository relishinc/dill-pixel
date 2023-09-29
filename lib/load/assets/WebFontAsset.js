import { Assets } from 'pixi.js';
import { AssetType } from '../../utils';
import { AssetMapData } from '../AssetMapData';
export class WebFontAsset extends AssetMapData {
    constructor(assetName, data, assetPath) {
        super(assetName, AssetType.WEB_FONT);
        this.data = data;
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
//# sourceMappingURL=WebFontAsset.js.map