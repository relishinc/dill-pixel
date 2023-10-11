import { Point, } from 'pixi.js';
import { Make } from './Make';
import { resolveXYFromObjectOrArray } from './utils';
export class Add {
    constructor(defaultContainer) {
        this.defaultContainer = defaultContainer;
    }
    existing(pObject, position, anchor, scale) {
        const obj = this.defaultContainer.addChild(pObject);
        const dObj = obj;
        if (position !== undefined) {
            const resolvedPosition = resolveXYFromObjectOrArray(position);
            dObj?.position?.set(resolvedPosition.x, resolvedPosition.y);
        }
        if (anchor !== undefined) {
            const resolvedAnchor = resolveXYFromObjectOrArray(anchor);
            dObj?.anchor?.set(resolvedAnchor.x, resolvedAnchor.y);
        }
        if (scale !== undefined) {
            const resolvedScale = resolveXYFromObjectOrArray(scale);
            dObj?.scale?.set(resolvedScale.x, resolvedScale.y);
        }
        return obj;
    }
    coloredSprite(color = 0x0, size = {
        x: 1,
        y: 1,
    }, shape = 'rectangle', alpha = 1, position = {
        x: 0,
        y: 0,
    }, anchor = { x: 0.5, y: 0.5 }, scale = { x: 1, y: 1 }, opts) {
        const sprite = Make.coloredSprite(color, size, shape, opts);
        sprite.alpha = alpha;
        const resolvedPosition = resolveXYFromObjectOrArray(position);
        const resolvedAnchor = resolveXYFromObjectOrArray(anchor);
        const resolvedScale = resolveXYFromObjectOrArray(scale);
        sprite.x = resolvedPosition.x;
        sprite.y = resolvedPosition.y;
        sprite.anchor.x = resolvedAnchor.x;
        sprite.anchor.y = resolvedAnchor.y;
        sprite.scale.x = resolvedScale.x;
        sprite.scale.y = resolvedScale.y;
        return this.defaultContainer.addChild(sprite);
    }
    sprite(pAsset, pSheet, alpha = 1, position = { x: 0, y: 0 }, anchor = { x: 0.5, y: 0.5 }, scale = { x: 1, y: 1 }) {
        const sprite = Make.sprite(pAsset, pSheet);
        sprite.alpha = alpha;
        const resolvedPosition = resolveXYFromObjectOrArray(position);
        const resolvedAnchor = resolveXYFromObjectOrArray(anchor);
        const resolvedScale = resolveXYFromObjectOrArray(scale);
        sprite.x = resolvedPosition.x;
        sprite.y = resolvedPosition.y;
        sprite.anchor.x = resolvedAnchor.x;
        sprite.anchor.y = resolvedAnchor.y;
        sprite.scale.x = resolvedScale.x;
        sprite.scale.y = resolvedScale.y;
        return this.defaultContainer.addChild(sprite);
    }
    tilingSprite(pAsset, pSheet, alpha = 1, width = 0, height = 0, tilePosition = new Point(0, 0), position = { x: 0, y: 0 }, anchor = { x: 0.5, y: 0.5 }, scale = { x: 1, y: 1 }) {
        const sprite = Make.tilingSprite(pAsset, pSheet, width, height, tilePosition);
        sprite.alpha = alpha;
        const resolvedPosition = resolveXYFromObjectOrArray(position);
        const resolvedAnchor = resolveXYFromObjectOrArray(anchor);
        const resolvedScale = resolveXYFromObjectOrArray(scale);
        sprite.x = resolvedPosition.x;
        sprite.y = resolvedPosition.y;
        sprite.anchor.x = resolvedAnchor.x;
        sprite.anchor.y = resolvedAnchor.y;
        sprite.scale.x = resolvedScale.x;
        sprite.scale.y = resolvedScale.y;
        return this.defaultContainer.addChild(sprite);
    }
    simpleRope(pAsset, pSheet, pNumPoints = 25, pSegmentLength = 50, pAutoUpdate = true, alpha = 1, position = { x: 0, y: 0 }, scale = { x: 1, y: 1 }) {
        const points = [];
        for (let i = 0; i < pNumPoints; i++) {
            points.push(new Point(i * pSegmentLength, 0));
        }
        const rope = Make.simpleRope(pAsset, pSheet, points, pAutoUpdate);
        rope.alpha = alpha;
        const resolvedPosition = resolveXYFromObjectOrArray(position);
        const resolvedScale = resolveXYFromObjectOrArray(scale);
        rope.x = resolvedPosition.x;
        rope.y = resolvedPosition.y;
        rope.scale.x = resolvedScale.x;
        rope.scale.y = resolvedScale.y;
        return this.defaultContainer.addChild(rope);
    }
    text(pText = '', pStyle, alpha = 1, position = { x: 0, y: 0 }, anchor = { x: 0.5, y: 0.5 }, scale = { x: 1, y: 1 }) {
        const text = Make.text(pText, pStyle);
        text.alpha = alpha;
        const resolvedPosition = resolveXYFromObjectOrArray(position);
        const resolvedAnchor = resolveXYFromObjectOrArray(anchor);
        const resolvedScale = resolveXYFromObjectOrArray(scale);
        text.x = resolvedPosition.x;
        text.y = resolvedPosition.y;
        text.anchor.x = resolvedAnchor.x;
        text.anchor.y = resolvedAnchor.y;
        text.scale.x = resolvedScale.x;
        text.scale.y = resolvedScale.y;
        return this.defaultContainer.addChild(text);
    }
    htmlText(pText = '', pStyle, alpha = 1, position = { x: 0, y: 0 }, anchor = { x: 0.5, y: 0.5 }, scale = { x: 1, y: 1 }) {
        const text = Make.htmlText(pText, pStyle);
        text.alpha = alpha;
        const resolvedPosition = resolveXYFromObjectOrArray(position);
        const resolvedAnchor = resolveXYFromObjectOrArray(anchor);
        const resolvedScale = resolveXYFromObjectOrArray(scale);
        text.x = resolvedPosition.x;
        text.y = resolvedPosition.y;
        text.anchor.x = resolvedAnchor.x;
        text.anchor.y = resolvedAnchor.y;
        text.scale.x = resolvedScale.x;
        text.scale.y = resolvedScale.y;
        return this.defaultContainer.addChild(text);
    }
    // Add BitmapText
    bitmapText(pText, pStyle, alpha = 1, position = { x: 0, y: 0 }, anchor = { x: 0.5, y: 0.5 }, scale = { x: 1, y: 1 }) {
        const bitmapText = Make.bitmapText(pText, pStyle);
        bitmapText.alpha = alpha;
        const resolvedPosition = resolveXYFromObjectOrArray(position);
        const resolvedAnchor = resolveXYFromObjectOrArray(anchor);
        const resolvedScale = resolveXYFromObjectOrArray(scale);
        bitmapText.x = resolvedPosition.x;
        bitmapText.y = resolvedPosition.y;
        bitmapText.anchor.x = resolvedAnchor.x;
        bitmapText.anchor.y = resolvedAnchor.y;
        bitmapText.scale.x = resolvedScale.x;
        bitmapText.scale.y = resolvedScale.y;
        return this.defaultContainer.addChild(bitmapText);
    }
    // Add Container
    container(alpha = 1, position = { x: 0, y: 0 }, scale = { x: 1, y: 1 }) {
        const container = Make.container();
        container.alpha = alpha;
        const resolvedPosition = resolveXYFromObjectOrArray(position);
        const resolvedScale = resolveXYFromObjectOrArray(scale);
        container.x = resolvedPosition.x;
        container.y = resolvedPosition.y;
        container.scale.x = resolvedScale.x;
        container.scale.y = resolvedScale.y;
        return this.defaultContainer.addChild(container);
    }
    // Add Graphics
    graphics(alpha = 1, position = { x: 0, y: 0 }, scale = { x: 1, y: 1 }) {
        const graphics = Make.graphics();
        graphics.alpha = alpha;
        const resolvedPosition = resolveXYFromObjectOrArray(position);
        const resolvedScale = resolveXYFromObjectOrArray(scale);
        graphics.x = resolvedPosition.x;
        graphics.y = resolvedPosition.y;
        graphics.scale.x = resolvedScale.x;
        graphics.scale.y = resolvedScale.y;
        return this.defaultContainer.addChild(graphics);
    }
    nineSlice(pAsset, pSheet, leftWidth = 10, topHeight = 10, rightWidth = 10, bottomHeight = 10, alpha = 1, position = { x: 0, y: 0 }, scale = { x: 1, y: 1 }) {
        const ns = Make.nineSlice(pAsset, pSheet, leftWidth, topHeight, rightWidth, bottomHeight);
        ns.alpha = alpha;
        const resolvedPosition = resolveXYFromObjectOrArray(position);
        const resolvedScale = resolveXYFromObjectOrArray(scale);
        ns.x = resolvedPosition.x;
        ns.y = resolvedPosition.y;
        ns.scale.x = resolvedScale.x;
        ns.scale.y = resolvedScale.y;
        return this.defaultContainer.addChild(ns);
    }
}
//# sourceMappingURL=Add.js.map