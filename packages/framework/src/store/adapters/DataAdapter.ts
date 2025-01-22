import type { IApplication } from '../../core';
import { Signal } from '../../signals';
import { StorageAdapter } from './StorageAdapter';

export type DataSchema = {
  [key: string]: any;
};

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
/**
 * Interface for the options of the LocalStorageAdapter.
 */
export interface IDataAdapterOptions<D extends DataSchema = DataSchema> {
  initial: Partial<D>;
  /**
   * The namespace to use for the keys in the local storage.
   */
  namespace: string;
  /**
   * Whether to override the data with the data from local storage.
   */
  overrideWithLocalStorage: boolean;
  /**
   * Whether to backup all data to local storage.
   */
  backupAll: boolean;
  /**
   * The keys to backup to local storage.
   */
  backupKeys: Array<keyof D>;
}

export interface DataChangeSignalDetail {
  key?: any;
  value?: any;
  restore?: boolean;
}

export interface IDataAdapter<D extends DataSchema = DataSchema> {
  get(): D;
  get<K extends keyof D>(key: K): D[K] | undefined;
  set<K extends keyof D>(key: K, data: D[K]): D;
  set(data: DeepPartial<D>, merge?: boolean): D;
  clear(): void;
  clear<K extends keyof D>(key: K): void;
  onDataChange: Signal<(detail: DataChangeSignalDetail) => void>;
}

/**
 * A class representing a storage adapter that uses the local storage.
 */
export class DataAdapter<D extends DataSchema = DataSchema> extends StorageAdapter implements IDataAdapter<D> {
  public data: D;

  public onDataChange: Signal<(detail: DataChangeSignalDetail) => void> = new Signal();

  private backupKeys: Array<keyof D> = [];
  private backupAll: boolean = false;
  private namespace: string = '';
  private overrideWithLocalStorage: boolean = true;

  constructor(public readonly id: string = 'data') {
    super(id);
  }

  public getCoreSignals(): string[] {
    return ['onDataChange'];
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
   * Saves or sets data in the storage.
   * @param {K} key - The key under which to save the data
   * @param {D[K]} data - The data to save
   * @returns {D} The updated data object
   *
   * @overload
   * @param {DeepPartial<D>} data - The data object to set
   * @param {boolean} [merge] - Whether to merge with existing data
   * @returns {D} The updated data object
   */
  set<K extends keyof D>(key: K, data: D[K]): D;
  set(data: DeepPartial<D>, merge?: boolean): D;
  set<K extends keyof D>(keyOrData: K | DeepPartial<D>, dataOrMerge?: D[K] | boolean): D {
    // Handle single key-value save
    if (typeof keyOrData === 'string' || typeof keyOrData === 'number' || typeof keyOrData === 'symbol') {
      const key = keyOrData;
      const data = dataOrMerge as D[K];

      this.data[key] = data;
      if (this.backupAll || this.backupKeys.includes(key)) {
        this.backupToLocalStorage([key]);
      }
      this.onDataChange.emit({ key, value: data });
      return this.data;
    }

    // Handle bulk data set
    const data = keyOrData as DeepPartial<D>;
    const merge = (dataOrMerge as boolean) ?? true;

    if (merge) {
      this.data = deepMerge({ ...this.data }, data);
    } else {
      this.data = data as D;
    }

    if (this.backupAll || this.backupKeys.length > 0) {
      this.backupToLocalStorage(this.backupKeys);
    }

    this.onDataChange.emit({
      key: Object.keys(data)?.length === 1 ? Object.keys(data)[0] : Object.keys(data),
      value: data[Object.keys(data)[0]] as D[keyof D],
    });

    return this.data;
  }

  /**
   * Loads data from storage. If a key is provided, returns the value for that key.
   * If no key is provided, returns all data.
   * @template K The type of the key to load
   * @param {K} [key] Optional key to load specific data
   * @returns {D | D[K] | undefined} The loaded data
   */
  get(): D;
  get<K extends keyof D>(key?: K): D[K] | undefined;
  get<K extends keyof D>(key?: K): D[K] | D | undefined {
    if (key === undefined) {
      return this.data;
    }
    return this.data[key];
  }

  /**
   * Deletes data from a specified key in the local storage.
   * @param {string} key The key from which to delete the data.
   */
  clear(): void;
  clear<K extends keyof D>(key?: K): void {
    if (key === undefined) {
      this.data = {} as D;
      localStorage.clear();
    } else {
      delete this.data[key];
      localStorage.removeItem(`${this.namespace}-${key as string}`);
    }

    this.onDataChange.emit({ key });
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
    this.onDataChange.emit({ restore: true });
  }
}

function deepMerge<T extends Record<string, any>>(target: T, source: DeepPartial<T>): T {
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
