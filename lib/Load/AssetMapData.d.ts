import { AssetType } from "../Utils";
import { AssetInitOptions } from "@pixi/assets/lib/Assets";
/**
 * Stores data used to load and unload assets.
 */
export declare class AssetMapData {
    /**
     * The name of the asset file.
     */
    assetName: string;
    /**
     * The type of the asset file.
     */
    assetType: AssetType;
    /**
     * Path to the asset
     */
    assetPath: string;
    /**
     * If resolution suffix is set the asset is loaded only on devices with the matched asset resolution
     */
    resolutionSuffix: string;
    /**
     * @deprecated use asset classes from Load/Assets package
     * @param pAssetName
     * @param pAssetType
     */
    constructor(pAssetName: string, pAssetType: AssetType);
    getResource(): any;
    getLoaderOptions(): Partial<AssetInitOptions> | undefined;
    isLoaded(): boolean;
    destroy(): void;
}
//# sourceMappingURL=AssetMapData.d.ts.map