import { IApplication } from '../../core';
import { Logger } from '../../utils';
import { StorageAdapter } from './StorageAdapter';

export interface ILocalStorageAdapterOptions {
  namespace?: string;
}

export class LocalStorageAdapter extends StorageAdapter {
  public namespace: string = '';

  get prefix() {
    return this.namespace ? `${this.namespace}_` : '';
  }

  destroy() {}

  public initialize(app: IApplication, options?: Partial<ILocalStorageAdapterOptions>): void {
    Logger.log('LocalStorageAdapter initialized');
    this.namespace = options?.namespace || '';
  }

  save(key: string, data: any): any {
    localStorage.setItem(`${this.prefix}${key}`, JSON.stringify(data));
    return JSON.stringify(data);
  }

  load<T = any>(key: string): T {
    const data = localStorage.getItem(`${this.prefix}${key}`);
    return (data ? JSON.parse(data) : null) as T;
  }

  clear(key: string) {
    localStorage.deleteItem(`${this.prefix}${key}`);
  }
}
