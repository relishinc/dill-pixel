import { Sprite } from 'pixi.js';
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
  sheet: SpriteSheetLike;
  enabled: boolean;
};

// Create a new class that extends Container and includes the Interactive and Focusable mixins.
const _Button = Focusable(Interactive(Container));

export class Button extends _Button {
  public onPress = new Signal<() => void>();
  public view: Sprite;
  protected config: ButtonConfig;

  protected _enabled: boolean;

  constructor(config: Partial<ButtonConfig>) {
    super();
    this.config = Object.assign({ textures: { default: '' }, sheet: undefined, enabled: true }, config);
    this._enabled = config.enabled !== false;

    // Create a sprite with the default texture and add it to the container.
    this.view = this.add.sprite({ asset: this.config.textures.default, sheet: this.config.sheet });
    this.addChild(this.view);

    // Set up interaction handlers.
    // make them high priority so they run before any other interaction handlers
    this.addSignalConnection(
      this.onInteraction('pointerover').connect(this.handlePointerOver, -1),
      this.onInteraction('pointerout').connect(this.handlePointerOut, -1),
      this.onInteraction('pointerupoutside').connect(this.handlePointerOut, -1),
      this.onInteraction('pointerdown').connect(this.handlePointerDown, -1),
      this.onInteraction('tap').connect(this.handlePointerDown, -1),
    );
  }

  public set enabled(enabled: boolean) {
    this._enabled = enabled;
    this.focusEnabled = enabled;
    if (!enabled && this.config.textures.disabled) {
      this.view.texture = this.make.texture({
        asset: this.config.textures.disabled || this.config.textures.default,
        sheet: this.config.sheet,
      });
    } else {
      this.view.texture = this.make.texture({
        asset: this.config.textures.default,
        sheet: this.config.sheet,
      });
    }
  }

  public focusIn() {
    this.handlePointerOver();
  }

  public focus() {
    this.handlePointerDown();
  }

  public focusOut() {
    this.handlePointerOut();
  }

  public getFocusArea() {
    const bounds = this.view.getBounds().clone();
    bounds.x += this.view.width * 0.5;
    bounds.y += this.view.width * 0.5;
    return bounds;
  }

  protected handlePointerOver() {
    if (!this._enabled) {
      return;
    }
    this.view.texture = this.make.texture({
      asset: this.config.textures.hover || this.config.textures.default,
      sheet: this.config.sheet,
    });
  }

  protected handlePointerOut() {
    this.view.texture = this.make.texture({ asset: this.config.textures.default, sheet: this.config.sheet });
  }

  protected handlePointerDown() {
    if (!this._enabled) {
      return;
    }
    this.view.texture = this.make.texture({
      asset: this.config.textures.active || this.config.textures.hover || this.config.textures.default,
      sheet: this.config.sheet,
    });
    this.onPress.emit();
  }
}
