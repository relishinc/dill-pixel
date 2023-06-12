import { Point } from "pixi.js";
import * as MathUtils from "../Utils/MathUtils";
export class ResizeManager {
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
        const size = new Point();
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
//# sourceMappingURL=ResizeManager.js.map