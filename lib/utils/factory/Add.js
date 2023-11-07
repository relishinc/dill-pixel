import { Geometry, State } from '@pixi/core';
import { DRAW_MODES, Texture, } from 'pixi.js';
import { Make, } from './Make';
import { resolvePointLike } from './utils';
export class Add {
    constructor(defaultContainer) {
        this.defaultContainer = defaultContainer;
    }
    existing(pObject, settingsOrPosition, anchor, scale) {
        let position = settingsOrPosition;
        if (settingsOrPosition &&
            typeof settingsOrPosition === 'object' &&
            !settingsOrPosition.hasOwnProperty('x') &&
            !settingsOrPosition.hasOwnProperty('y')) {
            const settings = settingsOrPosition;
            position = settings?.position ?? 0;
            anchor = settings?.anchor ?? 0;
            scale = settings?.scale ?? 1;
        }
        const obj = this.defaultContainer.addChild(pObject);
        const dObj = obj;
        if (position !== undefined) {
            const resolvedPosition = resolvePointLike(position);
            dObj?.position?.set(resolvedPosition.x, resolvedPosition.y);
        }
        if (anchor !== undefined) {
            const resolvedAnchor = resolvePointLike(anchor);
            dObj?.anchor?.set(resolvedAnchor.x, resolvedAnchor.y);
        }
        if (scale !== undefined) {
            const resolvedScale = resolvePointLike(scale);
            dObj?.scale?.set(resolvedScale.x, resolvedScale.y);
        }
        return obj;
    }
    coloredSprite(settingsOrColor = 0x0, size = {
        x: 1,
        y: 1,
    }, shape = 'rectangle', opts, alpha = 1, position = 0, anchor = 0.5, scale = 1) {
        let sprite;
        if (typeof settingsOrColor === 'object') {
            sprite = Make.coloredSprite(settingsOrColor);
        }
        else {
            sprite = Make.coloredSprite(settingsOrColor, size, shape, opts, alpha, position, anchor, scale);
        }
        return this.defaultContainer.addChild(sprite);
    }
    sprite(settingsOrAsset, sheet, alpha = 1, position = 0, anchor = 0.5, scale = 1) {
        const sprite = settingsOrAsset instanceof Texture || typeof settingsOrAsset === 'string'
            ? Make.sprite(settingsOrAsset, sheet, alpha, position, anchor, scale)
            : Make.sprite(settingsOrAsset);
        return this.defaultContainer.addChild(sprite);
    }
    tilingSprite(settingsOrAsset, sheet, width = 1, height = 1, tilePosition = 0, alpha = 1, position = 0, anchor = 0.5, scale = 1) {
        const sprite = typeof settingsOrAsset === 'string' || settingsOrAsset instanceof Texture
            ? Make.tilingSprite(settingsOrAsset, sheet, width, height, tilePosition, alpha, position, anchor, scale)
            : Make.tilingSprite(settingsOrAsset);
        return this.defaultContainer.addChild(sprite);
    }
    text(settingsOrValue = '', style, alpha = 1, position = 0, anchor = 0.5, scale = 1) {
        const text = typeof settingsOrValue === 'object'
            ? Make.text(settingsOrValue)
            : Make.text(settingsOrValue, style, alpha, position, anchor, scale);
        return this.defaultContainer.addChild(text);
    }
    htmlText(settingsOrValue = '', style, alpha = 1, position = 0, anchor = 0.5, scale = 1) {
        const text = typeof settingsOrValue === 'string'
            ? Make.htmlText(settingsOrValue, style, alpha, position, anchor, scale)
            : Make.htmlText(settingsOrValue);
        return this.defaultContainer.addChild(text);
    }
    bitmapText(settingsOrValue = '', style, alpha = 1, position = 0, anchor = 0.5, scale = 1) {
        const bitmapText = typeof settingsOrValue === 'string'
            ? Make.bitmapText(settingsOrValue, style, alpha, position, anchor, scale)
            : Make.bitmapText(settingsOrValue);
        return this.defaultContainer.addChild(bitmapText);
    }
    container(settingsOrAlpha = 1, position = 0, scale = 1) {
        let container;
        if (typeof settingsOrAlpha === 'object') {
            container = Make.container(settingsOrAlpha);
        }
        else {
            container = Make.container(settingsOrAlpha, position, scale);
        }
        return this.defaultContainer.addChild(container);
    }
    flexContainer(settingsOrAlpha = 1, position = 0, settings = {}, scale = 1) {
        const container = typeof settingsOrAlpha === 'object'
            ? Make.flexContainer(settingsOrAlpha)
            : Make.flexContainer(settingsOrAlpha, position, settings, scale);
        return this.defaultContainer.addChild(container);
    }
    graphics(settingsOrAlpha = 1, position = 0, scale = 1) {
        const graphics = typeof settingsOrAlpha === 'object'
            ? Make.graphics(settingsOrAlpha)
            : Make.graphics(settingsOrAlpha, position, scale);
        return this.defaultContainer.addChild(graphics);
    }
    nineSlice(settingsOrAsset, sheet, leftWidth = 10, topHeight = 10, rightWidth = 10, bottomHeight = 10, alpha = 1, position = 0, scale = 1) {
        const ns = typeof settingsOrAsset === 'string' || settingsOrAsset instanceof Texture
            ? Make.nineSlice(settingsOrAsset, sheet, leftWidth, topHeight, rightWidth, bottomHeight, alpha, position, scale)
            : Make.nineSlice(settingsOrAsset);
        return this.defaultContainer.addChild(ns);
    }
    mesh(settingsOrGeometry, shader, state = State.for2d(), drawMode = DRAW_MODES.LINE_LOOP) {
        const mesh = settingsOrGeometry instanceof Geometry
            ? Make.mesh(settingsOrGeometry, shader, state, drawMode)
            : Make.mesh(settingsOrGeometry);
        return this.defaultContainer.addChild(mesh);
    }
    simpleRope(settingsOrAsset, sheet, numPoints = 25, segmentLength = 50, autoUpdate, alpha = 1, position = 0, scale = 1) {
        const sr = typeof settingsOrAsset === 'string' || settingsOrAsset instanceof Texture
            ? Make.simpleRope(settingsOrAsset, sheet, numPoints, segmentLength, autoUpdate, alpha, position, scale)
            : Make.simpleRope(settingsOrAsset);
        this.defaultContainer.addChild(sr.rope);
        return sr;
    }
    simplePlane(settingsOrAsset, sheet, vertsWidth = 1, vertsHeight = 1, alpha = 1, position = 0, scale = 1) {
        const sp = typeof settingsOrAsset === 'string' || settingsOrAsset instanceof Texture
            ? Make.simplePlane(settingsOrAsset, sheet, vertsWidth, vertsHeight, alpha, position, scale)
            : Make.simplePlane(settingsOrAsset);
        return sp;
    }
}
//# sourceMappingURL=Add.js.map