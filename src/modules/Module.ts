import { Application, IApplication } from '../core';
import { MethodBindingRoot } from '../core/decorators';

export interface IModule {
  id: string;

  app: IApplication;

  initialize(app: IApplication): Promise<void> | void;

  destroy(): void;
}

@MethodBindingRoot
export class Module implements IModule {
  public readonly id: string = 'Module';

  constructor() {}

  public get app(): IApplication {
    return Application.getInstance();
  }

  public destroy(): void {}

  public initialize(app: IApplication): Promise<void> | void;
  public async initialize(app: IApplication): Promise<void> {
    return Promise.resolve(undefined);
  }
}
