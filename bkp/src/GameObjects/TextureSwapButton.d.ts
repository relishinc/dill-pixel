import * as PIXI from "pixi.js";
import { Button } from "./Button";
/**
 * A button class that swaps between textures based on input state: Normal, Over/Up and Down.
 */
export declare class TextureSwapButton extends Button {
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
    constructor(pCallback: () => void, pNormalAsset: string, pOverAsset: string, pDownAsset: string, pNormalSheet: string);
    /**
     * Sets the normal texture. Sprite sheet must already be loaded if providing the name of the asset.
     */
    set normalTexture(pNormalAsset: string | PIXI.Texture);
    /**
     * Sets the over texture. Sprite sheet must already be loaded if providing the name of the asset.
     */
    set overTexture(pOverAsset: string | PIXI.Texture);
    /**
     * Sets the down texture. Sprite sheet must already be loaded if providing the name of the asset.
     */
    set downTexture(pDownAsset: string | PIXI.Texture);
    /**
     * Event fired when pointer is over button
     */
    protected onPointerOver(pEvent: PIXI.FederatedPointerEvent): void;
    /**
     * Event fired when pointer pressed on button
     * @param pEvent
     */
    protected onPointerDown(pEvent: PIXI.FederatedPointerEvent): void;
    /**
     * Event fired when pointer released on button
     */
    protected onPointerUp(pEvent: PIXI.FederatedPointerEvent): void;
    /**
     * Event fired when pointer no longer over button
     */
    protected onPointerOut(pEvent: PIXI.FederatedPointerEvent): void;
}
//# sourceMappingURL=TextureSwapButton.d.ts.map