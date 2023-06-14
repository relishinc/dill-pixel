import * as PIXI from "pixi.js";
import {CompoundHitArea} from "../Input/CompoundHitArea";
import {PixelPerfectHitArea} from "../Input/PixelPerfectHitArea";
import * as PixiUtils from "../Utils/PixiUtils";

/**
 * Hit area renderer
 */
export class HitAreaRenderer extends PIXI.Container {
    private _root: PIXI.DisplayObject;
    private _graphics: PIXI.Graphics;
    private _interval: number;
    private _elapsed: number;
    private _active: boolean;

    constructor(pRoot: PIXI.DisplayObject, pActive: boolean = false, pInterval: number = 0) {
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
    public get active(): boolean {
        return this._active;
    }

    /**
     * Sets active
     */
    public set active(pValue: boolean) {
        this._active = pValue;
        if (this._active === false) {
            this.clear();
        } else {
            this.renderHitAreas();
        }
    }

    /**
     * Sets interval
     */
    public set interval(pValue: number) {
        this._interval = pValue;
    }

    /**
     *
     * @param pDeltaTime
     */
    public update(pDeltaTime: number): void {
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
    public renderHitAreas(): void {
        this._graphics.clear();
        this._graphics.beginFill(0xFF0000, 0.25);
        this.renderRecursive(this._root);
        this._graphics.endFill();
    }

    /**
     * Clears hit area renderer
     */
    public clear(): void {
        this._graphics.clear();
    }

    /**
     * Renders recursive
     * @param pTarget
     * @returns recursive
     */
    private renderRecursive(pTarget: PIXI.Container | PIXI.DisplayObject): void {
        if (pTarget.interactive === true && pTarget.worldVisible === true) {
            this.renderTarget(pTarget);
        }

        if ((pTarget instanceof PIXI.Container) === false || (pTarget as PIXI.Container).children.length === 0) {
            return;
        } else if ((pTarget instanceof PIXI.Container)) {
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
    private renderTarget(pTarget: PIXI.DisplayObject): void {
        const matrixTransform: PIXI.Transform = new PIXI.Transform();
        pTarget.parent.worldTransform.decompose(matrixTransform);

        const parentScale: PIXI.Point = new PIXI.Point(
            matrixTransform.scale.x / this.parent.scale.x,
            matrixTransform.scale.y / this.parent.scale.y,
        );

        const globalScale: PIXI.Point = new PIXI.Point(
            parentScale.x * pTarget.scale.x,
            parentScale.y * pTarget.scale.y,
        );
        const hitArea: PIXI.IHitArea | null = pTarget.hitArea;
        const pos: PIXI.Point = pTarget.getGlobalPosition();
        // Account for scaling of the Stage
        pos.x *= 1 / this.parent.scale.x;
        pos.y *= 1 / this.parent.scale.y;
        // TODO:SH: Account for target scale (need to find a way to parse the worldTransform)

        if (
            hitArea instanceof PIXI.Rectangle || hitArea instanceof PIXI.RoundedRectangle ||
            hitArea instanceof PIXI.Circle || hitArea instanceof PIXI.Ellipse || hitArea instanceof PIXI.Polygon
        ) {
            const clone: PixiUtils.PixiShape = hitArea.clone();
            this._graphics.drawShape(PixiUtils.offsetShape(clone, pos));
        } else if (hitArea instanceof CompoundHitArea) {
            for (let i = 0; i < hitArea.components.length; ++i) {
                const clone: PixiUtils.PixiShape = hitArea.components[i].clone();
                this._graphics.drawShape(PixiUtils.offsetShape(clone, pos));
            }
        } else if (hitArea instanceof PixelPerfectHitArea) {
            for (let x = 0; x < hitArea.width; ++x) {
                for (let y = 0; y < hitArea.height; ++y) {
                    if (hitArea.getHitAreaAtPixel(x, y)) {
                        this._graphics.drawRect(
                            pos.x - (hitArea.scaledWidth * 0.5 * globalScale.x) + (x * globalScale.x),
                            pos.y - (hitArea.scaledHeight * 0.5 * globalScale.y) + (y * globalScale.y),
                            globalScale.x,
                            globalScale.y,
                        );
                    }
                }
            }
        }
    }
}
