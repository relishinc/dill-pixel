import { IApplication, IModule, Module } from 'dill-pixel';
import type { V8Application } from '../V8Application';

export class TestModule extends Module<V8Application> implements IModule {
  public destroy(): void {}

  public async initialize(app: IApplication, options?: any): Promise<void> {
    console.log('TestModule initialized', this.id, app, options);
    console.log('TestModule this.app', this.app);
    this.app.customFunction();
    return Promise.resolve();
  }
}
