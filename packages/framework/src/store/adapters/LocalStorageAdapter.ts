import type {IApplication} from '../../core';
import {StorageAdapter} from './StorageAdapter';

/**
 * Interface for the options of the LocalStorageAdapter.
 */
export interface ILocalStorageAdapterOptions {
  /**
   * The namespace to use for the keys in the local storage.
   */
  namespace?: string;
}

/**
 * A class representing a storage adapter that uses the local storage.
 */
export class LocalStorageAdapter extends StorageAdapter {
  /**
   * The namespace to use for the keys in the local storage.
   */
  public namespace: string = '';

  constructor(public readonly id: string = 'localStorage') {
    super(id);
  }

  /**
   * Gets the prefix to use for the keys in the local storage.
   * @returns {string} The prefix.
   */
  get prefix(): string {
    return this.namespace ? `${this.namespace}_` : '';
  }

  /**
   * Destroys the adapter.
   */
  destroy() {}

  /**
   * Initializes the adapter.
   * @param {IApplication} _app The application that the adapter belongs to.
   * @param {Partial<ILocalStorageAdapterOptions>} options The options to initialize the adapter with.
   */
  public initialize(_app: IApplication, options?: Partial<ILocalStorageAdapterOptions>): void {
    this.namespace = options?.namespace || '';
  }

  /**
   * Saves data under a specified key in the local storage.
   * @param {string} key The key under which to save the data.
   * @param {any} data The data to save.
   * @returns {any} The saved data.
   */
  save(key: string, data: any): any {
    localStorage.setItem(`${this.prefix}${key}`, JSON.stringify(data));
    return JSON.stringify(data);
  }

  /**
   * Loads data from a specified key in the local storage.
   * @template T The type of the data to load.
   * @param {string} key The key from which to load the data.
   * @returns {T} The loaded data.
   */
  load<T = any>(key: string): T {
    const data = localStorage.getItem(`${this.prefix}${key}`);
    return (data ? JSON.parse(data) : null) as T;
  }

  /**
   * Deletes data from a specified key in the local storage.
   * @param {string} key The key from which to delete the data.
   */
  clear(key: string) {
    localStorage.deleteItem(`${this.prefix}${key}`);
  }
}
