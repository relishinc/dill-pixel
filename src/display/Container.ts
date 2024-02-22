import { DestroyOptions } from 'pixi.js';
import { SignalConnection, SignalConnections } from 'typed-signals';
import { Application } from '../core';
import { Animated, Factory } from '../mixins';
import { defaultFactoryMethods } from '../mixins/factory';
import { Size } from '../utils';
import { bindAllMethods } from '../utils/methodBinding';

const _Container = Animated(Factory(defaultFactoryMethods));

export interface IContainer {
  app: Application;

  destroy(options?: DestroyOptions): void;

  initialize(): Promise<void> | void;

  addSignalConnection(...args: SignalConnection[]): void;

  onResize(size: Size): void;

  update(): void;
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

    void this.initialize();
  }

  get app(): T {
    return Application.getInstance() as T;
  }

  destroy(options?: DestroyOptions) {
    this._signalConnections.disconnectAll();
    super.destroy(options);
  }

  initialize() {}

  addSignalConnection(...args: SignalConnection[]) {
    for (const connection of args) {
      this._signalConnections.add(connection);
    }
  }

  onResize(size: Size) {}

  update() {}
}
