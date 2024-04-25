import { DestroyOptions, Ticker } from 'pixi.js';
import { Application } from '../core/Application';
import { MethodBindingRoot } from '../core/decorators';
import { Animated } from '../mixins/animated';
import { FactoryContainer } from '../mixins/factory';
import { WithSignals } from '../mixins/signals';
import { bindAllMethods } from '../utils/methodBinding';
import { Size } from '../utils/types';

// Create a new class that extends PIXI.Container and includes the Animated and Factory mixins.
const _Container = Animated(WithSignals(FactoryContainer()));

/**
 * Interface for the Container class.
 */
export interface IContainer {
  app: Application;

  destroy(options?: DestroyOptions): void;

  added(): Promise<void> | void;

  resize(size?: Size): void;

  update(ticker?: Ticker | number): void;
}

/**
 * Configuration for the Container class.
 */
type ContainerConfig = {
  autoResize: boolean;
  autoUpdate: boolean;
  priority: number;
};

/**
 * The Container class extends the _Container class (which includes the Animated and Factory mixins) and implements the IContainer interface.
 * It represents a container for PIXI.js display objects.
 */
@MethodBindingRoot
export class Container<A extends Application = Application> extends _Container implements IContainer {
  /**
   * The constructor for the Container class.
   * @param __config - The configuration for the container.
   */
  constructor(private __config: ContainerConfig = { autoResize: true, autoUpdate: false, priority: 0 }) {
    super();
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
  public update(ticker: Ticker | number) {}

  /**
   * Resize the container. This method is meant to be overridden by subclasses.
   * @param size - The new size of the parent application.
   */
  public resize(size?: Size) {}

  /**
   * This method is called when the container is added to the stage. It is meant to be overridden by subclasses.
   */
  public added() {}

  destroy() {
    if (this.__config.autoUpdate) {
      this.app.ticker.remove(this.update, this);
    }
    super.destroy();
  }

  public removed() {}

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
