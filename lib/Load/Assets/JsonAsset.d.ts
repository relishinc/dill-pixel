import { AssetMapData } from "../AssetMapData";
import { IAsset } from "./IAsset";
export declare class JsonAsset<T> extends AssetMapData implements IAsset<T> {
    constructor(assetName: string, assetPath?: string);
    getAsset(): T;
}
//# sourceMappingURL=JsonAsset.d.ts.map