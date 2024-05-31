import type { Application } from '../../Application';
import { IPlugin, Plugin } from '../../plugins/Plugin';

/**
 * Interface for a storage adapter module.
 */
export interface IStorageAdapter extends IPlugin {
  /**
   * Saves data under a specified key.
   * @param _key
   * @param _data
   * @param _rest
   * @returns {Promise<void> | void} A promise that resolves when the data has been saved, or void if the save operation is synchronous.
   */
  save<TExpectedSaveResult = any>(
    _key: string,
    _data: any,
    ..._rest: any[]
  ): Promise<TExpectedSaveResult> | TExpectedSaveResult | null;

  /**
   * Loads data from a specified key.
   * @template T The type of the data to load.
   * @returns {Promise<T> | T | null} A promise that resolves with the loaded data, or the loaded data if the load operation is synchronous, or null if no data was found.
   * @param _key
   */
  load<TExpectedLoadResult = any>(_key: string): Promise<TExpectedLoadResult> | TExpectedLoadResult | null;
}

/**
 * A class representing a storage adapter module.
 * @template T The type of the application that the module belongs to.
 */
export class StorageAdapter<T extends Application = Application> extends Plugin<T> implements IStorageAdapter {
  /**
   * Creates a new StorageAdapter.
   * @param {string} id The ID of the adapter. Default is 'StorageAdapter'.
   */
  constructor(public readonly id: string = 'StorageAdapter') {
    super(id);
  }

  /**
   * Loads data from a specified key.
   * @template T The type of the data to load.
   * @param {string} _key The key from which to load the data.
   * @returns {Promise<T> | T | null} A promise that resolves with the loaded data, or the loaded data if the load operation is synchronous, or null if no data was found.
   */
  load<TExpectedLoadResult = any>(_key: string): Promise<TExpectedLoadResult> | TExpectedLoadResult | null;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async load<TExpectedLoadResult = any>(_key: string): Promise<TExpectedLoadResult | null> {
    return null;
  }

  /**
   * Saves data under a specified key.
   * @returns {Promise<void> | void} A promise that resolves when the data has been saved, or void if the save operation is synchronous.
   * @param _key
   * @param _data
   * @param _rest
   */

  save<TExpectedSaveResult = any>(
    _key: string,
    _data: any,
    ..._rest: any[]
  ): Promise<TExpectedSaveResult> | TExpectedSaveResult | null;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async save<TExpectedSaveResult = any>(
    _key: string,
    _data: any,
    ..._rest: any[]
  ): Promise<TExpectedSaveResult | null> {
    void _key;
    void _data;
    void _rest;
    return null;
  }
}
