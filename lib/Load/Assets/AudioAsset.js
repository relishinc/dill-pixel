"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioAsset = void 0;
const Application_1 = require("../../Application");
const Utils_1 = require("../../Utils");
const AssetMapAudioData_1 = require("../AssetMapAudioData");
class AudioAsset extends AssetMapAudioData_1.AssetMapAudioData {
    constructor(assetName, category) {
        super(assetName, Utils_1.AssetType.AUDIO, category);
    }
    getAsset() {
        const track = Application_1.Application.instance.audio.getAudioTrack(this.assetName, this.category);
        if (!track) {
            throw new Error(`Audio asset ${this.assetName} is not loaded.`);
        }
        return track;
    }
}
exports.AudioAsset = AudioAsset;
//# sourceMappingURL=AudioAsset.js.map