"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextureAsset = void 0;
const Utils_1 = require("../../Utils");
const AssetMapData_1 = require("../AssetMapData");
class TextureAsset extends AssetMapData_1.AssetMapData {
    constructor(assetName, assetPathOrType) {
        super(assetName, typeof assetPathOrType === "number" ? assetPathOrType : Utils_1.AssetType.JPG);
        if (typeof assetPathOrType === "string") {
            this.assetPath = assetPathOrType;
        }
    }
    getAsset() {
        return this.getResource().texture;
    }
}
exports.TextureAsset = TextureAsset;
//# sourceMappingURL=TextureAsset.js.map