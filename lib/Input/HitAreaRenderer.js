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
exports.HitAreaRenderer = void 0;
const PIXI = __importStar(require("pixi.js"));
const CompoundHitArea_1 = require("../Input/CompoundHitArea");
const PixelPerfectHitArea_1 = require("../Input/PixelPerfectHitArea");
const PixiUtils = __importStar(require("../Utils/PixiUtils"));
/**
 * Hit area renderer
 */
class HitAreaRenderer extends PIXI.Container {
    constructor(pRoot, pActive = false, pInterval = 0) {
        super();
        this._root = pRoot;
        this._interval = pInterval;
        this._elapsed = 0;
        this._active = pActive;
        this._graphics = new PIXI.Graphics();
        this.addChild(this._graphics);
    }
    /**
     * Gets active
     */
    get active() {
        return this._active;
    }
    /**
     * Sets active
     */
    set active(pValue) {
        this._active = pValue;
        if (this._active === false) {
            this.clear();
        }
        else {
            this.renderHitAreas();
        }
    }
    /**
     * Sets interval
     */
    set interval(pValue) {
        this._interval = pValue;
    }
    /**
     *
     * @param pDeltaTime
     */
    update(pDeltaTime) {
        if (this._active) {
            if (this._interval > 0) {
                this._elapsed += pDeltaTime;
            }
            if (this._elapsed >= this._interval) {
                this._elapsed %= this._interval;
                this.renderHitAreas();
            }
        }
    }
    /**
     * Renders hit area renderer
     */
    renderHitAreas() {
        this._graphics.clear();
        this._graphics.beginFill(0xFF0000, 0.25);
        this.renderRecursive(this._root);
        this._graphics.endFill();
    }
    /**
     * Clears hit area renderer
     */
    clear() {
        this._graphics.clear();
    }
    /**
     * Renders recursive
     * @param pTarget
     * @returns recursive
     */
    renderRecursive(pTarget) {
        if (pTarget.interactive === true && pTarget.worldVisible === true) {
            this.renderTarget(pTarget);
        }
        if ((pTarget instanceof PIXI.Container) === false || pTarget.children.length === 0) {
            return;
        }
        else if ((pTarget instanceof PIXI.Container)) {
            if (pTarget.interactiveChildren === true) {
                for (let i = 0; i < pTarget.children.length; ++i) {
                    this.renderRecursive(pTarget.children[i]);
                }
            }
        }
    }
    /**
     * Renders target
     * @param pTarget
     */
    renderTarget(pTarget) {
        const matrixTransform = new PIXI.Transform();
        pTarget.parent.worldTransform.decompose(matrixTransform);
        const parentScale = new PIXI.Point(matrixTransform.scale.x / this.parent.scale.x, matrixTransform.scale.y / this.parent.scale.y);
        const globalScale = new PIXI.Point(parentScale.x * pTarget.scale.x, parentScale.y * pTarget.scale.y);
        const hitArea = pTarget.hitArea;
        const pos = pTarget.getGlobalPosition();
        // Account for scaling of the Stage
        pos.x *= 1 / this.parent.scale.x;
        pos.y *= 1 / this.parent.scale.y;
        // TODO:SH: Account for target scale (need to find a way to parse the worldTransform)
        if (hitArea instanceof PIXI.Rectangle || hitArea instanceof PIXI.RoundedRectangle ||
            hitArea instanceof PIXI.Circle || hitArea instanceof PIXI.Ellipse || hitArea instanceof PIXI.Polygon) {
            const clone = hitArea.clone();
            this._graphics.drawShape(PixiUtils.offsetShape(clone, pos));
        }
        else if (hitArea instanceof CompoundHitArea_1.CompoundHitArea) {
            for (let i = 0; i < hitArea.components.length; ++i) {
                const clone = hitArea.components[i].clone();
                this._graphics.drawShape(PixiUtils.offsetShape(clone, pos));
            }
        }
        else if (hitArea instanceof PixelPerfectHitArea_1.PixelPerfectHitArea) {
            for (let x = 0; x < hitArea.width; ++x) {
                for (let y = 0; y < hitArea.height; ++y) {
                    if (hitArea.getHitAreaAtPixel(x, y)) {
                        this._graphics.drawRect(pos.x - (hitArea.scaledWidth * 0.5 * globalScale.x) + (x * globalScale.x), pos.y - (hitArea.scaledHeight * 0.5 * globalScale.y) + (y * globalScale.y), globalScale.x, globalScale.y);
                    }
                }
            }
        }
    }
}
exports.HitAreaRenderer = HitAreaRenderer;
//# sourceMappingURL=HitAreaRenderer.js.map