import { Point } from "pixi.js";
import * as MathUtils from "../Utils/MathUtils";
export class ResizeManager {
    constructor(app, pSizeMin, pSizeMax) {
        this.app = app;
        this._useAspectRatio = false;
        if (pSizeMin) {
            this._useAspectRatio = true;
            this._sizeMin = pSizeMin;
            if (pSizeMax) {
                this._sizeMax = pSizeMax;
            }
            else {
                this._sizeMax = pSizeMin;
            }
        }
        if (this._useAspectRatio) {
            this.updateRatio();
        }
        else {
            this._sizeMin = new Point(0, 0);
            this._sizeMax = new Point(0, 0);
        }
    }
    get useAspectRatio() {
        return this._useAspectRatio;
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