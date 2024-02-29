import { StorageAdapter } from 'dill-pixel';
import type { V8Application } from '../V8Application';

export class TestAdapter extends StorageAdapter<V8Application> {
  public destroy(): void {}

  public async initialize(options?: any): Promise<void> {
    console.log('TestAdapter initialized', this.id, options);
    console.log('TestAdapter this.app', this.app);
    return Promise.resolve();
  }

  public load<T = any>(key: string): Promise<T> | T | null {
    return null;
  }

  public save(key: string, data: any): Promise<void> | void {
    return undefined;
  }
}
