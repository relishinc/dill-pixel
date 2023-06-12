import { AssetType } from "../../Utils";
import { AssetMapData } from "../AssetMapData";
export class TextureAtlasAsset extends AssetMapData {
    constructor(assetName, assetPath) {
        super(assetName, AssetType.TEXTURE_ATLAS);
        if (assetPath) {
            this.assetPath = assetPath;
        }
    }
    getAsset() {
        return this.getResource().textures;
    }
}
//# sourceMappingURL=TextureAtlasAsset.js.map