"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetMapAudioData = void 0;
const Application_1 = require("../Application");
const Audio_1 = require("../Audio");
const AssetMapData_1 = require("./AssetMapData");
/**
 * Stores audio specific data used to load and unload assets.
 */
class AssetMapAudioData extends AssetMapData_1.AssetMapData {
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
        const track = Application_1.Application.instance.audio.getAudioTrack(this.assetName, this.category);
        if (track === undefined) {
            return false;
        }
        return track.getSource().state() !== Audio_1.HowlerUtils.State.UNLOADED;
    }
}
exports.AssetMapAudioData = AssetMapAudioData;
//# sourceMappingURL=AssetMapAudioData.js.map