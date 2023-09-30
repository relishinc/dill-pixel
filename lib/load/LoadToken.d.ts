import { AssetMapData } from "./AssetMapData";
/**
 * Load token
 */
export declare class LoadToken {
    readonly assets: AssetMapData[] | undefined;
    readonly callback: (() => void);
    readonly loadScreen: string | undefined;
    constructor(pAssets: AssetMapData[] | undefined, pCallback: () => void, pLoadScreen?: string);
}
//# sourceMappingURL=LoadToken.d.ts.map