import type { Application } from '../../core';
import { Module } from '../../modules';
import { IStorageAdapter } from './IStorageAdapter';

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
