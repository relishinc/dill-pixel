import { AssetMapData } from "./AssetMapData";

/**
 * Load token
 */
export class LoadToken {
    public readonly assets: AssetMapData[] | undefined;
    public readonly callback: (() => void);
    public readonly loadScreen: string | undefined;

    constructor(pAssets: AssetMapData[] | undefined, pCallback: () => void, pLoadScreen?: string) {
        this.assets = pAssets;
        this.callback = pCallback;
        this.loadScreen = pLoadScreen;
    }
}
