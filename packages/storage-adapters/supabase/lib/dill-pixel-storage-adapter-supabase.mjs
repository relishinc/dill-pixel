import { StorageAdapter as i, Logger as o } from "dill-pixel";
import { createClient as p } from "@supabase/supabase-js";
const c = {
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY
};
class d extends i {
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
  initialize(e, t = {}) {
    if (o.log("SupabaseAdapter initialized"), this._options = { ...c, ...t }, !this._options.supabaseUrl)
      throw new Error("Supabase URL is not set");
    if (!this._options.anonKey)
      throw new Error("Supabase anon key is not set");
    this._supabase = p(this._options.supabaseUrl, this._options.anonKey);
  }
  /**
   * Saves data to a specified table in the Supabase database.
   * @param {string} tableId The table to save the data to.
   * @param {T | T[]} data The data to save.
   * @param {SaveMethod} method The method to use for saving the data.
   * @returns {Promise<PostgrestSingleResponse<T[]>>} The saved data.
   *
   * @example
   * await this.app.supabase.save('scores', { username: 'relish', score: 50 })
   */
  async save(e, t, s = "upsert") {
    const r = Array.isArray(t) ? t : [t], a = this.client.from(e);
    try {
      switch (s) {
        case "insert":
          return await a.insert(r).select();
        case "update":
          return await a.update(r).select();
        case "upsert":
          return await a.upsert(r).select();
      }
    } catch (n) {
      throw new Error(`Error saving data: ${n}`);
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
  load(e, t) {
    return this.client.from(e).select(t == null ? void 0 : t.join(","));
  }
  /**
   * Deletes data from a specified table in the Supabase database.
   * @param {string} tableId The table from which to load the data.
   * @param {Data} data The data to delete.
   * @returns {Promise<any>} The deleted data.
   *
   * @example
   * await this.app.supabase.delete('scores', { username: 'relish', score: 50 })
   */
  async delete(e, t) {
    const s = Object.keys(t)[0], r = t[s];
    try {
      return await this.client.from(e).delete().eq(s, r).select();
    } catch (a) {
      throw new Error(`Error deleting data: ${a}`);
    }
  }
}
export {
  d as SupabaseAdapter,
  d as default
};
//# sourceMappingURL=dill-pixel-storage-adapter-supabase.mjs.map
