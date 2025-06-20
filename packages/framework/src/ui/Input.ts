import {
  Bounds,
  CanvasTextMetrics,
  FederatedEvent,
  FederatedPointerEvent,
  Graphics,
  Container as PIXIContainer,
  Rectangle,
  Sprite,
  Text,
  Texture,
} from 'pixi.js';

import { Focusable, Interactive, TextProps, WithSignals } from '../mixins';

import {
  EaseString,
  ensurePadding,
  getNearestCharacterIndex,
  isAndroid,
  isMobile,
  isTouch,
  Logger,
  Padding,
  PointLike,
  resolvePointLike,
} from '../utils';

import { gsap } from 'gsap';
import { Container } from '../display';
import { Signal } from '../signals';

/**
 * Options for styling the input background
 * @interface BgStyleOptions
 */
export type BgStyleOptions = {
  /** Border radius of the input background */
  radius: number;
  /** Fill style for the background */
  fill: { color?: number; alpha?: number };
  /** Stroke style for the background border */
  stroke: { width?: number; color?: number; alpha?: number };
};

/**
 * Color configuration options
 * @interface ColorOptions
 */
export type ColorOptions = {
  /** Color in hexadecimal format */
  color: number;
  /** Alpha transparency value (0-1) */
  alpha: number;
};

/**
 * Placeholder text configuration
 * @interface PlaceholderOptions
 */
export type PlaceholderOptions = {
  /** Text to display as placeholder */
  text: string;
};

/**
 * Focus overlay configuration for mobile/touch interactions
 * @interface FocusOverlayOptions
 * @example
 * ```typescript
 * const overlaySettings = {
 *   activeFilter: ['mobile', 'touch'],
 *   marginTop: 60,
 *   scale: 2.5,
 *   backing: { active: true, color: 0x0 }
 * };
 * ```
 */
export type FocusOverlayOptions = {
  /** Enable overlay for specific platforms */
  mobile: boolean;
  touch: boolean;
  desktop: boolean;
  /** Custom filter for when to show overlay */
  activeFilter?: boolean | (() => boolean) | ('mobile' | 'touch' | 'desktop')[];
  /** Scale factor for the overlay */
  scale: number;
  /** Top margin for the overlay */
  marginTop: number;
  /** Backing configuration */
  backing: {
    active: boolean;
    options: Partial<ColorOptions>;
  };
};

/**
 * Extended placeholder options with animation and positioning
 * @interface ExtraPlaceholderOptions
 * @example
 * ```typescript
 * const placeholderConfig = {
 *   positionOnType: 'top',
 *   offsetOnType: { x: 0, y: -20 },
 *   scaleOnType: { x: 0.8, y: 0.8 },
 *   animationOnType: {
 *     duration: 0.3,
 *     ease: 'sine.out',
 *     tint: 0x666666,
 *     alpha: 0.5
 *   }
 * };
 * ```
 */
type ExtraPlaceholderOptions = {
  /** Position of placeholder when typing */
  positionOnType: 'top' | 'bottom';
  /** Offset from original position when typing */
  offsetOnType: PointLike;
  /** Scale factor when typing */
  scaleOnType: PointLike;
  /** Animation configuration when typing */
  animationOnType: {
    duration: number;
    ease: EaseString;
    tint: number;
    alpha: number;
  };
};

/**
 * Main configuration options for the Input component
 * @interface InputOptions
 * @example
 * ```typescript
 * const input = new Input({
 *   value: 'Initial value',
 *   type: 'text',
 *   minWidth: 400,
 *   padding: [12, 15],
 *   placeholder: {
 *     text: 'Enter text...',
 *     color: 0x666666
 *   },
 *   bg: {
 *     radius: 10,
 *     stroke: { width: 2, color: 0x000000 }
 *   },
 *   focusOverlay: {
 *     activeFilter: ['mobile', 'touch'],
 *     scale: 2.5
 *   }
 * });
 * ```
 */
