import { Logger, StorageAdapter } from 'dill-pixel';
import type { V8Application } from '@/V8Application';

export default class TestAdapter extends StorageAdapter<V8Application> {
  public destroy(): void {}

  public async initialize(options?: any): Promise<void> {
    Logger.log('TestAdapter initialized', this.id, options);
    return Promise.resolve();
  }
}
