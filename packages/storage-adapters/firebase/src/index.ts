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

export * from 'firebase/firestore';

export class FirebaseAdapter extends StorageAdapter {
  private _firebaseApp: FirebaseApp | null;
  private _options: FirebaseOptions;
  private _db: Firestore | null;

  public initialize(_app: IApplication, options: FirebaseOptions): void {
    Logger.log('FirebaseAdapter initialized');
    this._options = options;

    this._firebaseApp = initializeApp(this._options);
    this._db = getFirestore(this._firebaseApp); // initialize Firestore and get a reference to the database
  }

  get db() {
    return this._db;
  }

  // Save or update a document
  async save(collectionName: string, data: DocumentData, id?: string): Promise<any> {
    if (!this.db) {
      throw new Error('Firestore has not been initialized. Call initialize() first.');
    }

    if (id) {
      const docRef = doc(this.db, collectionName, id);
      await setDoc(docRef, data);
      return docRef;
    }

    const docRef = addDoc(collection(this.db, collectionName), data);
    return docRef;
  }

  // Get a single document by its ID
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

  // Get a single document by a field
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

  // Get all documents in a collection
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

  // Delete a document by its ID
  async deleteDocumentById(collectionName: string, id: string): Promise<void> {
    if (!this.db) {
      throw new Error('Firestore has not been initialized. Call initialize() first.');
    }
    const docRef = doc(this.db, collectionName, id);
    await deleteDoc(docRef);
  }

  // Delete a document by a field
  async deleteDocumentByField(collectionName: string, field: string, value: any): Promise<void> {
    if (!this.db) {
      throw new Error('Firestore has not been initialized. Call initialize() first.');
    }
    const collectionRef = collection(this.db, collectionName);
    const q = query(collectionRef, where(field, '==', value));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
      });
    }
  }

  // Query documents in a collection with specified conditions
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
