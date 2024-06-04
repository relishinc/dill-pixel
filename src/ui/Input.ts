import { Container } from '../display';
import { Container as PIXIContainer, FederatedPointerEvent, Text, Texture } from 'pixi.js';
import { ensurePadding, Logger, Padding, PointLike } from '../utils';
import { Focusable, Interactive, WithSignals } from '../mixins';
import { TextProps } from '../mixins/factory/props';
import { gsap } from 'gsap';

export interface InputOptions {
  input: Partial<TextProps>;
  placeholder: Partial<TextProps>;
  padding: Padding;
  value: string;
  minWidth: number;
  bg?: PIXIContainer;
  caret?: PIXIContainer;
  maxLength?: number;
  debug: boolean;
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
  placeholder: {},
  value: '',
  padding: { top: 0, left: 0, bottom: 0, right: 0 },
  minWidth: 200,
  debug: false,
};

export class Input extends Focusable(Interactive(WithSignals(Container))) {
  public options: InputOptions;
  public bg: PIXIContainer;
  public caret: PIXIContainer;
  public input: Text;
  public placeholderInput: Text;
  protected cursorAnimation: gsap.core.Tween;
  private domElement: HTMLInputElement;
  private _focusTimer: any;
  private _pointerDownTimer: any;

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

    this.bg = this.options.bg
      ? this.add.existing(this.options.bg)
      : this.add.container({
          x: this.options.padding.left,
          y: this.options.padding.top,
          interactive: true,
        });

    this.caret = this.options.caret
      ? this.add.existing(this.options.caret)
      : this.add.sprite({ asset: Texture.WHITE, width: 3, height: 10, tint: 0x0, alpha: 0, visible: false });

    this.input = this.add.text({
      text: this.options.value ?? this.options.placeholder.text,
      ...this.options.input,
      label: 'input',
    });

    this.placeholderInput = this.add.text({
      text: this.options.value ?? this.options.placeholder.text,
      ...this.options.input,
      ...this.options.placeholder,
      style: {
        ...this.options.input.style,
        ...this.options.placeholder.style,
        fill: this.options.placeholder?.style?.fill ?? 0x666666,
      },
      label: 'placeholder',
    });

    this.bg.width = Math.max(this.options.minWidth, this.input.width);

    this.addSignalConnection(
      this.onInteraction('click').connect(this.handleClick, -1),
      this.onInteraction('tap').connect(this.handleClick, -1),
    );

    this.input.eventMode = this.placeholderInput.eventMode = 'none';
  }

  public get value() {
    return this.input.text?.trim() ?? '';
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
    Logger.log('focusOut');
    this.domElement?.blur();
  }

  update() {
    this.bg.x = 0;
    this.bg.y = 0;

    this.input.x = this.options.padding.left;
    this.input.y = this.options.padding.top;

    this.placeholderInput.position.set(this.input.x, this.input.y);

    this.caret.x = this.input.x + this.input.width + 1;
    this.caret.y = this.input.y - this.input.style.fontSize * 0.075;
    this.caret.height = this.input.style.fontSize * 1.15;

    this.bg.height =
      this.input.getLocalBounds().y + this.input.height + this.options.padding.top + this.options.padding.bottom;

    this.bg.width =
      Math.max(this.options.minWidth, this.input.width) + this.options.padding.left + this.options.padding.right;

    // check if value is empty
    if (this.value === '') {
      this.placeholderInput.visible = true;
    } else {
      this.placeholderInput.visible = false;
    }
  }

  destroy() {
    this.hideCursor();
    this.destroyDomElement();
    super.destroy();
  }

  protected createDomElement() {
    if (!this.domElement) {
      Logger.log(this.label, 'createDomElement');
      this.domElement = document.createElement('input');
      this.domElement.type = 'text';
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
    this.cursorAnimation = gsap.to(this.caret, {
      duration: 0.5,
      alpha: 1,
      yoyo: true,
      repeat: -1,
    });
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

  private _handleDomElementChange() {
    this.input.text = this.domElement.value;
  }
}
