import type { SupabaseClient } from '@supabase/supabase-js';
import { createClient } from '@supabase/supabase-js';
import { GenericSchema } from '@supabase/supabase-js/dist/module/lib/types';
import { IApplication, IStorageAdapter, Logger, StorageAdapter } from 'dill-pixel';

type SaveMethod = 'insert' | 'update' | 'upsert';

type DeleteData = {
  [key: string]: any;
};

interface ISupabaseAdapterOptions {
  supabaseUrl?: string;
  anonKey?: string;
}

export interface ISupabaseAdapter<Database extends GenericSchema = any> extends IStorageAdapter {
  client: SupabaseClient<Database>;

  initialize(app: IApplication, options?: Partial<ISupabaseAdapterOptions>): void;

  save(tableId: string, data: any, method?: SaveMethod): Promise<any>;

  load<T = any>(tableId: string, selectors?: string[]): Promise<T>;

  delete(tableId: string, data: DeleteData): Promise<any>;
}

/**
 * A class representing a storage adapter that uses Supabase.
 */
export class SupabaseAdapter<Database extends GenericSchema = any>
  extends StorageAdapter
  implements ISupabaseAdapter<Database>
{
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
    const defaultConfig: ISupabaseAdapterOptions = {
      supabaseUrl: _app.env.VITE_SUPABASE_URL || _app.env.SUPABASE_URL,
      anonKey: _app.env.VITE_SUPABASE_ANON_KEY || _app.env.SUPABASE_ANON_KEY,
    };
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
   *
   * @example
   * await this.app.supabase.save('scores', { username: 'relish', score: 50 })
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
   * @param {string[]} selectors The columns to select. Default is '*'.
   * @returns {PostgrestFilterBuilder<any, any, any>} PostgrestFilterBuilder // TODO
   *
   * @example
   * await this.app.supabase.load('scores', ['score', 'username']).order('score', { ascending: false }).limit(5)
   */
  async load<TExpectedLoadResult = any>(tableId: string, selectors?: string[]): Promise<TExpectedLoadResult> {
    const query = this.client.from(tableId).select(selectors?.join(','));
    const { data, error } = await query;
    if (error) throw error;
    return data as TExpectedLoadResult;
  }

  /**
   * Deletes data from a specified table in the Supabase database.
   * @param {string} tableId The table from which to load the data.
   * @param {DeleteData} data The data to delete.
   * @returns {Promise<any>} The deleted data.
   *
   * @example
   * await this.app.supabase.delete('scores', { username: 'relish', score: 50 })
   */

  async delete(tableId: string, data: DeleteData): Promise<any> {
    const column = Object.keys(data)[0];
    const value = data[column];
    return await this.client.from(tableId).delete().eq(column, value).select();
  }
}
