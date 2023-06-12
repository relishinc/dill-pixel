"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpineAsset = void 0;
const Utils_1 = require("../../Utils");
const AssetMapData_1 = require("../AssetMapData");
class SpineAsset extends AssetMapData_1.AssetMapData {
    constructor(assetName, assetPathOrType, atlasPathOrName) {
        super(assetName, typeof assetPathOrType === "number" ? assetPathOrType : Utils_1.AssetType.SPINE_JSON);
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
                ? Utils_1.AssetUtils.replaceResolutionToken(this.atlasPath)
                : Utils_1.AssetUtils.getPathToAsset(this.atlasPath, Utils_1.AssetType.SPINE_ATLAS);
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
exports.SpineAsset = SpineAsset;
//# sourceMappingURL=SpineAsset.js.map