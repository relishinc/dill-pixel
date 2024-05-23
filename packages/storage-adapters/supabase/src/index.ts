import { StorageAdapter, Logger, IApplication } from 'dill-pixel';
import { createClient } from '@supabase/supabase-js';
import type { SupabaseClient } from '@supabase/supabase-js';
/**
 * Interface for the options of the supabaseUrlAdapter.
 */
export interface ISupabaseAdapterOptions {
  supabaseUrl: string;
  anonKey: string;
}

type SaveMethod = 'insert' | 'update' | 'upsert';

type DeleteData = {
  [key: string]: any;
};

/**
 * A class representing a storage adapter that uses Supabase.
 */
export class SupabaseAdapter<Database = any> extends StorageAdapter {
  private _options: ISupabaseAdapterOptions;
  private _supabase: SupabaseClient<Database>;

  /**
   * Returns the Supabase client.
   * @returns {SupabaseClient<Database>} The Supabase client.
   */
  get client(): SupabaseClient<Database> {
    return this._supabase as SupabaseClient<Database>;
  }

  /**
   * Initializes the adapter.
   * @param {IApplication} _app The application that the adapter belongs to.
   * @param {ISupabaseAdapterOptions} options The options to initialize the adapter with.
   * @returns {void}
   */
  public initialize(_app: IApplication, options: ISupabaseAdapterOptions): void {
    Logger.log('SupabaseAdapter initialized');
    this._options = options;

    // create the client here
    this._supabase = createClient<Database>(this._options.supabaseUrl, this._options.anonKey);
  }

  /**
   * Saves data to a specified table in the Supabase database.
   * @param {string} tableId The table to save the data to.
   * @param {any} data The data to save.
   * @param {SaveMethod} method The method to use for saving the data.
   * @returns {any} The saved data.
   */
  async save(tableId: string, data: any, method: SaveMethod = 'upsert'): Promise<any> {
    if (!Array.isArray(data)) {
      data = [data];
    }
    const table = this.client.from(tableId);
    switch (method) {
      case 'insert':
        return await table.insert(data).select();
      case 'update':
        return await table.update(data).select();
      case 'upsert':
        return await table.upsert(data).select();
    }
  }

  /**
   * Loads data from a specified table in the Supabase database.
   * @param {string} tableId The table from which to load the data.
   * @param {string[]} selectors The columns to select.
   * @returns {any} The loaded data.
   */

  async load(tableId: string, ...selectors: string[]): Promise<any> {
    return await this.client.from(tableId).select(...selectors);
  }

  /**
   * Deletes data from a specified table in the Supabase database.
   * @param {string} tableId The table from which to load the data.
   * @param {DeleteData} data The data to delete.
   * @returns {any} The deleted data.
   */

  async delete(tableId: string, data: DeleteData): Promise<any> {
    const column = Object.keys(data)[0];
    const value = data[column];
    return await this.client.from(tableId).delete().eq(column, value).select();
  }
}