export interface InputOptions extends Partial<TextProps> {
  /** Initial value of the input */
  value: string;
  /** Input type (text, password, number, etc.) */
  type: 'text' | 'password' | 'number' | 'email' | 'tel' | 'url';
  /** Whether the input width is fixed */
  fixed: boolean;
  /** Pattern for input validation */
  pattern: string;
  /** Enable debug mode */
  debug: boolean;
  /** Minimum width of the input */
  minWidth: number;
  /** Padding configuration */
  padding: Padding;
  /** Maximum length of input */
  maxLength?: number;
  /** Whether to blur on Enter key */
  blurOnEnter: boolean;
  /** Custom regex for validation */
  regex?: RegExp;
  /** Background style configuration */
  bg: Partial<BgStyleOptions>;
  /** Placeholder configuration */
  placeholder: Partial<PlaceholderOptions & ColorOptions & ExtraPlaceholderOptions>;
  /** Selection highlight configuration */
  selection: Partial<ColorOptions>;
  /** Caret configuration */
  caret: Partial<ColorOptions>;
  /** Error state styling */
  error?: {
    input?: {
      fill?: number;
    };
    bg?: Partial<Omit<BgStyleOptions, 'stroke'>>;
  };
  /** Focus overlay configuration */
  focusOverlay: Partial<FocusOverlayOptions>;
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
  value: '',
  type: 'text',
  fixed: true,
  pattern: '',
  debug: false,
  minWidth: 200,
  padding: { top: 0, left: 0, bottom: 0, right: 0 },
  blurOnEnter: true,
  style: {
    fontFamily: 'Arial',
    fill: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  bg: {
    radius: 5,
    fill: { color: 0xffffff },
    stroke: { width: 1, color: 0x0 },
  },
  placeholder: {},
  selection: { color: 0x00ff00 },
  caret: {
    color: 0x0,
    alpha: 0.8,
  },
  focusOverlay: {
    activeFilter: false,
    scale: 1,
    marginTop: 60,
  },
};

const AVAILABLE_TYPES = ['text', 'password', 'number', 'email', 'tel', 'url'];

/**
 * A highly customizable input component with mobile/touch support
 * @class Input
 * @extends Focusable(Interactive(WithSignals(Container)))
 *
 * @example
 * ```typescript
 * // Basic text input
 * const basicInput = new Input({
 *   minWidth: 400,
 *   placeholder: { text: 'Enter text' },
 *   padding: [12, 15]
 * });
 *
 * // Password input with validation
 * const passwordInput = new Input({
 *   type: 'password',
 *   minWidth: 400,
 *   placeholder: { text: 'Enter password' },
 *   maxLength: 20,
 *   regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
 * });
 *
 * // Phone number input with validation
 * const phoneInput = new Input({
 *   type: 'tel',
 *   regex: /^1?-?\(?([2-9][0-9]{2})\)?[-. ]?([2-9][0-9]{2})[-. ]?([0-9]{4})$/,
 *   error: {
 *     input: { fill: 0xff0000 },
 *     bg: { fill: 0xf5e0df }
 *   }
 * });
 * ```
 */
export class Input extends Focusable(Interactive(WithSignals(Container))) {
  /**
   * Emitted when the Enter key is pressed
   * @event onEnter
   * @type {Signal<(detail: InputDetail) => void>}
   */
  public onEnter: Signal<(detail: InputDetail) => void> = new Signal<(detail: InputDetail) => void>();

  /**
   * Emitted when the input value changes
   * @event onChange
   * @type {Signal<(detail: InputDetail) => void>}
   */
  public onChange: Signal<(detail: InputDetail) => void> = new Signal<(detail: InputDetail) => void>();

  /**
   * Emitted when validation fails
   * @event onError
   * @type {Signal<(detail: InputDetail) => void>}
   */
  public onError: Signal<(detail: InputDetail) => void> = new Signal<(detail: InputDetail) => void>();

  /**
   * Input configuration options
   * @type {InputOptions}
   */
  public options: InputOptions;

  /**
   * Background graphics container
   * @type {Graphics}
   */
  public bg: Graphics;

  /**
   * Caret (cursor) container
   * @type {PIXIContainer}
   */
  public caret: PIXIContainer;

  /**
   * Text input container
   * @type {Text}
   */
  public input: Text;

  /**
   * Placeholder text container
   * @type {Text}
   */
  public placeholder: Text;

  /**
   * Current error state
   * @type {boolean}
   */
  public error: boolean;

