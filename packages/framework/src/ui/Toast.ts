import { gsap } from 'gsap';
import { Graphics, Text } from 'pixi.js';
import { Container } from '../display/Container';
import { type TextStyle, WithSignals } from '../mixins';
import { Signal } from '../signals';
import { Button } from './Button';
import { Toaster } from './Toaster';

/**
 * Types of toasts that can be displayed, each with its own color indicator.
 */
export type ToastType = 'info' | 'success' | 'warning' | 'error';

/**
 * Position options for the close button within a toast.
 */
export type CloseButtonPosition = 'top right' | 'top left';

/**
 * Configuration interface for creating a Toast notification.
 *
 * @example
 * ```typescript
 * // Basic toast with default settings
 * const config: ToastConfig = {
 *   message: "Operation successful!",
 *   type: "success"
 * };
 *
 * // Custom styled toast with shadow and close button
 * const config: ToastConfig = {
 *   message: "Custom notification",
 *   backgroundColor: 0x9b59b6,
 *   backgroundAlpha: 1,
 *   cornerRadius: 8,
 *   shadow: {
 *     color: 0x000000,
 *     alpha: 0.2,
 *     offset: { x: 4, y: 4 }
 *   },
 *   closeButton: {
 *     show: true,
 *     position: 'top right'
 *   }
 * };
 * ```
 */
export interface ToastConfig {
  /** Optional custom Toast class to use instead of the default */
  class?: typeof Toast;
  /** The message to display in the toast */
  message: string;
  /** Type of toast, determines the color indicator */
  type?: ToastType;
  /** Duration in milliseconds before auto-closing (if autoClose is true) */
  duration?: number;
  /** Custom text style options */
  style?: TextStyle;
  /** Width of the toast in pixels */
  width?: number;
  /** Height of the toast in pixels */
  height?: number;
  /** Background color in hex format */
  backgroundColor?: number;
  /** Background opacity (0-1) */
  backgroundAlpha?: number;
  /** Corner radius for rounded corners */
  cornerRadius?: number;
  /** Padding around the content */
  padding?: number;
  /** Whether the toast should automatically close after duration */
  autoClose?: boolean;
  /** Custom colors for each toast type's indicator */
  textColors?: Record<ToastType, number>;
  /** Horizontal text alignment */
  textAlign?: 'left' | 'center' | 'right';
  /** Vertical text alignment */
  verticalAlign?: 'top' | 'middle' | 'bottom';
  /** Width of the colored type indicator bar */
  colorBarWidth?: number;
  /** Shadow configuration for depth effect */
  shadow?: {
    /** Shadow color in hex format */
    color?: number;
    /** Shadow opacity (0-1) */
    alpha?: number;
    /** Shadow offset from the toast */
    offset?: { x: number; y: number };
  };
  /** Close button configuration */
  closeButton?: {
    /** Whether to show the close button */
    show?: boolean;
    /** Position of the close button */
    position?: CloseButtonPosition;
    /** Custom button class to use */
    class?: typeof Button;
    /** Size of the close button */
    size?: number;
    /** Offset from the edges */
    offset?: number;
  };
}

export const defaultToastConfig: Partial<ToastConfig> = {
  type: 'info',
  duration: 3000,
  width: 300,
  height: 80,
  backgroundColor: 0x000000,
  backgroundAlpha: 0.8,
  cornerRadius: 0,
  padding: 10,
  autoClose: true,
  textAlign: 'center',
  verticalAlign: 'middle',
  colorBarWidth: 6,
  shadow: {
    color: 0x000000,
    alpha: 0.2,
    offset: { x: 1, y: 3 },
  },
  closeButton: {
    show: false,
    position: 'top right',
    size: 12,
    offset: 4,
  },
  style: {
    fill: 0xffffff,
    fontSize: 16,
    wordWrap: true,
  },
  textColors: {
    info: 0x3498db,
    success: 0x2ecc71,
    warning: 0xf1c40f,
    error: 0xe74c3c,
  },
};

export class Toast extends WithSignals(Container) {
  public readonly onToastClosed = new Signal<() => void>();
  protected background: Graphics;
  protected shadow: Graphics;
  protected textDisplay: Text;
  protected closeButton?: Button;
  protected config: ToastConfig;
  protected timeline?: gsap.core.Timeline;
  protected closeTimeout?: any;
  protected isHiding: boolean = false;

  protected view: Container;

  private _toaster: Toaster;

  set toaster(value: Toaster) {
    this._toaster = value;
  }

  get toaster(): Toaster {
    return this._toaster;
  }

  set text(value: string) {
    this.textDisplay.text = value;
    this.alignText();
  }

  constructor(config: Partial<ToastConfig> = {}) {
    super();
    this.config = { ...defaultToastConfig, ...config } as ToastConfig;
    this.initialize();
  }

