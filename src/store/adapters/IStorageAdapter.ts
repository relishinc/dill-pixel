export interface IStorageAdapter {
  id: string;

  save(key: string, data: any): Promise<void> | void;

  load<T = any>(key: string): Promise<T> | T;

  initialize(options?: any): Promise<any> | any;

  destroy(): void;
}
