import { AssetMapData } from "../AssetMapData";
/**
 * The interface extends AssetMapData for compatibility
 */
export interface IAsset<T> extends AssetMapData {
    readonly assetName: string;
    readonly assetPath: string;
    resolutionSuffix: string;
    getAsset(): T;
    getLoaderOptions(): Partial<any> | undefined;
    isLoaded(): boolean;
    destroy(): void;
}
//# sourceMappingURL=IAsset.d.ts.map