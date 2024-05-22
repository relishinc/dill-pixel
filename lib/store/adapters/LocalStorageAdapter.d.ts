import { IApplication } from '../../core/Application';
import { StorageAdapter } from './StorageAdapter';

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
export declare class LocalStorageAdapter extends StorageAdapter {
    /**
     * The namespace to use for the keys in the local storage.
     */
    namespace: string;
    /**
     * Gets the prefix to use for the keys in the local storage.
     * @returns {string} The prefix.
     */
    get prefix(): string;
    /**
     * Destroys the adapter.
     */
    destroy(): void;
    /**
     * Initializes the adapter.
     * @param {IApplication} _app The application that the adapter belongs to.
     * @param {Partial<ILocalStorageAdapterOptions>} options The options to initialize the adapter with.
     */
    initialize(_app: IApplication, options?: Partial<ILocalStorageAdapterOptions>): void;
    /**
     * Saves data under a specified key in the local storage.
     * @param {string} key The key under which to save the data.
     * @param {any} data The data to save.
     * @returns {any} The saved data.
     */
    save(key: string, data: any): any;
    /**
     * Loads data from a specified key in the local storage.
     * @template T The type of the data to load.
     * @param {string} key The key from which to load the data.
     * @returns {T} The loaded data.
     */
    load<T = any>(key: string): T;
    /**
     * Deletes data from a specified key in the local storage.
     * @param {string} key The key from which to delete the data.
     */
    clear(key: string): void;
}
//# sourceMappingURL=LocalStorageAdapter.d.ts.map