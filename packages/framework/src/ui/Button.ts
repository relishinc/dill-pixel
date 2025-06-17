import {
  BitmapText,
  Cursor,
  DestroyOptions,
  FederatedEvent,
  FederatedPointerEvent,
  HTMLText,
  Sprite,
  Text,
} from 'pixi.js';

import { type LayoutOptions } from '@pixi/layout';
import type { IApplication } from '../core';
import { Application } from '../core/Application';
import { Factory, Focusable, HTMLTextProps, Interactive, type TextProps, WithSignals } from '../mixins';
import { Signal } from '../signals';
import { bindAllMethods, SpriteSheetLike, TextureLike } from '../utils';

export type ButtonCallback = (() => void) | (() => Promise<void>);
export type ButtonAction = { id: string | number; data?: any };

export type ButtonActionOrCallback = ButtonAction | ButtonCallback;

type ButtonTextureId = 'default' | 'hover' | 'active' | 'disabled';

export interface IButton {
  // signals
  onDown: Signal<() => void>;
  onUp: Signal<() => void>;
  onUpOutside: Signal<() => void>;
  onOut: Signal<() => void>;
  onOver: Signal<() => void>;
  onClick: Signal<() => void>;
  onEnabled: Signal<() => void>;
  onDisabled: Signal<() => void>;
  onDestroy: Signal<() => void>;
  onKeyboardEvent: Signal<(key: string) => void>;
  // visual
  view: Sprite;
  // whether the button is down
  isDown: boolean;
  isOver: boolean;
  //
  id: string;
}

export type ButtonConfig = {
  id: string;
  textures: {
    default: TextureLike;
    hover?: TextureLike;
    active?: TextureLike;
    disabled?: TextureLike;
  };
  sounds?: {
    hover?: string;
    out?: string;
    up?: string;
    down?: string;
    click?: string;
  };
  actions?: {
    hover?: ButtonActionOrCallback;
    out?: ButtonActionOrCallback;
    up?: ButtonActionOrCallback;
    down?: ButtonActionOrCallback;
    click?: ButtonActionOrCallback;
  };
  textLabel?: Partial<TextProps | HTMLTextProps> & { type?: 'text' | 'html' | 'bitmap' };
  cursor: Cursor;
  disabledCursor: Cursor;
  sheet: SpriteSheetLike;
  enabled: boolean;
  layout?: Omit<LayoutOptions, 'target'> | null | boolean;
};

export const ButtonConfigKeys: (keyof ButtonConfig)[] = [
  'textures',
  'sounds',
  'actions',
  'cursor',
  'disabledCursor',
  'sheet',
  'enabled',
  'layout',
  'textLabel',
];

// Create a new class that extends Container and includes the Interactive and Focusable mixins.
const _Button = Focusable(Interactive(WithSignals(Factory())));

/**
 * @class
 * @extends {Container}
 * @implements {IFocusable, IButton}
 * @description A class representing a button.
 */
export class Button extends _Button implements IButton {
  // signals
  public onDown = new Signal<() => void>();
  public onUp = new Signal<() => void>();
  public onUpOutside = new Signal<() => void>();
  public onOut = new Signal<() => void>();
  public onOver = new Signal<() => void>();
  public onClick = new Signal<() => void>();
  public onEnabled = new Signal<() => void>();
  public onDisabled = new Signal<() => void>();
  public onKeyboardEvent = new Signal<(key: string) => void>();
  public onDestroy = new Signal<() => void>();
  public id: string;
  // visual
  public view: Sprite;
  // whether the button is down
  public isDown: boolean;
  public isOver: boolean;
  // config
  protected config: ButtonConfig;
  // a set of unique callbacks for when the button is down
  protected _isDownCallbacks: Map<string, () => void> = new Map();
  private _isDownListenerAdded: boolean = false;
  private _pointerId?: number;
  private _textLabel?: Text | HTMLText | BitmapText;