  // Protected properties
  protected cursorAnimation: gsap.core.Tween;
  protected domElement: HTMLInputElement;
  protected selectionGraphics: Graphics;
  protected cloneOverlay: Input;
  protected overlayBacking: Sprite;

  // Private properties
  private _focusTimer: any;
  private _pointerDownTimer: any;
  private _inner: Container;
  private _inputContainer: Container;
  private _placeholderContainer: Container;
  private _mask: Graphics;
  private _lastWidth: number = 0;
  private _lastHeight: number = 0;
  private _placeholderPositioned: boolean = false;
  private _placeholderAnimating: boolean = false;
  private _caretPosition: number = -1;
  private _selectionRect: Rectangle | null;
  private _regex: RegExp;
  private _value: string = '';

  constructor(
    options: Partial<InputProps>,
    public isClone: boolean = false,
    public clone: Input | null = null,
  ) {
    super({ autoUpdate: true, autoResize: !isClone });

    this.options = {
      ...defaultOptions,
      ...options,
      style: {
        ...defaultOptions.style,
        ...(options?.style ?? {}),
      },
      padding: ensurePadding(options.padding ?? defaultOptions.padding),
      bg: {
        ...defaultOptions.bg,
        ...(options.bg ?? {}),
      },
      focusOverlay: {
        ...defaultOptions.focusOverlay,
        ...(options.focusOverlay ?? {}),
      },
    };

    if (this.options.layout && typeof this.options.layout === 'object') {
      this.layout = { ...this.options.layout };
    } else {
      this.layout = { transformOrigin: 'top left' };
    }

    if (!this.options.placeholder) {
      this.options.placeholder = {
        color: Number(this.options.style?.fill) ?? 0x666666,
      };
    }

    this._inner = this.add.container({
      layout: { position: 'relative', top: 0, left: 0, width: '100%', height: '100%' },
    });
    this.addBg();

    this._inputContainer = this._inner.add.container({
      y: -2,
      layout: {
        position: 'absolute',
        transformOrigin: 'top left',
        inset: 0,
        width: '100%',
        height: '100%',
      },
    });
    this._placeholderContainer = this._inner.add.container({
      y: -2,
      layout: {
        position: 'absolute',
        inset: 0,
        transformOrigin: 'top left',
        width: '100%',
        height: '100%',
      },
    });
    this._placeholderContainer.eventMode = 'none';
    this.addSelection();
    this.addCaret();
    this.addInput();
    this.addPlaceholder();

    this.placeholder.text = this.options.placeholder.text || `Enter ${this.options.type}`;

    this.input.eventMode = this.placeholder.eventMode = 'none';

    if (isTouch) {
      this.addSignalConnection(this.onInteraction('pointertap').connect(this.handleClick, -1));
    }
    this.addSignalConnection(this.onInteraction('click').connect(this.handleClick, -1));

    if (this.options.fixed) {
      const scale = this.isClone ? (this.clone?.options?.focusOverlay?.scale ?? 1) : 1;
      this._mask = this._inner.add
        .graphics()
        .rect(
          0,
          0,
          this.bg.width * scale - this.options.padding.left - this.options.padding.right,
          this.bg.height * scale - this.options.padding.top - this.options.padding.bottom,
        )
        .fill({ color: 0x0 });
      this._inputContainer.mask = this._mask;
    }
  }

  /**
   * Gets the current caret (cursor) position
   * @readonly
   * @returns {number} The caret position in pixels from the left
   */
  get caretPosition() {
    return this._caretPosition;
  }

  /**
   * Gets the current selection rectangle
   * @readonly
   * @returns {Rectangle | null} The selection rectangle or null if no selection
   */
  get selectionRect() {
    return this._selectionRect;
  }

  /**
   * Sets the validation regex
   * @param {RegExp} value - The regular expression to use for validation
   */
  set regex(value: RegExp) {
    this._regex = value;
  }

  /**
   * Gets whether the current input value is valid
   * @readonly
   * @returns {boolean} True if the input is valid
   */
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

  /**
   * Gets the current input value
   * @returns {string} The current value
   */
  public get value() {
    return this._value?.trim() ?? '';
  }

  /**
   * Sets the input value
   * @param {string} value - The value to set
   */
  public set value(value: string) {
    if (this.domElement) {
      this.domElement.value = value;
      const event = new Event('input', {
        bubbles: true,
        cancelable: true,
      });
      this.domElement.dispatchEvent(event);
    } else {
      this._value = value;
      this.input.text = value;
    }
  }

