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
exports.TextureSwapButton = void 0;
const PIXI = __importStar(require("pixi.js"));
const Input_1 = require("../Input");
const Button_1 = require("./Button");
/**
 * A button class that swaps between textures based on input state: Normal, Over/Up and Down.
 */
class TextureSwapButton extends Button_1.Button {
    /**
     * Creates a TextureSwapButton. Over and down image spritesheets need to be loaded before button creation.
     * @param pCallback The function to call when the button is clicked.
     * @param pNormalAsset The asset used for the normal state of the button.
     * @param pOverAsset The asset used for the over state of the button.
     * @param pDownAsset The asset used for the down state of the button.
     * @param pNormalSheet The spritesheet of the normal asset.
     */
    constructor(pCallback, pNormalAsset, pOverAsset, pDownAsset, pNormalSheet) {
        super(pCallback, pNormalAsset, pNormalSheet);
        this._normalTexture = this._image.texture;
        this._overTexture = PIXI.Texture.from(pOverAsset);
        this._downTexture = PIXI.Texture.from(pDownAsset);
    }
    /**
     * Sets the normal texture. Sprite sheet must already be loaded if providing the name of the asset.
     */
    set normalTexture(pNormalAsset) {
        if (typeof pNormalAsset === "string") {
            this._normalTexture = PIXI.Texture.from(pNormalAsset);
        }
        else {
            this._normalTexture = pNormalAsset;
        }
    }
    /**
     * Sets the over texture. Sprite sheet must already be loaded if providing the name of the asset.
     */
    set overTexture(pOverAsset) {
        if (typeof pOverAsset === "string") {
            this._overTexture = PIXI.Texture.from(pOverAsset);
        }
        else {
            this._overTexture = pOverAsset;
        }
    }
    /**
     * Sets the down texture. Sprite sheet must already be loaded if providing the name of the asset.
     */
    set downTexture(pDownAsset) {
        if (typeof pDownAsset === "string") {
            this._downTexture = PIXI.Texture.from(pDownAsset);
        }
        else {
            this._downTexture = pDownAsset;
        }
    }
    /**
     * Event fired when pointer is over button
     */
    onPointerOver(pEvent) {
        super.onPointerOver(pEvent);
        this._image.texture = Input_1.MouseManager.mouseDown ? this._normalTexture : this._overTexture;
    }
    /**
     * Event fired when pointer pressed on button
     * @param pEvent
     */
    onPointerDown(pEvent) {
        super.onPointerDown(pEvent);
        this._image.texture = this._downTexture;
    }
    /**
     * Event fired when pointer released on button
     */
    onPointerUp(pEvent) {
        if (this._eventData !== undefined && this._eventData.pointerId === pEvent.pointerId) {
            this._image.texture = this._overTexture;
        }
        super.onPointerUp(pEvent);
    }
    /**
     * Event fired when pointer no longer over button
     */
    onPointerOut(pEvent) {
        super.onPointerOut(pEvent);
        this._image.texture = this._normalTexture;
    }
}
exports.TextureSwapButton = TextureSwapButton;
//# sourceMappingURL=TextureSwapButton.js.map