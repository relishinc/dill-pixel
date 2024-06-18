import { StorageAdapter as p, Logger as u } from "dill-pixel";
import { initializeApp as w } from "firebase/app";
import { getFirestore as m, doc as s, addDoc as f, collection as a, setDoc as _, getDoc as l, query as E, where as I, getDocs as c, deleteDoc as h } from "firebase/firestore";
const b = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || import.meta.env.FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || import.meta.env.FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || import.meta.env.FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || import.meta.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || import.meta.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || import.meta.env.FIREBASE_APP_ID
};
class R extends p {
  /**
   * Returns the Firebase app.
   * @returns {FirebaseApp} The Firebase app.
   */
  get firebaseApp() {
    return this._firebaseApp;
  }
  /**
   * Returns the Firestore database.
   * @returns {Firestore} The Firestore database.
   */
  get db() {
    return this._db;
  }
  /**
   * Initializes the adapter.
   * @param {IApplication} _app The application that the adapter belongs to.
   * @param {FirebaseOptions} options The options to initialize the adapter with.
   * @returns {void}
   */
  initialize(i, e = {}) {
    u.log("FirebaseAdapter initialized"), this._options = { ...b, ...e }, this._firebaseApp = w(this._options), this._db = m(this._firebaseApp);
  }
  /**
   * Save or update a document in a collection.
   * @param {string} collectionName The name of the collection.
   * @param {DocumentData} data The data to save or update.
   * @param {string} id The ID of the document to save or update, if applicable.
   * @returns {Promise<DocumentResult>} The saved or updated document.
   *
   * @example
   * await this.app.firebase.save('users', { username: 'relish', score: 50 }, 'custom-id');
   */
  async save(i, e, r) {
    if (!this.db)
      throw new Error("Firestore has not been initialized. Call initialize() first.");
    let t;
    try {
      r ? t = s(this.db, i, r) : t = await f(a(this.db, i), e), await _(t, e, { merge: !0 });
      const o = await l(t);
      return {
        id: o.id,
        ...o.data()
      };
    } catch (o) {
      throw new Error(`Error saving document: ${o}`);
    }
  }
  /**
   * Get a single document by its ID.
   * @param {string} collectionName The name of the collection.
   * @param {string} id The ID of the document to get.
   * @returns {Promise<DocumentResult | null>} The document, or null if not found.
   *
   * @example
   * await this.app.firebase.getDocumentById('users', 'custom-id');
   */
  async getDocumentById(i, e) {
    if (!this.db)
      throw new Error("Firestore has not been initialized. Call initialize() first.");
    const r = s(this.db, i, e);
    try {
      const t = await l(r);
      if (!t.exists())
        return null;
      const o = {
        id: t.id,
        ...t.data()
      };
      return o || null;
    } catch (t) {
      throw new Error(`Error getting document: ${t}`);
    }
  }
  /**
   * Get a single document by a field value.
   * @param {string} collectionName The name of the collection.
   * @param {string} field The field to query.
   * @param {unknown} value The value to query.
   * @returns {Promise<DocumentResult | null>} The document, or null if not found.
   *
   * @example
   * await this.app.firebase.getDocumentByField('users', 'username', 'relish');
   */
  async getDocumentWhere(i, e, r) {
    if (!this.db)
      throw new Error("Firestore has not been initialized. Call initialize() first.");
    try {
      const t = a(this.db, i), o = E(t, I(e, "==", r)), d = await c(o);
      if (d.empty)
        return null;
      {
        const n = d.docs[0];
        return { id: n.id, ...n.data() };
      }
    } catch (t) {
      throw new Error(`Error getting document: ${t}`);
    }
  }
  /**
   * Get all documents in a collection.
   * @param {string} collectionName The name of the collection.
   * @returns {Promise<DocumentResult[]>} An array of documents.
   *
   * @example
   * await this.app.firebase.getCollection('users');
   */
  async getCollection(i) {
    if (!this.db)
      throw new Error("Firestore has not been initialized. Call initialize() first.");
    try {
      const e = a(this.db, i), r = await c(e), t = [];
      return r.forEach((o) => {
        t.push({ id: o.id, ...o.data() });
      }), t;
    } catch (e) {
      throw new Error(`Error getting collection: ${e}`);
    }
  }
  /**
   * Delete a document by its ID.
   * @param {string} collectionName The name of the collection.
   * @param {string} id The ID of the document to delete.
   * @returns {Promise<DocumentResult | null>} The deleted document, or null if not found.
   *
   * @example
   * await this.app.firebase.deleteDocumentById('users', 'custom-id');
   */
  async deleteDocumentById(i, e) {
    if (!this.db)
      throw new Error("Firestore has not been initialized. Call initialize() first.");
    try {
      const r = s(this.db, i, e), t = await l(r);
      return t.exists() ? (await h(r), {
        id: t.id,
        ...t.data()
      }) : null;
    } catch (r) {
      throw new Error(`Error deleting document: ${r}`);
    }
  }
  /**
   * Delete a document by a field value.
   * @param {string} collectionName The name of the collection.
   * @param {string} field The field to query.
   * @param {unknown} value The value to query.
   * @returns {Promise<DocumentResult | null>} The deleted document, or null if not found.
   *
   * @example
   * await this.app.firebase.deleteDocumentByField('users', 'username', 'relish');
   */
  async deleteDocumentWhere(i, e, r) {
    if (!this.db)
      throw new Error("Firestore has not been initialized. Call initialize() first.");
    try {
      const t = await this.getDocumentWhere(i, e, r);
      if (!t)
        return null;
      const o = s(this.db, i, t.id);
      return await h(o), t;
    } catch (t) {
      throw new Error(`Error deleting document: ${t}`);
    }
  }
  /**
   * Delete all documents in a collection.
   * @param {string} collectionName The name of the collection.
   * @returns {Promise<void>} A promise that resolves when the operation is complete.
   *
   * @example
   * await this.app.firebase.deleteCollection('users');
   */
  async deleteCollection(i) {
    if (!this.db)
      throw new Error("Firestore has not been initialized. Call initialize() first.");
    try {
      const e = a(this.db, i), r = await c(e), t = [];
      r.forEach((o) => {
        t.push(h(o.ref));
      }), await Promise.all(t);
    } catch (e) {
      throw new Error(`Error deleting collection: ${e}`);
    }
  }
  /**
   * Query a collection.
   * @param {string} collectionName The name of the collection.
   * @param {QueryConstraint[]} queries The query constraints to apply.
   * @returns {Promise<DocumentResult[]>} An array of documents.
   *
   * @example
   * await this.app.firebase.queryCollection('users', where('score', '>', 0), limit(10));
   */
  async queryCollection(i, ...e) {
    if (!this.db)
      throw new Error("Firestore has not been initialized. Call initialize() first.");
    const r = [];
    try {
      const t = a(this.db, i), o = E(t, ...e);
      return (await c(o)).forEach((n) => {
        r.push({ id: n.id, ...n.data() });
      }), r;
    } catch (t) {
      throw new Error(`Error querying collection: ${t}`);
    }
  }
}
export {
  R as FirebaseAdapter,
  R as default
};
//# sourceMappingURL=dill-pixel-storage-adapter-firebase.mjs.map
