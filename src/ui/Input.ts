import { Container } from '../display';
import {
  CanvasTextMetrics,
  Container as PIXIContainer,
  FederatedEvent,
  FederatedPointerEvent,
  Graphics,
  Rectangle,
  Sprite,
  Text,
  Texture,
} from 'pixi.js';
import { ensurePadding, getNearestCharacterIndex, isMobile, isTouch, Logger, Padding, PointLike } from '../utils';
import { Focusable, Interactive, WithSignals } from '../mixins';
import { TextProps } from '../mixins/factory/props';
import { gsap } from 'gsap';
import { Signal } from '../signals';

export type BgStyleOptions = {
  radius: number;
  fill: { color?: number; alpha?: number };
  stroke: { width?: number; color?: number; alpha?: number };
};

export type OverlayOnFocusOptions = {
  mobile: boolean;
  touch: boolean;
  desktop: boolean;
  settings: {
    scale: number;
    marginTop: number;
  };
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
  type: 'text' | 'password' | 'number' | 'email' | 'tel' | 'url';
  debug: boolean;
  bg: Partial<BgStyleOptions>;
  caret?: PIXIContainer;
  regex?: RegExp;
  selectionColor: number;
  error?: {
    input?: {
      fill?: number;
    };
    bg?: {
      fill?: number;
      stroke?: { width?: number; color?: number; alpha?: number };
    };
  };
  overlayOnFocus: Partial<OverlayOnFocusOptions>;
}

export interface InputProps extends Omit<InputOptions, 'padding'> {
  padding: PointLike | Padding | number[] | number;
}

export type InputDetail = {
  value: string;
  input: Input;
  domElement: HTMLInputElement;
};

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
  selectionColor: 0x00ff00,
  overlayOnFocus: {
    mobile: false,
    touch: false,
    desktop: false,
    settings: {
      scale: 1,
      marginTop: 60,
    },
  },
};

const AVAILABLE_TYPES = ['text', 'password', 'number', 'email', 'tel', 'url'];

export class Input extends Focusable(Interactive(WithSignals(Container))) {
  // signals
  public onChange: Signal<(detail: InputDetail) => void> = new Signal<(detail: InputDetail) => void>();
  public onError: Signal<(detail: InputDetail) => void> = new Signal<(detail: InputDetail) => void>();
  // public
  public options: InputOptions;
  public bg: Graphics;
  public caret: PIXIContainer;
  public input: Text;
  public placeholder: Text;
  public error: boolean;
  // protected
  protected cursorAnimation: gsap.core.Tween;
  protected domElement: HTMLInputElement;
  protected selectionGraphics: Graphics;
  protected cloneOverlay: Input;
  // private
  private _focusTimer: any;
  private _pointerDownTimer: any;
  private _inner: Container;
  private _inputContainer: Container;
  private _mask: Sprite;
  private _lastWidth: number = 0;
  private _lastHeight: number = 0;
  private _keyboardHeight: { before: number; after: number } = { before: 0, after: 0 };

  constructor(
    options: Partial<InputProps>,
    public isClone: boolean = false,
    public clone: Input | null = null,
  ) {
    super({ autoUpdate: true, autoResize: !isClone });

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
      bg: {
        ...defaultOptions.bg,
        ...(options.bg ?? {}),
      },
      overlayOnFocus: {
        ...defaultOptions.overlayOnFocus,
        ...(options.overlayOnFocus ?? {}),
        settings: {
          ...defaultOptions.overlayOnFocus.settings,
          ...(options.overlayOnFocus?.settings ?? { marginTop: 60, scale: 1 }),
        },
      },
    };

    if (!this.options.placeholder) {
      this.options.placeholder = {
        ...this.options.input,
        style: { ...this.options.input.style, fill: 0x888888 },
      };
    }

    this._inner = this.add.container();
    this.addBg();

    this._inputContainer = this._inner.add.container({ y: -2 });
    this.addSelection();
    this.addCaret();
    this.addInput();
    this.addPlaceholder();

