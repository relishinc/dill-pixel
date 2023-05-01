import * as PIXI from "pixi.js";
import {MouseManager} from "../Input";
import {Button} from "./Button";

/**
 * A button class that swaps between textures based on input state: Normal, Over/Up and Down.
 */
export class TextureSwapButton extends Button {

    /**
     * The texture to use for the normal state of the button.
     */
    protected _normalTexture: PIXI.Texture;

    /**
     * The texture to use for the over state of the button.
     */
    protected _overTexture: PIXI.Texture;

    /**
     * The texture to use for the down state of the button.
     */
    protected _downTexture: PIXI.Texture;

    /**
     * Creates a TextureSwapButton. Over and down image spritesheets need to be loaded before button creation.
     * @param pCallback The function to call when the button is clicked.
     * @param pNormalAsset The asset used for the normal state of the button.
     * @param pOverAsset The asset used for the over state of the button.
     * @param pDownAsset The asset used for the down state of the button.
     * @param pNormalSheet The spritesheet of the normal asset.
     */
    constructor(pCallback: () => void, pNormalAsset: string, pOverAsset: string, pDownAsset: string,
                pNormalSheet: string) {
        super(pCallback, pNormalAsset, pNormalSheet);

        this._normalTexture = this._image!.texture;
        this._overTexture = PIXI.Texture.from(pOverAsset);
        this._downTexture = PIXI.Texture.from(pDownAsset);
    }

    /**
     * Sets the normal texture. Sprite sheet must already be loaded if providing the name of the asset.
     */
    public set normalTexture(pNormalAsset: string | PIXI.Texture) {
        if (typeof pNormalAsset === "string") {
            this._normalTexture = PIXI.Texture.from(pNormalAsset);
        } else {
            this._normalTexture = pNormalAsset;
        }
    }

    /**
     * Sets the over texture. Sprite sheet must already be loaded if providing the name of the asset.
     */
    public set overTexture(pOverAsset: string | PIXI.Texture) {
        if (typeof pOverAsset === "string") {
            this._overTexture = PIXI.Texture.from(pOverAsset);
        } else {
            this._overTexture = pOverAsset;
        }
    }

    /**
     * Sets the down texture. Sprite sheet must already be loaded if providing the name of the asset.
     */
    public set downTexture(pDownAsset: string | PIXI.Texture) {
        if (typeof pDownAsset === "string") {
            this._downTexture = PIXI.Texture.from(pDownAsset);
        } else {
            this._downTexture = pDownAsset;
        }
    }

    /**
     * Event fired when pointer is over button
     */
    protected onPointerOver(pEvent: PIXI.FederatedPointerEvent): void {
        super.onPointerOver(pEvent);
        this._image!.texture = MouseManager.mouseDown ? this._normalTexture : this._overTexture;
    }

    /**
     * Event fired when pointer pressed on button
     * @param pEvent
     */
    protected onPointerDown(pEvent: PIXI.FederatedPointerEvent): void {
        super.onPointerDown(pEvent);
        this._image!.texture = this._downTexture;
    }

    /**
     * Event fired when pointer released on button
     */
    protected onPointerUp(pEvent: PIXI.FederatedPointerEvent): void {
        if (this._eventData !== undefined && this._eventData.pointerId === pEvent.pointerId) {
            this._image!.texture = this._overTexture;
        }
        super.onPointerUp(pEvent);
    }

    /**
     * Event fired when pointer no longer over button
     */
    protected onPointerOut(pEvent: PIXI.FederatedPointerEvent): void {
        super.onPointerOut(pEvent);
        this._image!.texture = this._normalTexture;
    }
}
