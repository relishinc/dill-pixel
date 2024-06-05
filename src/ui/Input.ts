import { Container } from '../display';
import {
  Container as PIXIContainer,
  FederatedPointerEvent,
  FillStyleInputs,
  Graphics,
  Sprite,
  Text,
  Texture,
} from 'pixi.js';
import { ensurePadding, Logger, Padding, PointLike } from '../utils';
import { Focusable, Interactive, WithSignals } from '../mixins';
import { TextProps } from '../mixins/factory/props';
import { gsap } from 'gsap';

export type BgStyleOptions = {
  radius: number;
  fill: FillStyleInputs;
  stroke: FillStyleInputs;
};

export interface InputOptions {
  input: Partial<TextProps>;
  placeholder: Partial<TextProps>;
  padding: Padding;
  value: string;
  minWidth: number;
  fixed: boolean;
  maxLength?: number;
  pattern: string;
  type: 'text' | 'password';
  debug: boolean;
  bg: BgStyleOptions;
  caret?: PIXIContainer;
}

export interface InputProps extends Omit<InputOptions, 'padding'> {
  padding: PointLike | Padding | number[] | number;
}

const defaultOptions: InputOptions = {
  input: {
    style: {
      fill: '#000000',
      fontSize: 20,
      fontWeight: 'bold',
    },
  },
  fixed: true,
  placeholder: {},
  value: '',
  padding: { top: 0, left: 0, bottom: 0, right: 0 },
  minWidth: 200,
  debug: false,
  pattern: '',
  type: 'text',
  bg: {
    radius: 5,
    fill: { color: 0xffffff },
    stroke: { width: 1, color: 0x0 },
  },
};

export class Input extends Focusable(Interactive(WithSignals(Container))) {
  public options: InputOptions;
  public bg: Graphics;
  public caret: PIXIContainer;
  public input: Text;
  public placeholderInput: Text;
  protected cursorAnimation: gsap.core.Tween;
  private domElement: HTMLInputElement;
  private _focusTimer: any;
  private _pointerDownTimer: any;
  private _inner: Container;
  private _inputContainer: Container;
  private _mask: Sprite;
  private _lastWidth: number = 0;

  constructor(options: Partial<InputProps>) {
    super({ autoUpdate: true });

    this.options = {
      ...defaultOptions,
      ...options,
      input: {
        ...defaultOptions.input,
        ...(options.input ?? {}),
        style: {
          ...defaultOptions.input.style,
          ...(options?.input?.style ?? {}),
        },
      },
      padding: ensurePadding(options.padding ?? defaultOptions.padding),
    };

    if (!this.options.placeholder) {
      this.options.placeholder = {
        text: '',
        ...this.options.input,
        style: { ...this.options.input.style, fill: 0x888888 },
      };
    }

    this._inner = this.add.container();

    this.bg = this._inner.add
      .graphics()
      .roundRect(0, 0, 100, 50, this.options?.bg?.radius ?? 0)
      .fill(this.options.bg.fill);

    this._inputContainer = this._inner.add.container();

    this.caret = this.options.caret
      ? this._inner.add.existing(this.options.caret)
      : this._inner.add.sprite({ asset: Texture.WHITE, width: 3, height: 10, tint: 0x0, alpha: 0, visible: false });

    this.input = this._inputContainer.add.text({
      ...this.options.input,
      text: this.options.value ?? '',
      label: 'input',
      resolution: 2,
    });

    this.placeholderInput = this._inputContainer.add.text({
      ...this.options.input,
      ...this.options.placeholder,
      style: {
        ...this.options.input.style,
        ...this.options.placeholder.style,
        fill: this.options.placeholder?.style?.fill ?? 0x666666,
      },
      resolution: 2,
      label: 'placeholder',
    });

    this.placeholderInput.style.align = this.input.style.align;
    this.placeholderInput.text = this.options.placeholder.text || '';

    this.addSignalConnection(
      this.onInteraction('click').connect(this.handleClick, -1),
      this.onInteraction('tap').connect(this.handleClick, -1),
    );

    this.input.eventMode = this.placeholderInput.eventMode = 'none';

    if (this.options.fixed) {
      this._mask = this._inner.add.sprite({
        asset: Texture.WHITE,
        width: this.bg.width - this.options.padding.left - this.options.padding.right,
        height: this.bg.height - this.options.padding.top - this.options.padding.bottom,
        tint: 0xff0000,
        alpha: 0.5,
      });
      this._inputContainer.mask = this._mask;
    }
  }

