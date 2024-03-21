import { DestroyOptions, Ticker } from 'pixi.js';
import { Application } from '../core/Application';
import { MethodBindingRoot } from '../core/decorators';
import { Animated } from '../mixins/animated';
import { Factory } from '../mixins/factory';
import { SignalConnection, SignalConnections } from '../signals';
import { bindAllMethods } from '../utils/methodBinding';
import { Size } from '../utils/types';

// Create a new class that extends PIXI.Container and includes the Animated and Factory mixins.
const _Container = Animated(Factory());

/**
 * Interface for the Container class.
 */
export interface IContainer {
  app: Application;

  destroy(options?: DestroyOptions): void;

  added(): Promise<void> | void;

  addSignalConnection(...args: SignalConnection[]): void;

  resize(size: Size): void;

  update(ticker: Ticker): void;
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
export class Container<T extends Application = Application> extends _Container implements IContainer {
  // A collection of signal connections.
  protected _signalConnections: SignalConnections = new SignalConnections();

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
  }

  /**
   * Get the application instance.
   */
  public get app(): T {
    return Application.getInstance() as T;
  }

  /**
   * Destroy the container and disconnect all signal connections.
   * @param options - The options for destroying the container.
   */
  public destroy(options?: DestroyOptions) {
    this._signalConnections.disconnectAll();
    super.destroy(options);
  }

  /**
   * Add signal connections to the container.
   * @param args - The signal connections to add.
   */
  public addSignalConnection(...args: SignalConnection[]) {
    for (const connection of args) {
      this._signalConnections.add(connection);
    }
  }

  /**
   * Update the container. This method is meant to be overridden by subclasses.
   * @param ticker - The PIXI.js ticker.
   */
  public update(ticker: Ticker) {}

  /**
   * Resize the container. This method is meant to be overridden by subclasses.
   * @param size - The new size of the parent application.
   */
  public resize(size: Size) {}

  /**
   * This method is called when the container is added to the stage. It is meant to be overridden by subclasses.
   */
  public added() {}

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
}
