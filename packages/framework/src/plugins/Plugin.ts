import type { IApplication, ICoreFunctions, ICoreSignals } from '../core';
import { coreFunctionRegistry, coreSignalRegistry } from '../core';
import { Application } from '../core/Application';
import { SignalConnection, SignalConnections } from '../signals';
import { bindAllMethods, ImportListItemModule } from '../utils';

export interface IPlugin<O = any> {
  id: string;

  app: IApplication;

  readonly options: Partial<O>;

  initialize(options: Partial<O>, app: IApplication): Promise<void> | void;

  postInitialize(_app: IApplication): Promise<void> | void;

  destroy(): void;

  addSignalConnection(...args: SignalConnection[]): void;

  clearSignalConnections(): void;

  registerCoreFunctions(): void;

  registerCoreSignals(): void;
}

export interface PluginListItem {
  id: string;
  path: string;
  module?: ImportListItemModule<IPlugin>;
  assets?: string[];
  plugins?: string[];
}

export class Plugin<A extends Application = Application, O = any> implements IPlugin<O> {
  private readonly __dill_pixel_method_binding_root = true;
  // A collection of signal connections.
  protected _signalConnections: SignalConnections = new SignalConnections();

  protected _options: O;

  get options(): O {
    return this._options;
  }

  constructor(public id: string = 'Plugin') {
    bindAllMethods(this);
  }

  public get app(): A {
    return Application.getInstance<A>();
  }

  public destroy(): void {
    this._signalConnections.disconnectAll();
  }

  public initialize(options?: Partial<O>, _app?: IApplication): Promise<void> | void;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async initialize(_options: Partial<O>, _app?: IApplication): Promise<void> {
    return Promise.resolve(undefined);
  }

  public postInitialize(_app: IApplication): Promise<void> | void;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async postInitialize(_app: IApplication): Promise<void> {
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

  public clearSignalConnections() {
    this._signalConnections.disconnectAll();
  }

  /**
   * @override
   * @protected
   */
  public registerCoreFunctions(): void {
    const functions = this.getCoreFunctions();
    functions.forEach((f) => {
      const fName = f as keyof ICoreFunctions;
      // @ts-expect-error implicit any
      coreFunctionRegistry[fName] = this[f];
    });
  }

  /**
   * @override
   * @protected
   */
  public registerCoreSignals(): void {
    const signals = this.getCoreSignals();
    signals.forEach((s) => {
      const sName = s as keyof ICoreSignals;
      // @ts-expect-error implicit any
      coreSignalRegistry[sName] = this[s];
    });
  }

  protected getCoreFunctions(): string[] {
    return [];
  }

  protected getCoreSignals(): string[] {
    return [];
  }
}
