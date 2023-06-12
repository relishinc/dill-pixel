import { ISkeletonData } from "pixi-spine";
import { AssetType } from "../../Utils";
import { AssetMapData } from "../AssetMapData";
import { IAsset } from "./IAsset";
export declare class SpineAsset extends AssetMapData implements IAsset<ISkeletonData> {
    readonly atlasPath?: string;
    constructor(assetName: string, assetPathOrType?: string | AssetType.SPINE_SKEL | AssetType.SPINE_JSON, atlasPathOrName?: string);
    getAsset(): ISkeletonData;
    getLoaderOptions(): Partial<any & {
        metadata: any;
    }> | undefined;
}
//# sourceMappingURL=SpineAsset.d.ts.map