  /**
   * @constructor
   * @param {Partial<ButtonConfig>} config - The configuration for the button.
   */
  constructor(config: Partial<ButtonConfig>) {
    super();

    bindAllMethods(this);

    this.config = Object.assign(
      {
        id: 'button',
        textures: { default: '' },
        sheet: undefined,
        enabled: true,
        cursor: 'default',
        disabledCursor: 'not-allowed',
      },
      config,
    );

    this.id = this.config.id;

    // Allow layout to be set via config, but default to false
    if (config.layout !== undefined) {
      this.layout = config.layout;
    } else {
      this.layout = false;
    }

    // Create a sprite with the default texture and add it to the container.
    this.view = this.add.sprite({
      asset: this.config.textures.default,
      sheet: this.config.sheet,
    });

    this.cursor = this.config.cursor;
    this.enabled = config.enabled !== false;

    if (this.layout?.style.transformOrigin !== 'top left') {
      this.layout = { transformOrigin: 'top left' };
      this.app.renderer.layout.update(this);
    }

    if (this.config.textLabel) {
      this.addLabel(this.config.textLabel);
    }

    // Set up interaction handlers.
    // make them high priority so they run before any other interaction handlers
    this.addSignalConnection(
      this.onInteraction('pointerover').connect(this.handlePointerOver, -1),
      this.onInteraction('pointerout').connect(this.handlePointerOut, -1),
      this.onInteraction('pointerup').connect(this.handlePointerUp, -1),
      this.onInteraction('click').connect(this.handleClick, -1),
      this.onInteraction('tap').connect(this.handleClick, -1),
      this.onInteraction('pointerdown').connect(this.handlePointerDown, -1),
    );
  }

  // enabled state
  protected _enabled: boolean;

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

  public addLabel<T extends Text | HTMLText | BitmapText>(
    config: (Partial<TextProps | HTMLTextProps> & { type?: 'text' | 'html' | 'bitmap' }) | T,
  ): T {
    if (config instanceof Text || config instanceof HTMLText || config instanceof BitmapText) {
      this._textLabel = this.add.existing(config) as T;
      this._textLabel.layout = false;
    } else {
      switch (config.type) {
        case 'bitmap':
          this._textLabel = this.add.bitmapText({ ...config, layout: false }) as BitmapText;
          break;
        case 'html':
          this._textLabel = this.add.htmlText({ ...config, layout: false }) as HTMLText;
          break;
        default:
          this._textLabel = this.add.text({ ...config, layout: false }) as Text;
          break;
      }
    }

    this.positionLabel();

    return this._textLabel as T;
  }

  public positionLabel() {
    if (this._textLabel) {
      this._textLabel.position.set(this.view.width * 0.5, this.view.height * 0.5);
    }
  }

  public get enabled() {
    return this._enabled;
  }

  get app(): IApplication {
    return Application.getInstance();
  }

  destroy(options?: DestroyOptions) {
    this.onDestroy.emit();
    super.destroy(options);
  }

  focusOut() {
    super.focusOut();
    this.isDown = false;
    this.isOver = false;
  }

  blur() {
    super.blur();
    this.isDown = false;
    this.isOver = false;
  }

  public getFocusArea() {
    return this.view.getBounds().clone();
  }

  addIsDownCallback(callbackId: string, callback: () => void) {
    this._isDownCallbacks.set(callbackId, callback);
    this._checkIsDownCallbacks();
  }

  removeIsDownCallback(callbackId: string) {
    this._isDownCallbacks.delete(callbackId);
  }

  setTexture(textureId: ButtonTextureId, texture: TextureLike) {
    this.config.textures[textureId] = texture;
    if (textureId === 'default') {
      this.view.texture = this.make.texture({
        asset: this.config.textures.default,
        sheet: this.config.sheet,
      });
    }

    this.positionLabel();
  }

  /**
   * @description Handles the pointer over event.
   * Sets the texture of the button to the hover texture and emits the onOver event.
   */
  protected handlePointerOver() {
    if (!this._enabled) {
      return;
    }
    if (!this.isOver) {
      this.isOver = true;
    }
    if (this.isDown) {
      return;
    }
    this.view.texture = this.make.texture({
      asset: this.config.textures.hover || this.config.textures.default,
      sheet: this.config.sheet,
    });
    this.onOver.emit();
    if (this.config.sounds?.hover) {
      void this.app.audio.play(this.config.sounds.hover, 'sfx');
    }
    if (this.config.actions?.hover) {
      this._doAction(this.config.actions.hover);
    }
  }