  protected initialize(): void {
    this.view = this.add.container();
    // Create shadow first so it's behind everything
    if (this.config.shadow) {
      this.shadow = this.view.add
        .graphics()
        .roundRect(
          this.config.shadow.offset?.x ?? 4,
          this.config.shadow.offset?.y ?? 4,
          this.config.width!,
          this.config.height!,
          this.config.cornerRadius!,
        )
        .fill({
          color: this.config.shadow.color ?? 0x000000,
          alpha: this.config.shadow.alpha ?? 0.2,
        });
    }

    // Create background
    this.background = this.view.add
      .graphics()
      .roundRect(0, 0, this.config.width!, this.config.height!, this.config.cornerRadius!)
      .fill({
        color: this.config.backgroundColor!,
        alpha: this.config.backgroundAlpha!,
      });

    // Create a container for the colored indicator with mask
    if (this.config.type) {
      // Create a mask with the same rounded rectangle as the background
      const mask = new Graphics()
        .roundRect(0, 0, this.config.width!, this.config.height!, this.config.cornerRadius!)
        .fill({ color: 0xffffff });

      // Create the colored indicator
      const indicator = this.view.add
        .graphics()
        .rect(0, 0, this.config.colorBarWidth!, this.config.height!)
        .fill({ color: this.config.textColors![this.config.type] });

      // Apply the mask to the indicator
      indicator.mask = mask;

      // Add both the mask and indicator to the container
      this.view.addChild(mask);
      this.view.addChild(indicator);
    }

    // Add close button if enabled
    if (this.config.closeButton?.show) {
      this.addCloseButton();
    }

    // Create text with adjusted padding to account for color bar and close button
    const leftPadding = this.config.type ? this.config.colorBarWidth! + this.config.padding! : this.config.padding!;
    const rightPadding =
      this.config.closeButton?.show && this.config.closeButton.position === 'top right'
        ? this.config.closeButton.size! + this.config.closeButton.offset! * 2
        : this.config.padding!;

    this.textDisplay = this.view.add.text({
      text: this.config.message,
      style: {
        ...defaultToastConfig.style,
        ...this.config.style,
        wordWrapWidth: this.config.style?.wordWrapWidth ?? this.config.width! - leftPadding - rightPadding,
      },
      x: leftPadding,
      y: this.config.padding!,
    });

    this.alignText();

    this.view.pivot.set(this.config.width! * 0.5, this.config.height! * 0.5);

    this.view.position.set(this.config.width! * 0.5, this.config.height! * 0.5);
    // Set initial state
    this.alpha = 0;

    this.addChild(this.view);
  }

  protected addCloseButton(): void {
    const ButtonClass = this.config.closeButton?.class || Button;
    const size = this.config.closeButton?.size ?? 12;
    const offset = this.config.closeButton?.offset ?? 4;
    const position = this.config.closeButton?.position ?? 'top right';

    this.closeButton = this.view.add.existing(
      new ButtonClass({
        cursor: 'pointer',
      }),
    );

    // Position the close button
    const x = position === 'top right' ? this.config.width! - size * 0.5 - offset : size * 0.5 + offset;
    const y = size * 0.5 + offset;

    this.closeButton.position.set(x, y);

    // Connect close button to hide
    this.closeButton.onClick.connect(() => {
      void this.hide();
    });
  }

  public alignText(): void {
    switch (this.config.textAlign) {
      case 'left':
        this.textDisplay.anchor.set(0, 0.5);
        break;
      case 'center':
        this.textDisplay.anchor.set(0.5, 0.5);
        this.textDisplay.x = this.config.width! / 2;
        break;
      case 'right':
        this.textDisplay.anchor.set(1, 0.5);
        break;
    }

    switch (this.config.verticalAlign) {
      case 'top':
        this.textDisplay.y = this.config.padding!;
        break;
      case 'middle':
        this.textDisplay.y = this.config.height! * 0.5;
        break;
      case 'bottom':
        this.textDisplay.y = this.config.height! - this.textDisplay.height - this.config.padding!;
        break;
    }
  }

  public getShowAnimation(): gsap.core.Timeline {
    const tl = gsap.timeline({ paused: true });
    tl.to(this, {
      alpha: 1,
      duration: 0.4,
      ease: 'power2.out',
    });

    return tl;
  }

  public getHideAnimation(): gsap.core.Timeline {
    const tl = gsap.timeline({ paused: true });
    tl.to(this, {
      alpha: 0,
      duration: 0.25,
      ease: 'power2.in',
    });

    return tl;
  }

  public async show(): Promise<Toast> {
    this.timeline = this.getShowAnimation();
    await this.timeline.play();

    if (this.config.autoClose) {
      this.closeTimeout = setTimeout(() => {
        void this.hide();
      }, this.config.duration);
    }
    return this;
  }

  public async hide(): Promise<Toast> {
    // Prevent multiple hide calls
    if (this.isHiding || this.destroyed) {
      return this;
    }
    this.isHiding = true;

    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = undefined;
    }

    try {
      // Create a new timeline for hiding
      const tl = this.getHideAnimation();
      await tl.play();
      // Only emit if we haven't been destroyed during animation
      if (!this.destroyed) {
        this.onToastClosed.emit();
      }
    } catch (error) {
      // Handle any animation errors gracefully
      console.warn('Toast hide animation error:', error);
      if (!this.destroyed) {
        this.onToastClosed.emit();
      }
    }

    return this;
  }

  public destroy(): void {
    // Prevent any ongoing animations or timeouts
    this.isHiding = true;

    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = undefined;
    }

    // Kill any active GSAP animations immediately
    gsap.killTweensOf(this);

    if (this.timeline) {
      this.timeline.kill();
      this.timeline = undefined;
    }

    // Emit close if we're being destroyed without hiding
    if (!this.destroyed && !this.isHiding) {
      this.onToastClosed.emit();
    }

    super.destroy({ children: true });
  }
}
