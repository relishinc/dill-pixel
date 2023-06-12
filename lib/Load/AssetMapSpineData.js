"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetMapSpineData = void 0;
const Utils_1 = require("../Utils");
const AssetMapData_1 = require("./AssetMapData");
/**
 *
 */
class AssetMapSpineData extends AssetMapData_1.AssetMapData {
    /**
     * @deprecated use Load/Assets/SpineAsset
     * @param pName Spine skeleton filename, without the extension (e.g. `spineboy` if your file is `spineboy.json`)
     * @param pAtlasName Spine atlas filename. Defaults to the same as the skeleton (e.g. `spineboy` if your files are `spineboy@1x.atlas` and `spineboy@2x.atlas`)
     * @param pAssetType Json or binary (*.skel) format of spine skeleton data
     */
    constructor(pName, pAtlasName = pName, pAssetType = Utils_1.AssetType.SPINE_JSON) {
        super(pName, pAssetType);
        this.atlas = pAtlasName;
    }
    getLoaderOptions() {
        return {
            metadata: {
                imageNamePrefix: "spineAtlas_",
                spineAtlasFile: Utils_1.AssetUtils.getPathToAsset(this.atlas, Utils_1.AssetType.SPINE_ATLAS),
            },
        };
    }
}
exports.AssetMapSpineData = AssetMapSpineData;
//# sourceMappingURL=AssetMapSpineData.js.map