  /**
   * @description Handles the pointer out event.
   * Sets the texture of the button to the default texture and emits the onOut event.
   */
  protected handlePointerOut() {
    this.isOver = false;
    if (!this._enabled) {
      return;
    }
    if (this.isDown) {
      return;
    }
    this.view.texture = this.make.texture({ asset: this.config.textures.default, sheet: this.config.sheet });
    this.onOut.emit();
  }

  /**
   * @description Handles the pointer down event.
   * Sets the isDown property to true and changes the texture of the button.
   */
  protected handlePointerDown(e: FederatedEvent) {
    if (!this._enabled && !this.isKeyDown) {
      return;
    }
    if (!this.isDown && this._pointerId === undefined) {
      this._pointerId = (e as FederatedPointerEvent).pointerId;

      window.removeEventListener('pointerup', this.handlePointerUpOutside);
      this.off('pointerupoutside', this.handlePointerUpOutside);

      window.addEventListener('pointerup', this.handlePointerUpOutside);
      this.on('pointerupoutside', this.handlePointerUpOutside);

      this.isDown = true;
      this.view.texture = this.make.texture({
        asset: this.config.textures.active || this.config.textures.hover || this.config.textures.default,
        sheet: this.config.sheet,
      });
      this.onDown.emit();
      if (this.config.sounds?.down) {
        void this.app.audio.play(this.config.sounds.down, 'sfx');
      }
      if (this.config.actions?.down) {
        this._doAction(this.config.actions.down);
      }
    }
  }

  /**
   * @description Handles the pointer up event.
   * Removes the keyup event listener and emits the onPress and onUp events.
   */
  protected handlePointerUp(e: FederatedEvent) {
    if (!this._enabled || !this.isOver || (e as FederatedPointerEvent).pointerId !== this._pointerId) {
      return;
    }
    window.removeEventListener('pointerup', this.handlePointerUpOutside);

    this.view.texture = this.make.texture({ asset: this.config.textures.default, sheet: this.config.sheet });
    this.onUp.emit();
    if (this.config.sounds?.up) {
      void this.app.audio.play(this.config.sounds.up, 'sfx');
    }
    if (this.config.actions?.up) {
      this._doAction(this.config.actions.up);
    }
    this._pointerId = undefined;
  }

  protected handleClick() {
    if (!this._enabled) {
      return;
    }
    this.isDown = false;
    this.onClick.emit();
    if (this.config.sounds?.click) {
      void this.app.audio.play(this.config.sounds.click, 'sfx');
    }
    if (this.config.actions?.click) {
      this._doAction(this.config.actions.click);
    }
  }

  /**
   * @description Handles the pointer up event.
   */
  protected handlePointerUpOutside(e: PointerEvent | FederatedPointerEvent) {
    if (!this._enabled || e.pointerId !== this._pointerId) {
      return;
    }
    window.removeEventListener('pointerup', this.handlePointerUpOutside);
    this.off('pointerupoutside', this.handlePointerUpOutside);
    this.view.texture = this.make.texture({ asset: this.config.textures.default, sheet: this.config.sheet });
    this.isDown = false;
    this.isOver = false;
    this.onUpOutside.emit();

    if (this.config.sounds?.up) {
      void this.app.audio.play(this.config.sounds.up, 'sfx');
    }
    if (this.config.actions?.up) {
      this._doAction(this.config.actions.up);
    }
    this._pointerId = undefined;
  }

  private _doAction(action: ButtonActionOrCallback) {
    if (typeof action === 'function') {
      void action();
    } else {
      if (!action.data.button) {
        action.data.button = this;
      }
      this.app.action(action.id, action.data);
    }
  }

  private _checkIsDownCallbacks() {
    // check if there are any callbacks, if there are, add the ticker listener
    if (!this._isDownListenerAdded && this._isDownCallbacks.size > 0) {
      this._isDownListenerAdded = true;
      this.app.ticker.add(this._handleIsDownCallbacks);
    } else {
      this.app.ticker.remove(this._handleIsDownCallbacks);
      this._isDownListenerAdded = false;
    }
  }

  private _handleIsDownCallbacks() {
    if (this.isDown) {
      this._isDownCallbacks.forEach((callback) => {
        callback();
      });
    }
  }
}
