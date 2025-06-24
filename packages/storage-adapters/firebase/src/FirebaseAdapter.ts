import { IApplication, isDev, IStorageAdapter, Logger, StorageAdapter } from 'dill-pixel';
import type { FirebaseApp, FirebaseOptions } from 'firebase/app';
import { initializeApp } from 'firebase/app';
import type { DocumentData, Firestore, QueryConstraint } from 'firebase/firestore';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { firebaseVersion, version } from './version';

interface DocumentResult extends DocumentData {
  id: string;
  [key: string]: unknown;
}
interface IFirebaseAdapterOptions extends FirebaseOptions {
  debug?: boolean;
}
export interface IFirebaseAdapter extends IStorageAdapter<IFirebaseAdapterOptions, DocumentResult> {
  db: Firestore;
  firebaseApp: FirebaseApp;

  initialize(options: Partial<FirebaseOptions>, app: IApplication): void;

  save<DocumentResult>(collectionName: string, data: DocumentData, id?: string): Promise<DocumentResult>;

  getDocumentById(collectionName: string, id: string): Promise<DocumentResult | null>;

  getDocumentWhere(collectionName: string, field: string, value: unknown): Promise<DocumentResult | null>;

  getCollection(collectionName: string): Promise<DocumentResult[]>;

  deleteDocumentById(collectionName: string, id: string): Promise<DocumentResult | null>;

  deleteDocumentWhere(collectionName: string, field: string, value: unknown): Promise<DocumentResult | null>;

  deleteCollection(collectionName: string): Promise<void>;

  queryCollection(collectionName: string, ...queries: QueryConstraint[]): Promise<DocumentResult[]>;
}

/**
 * A class representing a storage adapter that uses Firebase.
 * @extends StorageAdapter
 */
