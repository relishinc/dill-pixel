import { AssetType } from "../../Utils";
import { AssetMapData } from "../AssetMapData";
export class JsonAsset extends AssetMapData {
    constructor(assetName, assetPath) {
        super(assetName, AssetType.JSON);
        if (assetPath) {
            this.assetPath = assetPath;
        }
    }
    getAsset() {
        return this.getResource().data;
    }
}
//# sourceMappingURL=JsonAsset.js.map