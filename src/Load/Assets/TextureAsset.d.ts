import { Texture } from "pixi.js";
import { AssetType } from "../../Utils";
import { AssetMapData } from "../AssetMapData";
import { IAsset } from "./IAsset";
export declare class TextureAsset extends AssetMapData implements IAsset<Texture> {
    constructor(assetName: string, assetPathOrType?: string | AssetType.JPG | AssetType.PNG);
    getAsset(): Texture;
}
//# sourceMappingURL=TextureAsset.d.ts.map