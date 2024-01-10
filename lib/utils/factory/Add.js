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
            ('position' in settingsOrPosition || 'anchor' in settingsOrPosition || 'scale' in settingsOrPosition)) {
            const settings = settingsOrPosition;
            position = settings?.position;
            anchor = settings?.anchor;
            scale = settings?.scale;
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
    }, shape = 'rectangle', opts, alpha, position, anchor, scale) {
        let sprite;
        if (typeof settingsOrColor === 'object') {
            sprite = Make.coloredSprite(settingsOrColor);
        }
        else {
            sprite = Make.coloredSprite(settingsOrColor, size, shape, opts, alpha, position, anchor, scale);
        }
        return this.defaultContainer.addChild(sprite);
    }
    sprite(settingsOrAsset, sheet, alpha, position, anchor, scale) {
        const sprite = settingsOrAsset instanceof Texture || typeof settingsOrAsset === 'string'
            ? Make.sprite(settingsOrAsset, sheet, alpha, position, anchor, scale)
            : Make.sprite(settingsOrAsset);
        return this.defaultContainer.addChild(sprite);
    }
    tilingSprite(settingsOrAsset, sheet, width = 1, height = 1, tilePosition = 0, alpha, position, anchor, scale) {
        const sprite = typeof settingsOrAsset === 'string' || settingsOrAsset instanceof Texture
            ? Make.tilingSprite(settingsOrAsset, sheet, width, height, tilePosition, alpha, position, anchor, scale)
            : Make.tilingSprite(settingsOrAsset);
        return this.defaultContainer.addChild(sprite);
    }
    text(settingsOrValue = '', style, alpha, position, anchor, scale) {
        const text = typeof settingsOrValue === 'object'
            ? Make.text(settingsOrValue)
            : Make.text(settingsOrValue, style, alpha, position, anchor, scale);
        return this.defaultContainer.addChild(text);
    }
    htmlText(settingsOrValue = '', style, alpha, position, anchor, scale) {
        const text = typeof settingsOrValue === 'string'
            ? Make.htmlText(settingsOrValue, style, alpha, position, anchor, scale)
            : Make.htmlText(settingsOrValue);
        return this.defaultContainer.addChild(text);
    }
    bitmapText(settingsOrValue = '', style, alpha, position, anchor, scale) {
        const bitmapText = typeof settingsOrValue === 'string'
            ? Make.bitmapText(settingsOrValue, style, alpha, position, anchor, scale)
            : Make.bitmapText(settingsOrValue);
        return this.defaultContainer.addChild(bitmapText);
    }
    container(settingsOrAlpha, position, scale) {
        let container;
        if (typeof settingsOrAlpha === 'object') {
            container = Make.container(settingsOrAlpha);
        }
        else {
            container = Make.container(settingsOrAlpha, position, scale);
        }
        return this.defaultContainer.addChild(container);
    }
    flexContainer(settingsOrAlpha, position, settings = {}, scale) {
        const container = typeof settingsOrAlpha === 'object'
            ? Make.flexContainer(settingsOrAlpha)
            : Make.flexContainer(settingsOrAlpha, position, settings, scale);
        return this.defaultContainer.addChild(container);
    }
    graphics(settingsOrAlpha, position, scale) {
        const graphics = typeof settingsOrAlpha === 'object'
            ? Make.graphics(settingsOrAlpha)
            : Make.graphics(settingsOrAlpha, position, scale);
        return this.defaultContainer.addChild(graphics);
    }
    nineSlice(settingsOrAsset, sheet, leftWidth, topHeight, rightWidth, bottomHeight, alpha, position, scale) {
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
    simpleRope(settingsOrAsset, sheet, numPoints = 25, segmentLength = 50, autoUpdate, alpha, position, scale) {
        const sr = typeof settingsOrAsset === 'string' || settingsOrAsset instanceof Texture
            ? Make.simpleRope(settingsOrAsset, sheet, numPoints, segmentLength, autoUpdate, alpha, position, scale)
            : Make.simpleRope(settingsOrAsset);
        this.defaultContainer.addChild(sr.rope);
        return sr;
    }
    simplePlane(settingsOrAsset, sheet, vertsWidth = 1, vertsHeight = 1, alpha, position, scale) {
        const sp = typeof settingsOrAsset === 'string' || settingsOrAsset instanceof Texture
            ? Make.simplePlane(settingsOrAsset, sheet, vertsWidth, vertsHeight, alpha, position, scale)
            : Make.simplePlane(settingsOrAsset);
        this.defaultContainer.addChild(sp);
        return sp;
    }
    // animatedSprite
    animatedSprite(settings) {
        const animatedSprite = Make.animatedSprite(settings);
        this.defaultContainer.addChild(animatedSprite);
        return animatedSprite;
    }
    spine(settings) {
        const spine = Make.spine(settings);
        this.defaultContainer.addChild(spine);
        return spine;
    }
}
//# sourceMappingURL=Add.js.map