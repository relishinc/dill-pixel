import { Texture } from 'pixi.js';
import { MouseManager } from '../input';
import { Button } from './Button';
/**
 * A button class that swaps between textures based on input state: Normal, Over/Up and Down.
 */
export class TextureSwapButton extends Button {
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
        this._overTexture = Texture.from(pOverAsset);
        this._downTexture = Texture.from(pDownAsset);
    }
    /**
     * Sets the normal texture. Sprite sheet must already be loaded if providing the name of the asset.
     */
    set normalTexture(pNormalAsset) {
        if (typeof pNormalAsset === 'string') {
            this._normalTexture = Texture.from(pNormalAsset);
        }
        else {
            this._normalTexture = pNormalAsset;
        }
    }
    /**
     * Sets the over texture. Sprite sheet must already be loaded if providing the name of the asset.
     */
    set overTexture(pOverAsset) {
        if (typeof pOverAsset === 'string') {
            this._overTexture = Texture.from(pOverAsset);
        }
        else {
            this._overTexture = pOverAsset;
        }
    }
    /**
     * Sets the down texture. Sprite sheet must already be loaded if providing the name of the asset.
     */
    set downTexture(pDownAsset) {
        if (typeof pDownAsset === 'string') {
            this._downTexture = Texture.from(pDownAsset);
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
        this._image.texture = MouseManager.mouseDown ? this._normalTexture : this._overTexture;
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
//# sourceMappingURL=TextureSwapButton.js.map