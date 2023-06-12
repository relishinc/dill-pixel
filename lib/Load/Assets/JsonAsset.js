"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonAsset = void 0;
const Utils_1 = require("../../Utils");
const AssetMapData_1 = require("../AssetMapData");
class JsonAsset extends AssetMapData_1.AssetMapData {
    constructor(assetName, assetPath) {
        super(assetName, Utils_1.AssetType.JSON);
        if (assetPath) {
            this.assetPath = assetPath;
        }
    }
    getAsset() {
        return this.getResource().data;
    }
}
exports.JsonAsset = JsonAsset;
//# sourceMappingURL=JsonAsset.js.map