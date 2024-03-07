import { Application, IApplication } from '../core/Application';
import { MethodBindingRoot } from '../core/decorators';

export interface IModule {
  id: string;

  app: IApplication;

  initialize(app: IApplication, options?: any): Promise<void> | void;

  destroy(): void;
}

@MethodBindingRoot
export class Module<T extends Application = Application> implements IModule {
  constructor(public readonly id: string = 'Module') {}

  public get app(): T {
    return Application.getInstance<T>();
  }

  public destroy(): void {}

  public initialize(app: IApplication, options?: any): Promise<void> | void;
  public async initialize(app: IApplication, options?: any): Promise<void> {
    return Promise.resolve(undefined);
  }
}
