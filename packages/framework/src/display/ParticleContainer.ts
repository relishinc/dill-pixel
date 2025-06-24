import { DestroyOptions, ParticleContainerOptions, ParticleContainer as PIXIParticleContainer, Ticker } from 'pixi.js';

import { Application } from '../core/Application';
import { Signal } from '../signals';
import type { AppTypeOverrides, Size } from '../utils';
import { bindAllMethods } from '../utils';

/**
 * Configuration for the Container class.
 */
export interface ParticleContainerConfig extends ParticleContainerOptions {
  autoUpdate: boolean;
  priority: number;
}

export const ParticleContainerConfigKeys: (keyof ParticleContainerConfig)[] = ['autoUpdate', 'priority'];

const defaultConfig: ParticleContainerConfig = { autoUpdate: true, priority: 0 };

export interface IParticleContainer {
  app: AppTypeOverrides['App'];

  onDestroy: Signal<() => void>;

  destroy(options?: DestroyOptions): void;

  added(): Promise<void> | void;

  update(ticker?: Ticker | number): void;
}

/**
 * The Container class extends the _Container class (which includes the Animated and Factory mixins) and implements the IContainer interface.
 * It represents a container for PIXI.js display objects.
 */
export class ParticleContainer extends PIXIParticleContainer implements IParticleContainer {
  onDestroy: Signal<() => void> = new Signal();
  __dill_pixel_method_binding_root = true;
  private __config: ParticleContainerConfig;

  /**
   * The constructor for the Container class.
   * @param config - The configuration for the container.
   */
  constructor(config: Partial<ParticleContainerConfig> = {}) {
    super(config);
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
  public get app(): AppTypeOverrides['App'] {
    return Application.getInstance() as AppTypeOverrides['App'];
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
  /**
   * This method is called when the container is added to the stage. It sets up auto-resizing and auto-updating if enabled.
   */
  private _added() {
    if (this.__config.autoUpdate) {
      this.app.ticker.add(this.update, this, this.__config.priority);
    }
    this.added();
  }

  private _removed() {
    if (this.__config.autoUpdate) {
      this.app.ticker.remove(this.update, this);
    }
    this.removed();
  }
}
