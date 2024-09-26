import { Cursor, Point, Sprite } from 'pixi.js';
import { IFocusable } from '../input';
import { Signal } from '../signals';
import { SpritesheetLike, TextureLike } from '../utils';
import { Container } from './Container';

type ButtonCursor = Cursor | string;

type ButtonConfig = {
  textures: {
    default: TextureLike;
    hover?: TextureLike;
    active?: TextureLike;
    disabled?: TextureLike;
  };
  sheet: SpritesheetLike;
  enabled: boolean;
  focusable: boolean;
  cursor: ButtonCursor;
};

const defaultConfig: ButtonConfig = {
  textures: {
    default: '',
  },
  sheet: undefined,
  enabled: true,
  focusable: true,
  cursor: 'default',
};

/**
 * @class
 * @extends {Container}
 * @implements {IFocusable}
 * @description A class representing a button.
 */
export class Button extends Container implements IFocusable {
  // signals
  public onDown = new Signal<() => void>();
  public onUp = new Signal<() => void>();
  public onOut = new Signal<() => void>();
  public onOver = new Signal<() => void>();
  public onPress = new Signal<() => void>();

  // visual
  public view: Sprite;

  // whether the button is down
  public isDown: boolean;

  // config
  protected config: ButtonConfig;

  // enabled state
  protected _enabled: boolean;

  // cursor
  protected _cursor: ButtonCursor;

  /**
   * @constructor
   * @param {Partial<ButtonConfig>} config - The configuration for the button.
   */
  constructor(config: Partial<ButtonConfig>) {
    super();
    this.config = Object.assign({ ...defaultConfig }, config);

    // Create a sprite with the default texture and add it to the container.
    this.view = this.add.sprite({ asset: this.config.textures.default, sheet: this.config.sheet });
    this.addChild(this.view);

    this.enabled = config.enabled !== false;
    this._focusable = config.focusable !== false;
    this._cursor = config.cursor ?? 'default';

    this.on('added', this._added);
  }

  /**
   * @description Adds the button to the stage.
   */
  protected _added() {
    this.cursor = this._cursor;
  }

  /**
   * @description Sets the enabled state of the button.
   * @param {boolean} enabled - Whether the button is enabled.
   */
  public set enabled(enabled: boolean) {
    this._enabled = enabled;
    this.focusable = enabled;

    if (this._enabled) {
      this.addListeners();
      this.eventMode = 'static';
      this.view.texture = this.make.texture({
        asset: this.config.textures.default,
        sheet: this.config.sheet,
      });
      this.cursor = this.config.cursor;
    } else {
      this.removeListeners();
      this.eventMode = 'none';
      this.view.texture = this.make.texture({
        asset: this.config.textures.disabled || this.config.textures.default,
        sheet: this.config.sheet,
      });
      this.cursor = 'default';
    }
  }

  /**
   * @description Sets the cursor of the button.
   * @param {ButtonCursor} cursor - The cursor of the button.
   */
  public set cursor(cursor: ButtonCursor | string) {
    this._cursor = cursor;
    this.view.cursor = cursor;
  }

  /**
   * @description Gets the cursor of the button.
   * @returns {ButtonCursor} The cursor of the button.
   */
  public get cursor(): ButtonCursor | string {
    return this.view.cursor;
  }

  /**
   * @description Handles the focus begin event.
   */
  public onFocusBegin() {
    this.handlePointerOver();
  }

  /**
   * @description Handles the focus activated event.
   */
  public onFocusActivated() {
    this.handlePointerDown();
    window.addEventListener('keyup', this.handleKeyUp);
  }

  /**
   * @description Handles the focus end event.
   */
  public onFocusEnd() {
    this.handlePointerUp();
  }

  /**
   * @description Gets the focus size of the button.
   * @returns {Point} The focus size.
   */
  public getFocusSize(): Point {
    const bounds = this.view.getBounds().clone();
    bounds.x += this.view.width * 0.5;
    bounds.y += this.view.width * 0.5;
    return new Point(bounds.width, bounds.height);
  }

  /**
   * @description Adds the event listeners for the button.
   */
  protected addListeners() {
    this.on('pointerover', this.handlePointerOver);
    this.on('pointerout', this.handlePointerOut);
    this.on('pointerup', this.handlePointerUp);
    this.on('pointerupoutside', this.handlePointerUp);
    this.on('pointerdown', this.handlePointerDown);
    this.on('tap', this.handlePointerUp);
  }

  /**
   * @description Removes the event listeners for the button.
   */
  protected removeListeners() {
    this.off('pointerover', this.handlePointerOver);
    this.off('pointerout', this.handlePointerOut);
    this.off('pointerup', this.handlePointerUp);
    this.off('pointerupoutside', this.handlePointerUp);
    this.off('pointerdown', this.handlePointerDown);
    this.off('tap', this.handlePointerUp);
  }

  /**
   * @description Handles the pointer over event.
   * Sets the texture of the button to the hover texture and emits the onOver event.
   */
  protected handlePointerOver() {
    if (!this._enabled) {
      return;
    }
    this.view.texture = this.make.texture({
      asset: this.config.textures.hover || this.config.textures.default,
      sheet: this.config.sheet,
    });
    this.onOver.emit();
  }

  /**
   * @description Handles the pointer out event.
   * Sets the texture of the button to the default texture and emits the onOut event.
   */
  protected handlePointerOut() {
    if (!this._enabled) {
      return;
    }
    this.view.texture = this.make.texture({ asset: this.config.textures.default, sheet: this.config.sheet });
    this.onOut.emit();
  }

  /**
   * @description Handles the pointer down event.
   * Sets the isDown property to true and changes the texture of the button.
   */
  protected handlePointerDown() {
    if (!this._enabled) {
      return;
    }

    if (!this.isDown) {
      this.isDown = true;
      this.view.texture = this.make.texture({
        asset: this.config.textures.active || this.config.textures.hover || this.config.textures.default,
        sheet: this.config.sheet,
      });
      this.onDown.emit();
    }
  }

  /**
   * @description Handles the pointer up event.
   * Removes the keyup event listener and emits the onPress and onUp events.
   */
  protected handlePointerUp() {
    if (!this._enabled) {
      return;
    }
    window.removeEventListener('keyup', this.handleKeyUp);
    this.view.texture = this.make.texture({ asset: this.config.textures.default, sheet: this.config.sheet });
    if (this.isDown) {
      this.isDown = false;
      this.onPress.emit();
    }
    this.onUp.emit();
  }

  /**
   * @description Handles the key up event.
   * checks if the key is the enter or space key and calls handlePointerUp.
   * @param {KeyboardEvent} e - The keyboard event.
   */
  protected handleKeyUp(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      this.handlePointerUp();
    }
  }
}
