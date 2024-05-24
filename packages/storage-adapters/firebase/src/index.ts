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

  // Delete all documents in a collection
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

// EXAMPLE USAGE:

// save a user score (with custom ID)
// const newUser = await this.app.firebase.save('users', { username: 'relish', score: 50 }, 'custom-id');
// console.log('Saved user:', newUser);

// save a user score (with auto-generated ID)
// will create a new user document each time this is called
// await this.app.firebase.save('users', { username: 'relish', score: 100 });

// create user to delete below
// await this.app.firebase.save('users', { username: 'relish', score: 100 }, 'user-to-delete');

// // get all users
// const users = await this.app.firebase.getCollection('users');
// console.log('Loaded users:', users);

// // get single user by ID
// const user1 = await this.app.firebase.getDocumentById('users', 'custom-id');
// console.log('Loaded user 1:', user1);

// // get signle user by username (via helper method)
// const user2 = await this.app.firebase.getDocumentByField('users', 'username', 'relish');
// console.log('Loaded user 2:', user2);

// // get single user by username (via query)
// const results = await this.app.firebase.queryCollection('users', 'username', '==', 'relish');
// console.log('Loaded user 3:', results[0]);

// // update a user score
// const updatedUser = await this.app.firebase.save('users', { username: 'relish', score: 100 }, 'custom-id');
// console.log('Updated user:', updatedUser);

// // delete a user (via helper method)
// await this.app.firebase.deleteDocumentById('users', 'user-to-delete');
