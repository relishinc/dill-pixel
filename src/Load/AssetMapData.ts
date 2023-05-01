import {Assets} from "pixi.js";
import {AssetType} from "../Utils";
import {AssetInitOptions} from "@pixi/assets/lib/Assets";

/**
 * Stores data used to load and unload assets.
 */
export class AssetMapData {
    /**
     * The name of the asset file.
     */
    public assetName: string;
    /**
     * The type of the asset file.
     */
    public assetType: AssetType;
    /**
     * Path to the asset
     */
    public assetPath: string = "";
    /**
     * If resolution suffix is set the asset is loaded only on devices with the matched asset resolution
     */
    public resolutionSuffix: string = "";

    /**
     * @deprecated use asset classes from Load/Assets package
     * @param pAssetName
     * @param pAssetType
     */
    constructor(pAssetName: string, pAssetType: AssetType) {
        this.assetName = pAssetName;
        this.assetType = pAssetType;
    }

    public getResource(): any {
        const resource = Assets.get(this.assetName);
        if (!resource) {
            throw new Error(`Asset ${this.assetName} is not loaded.`);
        }
        return resource;
    }

    public getLoaderOptions(): Partial<AssetInitOptions> | undefined {
        return {
            texturePreference: {resolution: this.resolutionSuffix === `@1x` ? 1 : 2, format: ['avif', 'webp', 'png']}
        };
    }

    public isLoaded(): boolean {
        return !!Assets.get(this.assetName);
    }

    public destroy(): void {
        // Additional actions required to destroy the asset
    }
}
