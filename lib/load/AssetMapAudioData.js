import { Application } from '../core/Application';
import { HowlerUtils } from '../audio';
import { AssetMapData } from './AssetMapData';
/**
 * Stores audio specific data used to load and unload assets.
 */
export class AssetMapAudioData extends AssetMapData {
    /**
     * @deprecated use Load/Assets/AudioAsset
     * @param pName
     * @param pAssetType
     * @param pCategory
     */
    constructor(pName, pAssetType, pCategory) {
        super(pName, pAssetType);
        this.category = pCategory;
    }
    isLoaded() {
        const track = Application.instance.audio.getAudioTrack(this.assetName, this.category);
        if (track === undefined) {
            return false;
        }
        return track.getSource().state() !== HowlerUtils.State.UNLOADED;
    }
}
//# sourceMappingURL=AssetMapAudioData.js.map