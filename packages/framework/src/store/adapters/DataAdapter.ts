import type { IApplication } from '../../core';
import { IStorageAdapter, StorageAdapter } from './StorageAdapter';

export type DataSchema = Record<string, any>;
/**
 * Interface for the options of the LocalStorageAdapter.
 */
export interface IDataAdapterOptions<D extends DataSchema = DataSchema> {
  /**
   * The namespace to use for the keys in the local storage.
   */
  initial: D;
  namespace: string;
  overrideWithLocalStorage: boolean;
  backupAll: boolean;
  backupKeys: Array<keyof D>;
}

export interface IDataAdapter<D extends DataSchema = DataSchema> extends IStorageAdapter {
  load<K extends keyof D>(key: K): D[K];
  save<K extends keyof D>(key: K, data: D[K]): D[K];
  set(data: Partial<D>, merge: boolean): void;
  get(): D;
  clear<K extends keyof D>(key: K): void;
}

/**
 * A class representing a storage adapter that uses the local storage.
 */
export class DataAdapter<D extends DataSchema = DataSchema> extends StorageAdapter {
  /**
   * The namespace to use for the keys in the local storage.
   */
  public data: D;
  private backupKeys: Array<keyof D> = [];
  private backupAll: boolean = false;
  private namespace: string = '';
  private overrideWithLocalStorage: boolean = true;
  constructor(public readonly id: string = 'data') {
    super(id);
  }
  /**
   * Destroys the adapter.
   */
  destroy() {
    this.data = {} as D;
  }

  /**
   * Initializes the adapter.
   * @param {IApplication} _app The application that the adapter belongs to.
   * @param {Partial<ILocalStorageAdapterOptions>} options The options to initialize the adapter with.
   */
  public initialize(_app: IApplication, options?: Partial<IDataAdapterOptions<D>>): void {
    this.namespace = options?.namespace || _app.config?.id || 'data';
    this.data = (options?.initial as D) || ({} as D);
    this.backupKeys = options?.backupKeys || [];
    this.backupAll = options?.backupAll || false;
    this.overrideWithLocalStorage = options?.overrideWithLocalStorage === false ? false : true;

    if (this.backupAll || this.backupKeys.length > 0) {
      if (this.overrideWithLocalStorage) {
        this.restoreFromLocalStorage(this.backupKeys);
      }
      this.backupToLocalStorage(this.backupKeys);
    }
  }

  /**
   * Saves data under a specified key in the local storage.
   * @param {string} key The key under which to save the data.
   * @param {any} data The data to save.
   * @returns {any} The saved data.
   */
  save<K extends keyof D>(key: K, data: D[K]): D[K] {
    this.data[key] = data;
    if (this.backupAll || this.backupKeys.includes(key)) {
      this.backupToLocalStorage([key]);
    }
    return data;
  }

  /**
   * Loads data from a specified key in the local storage.
   * @template T The type of the data to load.
   * @param {string} key The key from which to load the data.
   * @returns {T} The loaded data.
   */
  load<K extends keyof D>(key: K): D[K] {
    return this.data[key];
  }

  set(data: Partial<D>, merge: boolean = true) {
    if (merge) {
      this.data = deepMerge({ ...this.data }, data);
    } else {
      this.data = data as D;
    }
    if (this.backupAll || this.backupKeys.length > 0) {
      this.backupToLocalStorage(this.backupKeys);
    }
  }

  get(): D {
    return this.data;
  }

  /**
   * Deletes data from a specified key in the local storage.
   * @param {string} key The key from which to delete the data.
   */
  clear<K extends keyof D>(key: K) {
    delete this.data[key];
    localStorage.removeItem(`${this.namespace}-${key as string}`);
  }

  /**
   * Backs up specified keys or all data to local storage.
   * @param {Array<keyof D>} [keys] The keys to back up. If not provided, all data will be backed up.
   */
  private backupToLocalStorage(keys?: Array<keyof D>): void {
    const dataToBackup =
      keys && keys?.length > 0 ? Object.fromEntries(keys.map((key) => [key, this.data[key]])) : this.data;
    for (const key in dataToBackup) {
      localStorage.setItem(`${this.namespace}-${key}`, JSON.stringify(dataToBackup[key]));
    }
  }

  /**
   * Restores data from local storage for specified keys or all data.
   * @param {Array<keyof D>} [keys] The keys to restore. If not provided, all data will be restored.
   */
  private restoreFromLocalStorage(keys?: Array<keyof D>): void {
    const keysToRestore = keys && keys?.length > 0 ? keys : (Object.keys(this.data) as Array<keyof D>);
    keysToRestore.forEach((key) => {
      const loadedData = localStorage.getItem(`${this.namespace}-${key as string}`);
      if (loadedData !== null) {
        this.data[key] = JSON.parse(loadedData);
      }
    });
  }
}

function deepMerge<T extends Record<string, any>>(target: T, source: Partial<T>): T {
  for (const key in source) {
    if (
      source[key] !== undefined &&
      Object.prototype.toString.call(source[key]) === '[object Object]' &&
      key in target &&
      typeof target[key] === 'object'
    ) {
      target[key] = deepMerge(target[key], source[key] as T[Extract<keyof T, string>]);
    } else if (source[key] !== undefined) {
      target[key] = source[key] as T[Extract<keyof T, string>];
    }
  }
  return target;
}
