import { StorageAdapter as r, Logger as a } from "dill-pixel";
import { createClient as n } from "@supabase/supabase-js";
class p extends r {
  /**
   * Returns the Supabase client.
   * @returns {SupabaseClient<Database>} The Supabase client.
   */
  get client() {
    return this._supabase;
  }
  /**
   * Initializes the adapter.
   * @param {IApplication} _app The application that the adapter belongs to.
   * @param {ISupabaseAdapterOptions} options The options to initialize the adapter with.
   * @returns {void}
   */
  initialize(t, e) {
    a.log("SupabaseAdapter initialized"), this._options = e, this._supabase = n(this._options.supabaseUrl, this._options.anonKey);
  }
  /**
   * Saves data to a specified table in the Supabase database.
   * @param {string} tableId The table to save the data to.
   * @param {any} data The data to save.
   * @param {SaveMethod} method The method to use for saving the data.
   * @returns {any} The saved data.
   */
  async save(t, e, i = "upsert") {
    Array.isArray(e) || (e = [e]);
    const s = this.client.from(t);
    switch (i) {
      case "insert":
        return await s.insert(e).select();
      case "update":
        return await s.update(e).select();
      case "upsert":
        return await s.upsert(e).select();
    }
  }
  /**
   * Loads data from a specified table in the Supabase database.
   * @param {string} tableId The table from which to load the data.
   * @param {string[]} selectors The columns to select.
   * @returns {any} The loaded data.
   */
  async load(t, ...e) {
    return await this.client.from(t).select(...e);
  }
  /**
   * Deletes data from a specified table in the Supabase database.
   * @param {string} tableId The table from which to load the data.
   * @param {DeleteData} data The data to delete.
   * @returns {any} The deleted data.
   */
  async delete(t, e) {
    const i = Object.keys(e)[0], s = e[i];
    return await this.client.from(t).delete().eq(i, s).select();
  }
}
export {
  p as SupabaseAdapter
};
//# sourceMappingURL=dill-pixel-storage-adapter-supabase.mjs.map
