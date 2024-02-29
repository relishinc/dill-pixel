import { Logger } from '../../utils';
import { IStorageAdapter } from './IStorageAdapter';

export interface ILocalStorageAdapterOptions {
  namespace?: string;
}

export class LocalStorageAdapter implements IStorageAdapter {
  public namespace: string = '';

  constructor(public id: string = 'local') {}

  get prefix() {
    return this.namespace ? `${this.namespace}_` : '';
  }

  save(key: string, data: any): any {
    localStorage.setItem(`${this.prefix}${key}`, JSON.stringify(data));
    return JSON.stringify(data);
  }

  load<T = any>(key: string): T {
    const data = localStorage.getItem(`${this.prefix}${key}`);
    return (data ? JSON.parse(data) : null) as T;
  }

  destroy() {}

  public initialize(options?: Partial<ILocalStorageAdapterOptions>): boolean {
    Logger.log('LocalStorageAdapter initialized');
    this.namespace = options?.namespace || '';
    return true;
  }

  clear(key: string) {
    localStorage.deleteItem(`${this.prefix}${key}`);
  }
}
