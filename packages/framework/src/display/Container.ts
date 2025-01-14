import { DestroyOptions, Sprite, Texture, Ticker } from 'pixi.js';
import { Animated, Factory, WithSignals } from '../mixins';

import { Application } from '../Application';
import type { IApplication } from '../core';
import { Signal } from '../signals';
import { SignalOrder } from '../signals/Signal';
import type { PointLike, Size } from '../utils';
import { bindAllMethods } from '../utils';

/**
 * Configuration for the Container class.
 */
export type ContainerConfig = {
  autoResize: boolean;
  autoUpdate: boolean;
  priority: SignalOrder;
};

export const ContainerConfigKeys: (keyof ContainerConfig)[] = ['autoResize', 'autoUpdate', 'priority'];

const defaultConfig: ContainerConfig = { autoResize: true, autoUpdate: false, priority: 0 };

export type BackgroundConfig = {
  color: number;
  alpha: number;
  width: number;
  height: number;
  anchor: PointLike;
  autoResize: boolean;
};

/**
 * Interface for the Container class.
 */
export interface IContainer {
  app: IApplication;

  onDestroy: Signal<() => void>;

  destroy(options?: DestroyOptions): void;

  added(): Promise<void> | void;

  resize(size?: Size): void;

  update(ticker?: Ticker | number): void;

  addColoredBackground(colorOrConfig?: number | Partial<BackgroundConfig>, alpha?: number): Sprite;
}

/**
 * The Container class extends the _Container class (which includes the Animated and Factory mixins) and implements the IContainer interface.
 * It represents a container for PIXI.js display objects.
 */
export class Container<A extends Application = Application>
  extends Animated(WithSignals(Factory()))
  implements IContainer
{
  onDestroy: Signal<() => void> = new Signal();
  __dill_pixel_method_binding_root = true;
  protected __background: Sprite;
  private __config: ContainerConfig;

  /**
   * The constructor for the Container class.
   * @param config - The configuration for the container.
   */
  constructor(config: Partial<ContainerConfig> = {}) {
    super();
    this.__config = { ...defaultConfig, ...config };
    // Bind all methods of this class to the current instance.
    bindAllMethods(this);
    // Add an event listener for the 'added' event.
    this.on('added', this._added);
    this.on('removed', this._removed);
  }

  /**
   * Get the application instance.
   */
  public get app(): A {
    return Application.getInstance() as A;
  }

  public addColoredBackground(colorOrConfig: number | Partial<BackgroundConfig> = 0x0, alpha: number = 1): Sprite {
    const defaultConfig = {
      color: 0x0,
      width: this.app.size.width,
      height: this.app.size.height,
      anchor: 0.5,
      alpha: 1,
      autoResize: true,
    };

    const opts: BackgroundConfig = Object.assign(
      defaultConfig,
      typeof colorOrConfig === 'number'
        ? {
            color: colorOrConfig,
            alpha: alpha,
          }
        : colorOrConfig,
    );

    this.__background = this.add.sprite({
      asset: Texture.WHITE,
      width: opts.width,
      height: opts.height,
      anchor: opts.anchor,
      tint: opts.color,
      alpha: opts.alpha,
      resolution: 2,
    });

    this.setChildIndex(this.__background, 0);

    if (opts.autoResize) {
      this.addSignalConnection(this.app.signal.onResize.connect(this.__resizeBackground));
    }

    return this.__background;
  }

  /**
   * Update the container. This method is meant to be overridden by subclasses.
   * @param ticker
   */
  public update(ticker?: Ticker | number) {
    void ticker;
  }

  /**
   * Resize the container. This method is meant to be overridden by subclasses.
   * @param size
   */
  public resize(size?: Size) {
    void size;
  }

  /**
   * This method is called when the container is added to the stage. It is meant to be overridden by subclasses.
   */
  public added() {}

  destroy(options?: DestroyOptions): void {
    if (this.__config.autoUpdate) {
      this.app.ticker.remove(this.update, this);
    }
    this.onDestroy.emit();
    super.destroy(options);
  }

  public removed() {}

  protected __resizeBackground() {
    this.__background.width = this.app.size.width;
    this.__background.height = this.app.size.height;
  }

  /**
   * This method is called when the container is added to the stage. It sets up auto-resizing and auto-updating if enabled.
   */
  private _added() {
    if (this.__config.autoResize) {
      this.addSignalConnection(this.app.onResize.connect(this.resize, this.__config.priority ?? 'highest'));
    }

    if (this.__config.autoUpdate) {
      this.app.ticker.add(this.update, this, -999999);
    }
    this.added();
  }

  private _removed() {
    if (this.__config.autoResize) {
      this.app.onResize.disconnect(this.resize);
    }

    if (this.__config.autoUpdate) {
      this.app.ticker.remove(this.update, this);
    }

    this.removed();
  }
}
