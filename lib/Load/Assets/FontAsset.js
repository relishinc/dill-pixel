"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FontAsset = void 0;
const pixi_js_1 = require("pixi.js");
const Utils_1 = require("../../Utils");
const AssetMapData_1 = require("../AssetMapData");
class FontAsset extends AssetMapData_1.AssetMapData {
    constructor(assetName, assetPath) {
        super(assetName, Utils_1.AssetType.FONT);
        if (assetPath) {
            this.assetPath = assetPath;
        }
    }
    getAsset() {
        var _a;
        const data = (_a = pixi_js_1.Assets.get(this.assetName)) === null || _a === void 0 ? void 0 : _a.data;
        if (!data) {
            throw new Error(`Font asset ${this.assetName} is not loaded.`);
        }
        return data;
    }
    isLoaded() {
        return !!pixi_js_1.Assets.get(this.assetName);
    }
}
exports.FontAsset = FontAsset;
//# sourceMappingURL=FontAsset.js.map