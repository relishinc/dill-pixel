import { Point } from 'pixi.js';
import * as MathUtils from './MathUtils';
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
    get options() {
        console.error('ResizeManager: options is not implemented in the old ResizeManager');
        return {
            autoScroll: false,
            useAspectRatio: false,
            fixed: false,
            minSize: { width: 0, height: 0 },
        };
    }
    set options(value) {
        console.error('ResizeManager: options is not implemented in the old ResizeManager');
    }
    get size() {
        return this.getSize();
    }
    get screenSize() {
        return new Point(this.app.renderer.view.width, this.app.renderer.view.height);
    }
    get scale() {
        console.warn("ResizeManager: this is the old ResizeManager - scale isn't implemented.  Probably use getStageScale() instead");
        return 1;
    }
    get scaleX() {
        console.warn("ResizeManager: this is the old ResizeManager - scaleX isn't implemented.  Probably use getStageScale() instead");
        return 1;
    }
    get scaleY() {
        console.warn("ResizeManager: this is the old ResizeManager - scaleY isn't implemented.  Probably use getStageScale() instead");
        return 1;
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
    initialize() { }
    resize() { }
    getSize() {
        const size = new Point();
        size.y = this._sizeMax.y;
        size.x = size.y * this.gameAspectRatio;
        return size;
    }
    setDesiredSize(desiredSize, maxFactor = 4) {
        const sizeMin = new Point(desiredSize.x, desiredSize.y);
        const sizeMax = new Point(desiredSize.x * maxFactor, desiredSize.y * maxFactor);
        this._desiredSizeConfig = {
            size: desiredSize,
            maxFactor: maxFactor,
            sizeMin,
            sizeMax,
            ratioMin: sizeMin.x / sizeMin.y,
            ratioMax: sizeMax.x / sizeMax.y,
        };
    }
    getScaleRatio(size = this.app.size) {
        let scale = 1;
        if (this._desiredSizeConfig) {
            const newAspectRatio = size.x / size.y;
            const desiredAspectRatio = MathUtils.clamp(newAspectRatio, this._desiredSizeConfig.ratioMin, this._desiredSizeConfig.ratioMax);
            if (desiredAspectRatio < newAspectRatio) {
                scale = size.y / this._desiredSizeConfig.size.y;
            }
            else {
                scale = size.x / this._desiredSizeConfig.size.x;
            }
        }
        else {
            console.warn('ResizeManager: desiredSize is not set. Set it first using setDesiredSize()');
        }
        return scale;
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