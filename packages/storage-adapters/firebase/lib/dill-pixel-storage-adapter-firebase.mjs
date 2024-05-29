import { StorageAdapter as f, Logger as u } from "dill-pixel";
import { initializeApp as b } from "firebase/app";
import { getFirestore as p, doc as a, addDoc as y, collection as s, setDoc as E, getDoc as d, query as w, where as g, getDocs as c, deleteDoc as h } from "firebase/firestore";
export * from "firebase/firestore";
class C extends f {
  /**
   * Initializes the adapter.
   * @param {IApplication} _app The application that the adapter belongs to.
   * @param {FirebaseOptions} options The options to initialize the adapter with.
   * @returns {void}
   */
  initialize(i, r) {
    u.log("FirebaseAdapter initialized"), this._options = r, this._firebaseApp = b(this._options), this._db = p(this._firebaseApp);
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
   * @param collectionName The name of the collection.
   * @param data The data to save.
   * @param id The ID of the document to save or update, if applicable.
   * @returns The saved or updated document.
   *
   * @example
   * await this.app.firebase.save('users', { username: 'relish', score: 50 }, 'custom-id');
   */
  async save(i, r, e) {
    if (!this.db)
      throw new Error("Firestore has not been initialized. Call initialize() first.");
    let t;
    try {
      e ? t = a(this.db, i, e) : t = await y(s(this.db, i), r), await E(t, r, { merge: !0 });
      const o = await d(t);
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
   * @param collectionName The name of the collection.
   * @param id The ID of the document to get.
   * @returns The document, or null if not found.
   *
   * @example
   * await this.app.firebase.getDocumentById('users', 'custom-id');
   */
  async getDocumentById(i, r) {
    if (!this.db)
      throw new Error("Firestore has not been initialized. Call initialize() first.");
    const e = a(this.db, i, r);
    try {
      const t = await d(e);
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
   * @param collectionName The name of the collection.
   * @param field The field to query.
   * @param value The value to query.
   * @returns The document, or null if not found.
   *
   * @example
   * await this.app.firebase.getDocumentByField('users', 'username', 'relish');
   */
  async getDocumentByField(i, r, e) {
    if (!this.db)
      throw new Error("Firestore has not been initialized. Call initialize() first.");
    try {
      const t = s(this.db, i), o = w(t, g(r, "==", e)), l = await c(o);
      if (l.empty)
        return null;
      {
        const n = l.docs[0];
        return { id: n.id, ...n.data() };
      }
    } catch (t) {
      throw new Error(`Error getting document: ${t}`);
    }
  }
  /**
   * Get all documents in a collection.
   * @param collectionName The name of the collection.
   * @returns An array of documents.
   *
   * @example
   * await this.app.firebase.getCollection('users');
   */
  async getCollection(i) {
    if (!this.db)
      throw new Error("Firestore has not been initialized. Call initialize() first.");
    try {
      const r = s(this.db, i), e = await c(r), t = [];
      return e.forEach((o) => {
        t.push({ id: o.id, ...o.data() });
      }), t;
    } catch (r) {
      throw new Error(`Error getting collection: ${r}`);
    }
  }
  /**
   * Delete a document by its ID.
   * @param collectionName The name of the collection.
   * @param id The ID of the document to delete.
   * @returns The deleted document, or null if not found.
   *
   * @example
   * await this.app.firebase.deleteDocumentById('users', 'custom-id');
   */
  async deleteDocumentById(i, r) {
    if (!this.db)
      throw new Error("Firestore has not been initialized. Call initialize() first.");
    try {
      const e = a(this.db, i, r), t = await d(e);
      return t.exists() ? (await h(e), {
        id: t.id,
        ...t.data()
      }) : null;
    } catch (e) {
      throw new Error(`Error deleting document: ${e}`);
    }
  }
  /**
   * Delete a document by a field value.
   * @param collectionName The name of the collection.
   * @param field The field to query.
   * @param value The value to query.
   * @returns The deleted document, or null if not found.
   *
   * @example
   * await this.app.firebase.deleteDocumentByField('users', 'username', 'relish');
   */
  async deleteDocumentByField(i, r, e) {
    if (!this.db)
      throw new Error("Firestore has not been initialized. Call initialize() first.");
    try {
      const t = await this.getDocumentByField(i, r, e);
      if (!t)
        return null;
      const o = a(this.db, i, t.id);
      return await h(o), t;
    } catch (t) {
      throw new Error(`Error deleting document: ${t}`);
    }
  }
  /**
   * Delete all documents in a collection.
   * @param collectionName The name of the collection.
   * @returns void
   *
   * @example
   * await this.app.firebase.deleteCollection('users');
   */
  async deleteCollection(i) {
    if (!this.db)
      throw new Error("Firestore has not been initialized. Call initialize() first.");
    try {
      const r = s(this.db, i), e = await c(r), t = [];
      e.forEach((o) => {
        t.push(h(o.ref));
      }), await Promise.all(t);
    } catch (r) {
      throw new Error(`Error deleting collection: ${r}`);
    }
  }
  /**
   * Query a collection.
   * @param collectionName The name of the collection.
   * @param queries The query constraints to apply.
   * @returns An array of documents.
   *
   * @example
   * await this.app.firebase.queryCollection('users', where('score', '>', 0), limit(10));
   */
  async queryCollection(i, ...r) {
    if (!this.db)
      throw new Error("Firestore has not been initialized. Call initialize() first.");
    const e = [];
    try {
      const t = s(this.db, i), o = w(t, ...r);
      return (await c(o)).forEach((n) => {
        e.push({ id: n.id, ...n.data() });
      }), e;
    } catch (t) {
      throw new Error(`Error querying collection: ${t}`);
    }
  }
}
export {
  C as FirebaseAdapter
};
//# sourceMappingURL=dill-pixel-storage-adapter-firebase.mjs.map
