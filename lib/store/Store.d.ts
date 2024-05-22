import { IApplication } from '../core/Application';
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
    save(adapterId: string | string[] | Partial<AdapterSaveConfig>[], key: string, data: any, awaitSave?: boolean): Promise<any>;
    load(adapterId: string, key: string): Promise<any>;
}
/**
 * A class representing a store of data, with multiple storage adapters.
 */
export declare class Store implements IStore {
    private _app;
    private _adapters;
    /**
     * Registers a new storage adapter with the store.
     * @param {IStorageAdapter} adapter The adapter to register.
     * @param {any} adapterOptions The options to initialize the adapter with.
     * @returns {Promise<void>} A promise that resolves when the adapter has been registered and initialized.
     */
    registerAdapter(adapter: IStorageAdapter, adapterOptions: any): Promise<void>;
    /**
     * Retrieves a registered storage adapter.
     * @template T The type of the adapter.
     * @param {string} adapterId The ID of the adapter.
     * @returns {T} The adapter.
     */
    getAdapter<T extends IStorageAdapter>(adapterId: string): T;
    /**
     * Checks if a storage adapter is registered.
     * @param {string} adapterId The ID of the adapter.
     * @returns {boolean} True if the adapter is registered, false otherwise.
     */
    hasAdapter(adapterId: string): boolean;
    /**
     * Destroys the store and all its adapters.
     */
    destroy(): void;
    /**
     * Saves data with a storage adapter.
     * @param {string | string[] | Partial<AdapterSaveConfig> | Partial<AdapterSaveConfig>[]} adapterId The ID of the adapter, or an array of IDs, or an array of save configurations.
     * @param {string} key The key to save the data under.
     * @param {any} data The data to save.
     * @param {boolean} [awaitSave] Whether to wait for the save operation to complete before returning.
     * @returns {Promise<any>} A promise that resolves with the result of the save operation.
     */
    save(adapterId: string | string[] | Partial<AdapterSaveConfig> | Partial<AdapterSaveConfig>[], key: string, data: any, awaitSave?: boolean): Promise<any>;
    /**
     * Loads data from a storage adapter.
     * @param {string} adapterId The ID of the adapter.
     * @param {string} key The key to load the data from.
     * @returns {Promise<any>} A promise that resolves with the loaded data.
     */
    load(adapterId: string, key: string): Promise<any>;
    initialize(app: IApplication): IStore;
}
export {};
//# sourceMappingURL=Store.d.ts.map