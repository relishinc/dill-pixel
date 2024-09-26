import { Point } from 'pixi.js';
import { Signal } from '../signals';
import { Container } from './Container';
const defaultConfig = {
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
export class Button extends Container {
  /**
   * @constructor
   * @param {Partial<ButtonConfig>} config - The configuration for the button.
   */
  constructor(config) {
    super();
    // signals
    this.onDown = new Signal();
    this.onUp = new Signal();
    this.onOut = new Signal();
    this.onOver = new Signal();
    this.onPress = new Signal();
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
  _added() {
    this.cursor = this._cursor;
  }
  /**
   * @description Sets the enabled state of the button.
   * @param {boolean} enabled - Whether the button is enabled.
   */
  set enabled(enabled) {
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
  set cursor(cursor) {
    this._cursor = cursor;
    this.view.cursor = cursor;
  }
  /**
   * @description Gets the cursor of the button.
   * @returns {ButtonCursor} The cursor of the button.
   */
  get cursor() {
    return this.view.cursor;
  }
  /**
   * @description Handles the focus begin event.
   */
  onFocusBegin() {
    this.handlePointerOver();
  }
  /**
   * @description Handles the focus activated event.
   */
  onFocusActivated() {
    this.handlePointerDown();
    window.addEventListener('keyup', this.handleKeyUp);
  }
  /**
   * @description Handles the focus end event.
   */
  onFocusEnd() {
    this.handlePointerUp();
  }
  /**
   * @description Gets the focus size of the button.
   * @returns {Point} The focus size.
   */
  getFocusSize() {
    const bounds = this.view.getBounds().clone();
    bounds.x += this.view.width * 0.5;
    bounds.y += this.view.width * 0.5;
    return new Point(bounds.width, bounds.height);
  }
  /**
   * @description Adds the event listeners for the button.
   */
  addListeners() {
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
  removeListeners() {
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
  handlePointerOver() {
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
  handlePointerOut() {
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
  handlePointerDown() {
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
  handlePointerUp() {
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
  handleKeyUp(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      this.handlePointerUp();
    }
  }
}
//# sourceMappingURL=Button.js.map
