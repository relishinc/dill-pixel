import * as PIXI from "pixi.js";
import {AssetType} from "../../Utils";
import {AssetMapData} from "../AssetMapData";
import {IAsset} from "./IAsset";

export class TextureAsset extends AssetMapData implements IAsset<PIXI.Texture> {

    constructor(assetName: string, assetPathOrType?: string | AssetType.JPG | AssetType.PNG) {
        super(assetName, typeof assetPathOrType === "number" ? assetPathOrType : AssetType.JPG);
        if (typeof assetPathOrType === "string") {
            this.assetPath = assetPathOrType;
        }
    }

    public getAsset(): PIXI.Texture {
        return this.getResource().texture!;
    }
}
