export interface IStorageAdapter {
  save(key: string, data: any): Promise<void> | void;

  load<T = any>(key: string): Promise<T> | T;

  destroy(): void;
}
