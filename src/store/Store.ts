import { IApplication } from '../core/Application';
import { Logger } from '../utils/console/Logger';
import { IStorageAdapter } from './adapters/StorageAdapter';

/**
 * Configuration for saving data with an adapter.
 */
type AdapterSaveConfig = {
  adapterId: string;
  awaitSave: boolean;
};

/**
 * Interface for the Store class.
 */
export interface IStore {
  initialize(app: IApplication): IStore;

  destroy(): void;

  registerAdapter(adapter: IStorageAdapter, adapterOptions: any): void;

  getAdapter<T extends IStorageAdapter>(adapterId: string): T;

  hasAdapter(adapterId: string): boolean;

  save(
    adapterId: string | string[] | Partial<AdapterSaveConfig>[],
    key: string,
    data: any,
    awaitSave?: boolean,
  ): Promise<any>;

  load(adapterId: string, key: string): Promise<any>;
}

/**
 * A class representing a store of data, with multiple storage adapters.
 */
export class Store implements IStore {
  private _app: IApplication;
  private _adapters: Map<string, IStorageAdapter> = new Map<string, IStorageAdapter>();

  /**
   * Registers a new storage adapter with the store.
   * @param {IStorageAdapter} adapter The adapter to register.
   * @param {any} adapterOptions The options to initialize the adapter with.
   * @returns {Promise<void>} A promise that resolves when the adapter has been registered and initialized.
   */
  async registerAdapter(adapter: IStorageAdapter, adapterOptions: any): Promise<void> {
    if (this._adapters.has(adapter.id)) {
      Logger.error(`Storage Adapter with id "${adapter.id}" already registered. Not registering.`);
      return Promise.resolve();
    }
    this._adapters.set(adapter.id, adapter);
    await adapter.initialize(this._app, adapterOptions);
  }

  /**
   * Retrieves a registered storage adapter.
   * @template T The type of the adapter.
   * @param {string} adapterId The ID of the adapter.
   * @returns {T} The adapter.
   */
  getAdapter<T extends IStorageAdapter>(adapterId: string): T {
    const adapter = this._adapters.get(adapterId);
    if (!adapter) {
      throw new Error(`Adapter ${adapterId} not found`);
    }
    return adapter as T;
  }

  /**
   * Checks if a storage adapter is registered.
   * @param {string} adapterId The ID of the adapter.
   * @returns {boolean} True if the adapter is registered, false otherwise.
   */
  hasAdapter(adapterId: string): boolean {
    return this._adapters.has(adapterId);
  }

  /**
   * Destroys the store and all its adapters.
   */
  destroy(): void {
    this._adapters.forEach((adapter) => {
      adapter.destroy();
    });
    this._adapters.clear();
  }

  /**
   * Saves data with a storage adapter.
   * @param {string | string[] | Partial<AdapterSaveConfig> | Partial<AdapterSaveConfig>[]} adapterId The ID of the adapter, or an array of IDs, or an array of save configurations.
   * @param {string} key The key to save the data under.
   * @param {any} data The data to save.
   * @param {boolean} [awaitSave] Whether to wait for the save operation to complete before returning.
   * @returns {Promise<any>} A promise that resolves with the result of the save operation.
   */
  async save(
    adapterId: string | string[] | Partial<AdapterSaveConfig> | Partial<AdapterSaveConfig>[],
    key: string,
    data: any,
    awaitSave = true,
  ): Promise<any> {
    let keys: string[] | Partial<AdapterSaveConfig>[] = [];
    const result = [];

    if (!Array.isArray(adapterId)) {
      if (typeof adapterId === 'object') {
        keys = [adapterId];
      } else {
        keys = [adapterId as string];
      }
    }

    if ((keys[0] as string) === '*' || (keys[0] as Partial<AdapterSaveConfig>)?.adapterId === '*') {
      // use all adapter
      keys = Array.from(this._adapters.keys());
    }
    for (let i = 0; i < keys.length; i++) {
      let aKey: string;
      let shouldAwait: boolean = false;
      if (typeof keys[i] === 'object') {
        const obj = keys[i] as Partial<AdapterSaveConfig>;
        aKey = obj.adapterId as string;
        shouldAwait = obj.awaitSave ?? false;
      } else {
        aKey = keys[i] as unknown as string;
        shouldAwait = awaitSave;
      }
      const adapter = this._adapters.get(aKey);
      if (!adapter) {
        throw new Error(`Adapter ${keys[i]} not found`);
      }

      if (shouldAwait) {
        result.push(await adapter.save(key, data));
      } else {
        result.push(void adapter.save(key, data));
      }
    }
    return result;
  }

  /**
   * Loads data from a storage adapter.
   * @param {string} adapterId The ID of the adapter.
   * @param {string} key The key to load the data from.
   * @returns {Promise<any>} A promise that resolves with the loaded data.
   */
  public async load(adapterId: string, key: string): Promise<any> {
    const adapter = this._adapters.get(adapterId);
    if (!adapter) {
      throw new Error(`Adapter ${adapterId} not found`);
    }
    return await adapter.load(key);
  }

  public initialize(app: IApplication): IStore {
    this._app = app;
    return this;
  }
}
