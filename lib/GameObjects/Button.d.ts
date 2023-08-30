import { BitmapText, Circle, Container, Ellipse, FederatedPointerEvent, IHitArea, IPoint, Point, Polygon, Rectangle, RoundedRectangle, Sprite, Texture } from "pixi.js";
import { IFocusable } from "../Input";
/**
 * Button
 */
export declare class Button extends Container implements IFocusable {
    protected _image: Sprite | undefined;
    protected _enabledTexture: Texture | undefined;
    protected _disabledTexture: Texture | undefined;
    protected _icon: Sprite | undefined;
    protected _callback: () => void;
    protected _hitArea: Rectangle | Circle | Ellipse | Polygon | RoundedRectangle | IHitArea;
    protected _visuals: Container;
    protected _text: BitmapText | undefined;
    protected _eventData: FederatedPointerEvent | undefined;
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
    getFocusPosition(): Point;
    getFocusSize(): IPoint;
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
    setDisabledImage(pTexture: Texture | string, pSheet?: string): void;
    /**
     * Sets the interactive flag and tries to change the default texture to enabled or disabled if those textures exist.
     * @param pInteractive Should this button be interactive or not.
     */
    setInteractive(pInteractive: boolean): void;
    /**
     * Event fired when pointer is over button
     */
    protected onPointerOver(pEvent: FederatedPointerEvent): void;
    /**`
     * Event fired when pointer pressed on button
     * @param pEvent
     */
    protected onPointerDown(pEvent: FederatedPointerEvent): void;
    /**
     * Event fired when pointer released on button
     */
    protected onPointerUp(pEvent: FederatedPointerEvent): void;
    /**
     * Event fired when pointer no longer over button
     */
    protected onPointerOut(pEvent: FederatedPointerEvent): void;
}
//# sourceMappingURL=Button.d.ts.map