import { StorageAdapter, IApplication } from 'dill-pixel';
import { SupabaseClient } from '@supabase/supabase-js';

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
export declare class SupabaseAdapter<Database = any> extends StorageAdapter {
    private _options;
    private _supabase;
    /**
     * Returns the Supabase client.
     * @returns {SupabaseClient<Database>} The Supabase client.
     */
    get client(): SupabaseClient<Database>;
    /**
     * Initializes the adapter.
     * @param {IApplication} _app The application that the adapter belongs to.
     * @param {ISupabaseAdapterOptions} options The options to initialize the adapter with.
     * @returns {void}
     */
    initialize(_app: IApplication, options: ISupabaseAdapterOptions): void;
    /**
     * Saves data to a specified table in the Supabase database.
     * @param {string} tableId The table to save the data to.
     * @param {any} data The data to save.
     * @param {SaveMethod} method The method to use for saving the data.
     * @returns {any} The saved data.
     */
    save(tableId: string, data: any, method?: SaveMethod): Promise<any>;
    /**
     * Loads data from a specified table in the Supabase database.
     * @param {string} tableId The table from which to load the data.
     * @param {string[]} selectors The columns to select.
     * @returns {any} The loaded data.
     */
    load(tableId: string, ...selectors: string[]): Promise<any>;
    /**
     * Deletes data from a specified table in the Supabase database.
     * @param {string} tableId The table from which to load the data.
     * @param {DeleteData} data The data to delete.
     * @returns {any} The deleted data.
     */
    delete(tableId: string, data: DeleteData): Promise<any>;
}
export {};
//# sourceMappingURL=index.d.ts.map