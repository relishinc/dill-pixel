import { AssetType } from '../../utils';
import { AssetMapData } from '../AssetMapData';
export class TextureAsset extends AssetMapData {
    constructor(assetName, assetPathOrType) {
        super(assetName, typeof assetPathOrType === 'number' ? assetPathOrType : AssetType.JPG);
        if (typeof assetPathOrType === 'string') {
            this.assetPath = assetPathOrType;
        }
    }
    getAsset() {
        return this.getResource().texture;
    }
}
//# sourceMappingURL=TextureAsset.js.map