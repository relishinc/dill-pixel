import { StorageAdapter, Logger, IApplication, IStorageAdapter } from 'dill-pixel';
import { createClient } from '@supabase/supabase-js';
import type { SupabaseClient } from '@supabase/supabase-js';

type SaveMethod = 'insert' | 'update' | 'upsert';

type DeleteData = {
  [key: string]: any;
};

interface ISupabaseAdapterOptions {
  supabaseUrl?: string;
  anonKey?: string;
}

const defaultConfig: ISupabaseAdapterOptions = {
  supabaseUrl: process.env.VITE_SUPABASE_URL,
  anonKey: process.env.VITE_SUPABASE_ANON_KEY,
};

export interface ISupabaseAdapter extends IStorageAdapter {
  // client: SupabaseClient<Database>; // TODO: get this to work

  initialize(app: IApplication, options?: Partial<ISupabaseAdapterOptions>): void;
  save(tableId: string, data: any, method?: SaveMethod): Promise<any>;
  load(tableId: string, ...selectors: string[]): Promise<any>;
  delete(tableId: string, data: DeleteData): Promise<any>;
}

/**
 * A class representing a storage adapter that uses Supabase.
 */
export class SupabaseAdapter<Database = any> extends StorageAdapter implements ISupabaseAdapter {
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
  public initialize(_app: IApplication, options: Partial<ISupabaseAdapterOptions> = {}): void {
    Logger.log('SupabaseAdapter initialized');
    this._options = { ...defaultConfig, ...options };

    if (!this._options.supabaseUrl) {
      throw new Error('Supabase URL is not set');
    }

    if (!this._options.anonKey) {
      throw new Error('Supabase anon key is not set');
    }

    this._supabase = createClient<Database>(this._options.supabaseUrl, this._options.anonKey);
  }

  /**
   * Saves data to a specified table in the Supabase database.
   * @param {string} tableId The table to save the data to.
   * @param {any} data The data to save.
   * @param {SaveMethod} method The method to use for saving the data.
   * @returns {Promise<any>} The saved data.
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
   * @returns {Promise<any>} The loaded data.
   */

  async load(tableId: string, ...selectors: string[]): Promise<any> {
    return await this.client.from(tableId).select(...selectors);
  }

  /**
   * Deletes data from a specified table in the Supabase database.
   * @param {string} tableId The table from which to load the data.
   * @param {DeleteData} data The data to delete.
   * @returns {Promise<any>} The deleted data.
   */

  async delete(tableId: string, data: DeleteData): Promise<any> {
    const column = Object.keys(data)[0];
    const value = data[column];
    return await this.client.from(tableId).delete().eq(column, value).select();
  }
}
