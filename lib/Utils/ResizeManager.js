"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResizeManager = void 0;
const pixi_js_1 = require("pixi.js");
const MathUtils = __importStar(require("../Utils/MathUtils"));
class ResizeManager {
    constructor(app, pSizeMin, pSizeMax) {
        this.app = app;
        this._sizeMin = pSizeMin;
        this._sizeMax = pSizeMax;
        this.updateRatio();
    }
    set sizeMin(pSize) {
        this._sizeMin.copyFrom(pSize);
        this.updateRatio();
    }
    set sizeMax(pSize) {
        this._sizeMax.copyFrom(pSize);
        this.updateRatio();
    }
    get windowAspectRatio() {
        return window.innerWidth / window.innerHeight;
    }
    get gameAspectRatio() {
        return MathUtils.clamp(this.windowAspectRatio, this._ratioMin, this._ratioMax);
    }
    getSize() {
        const size = new pixi_js_1.Point();
        // TODO:SH: Y scaling is currently not supported. Look into a more flexible solution
        size.y = this._sizeMax.y;
        size.x = size.y * this.gameAspectRatio;
        return size;
    }
    getStageScale() {
        // if the window is wider than we support, fill the entire height
        if (this.gameAspectRatio < this.windowAspectRatio) {
            return window.innerHeight / this.getSize().y;
        }
        // otherwise, window is narrower or equal to what we support, so we fill the entire width
        else {
            return window.innerWidth / this.getSize().x;
        }
    }
    updateRatio() {
        this._ratioMin = this._sizeMin.x / this._sizeMin.y;
        this._ratioMax = this._sizeMax.x / this._sizeMax.y;
    }
}
exports.ResizeManager = ResizeManager;
//# sourceMappingURL=ResizeManager.js.map