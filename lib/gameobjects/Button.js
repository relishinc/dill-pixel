import { Assets, BitmapText, Container, Point, Rectangle, Texture } from 'pixi.js';
import * as InputUtils from '../input/InputUtils';
import { RectUtils } from '../utils';
import * as PixiUtils from '../utils/PixiUtils';
/**
 * Button
 */
export class Button extends Container {
    // TODO:SH: Look into "buttonifying" an object, similar to how Dijon did it.
    // Might be javacsript black magic, but would also allow us to easily add input to any object
    /**
     * Creates an instance of button.
     * @todo SH: Look into "buttonifying" an object, similar to how Dijon did it.
     * @param pCallback
     * @param [pAsset]
     * @param [pSheet]
     */
    constructor(pCallback, pAsset, pSheet) {
        super();
        this._callback = pCallback;
        this._visuals = new Container();
        this.addChild(this._visuals);
        if (pAsset !== undefined) {
            this._image = PixiUtils.makeSprite(pAsset, pSheet);
            this._enabledTexture = this._image.texture;
            this._visuals.addChild(this._image);
        }
        this.interactive = true;
        this.cursor = 'pointer';
        this.hitArea =
            this._image !== undefined
                ? new Rectangle(-this._image.width * 0.5, -this._image.height * 0.5, this._image.width, this._image.height)
                : new Rectangle(-50, -50, 100, 100);
        this.on(InputUtils.Events.POINTER_OVER, this.onPointerOver);
        this.on(InputUtils.Events.POINTER_DOWN, this.onPointerDown);
        this.on(InputUtils.Events.POINTER_UP, this.onPointerUp);
        this.on(InputUtils.Events.POINTER_OUT, this.onPointerOut);
    }
    onFocusBegin() {
        // override this if you want
    }
    onFocusEnd() {
        // override this if you want
    }
    onFocusActivated() {
        if (this.interactive) {
            this._callback();
        }
    }
    getFocusPosition() {
        if (this.hitArea instanceof Rectangle) {
            return new Point().copyFrom(this.toGlobal(RectUtils.center(this.hitArea)));
        }
        else {
            return this.getGlobalPosition();
        }
    }
    getFocusSize() {
        let bounds;
        if (this.hitArea instanceof Rectangle) {
            bounds = PixiUtils.getGlobalBounds(this, this.hitArea.clone());
        }
        else {
            bounds = PixiUtils.getGlobalBounds(this);
        }
        return RectUtils.size(bounds);
    }
    /**
     * Adds text to the centre of the button.
     * @param pText The text to be displayed.
     * @param pFont The font to use.
     * @param pFontSize The size of the font as a string or number.
     * @param pColor The color of the font.
     */
    addText(pText, pFont, pFontSize, pColor = 0x000000) {
        this._text = new BitmapText(pText, {
            fontName: pFont,
            fontSize: typeof pFontSize === 'number' ? pFontSize : parseInt(pFontSize, 10),
            align: 'center',
            tint: pColor,
        });
        this._text.position.set(0, 0);
        this._text.anchor.set(0.5);
        this._visuals.addChild(this._text);
    }
    /**
     * Change the text of the button. Make sure to call `addText` first.
     * @param pText The text to be displayed.
     */
    changeText(pText) {
        if (this._text !== undefined) {
            this._text.text = pText;
        }
    }
    /**
     * Sets callback
     * @param pCallback
     */
    setCallback(pCallback) {
        this._callback = pCallback;
    }
    setDisabledImage(pTexture, pSheet) {
        if (typeof pTexture === 'string') {
            if (pSheet === undefined) {
                this._disabledTexture = Texture.from(pTexture);
            }
            else {
                this._disabledTexture = Assets.cache.get(pSheet).textures[pTexture];
            }
        }
        else {
            this._disabledTexture = pTexture;
        }
    }
    /**
     * Sets the interactive flag and tries to change the default texture to enabled or disabled if those textures exist.
     * @param pInteractive Should this button be interactive or not.
     */
    setInteractive(pInteractive) {
        this.interactive = pInteractive;
        if (this._image !== undefined) {
            if (this._disabledTexture !== undefined && this._enabledTexture !== undefined) {
                this._image.texture = pInteractive ? this._enabledTexture : this._disabledTexture;
            }
        }
    }
    /**
     * Event fired when pointer is over button
     */
    onPointerOver(_event) {
        // override
    }
    /**`
     * Event fired when pointer pressed on button
     * @param pEvent
     */
    onPointerDown(pEvent) {
        this._eventData = pEvent;
    }
    /**
     * Event fired when pointer released on button
     */
    onPointerUp(pEvent) {
        if (this._eventData !== undefined && this._eventData.pointerId === pEvent.pointerId) {
            this._callback();
            this._eventData = undefined;
        }
    }
    /**
     * Event fired when pointer no longer over button
     */
    onPointerOut(_event) {
        // override
        this._eventData = undefined;
    }
}
//# sourceMappingURL=Button.js.map