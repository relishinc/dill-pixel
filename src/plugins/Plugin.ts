import { Application, IApplication } from '../core/Application';
import { SignalConnection, SignalConnections } from '../signals';
import { bindAllMethods } from '../utils/methodBinding';
import { coreFunctionRegistry } from '../core/coreFunctionRegistry';
import { ICoreFunctions } from '../core/ICoreFunctions';
import { ICoreSignals } from '../core/ICoreSignals';
import { coreSignalRegistry } from '../core/coreSignalRegistry';

export interface IPlugin {
  id: string;

  app: IApplication;

  initialize(_app: IApplication, options?: any): Promise<void> | void;

  postInitialize(_app: IApplication): Promise<void> | void;

  destroy(): void;

  addSignalConnection(...args: SignalConnection[]): void;

  clearSignalConnections(): void;

  registerCoreFunctions(): void;

  registerCoreSignals(): void;
}

export class Plugin<T extends Application = Application> implements IPlugin {
  // A collection of signal connections.
  __dill_pixel_method_binding_root: boolean;
  protected _signalConnections: SignalConnections = new SignalConnections();

  constructor(public id: string = 'Plugin') {
    bindAllMethods(this);
    this.__dill_pixel_method_binding_root = true;
  }

  public get app(): T {
    return Application.getInstance<T>();
  }

  public destroy(): void {
    this._signalConnections.disconnectAll();
  }

  public initialize(_app: IApplication, options?: any): Promise<void> | void;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async initialize(_app: IApplication, _options?: any): Promise<void> {
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
