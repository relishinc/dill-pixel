import { Application, Logger } from 'dill-pixel/v8';

export class V8Application extends Application {
  protected async registerCustomModules(): Promise<void> {
    Logger.log('registerCustomModules');
  }

  protected async registerStorageAdapters(): Promise<void> {
    Logger.log('registerStorageAdapters');
  }
}
