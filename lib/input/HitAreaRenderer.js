import { Circle, Container, Ellipse, Graphics, Point, Polygon, Rectangle, RoundedRectangle, Transform } from 'pixi.js';
import * as PixiUtils from '../utils/PixiUtils';
import { CompoundHitArea } from './CompoundHitArea';
import { PixelPerfectHitArea } from './PixelPerfectHitArea';
/**
 * Hit area renderer
 */
export class HitAreaRenderer extends Container {
    constructor(pRoot, pActive = false, pInterval = 0) {
        super();
        this._root = pRoot;
        this._interval = pInterval;
        this._elapsed = 0;
        this._active = pActive;
        this._graphics = new Graphics();
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
        this._graphics.beginFill(0xff0000, 0.25);
        this.renderRecursive(this._root);
        this._graphics.endFill();
    }
    renderSingle(target) {
        this._graphics.clear();
        this._graphics.beginFill(0xff0000, 0.25);
        this.renderTarget(target);
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
        if ((pTarget?.eventMode !== 'none' || pTarget?.interactive === true) && pTarget.worldVisible === true) {
            this.renderTarget(pTarget);
        }
        if (pTarget instanceof Container === false || pTarget.children.length === 0) {
            return;
        }
        else if (pTarget instanceof Container) {
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
        const matrixTransform = new Transform();
        if (!pTarget?.parent) {
            return;
        }
        pTarget.parent.worldTransform.decompose(matrixTransform);
        const parentScale = new Point(matrixTransform.scale.x / this.parent.scale.x, matrixTransform.scale.y / this.parent.scale.y);
        const globalScale = new Point(parentScale.x * pTarget.scale.x, parentScale.y * pTarget.scale.y);
        const hitArea = pTarget.hitArea;
        const pos = pTarget.getGlobalPosition();
        // Account for scaling of the Stage
        pos.x *= 1 / this.parent.scale.x;
        pos.y *= 1 / this.parent.scale.y;
        // TODO:SH: Account for target scale (need to find a way to parse the worldTransform)
        console.log('rendering', pTarget?.name, hitArea);
        if (hitArea instanceof Rectangle ||
            hitArea instanceof RoundedRectangle ||
            hitArea instanceof Circle ||
            hitArea instanceof Ellipse ||
            hitArea instanceof Polygon) {
            console.log('rendering rect');
            const clone = hitArea.clone();
            this._graphics.drawShape(PixiUtils.offsetShape(clone, pos));
        }
        else if (hitArea instanceof CompoundHitArea) {
            for (let i = 0; i < hitArea.components.length; ++i) {
                const clone = hitArea.components[i].clone();
                this._graphics.drawShape(PixiUtils.offsetShape(clone, pos));
            }
        }
        else if (hitArea instanceof PixelPerfectHitArea) {
            for (let x = 0; x < hitArea.width; ++x) {
                for (let y = 0; y < hitArea.height; ++y) {
                    if (hitArea.getHitAreaAtPixel(x, y)) {
                        this._graphics.drawRect(pos.x - hitArea.scaledWidth * 0.5 * globalScale.x + x * globalScale.x, pos.y - hitArea.scaledHeight * 0.5 * globalScale.y + y * globalScale.y, globalScale.x, globalScale.y);
                    }
                }
            }
        }
    }
}
//# sourceMappingURL=HitAreaRenderer.js.map