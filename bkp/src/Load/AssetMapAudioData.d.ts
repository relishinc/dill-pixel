import { AssetType } from "../Utils";
import { AssetMapData } from "./AssetMapData";
/**
 * Stores audio specific data used to load and unload assets.
 */
export declare class AssetMapAudioData extends AssetMapData {
    /**
     * The category to add this audio asset to.
     */
    category: string;
    /**
     * @deprecated use Load/Assets/AudioAsset
     * @param pName
     * @param pAssetType
     * @param pCategory
     */
    constructor(pName: string, pAssetType: AssetType, pCategory: string);
    isLoaded(): boolean;
}
//# sourceMappingURL=AssetMapAudioData.d.ts.map