  /**
   * Resizes the input component
   * Updates the clone overlay position if it exists
   */
  resize() {
    super.resize();
    if (this.cloneOverlay) {
      this._positionCloneOverlay();
    }
  }

  /**
   * Redraws the background graphics
   */
  resetBg() {
    this.drawBg();
  }

  /**
   * Called when the component is added to the display list
   * Shows the cursor if this is a clone
   */
  added() {
    super.added();
    if (this.isClone) {
      this.showCursor();
    }
  }

  /**
   * Handles click/tap events on the input
   * Creates the DOM element and positions the caret
   * @param {FederatedEvent} [e] - The pointer event
   */
  handleClick(e?: FederatedEvent) {
    // check if this was a triggered event from the FocusMnagerPlugin
    if ((e?.originalEvent as unknown as KeyboardEvent)?.key) {
      return;
    }
    clearTimeout(this._focusTimer);
    clearTimeout(this._pointerDownTimer);
    const nearestCharacterIndex = e ? getNearestCharacterIndex(this.input, e) : (this.input.text?.length ?? 0);
    this.createDomElement(nearestCharacterIndex);
    // this._focusDomElement(nearestCharacterIndex);
  }

  /**
   * Focuses the input
   * Creates the DOM element and shows the cursor
   */
  focusIn() {
    this.handleClick();
  }

  _focusDomElement(selection?: number) {
    this._focusTimer = setTimeout(() => {
      this._triggerFocusAndSelection(selection);
    }, 100);
  }

  _triggerFocusAndSelection(selection?: number) {
    if (this.domElement) {
      try {
        this.domElement.focus();
        this.domElement.click();
        if (selection === undefined) {
          this.domElement.selectionStart = this.domElement?.value?.length;
        } else {
          this.domElement.setSelectionRange(selection, selection, 'none');
        }
      } catch (e) {
        // nothing
      }
      this._updateCaretAndSelection();
    }
  }

  _checkPointerDownOutside(e: FederatedPointerEvent) {
    const pos = this.toLocal(e.data.global);
    if (this.getBounds().rectangle.contains(pos.x, pos.y)) {
      this.focusIn();
    } else {
      this.focusOut();
    }
  }

  /**
   * Blurs (unfocuses) the input
   * Removes the DOM element and hides the cursor
   */
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
        if (!this._placeholderPositioned) {
          this.placeholder.x = bgWidth / 2 - this.placeholder.width / 2;
        }
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
        if (!this._placeholderPositioned) {
          this.placeholder.x = bgWidth - this.options.padding.right - this.placeholder.width;
        }
        this._inner.x = diff >= 0 ? 0 : diff;
        break;
      default:
        this.input.x = this.options.padding.left;
        if (!this._placeholderPositioned) {
          this.placeholder.x = this.options.padding.left;
        }
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
    if (!this._placeholderPositioned) {
      this.placeholder.y = this.input.y;
    }

