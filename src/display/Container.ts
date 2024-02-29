import { DestroyOptions, Ticker } from 'pixi.js';
import { SignalConnection, SignalConnections } from 'typed-signals';
import { Application } from '../core';
import { MethodBindingRoot } from '../core/decorators';
import { Animated, Factory } from '../mixins';
import { defaultFactoryMethods } from '../mixins/factory';
import { bindAllMethods, Size } from '../utils';

const _Container = Animated(Factory(defaultFactoryMethods));

export interface IContainer {
  app: Application;

  destroy(options?: DestroyOptions): void;

  added(): Promise<void> | void;

  addSignalConnection(...args: SignalConnection[]): void;

  resize(size: Size): void;

  update(ticker: Ticker): void;
}

type ContainerConfig = {
  autoResize: boolean;
  autoUpdate: boolean;
  priority: number;
};

@MethodBindingRoot
export class Container<T extends Application = Application> extends _Container implements IContainer {
  protected _signalConnections: SignalConnections = new SignalConnections();

  constructor(private __config: ContainerConfig = { autoResize: true, autoUpdate: false, priority: 0 }) {
    super();

    bindAllMethods(this);
    this.on('added', this._added);
  }

  public get app(): T {
    return Application.getInstance() as T;
  }

  public destroy(options?: DestroyOptions) {
    this._signalConnections.disconnectAll();
    super.destroy(options);
  }

  public addSignalConnection(...args: SignalConnection[]) {
    for (const connection of args) {
      this._signalConnections.add(connection);
    }
  }

  public update(ticker: Ticker) {}

  public resize(size: Size) {}

  public added() {}

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
