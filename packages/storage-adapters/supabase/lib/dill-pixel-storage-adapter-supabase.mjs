import { StorageAdapter as i, Logger as n } from "dill-pixel";
import { createClient as o } from "@supabase/supabase-js";
const p = {
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY
};
class h extends i {
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
  initialize(t, e = {}) {
    if (n.log("SupabaseAdapter initialized"), this._options = { ...p, ...e }, !this._options.supabaseUrl)
      throw new Error("Supabase URL is not set");
    if (!this._options.anonKey)
      throw new Error("Supabase anon key is not set");
    this._supabase = o(this._options.supabaseUrl, this._options.anonKey);
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
  async save(t, e, s = "upsert") {
    Array.isArray(e) || (e = [e]);
    const r = this.client.from(t);
    try {
      switch (s) {
        case "insert":
          return await r.insert(e).select();
        case "update":
          return await r.update(e).select();
        case "upsert":
          return await r.upsert(e).select();
      }
    } catch (a) {
      throw new Error(`Error saving data: ${a}`);
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
  // TODO: sort out type error
  load(t, e) {
    return this.client.from(t).select(e == null ? void 0 : e.join(","));
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
  async delete(t, e) {
    const s = Object.keys(e)[0], r = e[s];
    try {
      return await this.client.from(t).delete().eq(s, r).select();
    } catch (a) {
      throw new Error(`Error deleting data: ${a}`);
    }
  }
}
export {
  h as SupabaseAdapter,
  h as default
};
//# sourceMappingURL=dill-pixel-storage-adapter-supabase.mjs.map