    if (this.isClone && this.clone) {
      const cloneScale = this.clone.options?.focusOverlay?.scale ?? 1;
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
      if (!this.isClone && this._placeholderPositioned && !this._placeholderAnimating) {
        this._placeholderAnimating = true;
        const tx = this.input.x;
        const ty = this.input.y;
        if (this.options.placeholder.animationOnType) {
          this.addAnimation([
            gsap.to(this.placeholder, {
              x: tx,
              y: ty,
              tint: 0xffffff,
              alpha: this.options.placeholder.alpha ?? 1,
              duration: this.options.placeholder.animationOnType.duration || 0.4,
              ease: this.options.placeholder.animationOnType.ease || 'sine.in',
              overwrite: true,
              onComplete: () => {
                this._placeholderPositioned = false;
                this._placeholderAnimating = false;
              },
            }),
            gsap.to(this.placeholder.scale, {
              x: 1,
              y: 1,
              duration: this.options.placeholder.animationOnType.duration || 0.4,
              ease: this.options.placeholder.animationOnType.ease || 'sine.out',
              overwrite: true,
            }),
          ]);
        } else {
          this.placeholder.x = tx;
          this.placeholder.y = ty;
          this.placeholder.scale.set(1, 1);
          this._placeholderPositioned = false;
          this._placeholderAnimating = false;
        }
      }
    } else {
      if (!this.isClone && this.options.placeholder.positionOnType) {
        this.placeholder.visible = true;
        if (!this._placeholderPositioned) {
          this._placeholderPositioned = true;
          let tx = this.placeholder.x;
          let ty = this.placeholder.y;
          switch (this.options.placeholder.positionOnType) {
            case 'top':
              ty = this.input.y - this.placeholder.height - this.options.padding.top;
              break;
            case 'bottom':
              ty = this.input.y + this.input.height + this.options.padding.bottom;
              break;
          }

          if (this.options.placeholder.offsetOnType) {
            const offset = resolvePointLike(this.options.placeholder.offsetOnType);
            tx += offset.x;
            ty += offset.y;
          }

          if (this.options.placeholder.animationOnType) {
            this.addAnimation(
              gsap.to(this.placeholder, {
                x: tx,
                y: ty,
                duration: this.options.placeholder.animationOnType.duration || 0.4,
                ease: this.options.placeholder.animationOnType.ease || 'none',
                tint: this.options.placeholder.animationOnType.tint ?? null,
                alpha: this.options.placeholder.animationOnType.alpha ?? this.options.placeholder.alpha ?? 1,
                overwrite: true,
              }),
            );

            if (this.options.placeholder.scaleOnType) {
              const scale = resolvePointLike(this.options.placeholder.scaleOnType);
              this.addAnimation(
                gsap.to(this.placeholder.scale, {
                  x: scale.x,
                  y: scale.y,
                  duration: this.options.placeholder.animationOnType.duration || 0.4,
                  ease: this.options.placeholder.animationOnType.ease || 'none',
                  overwrite: true,
                }),
              );
            }
          } else {
            this.placeholder.x = tx;
            this.placeholder.y = ty;
          }
        }
      } else {
        this.placeholder.visible = false;
      }
    }

    if (this.options.fixed) {
      const scale = this.isClone ? (this.options?.focusOverlay?.scale ?? 1) : 1;
      if (this._mask) {
        this._mask
          .clear()
          .rect(0, 0, (bgWidth - this.options.padding.left - this.options.padding.right) * scale, bgHeight * scale)
          .fill({ color: 0x0 });
        this._mask.position.set(this.options.padding.left * scale, 0);
      }
    }

    if (bgWidth !== this._lastWidth) {
      this.drawBg(bgWidth, bgHeight);
    }

    if (this._selectionRect) {
      this.drawSelection();
    } else {
      this.selectionGraphics?.clear();
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
      .fill({ color: this.options.selection.color });
  }

  drawBg(width: number = this._lastWidth, height: number = this._lastHeight) {
    const opts =
      (this.error || (this.isClone && this.clone?.error)) && this.options?.error?.bg
        ? { ...this.options.bg, ...this.options.error.bg }
        : this.options.bg;

    this.bg
      .clear()
      .roundRect(0, 0, width, height, opts?.radius ?? 0)
      .fill(opts.fill)
      .stroke({ ...(opts?.stroke || {}), alignment: 0 });

    this._lastWidth = width;
    this._lastHeight = height;
  }

  destroy() {
    console.log('input destroy', this);
    clearTimeout(this._focusTimer);
    clearTimeout(this._pointerDownTimer);

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
    this.caret = this._inputContainer.add.sprite({
      asset: Texture.WHITE,
      width: 3,
      height: 10,
      tint: this.options.caret.color ?? 0x0,
      alpha: 0,
      visible: false,
    });
  }

  protected addInput() {
    this.input = this._inputContainer.add.text({
      ...this.options,
      style: { ...(this.options?.style || {}), padding: 2 },
      text: this.options.value ?? '',
      label: 'input',
      resolution: 2,
      roundPixels: true,
      layout: false,
    });
  }

  protected addPlaceholder() {
    this.placeholder = this._placeholderContainer.add.text({
      ...this.options,
      ...this.options.placeholder,
      style: {
        ...this.options.style,
        fill: this.options.placeholder?.color ?? 0x666666,
      },
      resolution: 2,
      label: 'placeholder',
      roundPixels: true,
      layout: true,
    });

    this.placeholder.style.align = this.input.style.align;
  }

