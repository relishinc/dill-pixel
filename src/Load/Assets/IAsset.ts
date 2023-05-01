import {AssetMapData} from "../AssetMapData";
import {AssetInitOptions} from "@pixi/assets/lib/Assets";

/**
 * The interface extends AssetMapData for compatibility
 */
export interface IAsset<T> extends AssetMapData {
    readonly assetName: string;
    readonly assetPath: string;
    resolutionSuffix: string;

    getAsset(): T;

    getLoaderOptions(): Partial<AssetInitOptions> | undefined;

    isLoaded(): boolean;

    destroy(): void;
}
