import { Texture } from "pixi.js";
import { AssetMapData } from "../AssetMapData";
import { IAsset } from "./IAsset";
export interface IBitmapFontData {
    font: string;
    size: number;
    lineHeight: number;
    chars: {
        [index: number]: IBitmapFontCharData;
    };
}
export interface IBitmapFontCharData {
    xOffset: number;
    yOffset: number;
    xAdvance: number;
    kerning: object;
    texture: Texture;
    page: string;
}
export declare class FontAsset extends AssetMapData implements IAsset<IBitmapFontData> {
    constructor(assetName: string, assetPath?: string);
    getAsset(): IBitmapFontData;
    isLoaded(): boolean;
}
//# sourceMappingURL=FontAsset.d.ts.map