  protected createDomElement(selection?: number) {
    if (this.isClone && this.clone?.domElement) {
      this.domElement = this.clone.domElement;
      this._addDomElementListeners();
      return;
    }
    clearTimeout(this._focusTimer);
    clearTimeout(this._pointerDownTimer);

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

    const pos = this.getGlobalPosition();
    const bounds = this.getBounds();
    bounds.x = pos.x;
    bounds.y = pos.y;
    bounds.width = this.width - this.options.padding.left;

    /**
     * Overlays an HTMLInputElement
     * allows the keyboard to be used on mobile devices
     * mostly taken from @pixi/ui
     * @see https://github.com/pixijs/ui/blob/main/src/Input.ts
     */

    this.domElement.style.position = 'fixed';
    this.domElement.style.border = 'none';
    this.domElement.style.outline = 'none';
    this.domElement.style.left = isAndroid ? `0` : `${bounds.left}px`;
    this.domElement.style.top = isAndroid ? `0` : `${bounds.top}px`;
    this.domElement.style.width = `${bounds.width}px`;
    this.domElement.style.height = `${bounds.height}px`;
    this.domElement.style.padding = '0';

    if (this.options.debug) {
      this.domElement.style.opacity = '0.8';
    } else {
      this.domElement.style.opacity = '0.0000001';
    }
    this.app.canvas.parentElement?.appendChild(this.domElement);
    this.domElement.value = this.value;
    this.domElement.setAttribute('placeholder', this.options?.placeholder?.text ?? '');
    if (this.options?.maxLength) {
      this.domElement.setAttribute('maxLength', this.options.maxLength.toString());
    }

    this._addDomElementListeners();
    this._focusDomElement(selection);
  }

