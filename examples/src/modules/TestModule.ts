import { IApplication, IPlugin, Plugin } from '@relish-studios/dill-pixel';

import type { V8Application } from '../V8Application';

export default class TestModule extends Plugin<V8Application> implements IPlugin {
  public destroy(): void {}

  public async initialize(app: IApplication, options?: any): Promise<void> {
    console.log('TestModule initialized', this.id, app, options);
    console.log('TestModule this.app', this.app);
    this.app.customFunction();
    return Promise.resolve();
  }
}
