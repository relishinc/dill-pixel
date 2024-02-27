import { DestroyOptions, Ticker } from 'pixi.js';
import { SignalConnection, SignalConnections } from 'typed-signals';
import { Application } from '../core';
import { Animated, Factory } from '../mixins';
import { defaultFactoryMethods } from '../mixins/factory';
import { bindAllMethods, Size } from '../utils';

const _Container = Animated(Factory(defaultFactoryMethods));

export interface IContainer {
  app: Application;

  destroy(options?: DestroyOptions): void;

  onAdded(): Promise<void> | void;

  addSignalConnection(...args: SignalConnection[]): void;

  onResize(size: Size): void;

  update(ticker: Ticker): void;
}

export class Container<T extends Application = Application> extends _Container implements IContainer {
  protected _signalConnections: SignalConnections = new SignalConnections();

  constructor(autoResize = true, autoUpdate = false, priority: number = 0) {
    super();

    bindAllMethods(this);

    if (autoResize) {
      this.addSignalConnection(this.app.onResize.connect(this.onResize, priority));
    }

    if (autoUpdate) {
      this.app.ticker.add(this.update);
    }

    this.on('added', this.onAdded);
  }

  public get app(): T {
    return Application.getInstance() as T;
  }

  public destroy(options?: DestroyOptions) {
    this._signalConnections.disconnectAll();
    super.destroy(options);
  }

  public onAdded() {}

  public addSignalConnection(...args: SignalConnection[]) {
    for (const connection of args) {
      this._signalConnections.add(connection);
    }
  }

  public onResize(size: Size) {}

  public update(ticker: Ticker) {}
}