export class FirebaseAdapter
  extends StorageAdapter<IFirebaseAdapterOptions, DocumentResult>
  implements IFirebaseAdapter
{
  private _options: IFirebaseAdapterOptions;

  private _firebaseApp: FirebaseApp;

  /**
   * Returns the Firebase app.
   * @returns {FirebaseApp} The Firebase app.
   */
  get firebaseApp(): FirebaseApp {
    return this._firebaseApp;
  }

  private _db: Firestore;

  /**
   * Returns the Firestore database.
   * @returns {Firestore} The Firestore database.
   */
  get db() {
    return this._db;
  }

  private hello() {
    const hello = `%c Dill Pixel Firebase Storage Adapter v${version} | %cFirebase v${firebaseVersion}`;
    console.log(
      hello,
      'background: rgba(31, 41, 55, 1);color: #74b64c',
      'background: rgba(31, 41, 55, 1);color: #e91e63',
      'background: rgba(31, 41, 55, 1);color: #74b64c',
    );

    if (this._options.debug) {
      Logger.log(this._options);
    }
  }
  /**
   * Initializes the adapter.
   * @param {IApplication} _app The application that the adapter belongs to.
   * @param {FirebaseOptions} options The options to initialize the adapter with.
   * @returns {void}
   */
  public initialize(options: Partial<IFirebaseAdapterOptions>, _app: IApplication): void {
    const defaultConfig: IFirebaseAdapterOptions = {
      debug: isDev,
      apiKey: _app.env.VITE_FIREBASE_API_KEY || _app.env.FIREBASE_API_KEY,
      authDomain: _app.env.VITE_FIREBASE_AUTH_DOMAIN || _app.env.FIREBASE_AUTH_DOMAIN,
      projectId: _app.env.VITE_FIREBASE_PROJECT_ID || _app.env.FIREBASE_PROJECT_ID,
      storageBucket: _app.env.VITE_FIREBASE_STORAGE_BUCKET || _app.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: _app.env.VITE_FIREBASE_MESSAGING_SENDER_ID || _app.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: _app.env.VITE_FIREBASE_APP_ID || _app.env.FIREBASE_APP_ID,
    };
    this._options = { ...defaultConfig, ...options };
    this._firebaseApp = initializeApp(this._options);
    this._db = getFirestore(this._firebaseApp); // initialize Firestore and get a reference to the database
    this.hello();
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
  async save<DocumentResult>(collectionName: string, data: DocumentData, id?: string): Promise<DocumentResult> {
    if (!this.db) {
      throw new Error('Firestore has not been initialized. Call initialize() first.');
    }

    let docRef;
    try {
      if (id) {
        docRef = doc(this.db, collectionName, id);
      } else {
        docRef = await addDoc(collection(this.db, collectionName), data);
      }

      // If the document does not exist, it will be created.
      // If the document does exist, the data will be merged into the existing document.
      await setDoc(docRef, data, { merge: true });

      const docSnap = await getDoc(docRef);
      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as DocumentResult;
    } catch (error) {
      throw new Error(`Error saving document: ${error}`);
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
  async getDocumentById(collectionName: string, id: string): Promise<DocumentResult | null> {
    if (!this.db) {
      throw new Error('Firestore has not been initialized. Call initialize() first.');
    }
    const docRef = doc(this.db, collectionName, id);

    try {
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) return null;

      const data = {
        id: docSnap.id,
        ...docSnap.data(),
      };

      if (!data) return null;

      return data;
    } catch (error) {
      throw new Error(`Error getting document: ${error}`);
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
  async getDocumentWhere(collectionName: string, field: string, value: unknown): Promise<DocumentResult | null> {
    if (!this.db) {
      throw new Error('Firestore has not been initialized. Call initialize() first.');
    }

    try {
      const collectionRef = collection(this.db, collectionName);
      const q = query(collectionRef, where(field, '==', value));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return { id: doc.id, ...doc.data() };
      } else {
        return null;
      }
    } catch (error) {
      throw new Error(`Error getting document: ${error}`);
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
  async getCollection(collectionName: string): Promise<DocumentResult[]> {
    if (!this.db) {
      throw new Error('Firestore has not been initialized. Call initialize() first.');
    }

    try {
      const collectionRef = collection(this.db, collectionName);
      const querySnapshot = await getDocs(collectionRef);

      const documents: DocumentResult[] = [];
      querySnapshot.forEach((doc) => {
        documents.push({ id: doc.id, ...doc.data() });
      });

      return documents;
    } catch (error) {
      throw new Error(`Error getting collection: ${error}`);
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
  async deleteDocumentById(collectionName: string, id: string): Promise<DocumentResult | null> {
    if (!this.db) {
      throw new Error('Firestore has not been initialized. Call initialize() first.');
    }

    try {
      const docRef = doc(this.db, collectionName, id);
      const docToDelete = await getDoc(docRef);

      if (!docToDelete.exists()) {
        return null;
      }

      await deleteDoc(docRef);
      return {
        id: docToDelete.id,
        ...docToDelete.data(),
      };
    } catch (error) {
      throw new Error(`Error deleting document: ${error}`);
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
  async deleteDocumentWhere(collectionName: string, field: string, value: unknown): Promise<DocumentResult | null> {
    if (!this.db) {
      throw new Error('Firestore has not been initialized. Call initialize() first.');
    }

    try {
      const docToDelete = await this.getDocumentWhere(collectionName, field, value);

      if (!docToDelete) return null;

      const docRef = doc(this.db, collectionName, docToDelete.id);
      await deleteDoc(docRef);

      return docToDelete;
    } catch (error) {
      throw new Error(`Error deleting document: ${error}`);
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
  async deleteCollection(collectionName: string): Promise<void> {
    if (!this.db) {
      throw new Error('Firestore has not been initialized. Call initialize() first.');
    }

    try {
      const collectionRef = collection(this.db, collectionName);
      const querySnapshot = await getDocs(collectionRef);

      const docsToDelete: Promise<void>[] = [];
      querySnapshot.forEach((doc) => {
        docsToDelete.push(deleteDoc(doc.ref));
      });

      await Promise.all(docsToDelete);
    } catch (error) {
      throw new Error(`Error deleting collection: ${error}`);
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
  async queryCollection(collectionName: string, ...queries: QueryConstraint[]): Promise<DocumentResult[]> {
    if (!this.db) {
      throw new Error('Firestore has not been initialized. Call initialize() first.');
    }

    const documents: DocumentResult[] = [];
    try {
      const collectionRef = collection(this.db, collectionName);

      const q = query(collectionRef, ...queries);

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        documents.push({ id: doc.id, ...doc.data() });
      });

      return documents;
    } catch (error) {
      throw new Error(`Error querying collection: ${error}`);
    }
  }
}
