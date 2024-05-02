import { StorageAdapter } from '@relish-studios/dill-pixel';
import type { V8Application } from '../V8Application';

export default class TestAdapter extends StorageAdapter<V8Application> {
  public destroy(): void { }

  public async initialize(options?: any): Promise<void> {
    console.log('TestAdapter initialized', this.id, options);
    console.log('TestAdapter this.app', this.app);
    console.log('TestAdapter this.app', this.app);
    return Promise.resolve();
  }
}
