"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextureAtlasAsset = void 0;
const Utils_1 = require("../../Utils");
const AssetMapData_1 = require("../AssetMapData");
class TextureAtlasAsset extends AssetMapData_1.AssetMapData {
    constructor(assetName, assetPath) {
        super(assetName, Utils_1.AssetType.TEXTURE_ATLAS);
        if (assetPath) {
            this.assetPath = assetPath;
        }
    }
    getAsset() {
        return this.getResource().textures;
    }
}
exports.TextureAtlasAsset = TextureAtlasAsset;
//# sourceMappingURL=TextureAtlasAsset.js.map