import type { Application } from '../../core/Application';
import { IModule, Module } from '../../modules/Module';
/**
 * Interface for a storage adapter module.
 */
export interface IStorageAdapter extends IModule {
    /**
     * Saves data under a specified key.
     * @param {string} key The key under which to save the data.
     * @param {any} data The data to save.
     * @returns {Promise<void> | void} A promise that resolves when the data has been saved, or void if the save operation is synchronous.
     */
    save(key: string, data: any): Promise<void> | void;
    /**
     * Loads data from a specified key.
     * @template T The type of the data to load.
     * @param {string} key The key from which to load the data.
     * @returns {Promise<T> | T | null} A promise that resolves with the loaded data, or the loaded data if the load operation is synchronous, or null if no data was found.
     */
    load<T = any>(key: string): Promise<T> | T | null;
}
/**
 * A class representing a storage adapter module.
 * @template T The type of the application that the module belongs to.
 */
export declare class StorageAdapter<T extends Application = Application> extends Module<T> implements IStorageAdapter {
    readonly id: string;
    /**
     * Creates a new StorageAdapter.
     * @param {string} id The ID of the adapter. Default is 'StorageAdapter'.
     */
    constructor(id?: string);
    /**
     * Loads data from a specified key.
     * @template T The type of the data to load.
     * @param {string} key The key from which to load the data.
     * @returns {Promise<T> | T | null} A promise that resolves with the loaded data, or the loaded data if the load operation is synchronous, or null if no data was found.
     */
    load<T = any>(key: string): Promise<T> | T | null;
    /**
     * Saves data under a specified key.
     * @param {string} key The key under which to save the data.
     * @param {any} data The data to save.
     * @returns {Promise<void> | void} A promise that resolves when the data has been saved, or void if the save operation is synchronous.
     */
    save(key: string, data: any): Promise<void> | void;
}
//# sourceMappingURL=StorageAdapter.d.ts.map