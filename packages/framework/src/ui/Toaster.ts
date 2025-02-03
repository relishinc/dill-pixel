import { gsap } from 'gsap';
import { Container } from '../display/Container';
import { WithSignals } from '../mixins';
import { Signal } from '../signals';
import { Toast, ToastConfig } from './Toast';
import { UICanvasEdge } from './UICanvas';

export interface ToasterConfig {
  position?: UICanvasEdge;
  maxToasts?: number;
  spacing?: number;
  offset?: number;
  stackDirection?: 'up' | 'down';
}

const defaultConfig: ToasterConfig = {
  position: 'top right',
  maxToasts: 5,
  spacing: 10,
  offset: 20,
  stackDirection: 'down',
};

export class Toaster extends WithSignals(Container) {
  public readonly onToastAdded = new Signal<(toast: Toast) => void>();
  public readonly onToastRemoved = new Signal<(toast: Toast) => void>();

  public config: ToasterConfig;
  private toasts: Toast[] = [];
  private container: Container;

  constructor(config: Partial<ToasterConfig> = {}) {
    super();
    this.config = { ...defaultConfig, ...config };
    this.initialize();
  }

  protected initialize(): void {
    this.container = this.add.container();
  }

  public async show(config: ToastConfig): Promise<Toast> {
    // Remove oldest toast if we exceed max before creating new one
    if (this.toasts.length >= this.config.maxToasts!) {
      const oldestToast = this.toasts[0];
      // Wait for the hide animation to complete
      await oldestToast.hide();
      // Wait for removal to complete
      await this.removeToast(oldestToast);
    }

    // Create new toast
    const toast = new Toast(config);

    // Add to container and array first
    this.container.addChild(toast);
    this.toasts.push(toast);
    this.positionToast(toast, this.toasts.length - 1, false);

    // Connect to close signal
    toast.onClose.connectOnce(() => this.removeToast(toast));

    // Position all toasts including the new one
    this.positionToasts();

    // Emit signal
    this.onToastAdded.emit(toast);

    // Show the toast and return it
    return toast.show();
  }

  public async hideAll(): Promise<void> {
    // Create a copy of the array to avoid modification during iteration
    const toastsToHide = [...this.toasts];

    // Hide all toasts simultaneously
    await Promise.all(toastsToHide.map((toast) => toast.hide()));
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

  public positionToasts(animate: boolean = true): void {
    // Create a copy of the array to avoid modification during iteration
    const validToasts = this.toasts.filter((toast) => toast && !toast.destroyed);

    validToasts.forEach((toast, index) => {
      this.positionToast(toast, index, animate);
    });
  }

  protected positionToast(toast: Toast, index: number, animate: boolean = true): void {
    // Early return if toast is destroyed or invalid
    if (!toast?.parent || toast.destroyed) {
      return;
    }

    const { position, spacing, offset, stackDirection } = this.config;
    let x = 0;
    let y = 0;

    // Calculate base position
    switch (position) {
      case 'top right':
      case 'right top':
        x = this.app.size.width - toast.width - offset!;
        y = offset!;
        break;
      case 'top left':
      case 'left top':
        x = offset!;
        y = offset!;
        break;
      case 'bottom right':
      case 'right bottom':
        x = this.app.size.width - toast.width - offset!;
        y = this.app.size.height - toast.height - offset!;
        break;
      case 'bottom left':
      case 'left bottom':
        x = offset!;
        y = this.app.size.height - toast.height - offset!;
        break;
      case 'top':
      case 'top center':
        x = (this.app.size.width - toast.width) / 2;
        y = offset!;
        break;
      case 'bottom':
      case 'bottom center':
        x = (this.app.size.width - toast.width) / 2;
        y = this.app.size.height - toast.height - offset!;
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
