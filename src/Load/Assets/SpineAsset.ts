import {AssetType, AssetUtils} from "../../Utils";
import {AssetMapData} from "../AssetMapData";
import {IAsset} from "./IAsset";
import {ISkeletonData} from "pixi-spine";
import {AssetInitOptions} from "@pixi/assets/lib/Assets";

export class SpineAsset extends AssetMapData implements IAsset<ISkeletonData> {

    public readonly atlasPath?: string;

    constructor(assetName: string, assetPathOrType?: string | AssetType.SPINE_SKEL | AssetType.SPINE_JSON, atlasPathOrName?: string) {
        super(assetName, typeof assetPathOrType === "number" ? assetPathOrType : AssetType.SPINE_JSON);
        if (typeof assetPathOrType === "string") {
            this.assetPath = assetPathOrType;
        }
        this.atlasPath = atlasPathOrName;
    }

    public getAsset(): ISkeletonData {
        return this.getResource().spineData!;
    }

    public getLoaderOptions(): Partial<AssetInitOptions & { metadata: any }> | undefined {
        if (this.atlasPath) {
            const atlasPath = this.atlasPath.indexOf("/") >= 0
                ? AssetUtils.replaceResolutionToken(this.atlasPath)
                : AssetUtils.getPathToAsset(this.atlasPath, AssetType.SPINE_ATLAS);
            return {
                metadata: {
                    imageNamePrefix: "spineAtlas_",
                    spineAtlasFile: atlasPath,
                },
            };
        }
        return undefined;
    }
}
