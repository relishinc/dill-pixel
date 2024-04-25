import { Application, IApplication } from '../core/Application';
import { MethodBindingRoot } from '../core/decorators';
import { SignalConnection, SignalConnections } from '../signals/Signal';
import { bindAllMethods } from '../utils/methodBinding';

export interface IPlugin {
  id: string;

  app: IApplication;

  initialize(app: IApplication, options?: any): Promise<void> | void;

  postInitialize(app: IApplication): Promise<void> | void;

  destroy(): void;

  addSignalConnection(...args: SignalConnection[]): void;
}

@MethodBindingRoot
export class Plugin<T extends Application = Application> implements IPlugin {
  // A collection of signal connections.
  protected _signalConnections: SignalConnections = new SignalConnections();

  constructor(public id: string = 'Plugin') {
    bindAllMethods(this);
  }

  public get app(): T {
    return Application.getInstance<T>();
  }

  public destroy(): void {
    this._signalConnections.disconnectAll();
  }

  public initialize(app: IApplication, options?: any): Promise<void> | void;
  public async initialize(app: IApplication, options?: any): Promise<void> {
    return Promise.resolve(undefined);
  }

  public postInitialize(app: IApplication): Promise<void> | void;
  public async postInitialize(app: IApplication): Promise<void> {
    return Promise.resolve(undefined);
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
}
