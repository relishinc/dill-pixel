import { gsap } from 'gsap';
import { Container } from '../display/Container';
import { WithSignals } from '../mixins';
import { Signal } from '../signals';
import { Toast, ToastConfig } from './Toast';
import { UICanvasEdge } from './UICanvas';

/**
 * Configuration interface for the Toaster component, which manages toast notifications.
 *
 * @example
 * ```typescript
 * // Basic toaster in top-right corner
 * const config: ToasterConfig = {
 *   position: 'top right',
 *   maxToasts: 3
 * };
 *
 * // Custom toaster with specific spacing and offset
 * const config: ToasterConfig = {
 *   position: 'bottom center',
 *   maxToasts: 5,
 *   spacing: 15,
 *   offset: { x: 20, y: 30 },
 *   stackDirection: 'up'
 * };
 * ```
 */
export interface ToasterConfig {
  /** Position of toasts relative to the screen edges */
  position?: UICanvasEdge;
  /** Maximum number of toasts to show at once */
  maxToasts?: number;
  /** Vertical spacing between toasts */
  spacing?: number;
  /** Distance from screen edges, can be a number for equal x/y or an object for different values */
  offset?: { x: number; y: number } | number;
  /** Direction in which new toasts should stack */
  stackDirection?: 'up' | 'down';
}

const defaultConfig: ToasterConfig = {
  position: 'top right',
  maxToasts: 5,
  spacing: 10,
  offset: { x: 20, y: 20 },
  stackDirection: 'down',
};

/**
 * Toaster component that manages the display and positioning of toast notifications.
 *
 * @example
 * ```typescript
 * // Create a toaster
 * const toaster = new Toaster({
 *   position: 'top right',
 *   maxToasts: 3
 * });
 *
 * // Show a basic toast
 * toaster.show({
 *   message: "Operation successful!",
 *   type: "success"
 * });
 *
 * // Show a custom toast
 * toaster.show({
 *   message: "Custom notification",
 *   backgroundColor: 0x9b59b6,
 *   shadow: {
 *     color: 0x000000,
 *     alpha: 0.2,
 *     offset: { x: 4, y: 4 }
 *   }
 * });
 *
 * // Hide all toasts
 * toaster.hideAll();
 * ```
 */
export class Toaster extends WithSignals(Container) {
  /** Emitted when a new toast is added */
  public readonly onToastAdded = new Signal<(toast: Toast) => void>();
  /** Emitted when a toast is removed */
  public readonly onToastRemoved = new Signal<(toast: Toast) => void>();
  /** Emitted when all toasts are removed */
  public readonly onAllToastsRemoved = new Signal<() => void>();

  public config: ToasterConfig;
  public defaultToastConfig: Partial<ToastConfig>;
  private toasts: Toast[] = [];
  private container: Container;

  /**
   * Create a new Toaster instance to manage toast notifications.
   *
   * @param config - Configuration for the Toaster's position, spacing, and behavior
   * @param defaultToastConfig - Default configuration applied to all toasts shown by this Toaster
   *
   * @example
   * ```typescript
   * // Basic toaster with default settings
   * const toaster = new Toaster();
   *
   * // Toaster with custom position and behavior
   * const toaster = new Toaster({
   *   position: 'bottom center',
   *   maxToasts: 3,
   *   spacing: 15,
   *   offset: { x: 20, y: 30 },
   *   stackDirection: 'up'
   * });
   *
   * // Toaster with custom defaults for all toasts
   * const toaster = new Toaster(
   *   {
   *     position: 'top right',
   *     maxToasts: 5
   *   },
   *   {
   *     backgroundColor: 0x000000,
   *     backgroundAlpha: 0.8,
   *     cornerRadius: 8,
   *     shadow: {
   *       color: 0x000000,
   *       alpha: 0.2,
   *       offset: { x: 4, y: 4 }
   *     },
   *     closeButton: {
   *       show: true,
   *       position: 'top right'
   *     }
   *   }
   * );
   *
   * // The defaultToastConfig will be applied to all toasts,
   * // but can be overridden per toast:
   * toaster.show({ message: "Uses default config" });
   * toaster.show({
   *   message: "Custom config",
   *   backgroundColor: 0x9b59b6  // Overrides default
   * });
   * ```
   */
  constructor(config: Partial<ToasterConfig> = {}, defaultToastConfig: Partial<ToastConfig> = {}) {
    super();
    this.config = { ...defaultConfig, ...config } as ToasterConfig;
    this.defaultToastConfig = { ...defaultToastConfig } as Partial<ToastConfig>;
    this.initialize();
  }

  protected initialize(): void {
    this.container = this.add.container();
  }

  /**
   * Get the current number of visible toasts
   */
  public get size(): number {
    return this.toasts.length;
  }

