import { Point } from "pixi.js";
import * as MathUtils from "../Utils/MathUtils";
/**
 * Pixel perfect hit area
 */
export class PixelPerfectHitArea {
    constructor(pRenderer, pTarget, pThreshhold = 0) {
        this._target = pTarget;
        this._norm = new Point();
        this._pixel = new Point();
        const data = pRenderer.plugins.extract.pixels(pTarget);
        let widthOffset = 0;
        let heightOffset = 0;
        // Apply offset to measurements to account for decimal values when using retina assets
        if (pTarget.texture.width % 1 !== 0) {
            widthOffset = -0.5;
        }
        if (pTarget.texture.height % 1 !== 0) {
            heightOffset = -0.5;
        }
        this._map = new Array();
        for (let x = 0; x < pTarget.texture.width + widthOffset; ++x) {
            this._map.push(new Array());
            for (let y = 0; y < pTarget.texture.height + heightOffset; ++y) {
                this._map[x][y] = data[(y * (pTarget.texture.width + widthOffset) + x) * 4 + 3] > pThreshhold;
            }
        }
    }
    /**
     * Gets width
     */
    get width() {
        return this._map.length;
    }
    /**
     * Gets scaled width
     */
    get scaledWidth() {
        return this.width * this._target.scale.x;
    }
    /**
     * Gets height
     */
    get height() {
        return this._map[0].length;
    }
    /**
     * Gets scaled height
     */
    get scaledHeight() {
        return this.height * this._target.scale.y;
    }
    /**
     * Gets hit area at pixel
     * @param pX
     * @param pY
     * @returns boolean
     */
    getHitAreaAtPixel(pX, pY) {
        return this._map[pX][pY];
    }
    /**
     * Contains pixel perfect hit area
     * @param pX
     * @param pY
     * @returns boolean
     */
    contains(pX, pY) {
        this._norm.x = (pX + this.width * this._target.anchor.x) / this.width;
        this._norm.y = (pY + this.height * this._target.anchor.y) / this.height;
        // If we are within the bounds of the texture
        if (this._norm.x >= 0 && this._norm.x <= 1 && this._norm.y >= 0 && this._norm.y <= 1) {
            this._pixel.x = Math.floor(MathUtils.clamp(this._norm.x * this._map.length, 0, this._map.length - 1));
            this._pixel.y = Math.floor(MathUtils.clamp(this._norm.y * this._map[0].length, 0, this._map[0].length - 1));
            return this._map[this._pixel.x][this._pixel.y];
        }
        else {
            return false;
        }
    }
}
//# sourceMappingURL=PixelPerfectHitArea.js.map