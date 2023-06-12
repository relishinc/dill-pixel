import { AssetType, AssetUtils } from "../../Utils";
import { AssetMapData } from "../AssetMapData";
export class SpineAsset extends AssetMapData {
    constructor(assetName, assetPathOrType, atlasPathOrName) {
        super(assetName, typeof assetPathOrType === "number" ? assetPathOrType : AssetType.SPINE_JSON);
        if (typeof assetPathOrType === "string") {
            this.assetPath = assetPathOrType;
        }
        this.atlasPath = atlasPathOrName;
    }
    getAsset() {
        return this.getResource().spineData;
    }
    getLoaderOptions() {
        if (this.atlasPath) {
            const atlasPath = this.atlasPath.indexOf("/") >= 0
                ? AssetUtils.replaceResolutionToken(this.atlasPath)
                : AssetUtils.getPathToAsset(this.atlasPath, AssetType.SPINE_ATLAS);
            return {
                metadata: {
                    imageNamePrefix: "spineAtlas_",
                    spineAtlasFile: atlasPath,
                },
            };
        }
        return undefined;
    }
}
//# sourceMappingURL=SpineAsset.js.map