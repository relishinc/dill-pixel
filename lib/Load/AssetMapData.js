"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetMapData = void 0;
const pixi_js_1 = require("pixi.js");
/**
 * Stores data used to load and unload assets.
 */
class AssetMapData {
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
        const resource = pixi_js_1.Assets.get(this.assetName);
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
        return !!pixi_js_1.Assets.get(this.assetName);
    }
    destroy() {
        // Additional actions required to destroy the asset
    }
}
exports.AssetMapData = AssetMapData;
//# sourceMappingURL=AssetMapData.js.map