  private _value: string = '';

  public get value() {
    return this._value?.trim() ?? '';
  }

  public set value(value: string) {
    this.domElement.value = value;
  }

  added() {
    this.createDomElement();
  }

  handleClick() {
    this._focusDomElement();
  }

  focusIn() {
    this._focusDomElement();
  }

  _focusDomElement() {
    clearTimeout(this._focusTimer);
    this._focusTimer = setTimeout(() => {
      this.domElement?.focus();
    }, 100);
  }

  _checkPointerDownOutside(e: FederatedPointerEvent) {
    const pos = this.toLocal(e.data.global);
    if (this.getBounds().rectangle.contains(pos.x, pos.y)) {
      this.focusIn();
    } else {
      this.focusOut();
    }
  }

  focusOut() {
    this.domElement?.blur();
  }

  update() {
    this.bg.x = 0;
    this.bg.y = 0;

    // size background
    const bgHeight =
      this.input.getLocalBounds().y +
      this.input.style.fontSize +
      this.options.padding.top +
      this.options.padding.bottom;

    const bgWidth = this.options.fixed
      ? this.options.minWidth
      : Math.max(this.options.minWidth, this.input.width) + this.options.padding.left + this.options.padding.right;

    // position inputs
    // the 'align' property doesn't affect single line text,
    // so we need to do this manually
    const diff = this.options.minWidth - bgWidth + this.options.padding.left + this.options.padding.right;
    const inputAvailableWidth = bgWidth - this.options.padding.left - this.options.padding.right;

    switch (this.input.style.align) {
      case 'center':
        this.input.x = bgWidth / 2 - this.input.width / 2;
        this.placeholderInput.x = bgWidth / 2 - this.placeholderInput.width / 2;
        this._inner.x = diff >= 0 ? 0 : diff / 2;
        if (this.options.fixed) {
          const inputDiff = this.input.width - inputAvailableWidth;
          if (inputDiff > 0) {
            this.input.x -= inputDiff / 2;
          }
        }
        break;
      case 'right':
        this.input.x = bgWidth - this.options.padding.right - this.input.width;
        this.placeholderInput.x = bgWidth - this.options.padding.right - this.placeholderInput.width;
        this._inner.x = diff >= 0 ? 0 : diff;
        break;
      default:
        this.input.x = this.options.padding.left;
        this.placeholderInput.x = this.options.padding.left;
        this._inner.x = 0;
        if (this.options.fixed) {
          const inputDiff = this.input.width - inputAvailableWidth;
          if (inputDiff > 0) {
            this.input.x -= inputDiff;
          }
        }
        break;
    }

    this.input.y = this.options.padding.top;
    this.placeholderInput.y = this.input.y;

    // position caret
    this.caret.x = this.input.x + this.input.width + 1;
    this.caret.y = this.input.y - this.input.style.fontSize * 0.075;
    this.caret.height = this.input.style.fontSize * 1.15;

    // check if value is empty
    if (this.value === '') {
      this.placeholderInput.visible = true;
    } else {
      this.placeholderInput.visible = false;
    }

    if (this.options.fixed) {
      this._mask.width = bgWidth - this.options.padding.left - this.options.padding.right;
      this._mask.height = bgHeight;
      this._mask.position.set(this.options.padding.left, 0);
    }

    if (bgWidth !== this._lastWidth) {
      this.drawBg(bgWidth, bgHeight);
    }
  }

