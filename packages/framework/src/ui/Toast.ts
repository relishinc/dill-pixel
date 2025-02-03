import { gsap } from 'gsap';
import { Graphics, Text, TextStyle } from 'pixi.js';
import { Container } from '../display/Container';
import { WithSignals } from '../mixins';
import { Signal } from '../signals';

export type ToastType = 'info' | 'success' | 'warning' | 'error';

export interface ToastConfig {
  message: string;
  type?: ToastType;
  duration?: number;
  style?: Partial<TextStyle>;
  width?: number;
  height?: number;
  backgroundColor?: number;
  backgroundAlpha?: number;
  cornerRadius?: number;
  padding?: number;
  autoClose?: boolean;
  textColors?: Record<ToastType, number>;
  textAlign?: 'left' | 'center' | 'right';
  verticalAlign?: 'top' | 'middle' | 'bottom';
}

const defaultConfig: Partial<ToastConfig> = {
  type: 'info',
  duration: 3000,
  width: 300,
  height: 80,
  backgroundColor: 0x000000,
  backgroundAlpha: 0.8,
  cornerRadius: 8,
  padding: 10,
  autoClose: true,
  textAlign: 'center',
  verticalAlign: 'middle',
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
  public readonly onClose = new Signal<() => void>();
  protected background: Graphics;
  protected textDisplay: Text;
  protected config: ToastConfig;
  protected timeline?: gsap.core.Timeline;
  protected closeTimeout?: any;
  protected isHiding: boolean = false;

  set text(value: string) {
    this.textDisplay.text = value;
    this.alignText();
  }

  constructor(config: ToastConfig) {
    super();
    this.config = { ...defaultConfig, ...config };
    this.initialize();
  }

  protected initialize(): void {
    // Create background
    this.background = this.add
      .graphics()
      .roundRect(0, 0, this.config.width!, this.config.height!, this.config.cornerRadius!)
      .fill({
        color: this.config.backgroundColor!,
        alpha: this.config.backgroundAlpha!,
      });

    // Add colored indicator based on type
    if (this.config.type) {
      this.background
        .roundRect(0, 0, 4, this.config.height!, 2)
        .fill({ color: this.config.textColors![this.config.type] });
    }

    // Create text
    this.textDisplay = this.add.text({
      text: this.config.message,
      style: {
        ...defaultConfig.style,
        ...this.config.style,
        wordWrapWidth: this.config.width! - this.config.padding! * 2,
      },
      x: this.config.padding!,
      y: this.config.padding!,
    });

    this.alignText();

    // Set initial state
    this.alpha = 0;
    this.scale.set(0.95);
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

  public async show(): Promise<Toast> {
    this.timeline = gsap.timeline();
    this.timeline
      .to(this, {
        alpha: 1,
        duration: 0.3,
        ease: 'power2.out',
      })
      .to(
        this.scale,
        {
          x: 1,
          y: 1,
          duration: 0.3,
          ease: 'back.out',
        },
        '<',
      );

    if (this.config.autoClose) {
      this.closeTimeout = setTimeout(() => {
        void this.hide();
      }, this.config.duration);
    }

    await this.timeline.play();
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
      const tl = gsap.timeline();

      // Store a reference to the promise before starting animation
      const animationPromise = new Promise<void>((resolve) => {
        tl.to(this, {
          alpha: 0,
          duration: 0.4,
          ease: 'power2.inOut',
        })
          .to(
            this.scale,
            {
              x: 0.8,
              y: 0.8,
              duration: 0.4,
              ease: 'back.in(1.7)',
            },
            '<',
          )
          .eventCallback('onComplete', resolve);
      });

      // Start the animation
      tl.play();

      // Wait for animation to complete
      await animationPromise;

      // Only emit if we haven't been destroyed during animation
      if (!this.destroyed) {
        this.onClose.emit();
      }
    } catch (error) {
      // Handle any animation errors gracefully
      console.warn('Toast hide animation error:', error);
      if (!this.destroyed) {
        this.onClose.emit();
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
    gsap.killTweensOf(this.scale);

    if (this.timeline) {
      this.timeline.kill();
      this.timeline = undefined;
    }

    // Emit close if we're being destroyed without hiding
    if (!this.destroyed && !this.isHiding) {
      this.onClose.emit();
    }

    super.destroy({ children: true });
  }
}
