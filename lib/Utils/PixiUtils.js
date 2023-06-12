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
exports.getGlobalBounds = exports.makeSpine = exports.SpineTrack = exports.makeText = exports.getTexture = exports.makeSprite = exports.offsetSimpleShape = exports.offsetShape = exports.sendToBack = exports.sendToFront = exports.objectDiagonal = exports.setAnchor = exports.setParent = exports.cloneHitArea = void 0;
const runtime_4_1_1 = require("@pixi-spine/runtime-4.1");
const pixi_js_1 = require("pixi.js");
const PointUtils = __importStar(require("../Utils/PointUtils"));
// TODO:SH: Look into a better solution for this
/**
 * Clone Hit Area
 * @param pHitArea
 */
function cloneHitArea(pHitArea) {
    if (pHitArea instanceof pixi_js_1.Rectangle ||
        pHitArea instanceof pixi_js_1.Circle ||
        pHitArea instanceof pixi_js_1.Ellipse ||
        pHitArea instanceof pixi_js_1.Polygon ||
        pHitArea instanceof pixi_js_1.RoundedRectangle) {
        return pHitArea.clone();
    }
    else {
        console.log("PixiUtils.cloneHitArea: Clone failed. Can only clone PIXI geometry primitives");
        return undefined;
    }
}
exports.cloneHitArea = cloneHitArea;
// TODO:SH: Find more descriptive names for these functions
// TODO:SH: Look at: https://github.com/pixijs/js/wiki/v4-Gotchas for possible optimization
/**
 * Reassigns the displays object parent while maintaing it's world position
 * @todo SH: Look at: https://github.com/pixijs/js/wiki/v4-Gotchas for possible optimization
 * @param pChild
 * @param pParent
 */
function setParent(pChild, pParent) {
    pChild.parent.worldTransform.apply(pChild.position, pChild.position);
    pParent.worldTransform.applyInverse(pChild.position, pChild.position);
    pChild.parent.removeChild(pChild);
    pParent.addChild(pChild);
}
exports.setParent = setParent;
/**
 *
 * @param pObject
 * @param pAnchor
 */
function setAnchor(pObject, pAnchor) {
    PointUtils.addToPoint(pObject.position, new pixi_js_1.Point((pAnchor.x - pObject.anchor.x) * pObject.width, (pAnchor.y - pObject.anchor.y) * pObject.height));
    pObject.anchor.copyFrom(pAnchor);
}
exports.setAnchor = setAnchor;
/**
 *
 * @param pObject
 */
function objectDiagonal(pObject) {
    return Math.sqrt(pObject.width * pObject.width + pObject.height * pObject.height);
}
exports.objectDiagonal = objectDiagonal;
/**
 * Removes provided object from its parent and re-adds it.
 * @param pObject The object to send to the back.
 */
function sendToFront(pObject) {
    const parent = pObject.parent;
    parent.removeChild(pObject);
    parent.addChild(pObject);
}
exports.sendToFront = sendToFront;
/**
 * Removes provided object from its parent and re-adds it at index 0.
 * @param pObject The object to send to the back.
 */
function sendToBack(pObject) {
    const parent = pObject.parent;
    parent.removeChild(pObject);
    parent.addChildAt(pObject, 0);
}
exports.sendToBack = sendToBack;
/**
 *
 * @param pShape
 * @param pDelta
 */
function offsetShape(pShape, pDelta) {
    if (pShape instanceof pixi_js_1.Polygon) {
        for (let i = 0; i < pShape.points.length; i += 2) {
            pShape.points[i] += pDelta.x;
            pShape.points[i + 1] += pDelta.y;
        }
        return pShape;
    }
    else {
        pShape.x += pDelta.x;
        pShape.y += pDelta.y;
        return pShape;
    }
}
exports.offsetShape = offsetShape;
/**
 *
 * @param pShape
 * @param pDelta
 */
function offsetSimpleShape(pShape, pDelta) {
    pShape.x += pDelta.x;
    pShape.y += pDelta.y;
    return pShape;
}
exports.offsetSimpleShape = offsetSimpleShape;
/**
 * Creates and returns a `Sprite` object.
 * This uses {@link getTexture} internally
 * @param pAsset The asset of the sprite to create.
 * @param pSheet (optional) The spritesheet(s) that the texture is in. You can leave this out unless you have two textures with the same name in different spritesheets
 */
function makeSprite(pAsset, pSheet) {
    let sprite;
    sprite = new pixi_js_1.Sprite(getTexture(pAsset, pSheet));
    sprite.anchor.set(0.5);
    return sprite;
}
exports.makeSprite = makeSprite;
/**
 * Gets a `Texture` asset.
 * @param pAsset The name of the texture to get.
 * @param pSheet (optional) The spritesheet(s) that the texture is in. You can leave this out unless you have two textures with the same name in different spritesheets
 */
