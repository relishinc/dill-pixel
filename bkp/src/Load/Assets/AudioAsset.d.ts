import { IAudioTrack } from "../../Audio";
import { AssetMapAudioData } from "../AssetMapAudioData";
import { IAsset } from "./IAsset";
export declare class AudioAsset extends AssetMapAudioData implements IAsset<IAudioTrack> {
    constructor(assetName: string, category: string);
    getAsset(): IAudioTrack;
}
//# sourceMappingURL=AudioAsset.d.ts.map