  /**
   * Display a new toast notification
   * @param config Configuration for the toast to display
   * @returns Promise that resolves with the created toast
   */
  public async show(config: Partial<ToastConfig> = this.defaultToastConfig): Promise<Toast> {
    // Remove oldest toast if we exceed max before creating new one
    if (this.size >= this.config.maxToasts!) {
      const oldestToast = this.toasts[0];
      // Wait for the hide animation to complete
      await oldestToast.hide();
      // Wait for removal to complete
      await this.removeToast(oldestToast);
    }

    if (this.defaultToastConfig) {
      config = { ...this.defaultToastConfig, ...config } as ToastConfig;
    }
    // Create new toast
    const ToastClass = config.class ?? Toast;
    const toast = new ToastClass(config);

    // Add to container and array first
    this.container.addChild(toast);
    this.toasts.push(toast);
    this.positionToast(toast, this.toasts.length - 1, false);

    // Connect to close signal
    toast.onToastClosed.connectOnce(() => this.removeToast(toast));

    // Position all toasts including the new one
    this.positionToasts();

    // Emit signal
    this.onToastAdded.emit(toast);

    // Show the toast and return it
    return toast.show();
  }

  /**
   * Hide all currently visible toasts with animation
   * @returns Promise that resolves when all toasts are hidden
   */
  public async hideAll(): Promise<void> {
    // Create a copy of the array to avoid modification during iteration
    const toastsToHide = [...this.toasts];

    // Hide all toasts simultaneously
    await Promise.all(toastsToHide.map((toast) => toast.hide()));

    this.onAllToastsRemoved.emit();
  }

  /**
   * Remove all toasts (alias for hideAll)
   */
  public async removeAll(): Promise<void> {
    return this.hideAll();
  }

  protected async removeToast(toast: Toast): Promise<void> {
    const index = this.toasts.indexOf(toast);
    if (index === -1 || toast.destroyed) {
      return;
    }

    // Remove from array first
    this.toasts.splice(index, 1);

    // Position remaining toasts
    this.positionToasts();

    // Remove from container and destroy
    if (!toast.destroyed) {
      this.container.removeChild(toast);
      toast.destroy();
    }

    // Emit signal
    this.onToastRemoved.emit(toast);
  }

  /**
   * Update positions of all toasts
   * @param animate Whether to animate the position changes
   * @param skipLast Whether to skip positioning the last toast
   */
  public positionToasts(animate: boolean = true, skipLast: boolean = false): void {
    // Create a copy of the array to avoid modification during iteration
    const validToasts = this.toasts.filter(
      (toast, index) => toast && !toast.destroyed && (skipLast ? index !== this.toasts.length - 1 : true),
    );

    validToasts.forEach((toast, index) => {
      this.positionToast(toast, index, animate);
    });
  }

  /**
   * Position a single toast
   * @param toast The toast to position
   * @param index The index of the toast in the toasts array
   * @param animate Whether to animate the position changes
   */
  protected positionToast(toast: Toast, index: number, animate: boolean = true): void {
    // Early return if toast is destroyed or invalid
    if (!toast?.parent || toast.destroyed) {
      return;
    }

    const { position, spacing, offset, stackDirection } = this.config;
    const offsetX = typeof offset === 'number' ? offset : offset!.x;
    const offsetY = typeof offset === 'number' ? offset : offset!.y;
    let x = this.app.size.width * 0.5;
    let y = this.app.size.height * 0.5;

    // Calculate base position
    switch (position) {
      case 'top right':
      case 'right top':
        x += this.app.size.width * 0.5 - toast.width - offsetX;
        y -= this.app.size.height * 0.5 - offsetY;
        break;
      case 'top left':
      case 'left top':
        x -= this.app.size.width * 0.5 - offsetX;
        y -= this.app.size.height * 0.5 - offsetY;
        break;
      case 'bottom right':
      case 'right bottom':
        x += this.app.size.width * 0.5 - toast.width - offsetX;
        y += this.app.size.height * 0.5 - toast.height - offsetY;
        break;
      case 'bottom left':
      case 'left bottom':
        x -= this.app.size.width * 0.5 - offsetX;
        y += this.app.size.height * 0.5 - toast.height - offsetY;
        break;
      case 'top':
      case 'top center':
        x += -toast.width * 0.5;
        y -= this.app.size.height * 0.5 - offsetY;
        break;
      case 'bottom':
      case 'bottom center':
        x += -toast.width * 0.5;
        y += this.app.size.height * 0.5 - toast.height - offsetY;
        break;
    }

    // Apply stacking offset
    if (stackDirection === 'down') {
      y += index * (toast.height + spacing!);
    } else {
      y -= index * (toast.height + spacing!);
    }

    try {
      // Animate to position
      if (animate) {
        gsap.to(toast, {
          x,
          y,
          duration: 0.3,
          ease: 'power2.out',
        });
      } else {
        toast.position.set(x, y);
      }
    } catch (error) {
      console.warn('Error positioning toast:', error);
    }
  }

  /**
   * Handle window resize events
   */
  public resize(): void {
    this.position.set(-this.app.size.width * 0.5, -this.app.size.height * 0.5);
    this.positionToasts(false); // Don't animate on resize
  }

  public destroy(): void {
    // Kill any active GSAP animations
    this.toasts.forEach((toast) => {
      gsap.killTweensOf(toast);
    });

    this.hideAll();
    this.toasts = [];
    super.destroy({ children: true });
  }
}
