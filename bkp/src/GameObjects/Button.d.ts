import * as PIXI from "pixi.js";
import { IFocusable } from "../Input";
/**
 * Button
 */
export declare class Button extends PIXI.Container implements IFocusable {
    protected _image: PIXI.Sprite | undefined;
    protected _enabledTexture: PIXI.Texture | undefined;
    protected _disabledTexture: PIXI.Texture | undefined;
    protected _icon: PIXI.Sprite | undefined;
    protected _callback: () => void;
    protected _hitArea: PIXI.Rectangle | PIXI.Circle | PIXI.Ellipse | PIXI.Polygon | PIXI.RoundedRectangle | PIXI.IHitArea;
    protected _visuals: PIXI.Container;
    protected _text: PIXI.BitmapText | undefined;
    protected _eventData: PIXI.FederatedPointerEvent | undefined;
    /**
     * Creates an instance of button.
     * @todo SH: Look into "buttonifying" an object, similar to how Dijon did it.
     * @param pCallback
     * @param [pAsset]
     * @param [pSheet]
     */
    constructor(pCallback: () => void, pAsset?: string, pSheet?: string | string[]);
    onFocusBegin(): void;
    onFocusEnd(): void;
    onFocusActivated(): void;
    getFocusPosition(): PIXI.Point;
    getFocusSize(): PIXI.IPoint;
    /**
     * Adds text to the centre of the button.
     * @param pText The text to be displayed.
     * @param pFont The font to use.
     * @param pFontSize The size of the font as a string or number.
     * @param pColor The color of the font.
     */
    addText(pText: string, pFont: string, pFontSize: number | string, pColor?: number): void;
    /**
     * Change the text of the button. Make sure to call `addText` first.
     * @param pText The text to be displayed.
     */
    changeText(pText: string): void;
    /**
     * Sets callback
     * @param pCallback
     */
    setCallback(pCallback: () => void): void;
    setDisabledImage(pTexture: PIXI.Texture | string, pSheet?: string): void;
    /**
     * Sets the interactive flag and tries to change the default texture to enabled or disabled if those textures exist.
     * @param pInteractive Should this button be interactive or not.
     */
    setInteractive(pInteractive: boolean): void;
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
//# sourceMappingURL=Button.d.ts.map