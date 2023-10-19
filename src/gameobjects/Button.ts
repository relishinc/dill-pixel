import {
  Assets,
  BitmapText,
  Circle,
  Container,
  Ellipse,
  FederatedPointerEvent,
  IHitArea,
  IPoint,
  Point,
  Polygon,
  Rectangle,
  RoundedRectangle,
  Sprite,
  Texture
} from 'pixi.js';
import {IFocusable} from '../input';
import * as InputUtils from '../input/InputUtils';
import {RectUtils} from '../utils';
import * as PixiUtils from '../utils/PixiUtils';

/**
 * Button
 */
export class Button extends Container implements IFocusable {
  protected _image: Sprite | undefined;
  protected _enabledTexture: Texture | undefined;
  protected _disabledTexture: Texture | undefined;
  protected _icon: Sprite | undefined;
  protected _callback: () => void;
  protected _hitArea!: Rectangle | Circle | Ellipse | Polygon | RoundedRectangle | IHitArea;
  // Visuals in separate container to hitArea is not affected by scaling
  // (prevents weird behaviours with touch input at image borders)
  protected _visuals: Container;
  protected _text: BitmapText | undefined;
  protected _eventData: FederatedPointerEvent | undefined;

  // TODO:SH: Look into "buttonifying" an object, similar to how Dijon did it.
  // Might be javacsript black magic, but would also allow us to easily add input to any object
  /**
   * Creates an instance of button.
   * @todo SH: Look into "buttonifying" an object, similar to how Dijon did it.
   * @param pCallback
   * @param [pAsset]
   * @param [pSheet]
   */
  constructor(pCallback: () => void, pAsset?: string, pSheet?: string | string[]) {
    super();
    this._callback = pCallback;

    this._visuals = new Container();
    this.addChild(this._visuals);

    if (pAsset !== undefined) {
      this._image = PixiUtils.makeSprite(pAsset, pSheet);
      this._enabledTexture = this._image.texture;
      this._visuals.addChild(this._image!);
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

  public onFocusBegin(): void {
    // override this if you want
  }

  public onFocusEnd(): void {
    // override this if you want
  }

  public onFocusActivated(): void {
    if (this.interactive) {
      this._callback();
    }
  }

  public getFocusPosition(): Point {
    if (this.hitArea instanceof Rectangle) {
      return new Point().copyFrom(this.toGlobal(RectUtils.center(this.hitArea)));
    } else {
      return this.getGlobalPosition();
    }
  }

  public getFocusSize(): IPoint {
    let bounds: Rectangle;
    if (this.hitArea instanceof Rectangle) {
      bounds = PixiUtils.getGlobalBounds(this, this.hitArea.clone());
    } else {
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
  public addText(pText: string, pFont: string, pFontSize: number | string, pColor: number = 0x000000): void {
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
  public changeText(pText: string) {
    if (this._text !== undefined) {
      this._text.text = pText;
    }
  }

  /**
   * Sets callback
   * @param pCallback
   */
  public setCallback(pCallback: () => void): void {
    this._callback = pCallback;
  }

  public setDisabledImage(pTexture: Texture | string, pSheet?: string): void {
    if (typeof pTexture === 'string') {
      if (pSheet === undefined) {
        this._disabledTexture = Texture.from(pTexture);
      } else {
        this._disabledTexture = Assets.cache.get(pSheet).textures![pTexture];
      }
    } else {
      this._disabledTexture = pTexture;
    }
  }

  /**
   * Sets the interactive flag and tries to change the default texture to enabled or disabled if those textures exist.
   * @param pInteractive Should this button be interactive or not.
   */
  public setInteractive(pInteractive: boolean) {
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
  protected onPointerOver(_event: FederatedPointerEvent): void {
    // override
  }

  /**`
   * Event fired when pointer pressed on button
   * @param pEvent
   */
  protected onPointerDown(pEvent: FederatedPointerEvent): void {
    this._eventData = pEvent;
  }

  /**
   * Event fired when pointer released on button
   */
  protected onPointerUp(pEvent: FederatedPointerEvent): void {
    if (this._eventData !== undefined && this._eventData.pointerId === pEvent.pointerId) {
      this._callback();
      this._eventData = undefined;
    }
  }

  /**
   * Event fired when pointer no longer over button
   */
  protected onPointerOut(_event: FederatedPointerEvent): void {
    // override
    this._eventData = undefined;
  }
}
