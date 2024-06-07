import { Animated, WithSignals } from '../mixins';
import { DestroyOptions, Ticker } from 'pixi.js';

import { Application } from '../Application';
import { FactoryContainer } from '../mixins/factory';
import type { IApplication } from '../core';
import type { Size } from '../utils';
import { bindAllMethods } from '../utils';

// Create a new class that extends PIXI.Container and includes the Animated and Factory mixins.
const _Container = Animated(WithSignals(FactoryContainer()));

/**
 * Interface for the Container class.
 */
export interface IContainer {
  app: IApplication;

  destroy(options?: DestroyOptions): void;

  added(): Promise<void> | void;

  resize(size?: Size): void;

  update(ticker?: Ticker | number): void;
}

/**
 * Configuration for the Container class.
 */
export type ContainerConfig = {
  autoResize: boolean;
  autoUpdate: boolean;
  priority: number;
};

export const ContainerConfigKeys: (keyof ContainerConfig)[] = [
  'autoResize',
  'autoUpdate',
  'priority',
];

const defaultConfig: ContainerConfig = { autoResize: true, autoUpdate: false, priority: 0 };

/**
 * The Container class extends the _Container class (which includes the Animated and Factory mixins) and implements the IContainer interface.
 * It represents a container for PIXI.js display objects.
 */
export class Container<A extends Application = Application> extends _Container implements IContainer {
  __dill_pixel_method_binding_root = true;
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
  public added() { }

  destroy(options?: DestroyOptions): void {
    if (this.__config.autoUpdate) {
      this.app.ticker.remove(this.update, this);
    }
    super.destroy(options);
  }

  public removed() { }

  /**
   * This method is called when the container is added to the stage. It sets up auto-resizing and auto-updating if enabled.
   */
  private _added() {
    if (this.__config.autoResize) {
      this.addSignalConnection(this.app.onResize.connect(this.resize, this.__config.priority));
    }

    if (this.__config.autoUpdate) {
      this.app.ticker.add(this.update, this, this.__config.priority);
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