  protected destroyDomElement() {
    if (this.isClone) {
      return;
    }
    if (this.domElement) {
      this._removeDomElementListeners();
      this.domElement.remove();

      if (this.domElement.parentNode) {
        this.domElement.parentNode.removeChild(this.domElement);
      }
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
    this.addAnimation(this.cursorAnimation);
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
      if (this.error && this.error !== hasError) {
        this.input.style.fill = this.options?.error?.input?.fill || 0x0;
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
    this.domElement.removeEventListener('keydown', this._handleDomElementKeydown, false);
  }

  private _addDomElementListeners() {
    if (this.isClone) {
      return;
    }
    this._removeDomElementListeners();
    this.domElement.addEventListener('focus', this._handleDomElementFocus, false);
    this.domElement.addEventListener('blur', this._handleDomElementBlur, false);
    this.domElement.addEventListener('input', this._handleDomElementChange, false);
    this.domElement.addEventListener('keyup', this._handleDomElementKeyup, false);
    this.domElement.addEventListener('keydown', this._handleDomElementKeydown, false);
  }

  private _handleFocus() {
    this._caretPosition = -1;
    this.showCursor();

    clearTimeout(this._pointerDownTimer);

    if (!this.isClone) {
      this._pointerDownTimer = setTimeout(() => {
        this.app.stage.on('pointerdown', this._checkPointerDownOutside);
      }, 250);

      const hasOverlay = Boolean(this.options.focusOverlay.activeFilter);
      if (hasOverlay) {
        // decide if we should show an overlay
        if (this.cloneOverlay) {
          this._removeCloneOverlay();
        }
        const isList = Array.isArray(this.options.focusOverlay.activeFilter);
        let shouldShow = false;
        if (isList) {
          const filterList = this.options.focusOverlay.activeFilter as ('mobile' | 'touch' | 'desktop')[];
          if (
            (isMobile && filterList.includes('mobile')) ||
            (isTouch && filterList.includes('touch')) ||
            (!isMobile && !isTouch && filterList.includes('desktop'))
          ) {
            shouldShow = true;
          }
        } else if (typeof this.options.focusOverlay.activeFilter === 'function') {
          shouldShow = this.options.focusOverlay.activeFilter();
        } else {
          shouldShow = hasOverlay;
        }

        if (shouldShow) {
          const opts = structuredClone(this.options);
          const scale = this.options.focusOverlay?.scale || 1;
          opts.focusOverlay = { activeFilter: false };
          const fontSize = Number(opts.style?.fontSize || defaultOptions.style?.fontSize || 20) * scale;
          if (!opts.style) {
            opts.style = {};
          }

          opts.style.fontSize = fontSize;
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
          if (opts.minWidth) {
            opts.minWidth *= scale;
            if (opts.minWidth > this.app.size.width) {
              opts.minWidth = this.app.size.width - (opts.bg?.stroke?.width ? opts.bg.stroke.width * 2 + 20 : 20);
            }
          }

          // should we show backing?
          if (this.options.focusOverlay?.backing?.active) {
            const backing = this.make.sprite({
              asset: Texture.WHITE,
              tint: this.options.focusOverlay.backing.options?.color ?? 0x0,
              alpha: this.options.focusOverlay.backing.options?.alpha ?? 0.8,
              width: this.app.size.width,
              height: this.app.size.height,
              eventMode: 'static',
            });
            this.overlayBacking = this.app.stage.addChild(backing);
          }

          this.cloneOverlay = new Input(opts, true, this);
          this.cloneOverlay.label = `${this.label} -- clone`;
          this.cloneOverlay.alpha = 0;
          this.cloneOverlay.input.text = this.value;
          this.cloneOverlay.validate();
          this.app.stage.addChild(this.cloneOverlay);
          this._positionCloneOverlay();
          this._showCloneOverlay();
        }
      }
    }
  }

  private _showCloneOverlay() {
    this.cloneOverlay.pivot.y = -20;
    this.addAnimation(gsap.to(this.cloneOverlay, { duration: 0.5, alpha: 0.8, ease: 'sine.out', delay: 0.1 }));
    this.addAnimation(gsap.to(this.cloneOverlay.pivot, { duration: 0.5, y: 0, ease: 'sine.out', delay: 0.1 }));
  }

  private _positionCloneOverlay() {
    if (!this.cloneOverlay) {
      return;
    }
    const w = this.cloneOverlay.options.minWidth;
    this.cloneOverlay.x = this.app.size.width * 0.5 - w * 0.5;
    this.cloneOverlay.y = this.options.focusOverlay?.marginTop || 20;
    if (this.overlayBacking) {
      this.overlayBacking.width = this.app.size.width;
      this.overlayBacking.height = this.app.size.height;
    }
  }

  private _removeCloneOverlay() {
    this.overlayBacking?.destroy();
    this.overlayBacking?.parent?.removeChild(this.overlayBacking);
    // @ts-expect-error cloneOverlay can't be null
    this.overlayBacking = null;
    this.cloneOverlay?.destroy();
    this.cloneOverlay?.parent?.removeChild(this.cloneOverlay);
    // @ts-expect-error cloneOverlay can't be null
    this.cloneOverlay = null;
  }

  private _handleDomElementFocus() {
    this.app.stage.off('pointerdown', this._checkPointerDownOutside);
    this._handleFocus();
  }

  private _handleDomElementBlur() {
    if (this.isClone) {
      return;
    }
    clearTimeout(this._focusTimer);
    clearTimeout(this._pointerDownTimer);
    this.hideCursor();
    this._removeCloneOverlay();
    this.destroyDomElement();
  }

  private _handleDomElementKeyup() {
    this._updateCaretAndSelection();
  }

  private _handleDomElementKeydown(e: KeyboardEvent) {
    this._updateCaretAndSelection();
    if (!this.isClone && e.key === 'Enter') {
      if (this.options.blurOnEnter) {
        this.domElement.blur();
      }
      this.onEnter.emit({ input: this, value: this._value, domElement: this.domElement });
    }
  }

  private _updateCaretAndSelection() {
    if (!this.domElement) {
      Logger.warn(this.label, 'No dom element');
      return;
    }
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
    if (target && !this.domElement) {
      this.domElement = target;
    }
    if (this.options.pattern !== '') {
      const filteredValue = target.value.replace(new RegExp(this.options.pattern, 'g'), '');
      target.value = filteredValue;
      this._value = filteredValue;
    } else {
      this._value = target.value;
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

  /**
   * Gets the focusable area bounds
   * @returns {Bounds} The bounds of the input container
   */
  getFocusArea(): Bounds {
    const bounds = this._inputContainer.getBounds();
    bounds.width = this._lastWidth;
    bounds.height = this._lastHeight;
    return bounds;
  }
}