    this.placeholder.text = this.options.placeholder.text || `Enter ${this.options.type}`;

    this.input.eventMode = this.placeholder.eventMode = 'none';

    this.addSignalConnection(
      this.onInteraction('click').connect(this.handleClick, -1),
      this.onInteraction('tap').connect(this.handleClick, -1),
    );

    if (this.options.fixed) {
      const scale = this.isClone ? this.clone?.options?.overlayOnFocus?.settings?.scale ?? 1 : 1;
      this._mask = this._inner.add.sprite({
        asset: Texture.WHITE,
        width: this.bg.width * scale - this.options.padding.left - this.options.padding.right,
        height: this.bg.height * scale - this.options.padding.top - this.options.padding.bottom,
        tint: 0xff0000,
        alpha: 0.5,
      });
      this._inputContainer.mask = this._mask;
    }
  }

  private _caretPosition: number = -1;

  get caretPosition() {
    return this._caretPosition;
  }

  private _selectionRect: Rectangle | null;

  get selectionRect() {
    return this._selectionRect;
  }

  private _regex: RegExp;

  set regex(value: RegExp) {
    this._regex = value;
  }

  get isValid(): boolean {
    let result = false;
    if (this.domElement) {
      if (this._regex) {
        result = this._regex.test(this._value);
      } else {
        if (this.options.type === 'text') {
          return true;
        }
        this.domElement.required = true;
        result = this.domElement.checkValidity();
        this.domElement.required = false;
      }
    }
    return result;
  }

  private _value: string = '';

  public get value() {
    return this._value?.trim() ?? '';
  }

  public set value(value: string) {
    this.domElement.value = value;
  }

  resize() {
    this._keyboardHeight.after = window.innerHeight;
  }

  resetBg() {
    this.drawBg();
  }

  added() {
    this.createDomElement();
    if (this.isClone) {
      this.showCursor();
    }
  }

  handleClick(e: FederatedEvent) {
    // check if this was a triggered event from the FocusMnagerPlugin
    if ((e.originalEvent as unknown as KeyboardEvent)?.key) {
      return;
    }
    const nearestCharacterIndex = getNearestCharacterIndex(this.input, e);
    this._focusDomElement(nearestCharacterIndex);
  }

  focusIn() {
    this._focusDomElement();
  }

  _focusDomElement(selection?: number) {
    clearTimeout(this._focusTimer);
    this._focusTimer = setTimeout(() => {
      this._keyboardHeight.before = window.innerHeight;
      if (this.domElement) {
        this.domElement.focus();
        // set position to end
        if (selection === undefined) {
          this.domElement.selectionStart = this.domElement.value?.length;
        } else {
          this.domElement.setSelectionRange(selection, selection, 'none');
        }
        this._updateCaretAndSelection();
      }
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
        this.placeholder.x = bgWidth / 2 - this.placeholder.width / 2;
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
        this.placeholder.x = bgWidth - this.options.padding.right - this.placeholder.width;
        this._inner.x = diff >= 0 ? 0 : diff;
        break;
      default:
        this.input.x = this.options.padding.left;
        this.placeholder.x = this.options.padding.left;
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
    this.placeholder.y = this.input.y;

    if (this.isClone && this.clone) {
      const cloneScale = this.clone.options?.overlayOnFocus?.settings?.scale ?? 1;
      this.error = this.clone.error;
      this._value = this.clone.input.text;
      this.input.text = this._value;
      this._selectionRect = this.clone.selectionRect!.clone();
      this._selectionRect.x *= cloneScale;
      this._selectionRect.y *= cloneScale;
      this._selectionRect.width *= cloneScale;
      this._selectionRect.height *= cloneScale;
      this._caretPosition = this.clone.caretPosition * cloneScale;
    }
    // position caret
    this.caret.x = this._caretPosition >= 0 ? this.input.x + this._caretPosition : this.input.x + this.input.width + 1;
    this.caret.y = this.input.y - 2;
    this.caret.height = this.input.style.fontSize * 1.15;

    // check if value is empty
    if (this.value === '') {
      this.placeholder.visible = true;
    } else {
      this.placeholder.visible = false;
    }

    if (this.options.fixed) {
      const scale = this.isClone ? this.options?.overlayOnFocus?.settings?.scale ?? 1 : 1;
      this._mask.width = (bgWidth - this.options.padding.left - this.options.padding.right) * scale;
      this._mask.height = bgHeight * scale;
      this._mask.position.set(this.options.padding.left * scale, 0);
    }

    if (bgWidth !== this._lastWidth) {
      this.drawBg(bgWidth, bgHeight);
    }

    if (this._selectionRect) {
      this.drawSelection();
    } else {
      this.selectionGraphics?.clear();
    }

    if (this.options.debug) {
      // get global pos
      const globalPos = this.getGlobalPosition();
      this.domElement.style.left = `${globalPos.x + this.width + 10}px`;
      this.domElement.style.height = `${this.input.style.fontSize}px`;
      this.domElement.style.top = `${globalPos.y}px`;
    }

    if (this.cloneOverlay) {
      this._positionCloneOverlay();
    }
  }

  drawSelection() {
    const rect = this._selectionRect;
    if (!rect) {
      this.selectionGraphics?.clear();
      return;
    }
    this.selectionGraphics?.clear();
    this.selectionGraphics
      .rect(rect.left + this.input.x, this.caret.y, rect.width, this.caret.height)
      .fill({ color: this.options.selectionColor });
  }

  drawBg(width: number = this._lastWidth, height: number = this._lastHeight) {
    const opts =
      (this.error || (this.isClone && this.clone?.error)) && this.options?.error?.bg
        ? { ...this.options.bg, ...this.options.error.bg }
        : this.options.bg;

    if (this.isClone) {
      Logger.log(this.options.error);
    }

    this.bg
      .clear()
      .roundRect(0, 0, width, height, opts?.radius ?? 0)
      .fill(opts.fill)
      .stroke({ ...(opts?.stroke || {}), alignment: 0 });

    this._lastWidth = width;
    this._lastHeight = height;
  }

  destroy() {
    this.app.stage.off('pointerdown', this._checkPointerDownOutside);
    this.hideCursor();
    this.destroyDomElement();
    super.destroy();
  }

  protected addBg() {
    this.bg = this._inner.add
      .graphics()
      .roundRect(0, 0, 100, 50, this.options?.bg?.radius ?? 0)
      .fill(this.options.bg.fill);
  }

  protected addSelection() {
    this.selectionGraphics = this._inputContainer.add.graphics();
  }

  protected addCaret() {
    this.caret = this.options.caret
      ? this._inputContainer.add.existing(this.options.caret)
      : this._inputContainer.add.sprite({
          asset: Texture.WHITE,
          width: 3,
          height: 10,
          tint: 0x0,
          alpha: 0,
          visible: false,
        });
  }

  protected addInput() {
    this.input = this._inputContainer.add.text({
      ...this.options.input,
      style: { ...(this.options.input?.style || {}), padding: 2 },
      text: this.options.value ?? '',
      label: 'input',
      resolution: 2,
    });
  }

  protected addPlaceholder() {
    this.placeholder = this._inputContainer.add.text({
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

    this.placeholder.style.align = this.input.style.align;
  }

  protected createDomElement() {
    if (this.isClone && this.clone?.domElement) {
      this.domElement = this.clone.domElement;
      this._addDomElementListeners();
      return;
    }
    if (!this.domElement) {
      this.domElement = document.createElement('input');
      this.domElement.type = 'text';
      if (this.options.type && AVAILABLE_TYPES.includes(this.options.type)) {
        this.domElement.type = this.options.type;
      }

      if (this.options.pattern) {
        this.domElement.pattern = this.options.pattern;
      }
      if (this.options.regex) {
        this._regex = this.options.regex;
      }

      this.domElement.style.position = 'absolute';

      if (this.options.debug) {
        this.domElement.style.opacity = '0.7';
        this.domElement.style.padding = `10px 10px`;
        this.domElement.style.fontSize = `${this.input.style.fontSize}px`;
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

      this._addDomElementListeners();
    }
  }

  protected destroyDomElement() {
    if (this.isClone) {
      return;
    }
    if (this.domElement) {
      this._removeDomElementListeners();
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

  protected validate() {
    const hasError = this.error;
    if (this.isClone) {
      this.error = this.clone?.error || false;
    } else {
      this.error = !this.isValid;
      if (this.error && this.error !== hasError) {
        this.onError.emit({ input: this, domElement: this.domElement, value: this._value });
      }
    }
    if (this.error !== hasError) {
      if (this.error && this.options?.error?.input?.fill) {
        this.input.style.fill = this.options?.error?.input?.fill;
      } else {
        this.input.style.fill = this.options.input?.style?.fill || 0x0;
      }
      this.drawBg();
    }

    if (this.cloneOverlay) {
      this.cloneOverlay.validate();
    }
  }

  private _removeDomElementListeners() {
    this.domElement.removeEventListener('focus', this._handleDomElementFocus, false);
    this.domElement.removeEventListener('blur', this._handleDomElementBlur, false);
    this.domElement.removeEventListener('input', this._handleDomElementChange, false);
    this.domElement.removeEventListener('keyup', this._handleDomElementKeyup, false);
    this.domElement.removeEventListener('keydown', this._updateCaretAndSelection, false);
  }

  private _addDomElementListeners() {
    this._removeDomElementListeners();
    this.domElement.addEventListener('focus', this._handleDomElementFocus, false);
    this.domElement.addEventListener('blur', this._handleDomElementBlur, false);
    this.domElement.addEventListener('input', this._handleDomElementChange, false);
    this.domElement.addEventListener('keyup', this._handleDomElementKeyup, false);
    this.domElement.addEventListener('keydown', this._updateCaretAndSelection, false);
  }

  private _handleFocus() {
    this._caretPosition = -1;
    this.showCursor();

    clearTimeout(this._pointerDownTimer);

    if (!this.isClone) {
      this._pointerDownTimer = setTimeout(() => {
        this.app.stage.off('pointerdown', this._checkPointerDownOutside);
        this.app.stage.on('pointerdown', this._checkPointerDownOutside);
      }, 250);

      if (
        this.options.overlayOnFocus.mobile ||
        this.options.overlayOnFocus.touch ||
        this.options.overlayOnFocus.desktop
      ) {
        // decide if we should show an overlay
        if (this.cloneOverlay) {
          this._removeCloneOverlay();
        }

        let shouldShow = false;
        if (isMobile && this.options.overlayOnFocus.mobile) {
          shouldShow = true;
        }
        if (isTouch && this.options.overlayOnFocus.touch) {
          shouldShow = true;
        }
        if (!isMobile && !isTouch && this.options.overlayOnFocus.desktop) {
          shouldShow = true;
        }

        if (shouldShow) {
          const opts = structuredClone(this.options);
          const scale = this.options.overlayOnFocus?.settings?.scale || 1;
          opts.overlayOnFocus = { mobile: false, touch: false, desktop: false };
          const fontSize = Number(opts.input.style?.fontSize || defaultOptions.input.style?.fontSize) * scale;
          if (!opts.input.style) {
            opts.input.style = {};
          }
          if (!opts.placeholder.style) {
            opts.placeholder.style = {};
          }
          opts.input.style.fontSize = fontSize;
          opts.placeholder.style.fontSize = fontSize;
          if (opts.padding) {
            opts.padding.left *= scale;
            opts.padding.top *= scale;
            opts.padding.right *= scale;
            opts.padding.bottom *= scale;
          }
          if (opts.bg?.radius) {
            opts.bg.radius *= scale;
          }
          if (opts.bg?.stroke?.width) {
            opts.bg.stroke.width *= scale;
          }
          if (opts.error?.bg?.stroke?.width) {
            opts.error.bg.stroke.width *= scale;
          }
          if (opts.minWidth) {
            opts.minWidth *= scale;
            if (opts.minWidth > this.app.size.width) {
              opts.minWidth = this.app.size.width - (opts.bg?.stroke?.width ? opts.bg.stroke.width * 2 + 20 : 20);
            }
          }
          this.cloneOverlay = new Input(opts, true, this);
          this.cloneOverlay.label = `${this.label} -- clone`;
          this.cloneOverlay.alpha = 0;
          this.cloneOverlay.input.text = this.value;
          this.cloneOverlay.validate();
          Logger.log(this.cloneOverlay);
          this.app.stage.addChild(this.cloneOverlay);
          this._positionCloneOverlay();
          this._showCloneOverlay();
        }
      }
    }
  }

  private _showCloneOverlay() {
    gsap.to(this.cloneOverlay, { duration: 0.5, alpha: 0.8, ease: 'sine.out', delay: 0.1 });
  }

  private _positionCloneOverlay() {
    if (!this.cloneOverlay) {
      return;
    }
    const w = this.cloneOverlay.options.minWidth;
    this.cloneOverlay.x = this.app.size.width * 0.5 - w * 0.5;
    this.cloneOverlay.y = this.options.overlayOnFocus.settings?.marginTop || 20;
  }

  private _removeCloneOverlay() {
    this.cloneOverlay?.destroy();
    this.cloneOverlay?.parent?.removeChild(this.cloneOverlay);
    // @ts-expect-error cloneOverlay can't be null
    this.cloneOverlay = null;
  }

  private _handleDomElementFocus() {
    this._handleFocus();
  }

  private _handleDomElementBlur() {
    this.hideCursor();
    this.app.stage.off('pointerdown', this._checkPointerDownOutside);
    this._removeCloneOverlay();
  }

  // private _handleSelectionChange() {
  //   const start = this.domElement.selectionStart ?? this._value.length;
  //   const end = this.domElement.selectionEnd  || start;
  //   const text = this._value.substring(start > end ? end : start, start > end ? start : end);
  //   const metrics = CanvasTextMetrics.measureText(text, this.input.style);
  //   Logger.log(
  // }

  private _handleDomElementKeyup() {
    this._updateCaretAndSelection();
  }

  private _updateCaretAndSelection() {
    const start = this.domElement.selectionStart || 0;
    const end = this.domElement.selectionEnd || -1;
    const direction = this.domElement.selectionDirection;
    let text = '';
    const value = this.options.type === 'password' ? this.input.text : this._value;
    if (end === undefined) {
      text = value.substring(0, start);
      const metrics = CanvasTextMetrics.measureText(text, this.input.style);
      this._caretPosition = metrics.width;
      this._selectionRect = null;
    } else {
      text = value.substring(start > end ? end : start, start > end ? start : end);
      const toStart = value.substring(0, start > end ? end : start);
      const leftMetrics = CanvasTextMetrics.measureText(toStart, this.input.style);
      const textMetrics = CanvasTextMetrics.measureText(text, this.input.style);
      this._selectionRect = new Rectangle(leftMetrics.width, 0, textMetrics.width, this.input.height);
      this._caretPosition =
        direction === 'backward' ? this._selectionRect.left : this._selectionRect.left + this._selectionRect.width;
    }
  }

  private _handleDomElementChange(e: Event) {
    const target = e.target as HTMLInputElement;
    if (this.options.pattern !== '') {
      const filteredValue = target.value.replace(new RegExp(this.options.pattern, 'g'), '');
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

    this._updateCaretAndSelection();

    if (!this.isClone) {
      this.onChange.emit({ input: this, domElement: this.domElement, value: this._value });
      this.validate();
    }
  }
}
