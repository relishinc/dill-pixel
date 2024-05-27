import { StorageAdapter, Logger, IApplication } from 'dill-pixel';
import { initializeApp } from 'firebase/app';
import type { FirebaseApp, FirebaseOptions } from 'firebase/app';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  collection,
  addDoc,
  query,
  where,
} from 'firebase/firestore';
import type { Firestore, DocumentData, WhereFilterOp } from 'firebase/firestore';

// TODO: better way to do this?
export * from 'firebase/firestore';

/**
 * A class representing a storage adapter that uses Firebase.
 * @extends StorageAdapter
 */
export class FirebaseAdapter extends StorageAdapter {
  private _firebaseApp: FirebaseApp;
  private _options: FirebaseOptions;
  private _db: Firestore;

  /**
   * Initializes the adapter.
   * @param {IApplication} _app The application that the adapter belongs to.
   * @param {FirebaseOptions} options The options to initialize the adapter with.
   * @returns {void}
   */
  public initialize(_app: IApplication, options: FirebaseOptions): void {
    Logger.log('FirebaseAdapter initialized');

    this._options = options;
    this._firebaseApp = initializeApp(this._options);
    this._db = getFirestore(this._firebaseApp); // initialize Firestore and get a reference to the database
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
   * @param id The ID of the document to update, if applicable.
   * @returns The saved document.
   *
   * @example
   * await this.app.firebase.save('users', { username: 'relish', score: 50 }, 'custom-id');
   */
  async save(collectionName: string, data: DocumentData, id?: string): Promise<any> {
    if (!this.db) {
      throw new Error('Firestore has not been initialized. Call initialize() first.');
    }

    let docRef;

    if (id) {
      docRef = doc(this.db, collectionName, id);
      await setDoc(docRef, data);
    } else {
      docRef = await addDoc(collection(this.db, collectionName), data);
    }

    // TODO: what to return?
    const docSnap = await getDoc(docRef);
    return {
      id: docSnap.id,
      ...docSnap.data(),
    };
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
  async getDocumentById(collectionName: string, id: string): Promise<DocumentData | null> {
    if (!this.db) {
      throw new Error('Firestore has not been initialized. Call initialize() first.');
    }
    const docRef = doc(this.db, collectionName, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log('No such document!');
      return null;
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
  async getDocumentByField(collectionName: string, field: string, value: any): Promise<DocumentData | null> {
    if (!this.db) {
      throw new Error('Firestore has not been initialized. Call initialize() first.');
    }
    const collectionRef = collection(this.db, collectionName);
    const q = query(collectionRef, where(field, '==', value));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() };
    } else {
      console.log('No such document!');
      return null;
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
  async getCollection(collectionName: string): Promise<DocumentData[]> {
    if (!this.db) {
      throw new Error('Firestore has not been initialized. Call initialize() first.');
    }
    const collectionRef = collection(this.db, collectionName);
    const querySnapshot = await getDocs(collectionRef);

    const documents: DocumentData[] = [];
    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });

    return documents;
  }

  /**
   * Delete a document by its ID.
   * @param collectionName The name of the collection.
   * @param id The ID of the document to delete.
   * @returns void
   *
   * @example
   * await this.app.firebase.deleteDocumentById('users', 'custom-id');
   */
  async deleteDocumentById(collectionName: string, id: string): Promise<void> {
    if (!this.db) {
      throw new Error('Firestore has not been initialized. Call initialize() first.');
    }
    const docRef = doc(this.db, collectionName, id);
    await deleteDoc(docRef);
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
  async deleteDocumentByField(collectionName: string, field: string, value: any): Promise<DocumentData | null> {
    if (!this.db) {
      throw new Error('Firestore has not been initialized. Call initialize() first.');
    }
    // find the document by the field
    const docRef = await this.getDocumentByField(collectionName, field, value);
    if (docRef) {
      await deleteDoc(doc(this.db, collectionName, docRef.id));
      return docRef;
    }

    return null;
  }

  /**
   * Delete all documents in a collection.
   * @param collectionName The name of the collection.
   * @returns void
   *
   * @example
   * await this.app.firebase.deleteCollection('users');
   */
  async deleteCollection(collectionName: string): Promise<void> {
    if (!this.db) {
      throw new Error('Firestore has not been initialized. Call initialize() first.');
    }
    const collectionRef = collection(this.db, collectionName);
    const querySnapshot = await getDocs(collectionRef);

    const docsToDelete: Promise<void>[] = [];
    querySnapshot.forEach((doc) => {
      docsToDelete.push(deleteDoc(doc.ref));
    });

    await Promise.all(docsToDelete);
  }

  /**
   * Query a collection by a field value.
   * @param collectionName The name of the collection.
   * @param field The field to query.
   * @param operator The operator to use for the query.
   * @param value The value to query.
   * @returns An array of documents.
   *
   * @example
   * await this.app.firebase.queryCollection('users', 'username', '==', 'relish');
   */
  async queryCollection(
    collectionName: string,
    field: string,
    operator: WhereFilterOp,
    value: any,
  ): Promise<DocumentData[]> {
    if (!this.db) {
      throw new Error('Firestore has not been initialized. Call initialize() first.');
    }
    const collectionRef = collection(this.db, collectionName);
    const q = query(collectionRef, where(field, operator, value));
    const querySnapshot = await getDocs(q);

    const documents: DocumentData[] = [];
    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });

    return documents;
  }
}
