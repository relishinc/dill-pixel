import { Application } from '../../core/Application';
import { AssetType } from '../../utils';
import { AssetMapAudioData } from '../AssetMapAudioData';
export class AudioAsset extends AssetMapAudioData {
    constructor(assetName, category) {
        super(assetName, AssetType.AUDIO, category);
    }
    getAsset() {
        const track = Application.instance.audio.getAudioTrack(this.assetName, this.category);
        if (!track) {
            throw new Error(`Audio asset ${this.assetName} is not loaded.`);
        }
        return track;
    }
}
//# sourceMappingURL=AudioAsset.js.map