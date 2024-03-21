import { Cursor, Sprite } from 'pixi.js';
import { Focusable } from '../mixins/focus';
import { Interactive } from '../mixins/interaction';
import { Signal } from '../signals';
import { SpriteSheetLike, TextureLike } from '../utils/types';
import { Container } from './Container';

type ButtonConfig = {
  textures: {
    default: TextureLike;
    hover?: TextureLike;
    active?: TextureLike;
    disabled?: TextureLike;
  };
  cursor: Cursor;
  disabledCursor: Cursor;
  sheet: SpriteSheetLike;
  enabled: boolean;
};

// Create a new class that extends Container and includes the Interactive and Focusable mixins.
const _Button = Focusable(Interactive(Container));

/**
 * @class
 * @extends {Container}
 * @implements {IFocusable}
 * @description A class representing a button.
 */
export class Button extends _Button {
  // signals
  public onDown = new Signal<() => void>();
  public onUp = new Signal<() => void>();
  public onOut = new Signal<() => void>();
  public onOver = new Signal<() => void>();
  public onPress = new Signal<() => void>();
  public onEnabled = new Signal<() => void>();
  public onDisabled = new Signal<() => void>();
  public onKeyboardEvent = new Signal<(key: string) => void>();

  // visual
  public view: Sprite;
  // whether the button is down
  public isDown: boolean;
  // config
  protected config: ButtonConfig;
  // enabled state
  protected _enabled: boolean;

  /**
   * @constructor
   * @param {Partial<ButtonConfig>} config - The configuration for the button.
   */
  constructor(config: Partial<ButtonConfig>) {
    super();
    this.config = Object.assign(
      {
        textures: { default: '' },
        sheet: undefined,
        enabled: true,
        cursor: 'default',
        disabledCursor: 'not-allowed',
      },
      config,
    );

    // Create a sprite with the default texture and add it to the container.
    this.view = this.add.sprite({ asset: this.config.textures.default, sheet: this.config.sheet });
    this.addChild(this.view);

    this.cursor = this.config.cursor;
    this.enabled = config.enabled !== false;
    // Set up interaction handlers.
    // make them high priority so they run before any other interaction handlers
    this.addSignalConnection(
      this.onInteraction('pointerover').connect(this.handlePointerOver, -1),
      this.onInteraction('pointerout').connect(this.handlePointerOut, -1),
      this.onInteraction('pointerup').connect(this.handlePointerUp, -1),
      this.onInteraction('pointerupoutside').connect(this.handlePointerOut, -1),
      this.onInteraction('pointerdown').connect(this.handlePointerDown, -1),
      this.onInteraction('tap').connect(this.handlePointerDown, -1),
    );
  }

  /**
   * @description Sets the enabled state of the button.
   * @param {boolean} enabled - Whether the button is enabled.
   */
  public set enabled(enabled: boolean) {
    if (this._enabled === enabled) {
      return;
    }
    this._enabled = enabled;
    this.cursor = this._enabled ? this.config.cursor : this.config.disabledCursor;
    this.focusEnabled = enabled;
    if (this._enabled) {
      this.view.texture = this.make.texture({
        asset: this.config.textures.default,
        sheet: this.config.sheet,
      });
      this.onEnabled.emit();
    } else {
      this.view.texture = this.make.texture({
        asset: this.config.textures.disabled || this.config.textures.default,
        sheet: this.config.sheet,
      });
      this.onDisabled.emit();
    }
  }

  public focusIn() {
    this.handlePointerOver();
  }

  public focus() {
    this.handlePointerDown();
    window.addEventListener('keyup', this.handleKeyUp);
  }

  public focusOut() {
    this.handlePointerOut();
  }

  public blur() {
    window.removeEventListener('keyup', this.handleKeyUp);
  }

  public getFocusArea() {
    const bounds = this.view.getBounds().clone();
    bounds.x += this.view.width * 0.5;
    bounds.y += this.view.width * 0.5;
    return bounds;
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
    if (!this._enabled) {
      return;
    }
    if (e.key === 'Enter' || e.key === ' ') {
      this.onKeyboardEvent.emit(e.key);
      if (this.isFocused) {
        return;
      } else {
        this.handlePointerUp();
      }
    }
  }
}
