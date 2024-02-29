import { IModule } from '../../modules';

export interface IStorageAdapter extends IModule {
  save(key: string, data: any): Promise<void> | void;

  load<T = any>(key: string): Promise<T> | T | null;
}
