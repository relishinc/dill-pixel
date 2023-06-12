import { AssetType } from "../Utils";
import { AssetMapData } from "./AssetMapData";
import { AssetInitOptions } from "@pixi/assets/lib/Assets";
/**
 *
 */
export declare class AssetMapSpineData extends AssetMapData {
    readonly atlas: string;
    /**
     * @deprecated use Load/Assets/SpineAsset
     * @param pName Spine skeleton filename, without the extension (e.g. `spineboy` if your file is `spineboy.json`)
     * @param pAtlasName Spine atlas filename. Defaults to the same as the skeleton (e.g. `spineboy` if your files are `spineboy@1x.atlas` and `spineboy@2x.atlas`)
     * @param pAssetType Json or binary (*.skel) format of spine skeleton data
     */
    constructor(pName: string, pAtlasName?: string, pAssetType?: AssetType.SPINE_SKEL | AssetType.SPINE_JSON);
    getLoaderOptions(): Partial<AssetInitOptions & {
        metadata: any;
    }> | undefined;
}
//# sourceMappingURL=AssetMapSpineData.d.ts.map