import { Bounds, Sprite } from 'pixi.js';
import { Container } from '../../../display/Container';
import { System } from './System';
export class Entity extends Container {
    isActor = false;
    isSolid = false;
    isSensor = false;
    debug = false;
    debugColors = {
        bounds: 0xff0000,
        outerBounds: 0x00ff00,
    };
    type = 'Solid';
    view;
    isCollideable = true;
    xRemainder = 0;
    yRemainder = 0;
    config;
    constructor(config) {
        super();
        this.config = config;
    }
    _cachedBounds = null;
    get cachedBounds() {
        if (!this._cachedBounds || this._dirtyBounds) {
            const bounds = this.view.getBounds();
            bounds.scale(1 / this.system.container.worldTransform.d);
            this._cachedBounds = bounds;
        }
        return this._cachedBounds;
    }
    set cachedBounds(value) {
        this._cachedBounds = value;
    }
    _dirtyBounds = true;
    get dirtyBounds() {
        return this._dirtyBounds;
    }
    set dirtyBounds(value) {
        this._dirtyBounds = value;
    }
    get top() {
        return this.getBoundingBox().top;
    }
    get bottom() {
        return this.getBoundingBox().bottom;
    }
    get left() {
        return this.getBoundingBox().left;
    }
    get right() {
        return this.getBoundingBox().right;
    }
    get system() {
        return System;
    }
    get collideables() {
        return [];
    }
    getWorldBounds() {
        const pos = this.system.container.toLocal(this.view.getGlobalPosition());
        const bounds = this.cachedBounds;
        bounds.x = pos.x;
        bounds.y = pos.y;
        if (this.view instanceof Sprite && this.view.anchor) {
            bounds.x -= this.view.width * this.view.anchor.x;
            bounds.y -= this.view.height * this.view.anchor.y;
        }
        return bounds;
    }
    getBoundingBox() {
        const bounds = this.getWorldBounds();
        return bounds instanceof Bounds ? bounds.rectangle : bounds;
    }
    getOuterBoundingBox() {
        return null;
    }
    initialize() { }
}
