import type { IApplication } from '../../core';
import { IStorageAdapter, StorageAdapter } from './StorageAdapter';

export interface IDataSchema {
  [key: string]: any;
}

/**
 * Interface for the options of the LocalStorageAdapter.
 */
export interface IDataAdapterOptions {
  /**
   * The namespace to use for the keys in the local storage.
   */
  data?: IDataSchema;
}

export interface IDataAdapter<D extends IDataSchema = IDataSchema> extends IStorageAdapter {
  load<K extends keyof D>(key: K): D[K];
  save<K extends keyof D>(key: K, data: D[K]): D[K];
  set(data: Partial<D>, merge: boolean): void;
  clear<K extends keyof D>(key: K): void;
  get(): D;
}

/**
 * A class representing a storage adapter that uses the local storage.
 */
export class DataAdapter<D extends IDataSchema = IDataSchema> extends StorageAdapter {
  /**
   * The namespace to use for the keys in the local storage.
   */
  public data: D;

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
  public initialize(_app: IApplication, options?: Partial<IDataAdapterOptions>): void {
    this.data = (options?.data as D) || ({} as D);
  }

  /**
   * Saves data under a specified key in the local storage.
   * @param {string} key The key under which to save the data.
   * @param {any} data The data to save.
   * @returns {any} The saved data.
   */
  save<K extends keyof D>(key: K, data: D[K]): D[K] {
    this.data[key] = data;
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