  drawBg(width: number, height: number) {
    this.bg
      .clear()
      .roundRect(0, 0, width, height, this.options?.bg?.radius ?? 0)
      .fill(this.options.bg.fill)
      .stroke(this.options.bg.stroke);

    this._lastWidth = width;
  }

  destroy() {
    this.app.stage.off('pointerdown', this._checkPointerDownOutside);
    this.hideCursor();
    this.destroyDomElement();
    super.destroy();
  }

  protected createDomElement() {
    if (!this.domElement) {
      this.domElement = document.createElement('input');
      this.domElement.type = 'text';
      this.domElement.pattern = this.options.pattern;
      this.domElement.type = this.options.type;

      this.domElement.style.position = 'absolute';

      if (this.options.debug) {
        this.domElement.style.left = '0px';
        this.domElement.style.top = '0px';
      } else {
        this.domElement.style.left = '-1000px';
        this.domElement.style.top = '-1000px';
        this.domElement.style.opacity = '0';
        this.domElement.style.pointerEvents = 'none';
      }
      this.app.canvas.parentElement?.appendChild(this.domElement);
      this.domElement.value = this.value;
      this.domElement.setAttribute('placeholder', this.options?.placeholder?.text ?? '');
      if (this.options?.maxLength) {
        this.domElement.setAttribute('maxLength', this.options.maxLength.toString());
      }

      this.domElement.removeEventListener('focus', this._handleDomElementFocus, false);
      this.domElement.removeEventListener('blur', this._handleDomElementBlur, false);
      this.domElement.removeEventListener('input', this._handleDomElementChange, false);

      this.domElement.addEventListener('focus', this._handleDomElementFocus, false);
      this.domElement.addEventListener('blur', this._handleDomElementBlur, false);
      this.domElement.addEventListener('input', this._handleDomElementChange, false);
    }
  }

  protected destroyDomElement() {
    if (this.domElement) {
      this.domElement.removeEventListener('focus', this._handleDomElementFocus, false);
      this.domElement.removeEventListener('blur', this._handleDomElementBlur, false);
      this.domElement.removeEventListener('input', this._handleDomElementChange, false);
      this.domElement.remove();
      // @ts-expect-error domelement can't be null
      this.domElement = null;
    }
  }

  protected showCursor() {
    this.caret.visible = true;
    this.blinkCaret();
  }

  protected hideCursor() {
    this.cursorAnimation?.kill();
    this.caret.visible = false;
  }

  protected blinkCaret() {
    if (this.cursorAnimation) {
      this.cursorAnimation.kill();
    }
    Logger.log('blinkCaret');
    this.cursorAnimation = gsap.fromTo(
      this.caret,
      { alpha: 0 },
      {
        duration: 0.5,
        alpha: 1,
        yoyo: true,
        repeat: -1,
        overwrite: true,
      },
    );
  }

  private _handleFocus() {
    this.showCursor();
    clearTimeout(this._pointerDownTimer);
    this._pointerDownTimer = setTimeout(() => {
      this.app.stage.off('pointerdown', this._checkPointerDownOutside);
      this.app.stage.on('pointerdown', this._checkPointerDownOutside);
    }, 250);
  }

  private _handleDomElementFocus() {
    this._handleFocus();
  }

  private _handleDomElementBlur() {
    this.hideCursor();
    this.app.stage.off('pointerdown', this._checkPointerDownOutside);
  }

  private _handleDomElementChange(e: Event) {
    const target = e.target as HTMLInputElement;
    if (this.options.pattern !== '') {
      const filteredValue = target.value.replace(new RegExp(`${this.options.pattern}`, 'g'), '');
      target.value = filteredValue;
      this._value = filteredValue;
    } else {
      this._value = this.domElement.value;
    }

    this.input.text =
      this.options.type === 'password'
        ? this._value
            ?.split('')
            .map(() => '*')
            .join('')
        : this._value;
  }
}