function getTexture(pAsset, pSheet) {
    let texture;
    if (pSheet === undefined || pSheet.length === 0) {
        if (pixi_js_1.Assets.cache.has(pAsset)) {
            texture = pixi_js_1.Assets.cache.get(pAsset);
        }
        else if (pixi_js_1.Assets.get(pAsset)) {
            texture = pixi_js_1.Assets.get(pAsset).texture;
        }
        else {
            throw new Error("Asset \"" + pAsset + "\" not loaded into Pixi cache");
        }
    }
    else if (pSheet instanceof Array) {
        const numSheets = pSheet.length;
        for (let i = 0; i < numSheets; i++) {
            const sheet = pSheet[i];
            if (!pixi_js_1.Assets.get(pAsset)) {
                throw new Error("Spritesheet \"" + sheet + "\" not loaded into Pixi cache");
            }
            else {
                const textures = pixi_js_1.Assets.get(pAsset).textures;
                if (textures !== undefined) {
                    texture = textures[pAsset];
                    if (texture !== undefined) {
                        break;
                    }
                }
                else {
                    throw new Error("Spritesheet \"" + sheet + "\" loaded but textures arent!");
                }
            }
        }
        if (texture === undefined) {
            throw new Error("Asset \"" + pAsset + "\" not found inside spritesheets \"" + pSheet.toString() + "\'");
        }
    }
    else {
        if (!pixi_js_1.Assets.get(pSheet)) {
            throw new Error("Spritesheet \"" + pSheet + "\" not loaded into Pixi cache");
        }
        else {
            const textures = pixi_js_1.Assets.get(pSheet).textures;
            if (textures !== undefined) {
                if (!textures.hasOwnProperty(pAsset)) {
                    throw new Error("Asset \"" + pAsset + "\" not found inside spritesheet \"" + pSheet + "\'");
                }
                texture = textures[pAsset];
            }
            else {
                throw new Error("Spritesheet \"" + pSheet + "\" loaded but textures arent?!");
            }
        }
    }
    return texture || new pixi_js_1.Sprite().texture;
}
exports.getTexture = getTexture;
/**
 * Creates and returns a `BitmapText` object.
 * @param pText The text to display.
 * @param pFont The font to use.
 * @param pSize The size of the font.
 * @param pColour The colour of the font.
 * @default pColour 0x000000
 */
function makeText(pText, pFont, pSize, pColour = 0x000000) {
    const text = new pixi_js_1.BitmapText(pText, {
        fontName: pFont,
        fontSize: pSize,
        align: "center",
        tint: pColour,
    });
    text.anchor.set(0.5);
    return text;
}
exports.makeText = makeText;
/**
 * Standard tracks for spine characters.
 */
var SpineTrack;
(function (SpineTrack) {
    SpineTrack[SpineTrack["Body"] = 0] = "Body";
    SpineTrack[SpineTrack["Eyes"] = 1] = "Eyes";
    SpineTrack[SpineTrack["Mouth"] = 2] = "Mouth";
    SpineTrack[SpineTrack["NumElements"] = 3] = "NumElements";
})(SpineTrack = exports.SpineTrack || (exports.SpineTrack = {}));
/**
 * Creates and returns a `spine.Spine` object.
 * @param pName The name of the spine file.
 */
function makeSpine(pName) {
    let spine;
    spine = new runtime_4_1_1.Spine(pixi_js_1.Assets.get(pName).spineData);
    spine.skeleton.setToSetupPose();
    spine.update(0);
    spine.autoUpdate = false;
    return spine;
}
exports.makeSpine = makeSpine;
/**
 * Calculates bounding box in global coordinate space
 * @param pTarget - local coordinate space
 * @param pRect - optional rectangle in local coordinate space, defaults to pTarget.getLocalBounds()
 */
function getGlobalBounds(pTarget, pRect) {
    const bounds = pRect || pTarget.getLocalBounds();
    let minX = Number.MAX_VALUE;
    let minY = Number.MAX_VALUE;
    let maxX = Number.MIN_VALUE;
    let maxY = Number.MIN_VALUE;
    const localPoint = new pixi_js_1.Point();
    const globalPoint = new pixi_js_1.Point();
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
            localPoint.x = bounds.x + i * bounds.width;
            localPoint.y = bounds.y + j * bounds.height;
            pTarget.toGlobal(localPoint, globalPoint, i > 0);
            minX = Math.min(minX, globalPoint.x);
            minY = Math.min(minY, globalPoint.y);
            maxX = Math.max(maxX, globalPoint.x);
            maxY = Math.max(maxY, globalPoint.y);
        }
    }
    bounds.x = minX;
    bounds.y = minY;
    bounds.width = maxX - minX;
    bounds.height = maxY - minY;
    return bounds;
}
exports.getGlobalBounds = getGlobalBounds;
//# sourceMappingURL=PixiUtils.js.map