// @ts-ignore
import { Assets } from "pixi.js";
/**
 * Stores data used to load and unload assets.
 */
export class AssetMapData {
    /**
     * @deprecated use asset classes from Load/Assets package
     * @param pAssetName
     * @param pAssetType
     */
    constructor(pAssetName, pAssetType) {
        /**
         * Path to the asset
         */
        this.assetPath = "";
        /**
         * If resolution suffix is set the asset is loaded only on devices with the matched asset resolution
         */
        this.resolutionSuffix = "";
        this.assetName = pAssetName;
        this.assetType = pAssetType;
    }
    getResource() {
        const resource = Assets.get(this.assetName);
        if (!resource) {
            throw new Error(`Asset ${this.assetName} is not loaded.`);
        }
        return resource;
    }
    getLoaderOptions() {
        return {
            texturePreference: { resolution: this.resolutionSuffix === `@1x` ? 1 : 2, format: ['avif', 'webp', 'png'] }
        };
    }
    isLoaded() {
        return !!Assets.get(this.assetName);
    }
    destroy() {
        // Additional actions required to destroy the asset
    }
}
//# sourceMappingURL=AssetMapData.js.map