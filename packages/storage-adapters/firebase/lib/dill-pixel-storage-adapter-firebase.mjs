import { StorageAdapter as f, Logger as w } from "dill-pixel";
import { initializeApp as p } from "firebase/app";
import { getFirestore as b, doc as c, addDoc as _, collection as s, setDoc as g, getDoc as h, query as u, where as y, getDocs as d, deleteDoc as E } from "firebase/firestore";
var n = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
const m = {
  apiKey: n.VITE_FIREBASE_API_KEY,
  authDomain: n.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: n.VITE_FIREBASE_PROJECT_ID,
  storageBucket: n.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: n.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: n.VITE_FIREBASE_APP_ID
};
class R extends f {
  /**
   * Initializes the adapter.
   * @param {IApplication} _app The application that the adapter belongs to.
   * @param {FirebaseOptions} options The options to initialize the adapter with.
   * @returns {void}
   */
  initialize(i, e = {}) {
    w.log("FirebaseAdapter initialized"), this._options = { ...m, ...e }, this._firebaseApp = p(this._options), this._db = b(this._firebaseApp);
  }
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
      r ? t = c(this.db, i, r) : t = await _(s(this.db, i), e), await g(t, e, { merge: !0 });
      const o = await h(t);
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
    const r = c(this.db, i, e);
    try {
      const t = await h(r);
      return t.exists() ? {
        id: t.id,
        ...t.data()
      } : null;
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
      const t = s(this.db, i), o = u(t, y(e, "==", r)), l = await d(o);
      if (l.empty)
        return null;
      {
        const a = l.docs[0];
        return { id: a.id, ...a.data() };
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
      const e = s(this.db, i), r = await d(e), t = [];
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
      const r = c(this.db, i, e), t = await h(r);
      return t.exists() ? (await E(r), {
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
      const o = c(this.db, i, t.id);
      return await E(o), t;
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
      const e = s(this.db, i), r = await d(e), t = [];
      r.forEach((o) => {
        t.push(E(o.ref));
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
      const t = s(this.db, i), o = u(t, ...e);
      return (await d(o)).forEach((a) => {
        r.push({ id: a.id, ...a.data() });
      }), r;
    } catch (t) {
      throw new Error(`Error querying collection: ${t}`);
    }
  }
}
export {
  R as FirebaseAdapter
};
//# sourceMappingURL=dill-pixel-storage-adapter-firebase.mjs.map
