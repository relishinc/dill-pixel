import { AssetType, AssetUtils } from "../Utils";
import { AssetMapData } from "./AssetMapData";
/**
 *
 */
export class AssetMapSpineData extends AssetMapData {
    /**
     * @deprecated use Load/Assets/SpineAsset
     * @param pName Spine skeleton filename, without the extension (e.g. `spineboy` if your file is `spineboy.json`)
     * @param pAtlasName Spine atlas filename. Defaults to the same as the skeleton (e.g. `spineboy` if your files are `spineboy@1x.atlas` and `spineboy@2x.atlas`)
     * @param pAssetType Json or binary (*.skel) format of spine skeleton data
     */
    constructor(pName, pAtlasName = pName, pAssetType = AssetType.SPINE_JSON) {
        super(pName, pAssetType);
        this.atlas = pAtlasName;
    }
    getLoaderOptions() {
        return {
            metadata: {
                imageNamePrefix: "spineAtlas_",
                spineAtlasFile: AssetUtils.getPathToAsset(this.atlas, AssetType.SPINE_ATLAS),
            },
        };
    }
}
//# sourceMappingURL=AssetMapSpineData.js.map