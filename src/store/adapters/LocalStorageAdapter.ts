import { Logger } from '../../utils';
import { IStorageAdapter } from './IStorageAdapter';

export class LocalStorageAdapter implements IStorageAdapter {
  constructor(
    protected namespace: string = '',
    public readonly id: string = 'local',
  ) {}

  get prefix() {
    return this.namespace ? `${this.namespace}_` : '';
  }

  save(key: string, data: any): any {
    localStorage.setItem(`${this.prefix}${key}`, JSON.stringify(data));
  }

  load<T = any>(key: string): T {
    const data = localStorage.getItem(`${this.prefix}${key}`);
    return (data ? JSON.parse(data) : null) as T;
  }

  destroy() {}

  public initialize(): boolean {
    Logger.log('LocalStorageAdapter initialized');
    return true;
  }

  clear(key: string) {
    localStorage.deleteItem(`${this.prefix}${key}`);
  }
}
