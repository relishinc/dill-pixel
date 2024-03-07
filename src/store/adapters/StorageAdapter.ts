import type { Application } from '../../core/Application';
import { IModule, Module } from '../../modules/Module';

export interface IStorageAdapter extends IModule {
  save(key: string, data: any): Promise<void> | void;

  load<T = any>(key: string): Promise<T> | T | null;
}

export class StorageAdapter<T extends Application = Application> extends Module<T> implements IStorageAdapter {
  constructor(public readonly id: string = 'StorageAdapter') {
    super(id);
  }

  public load<T = any>(key: string): Promise<T> | T | null {
    return null;
  }

  public save(key: string, data: any): Promise<void> | void {
    return;
  }
}
