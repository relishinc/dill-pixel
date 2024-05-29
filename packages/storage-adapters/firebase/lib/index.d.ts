import { StorageAdapter, IApplication } from 'dill-pixel';
import { FirebaseApp, FirebaseOptions } from 'firebase/app';
import { Firestore, DocumentData, QueryConstraint } from 'firebase/firestore';

export * from 'firebase/firestore';
/**
 * A class representing a storage adapter that uses Firebase.
 * @extends StorageAdapter
 */
export declare class FirebaseAdapter extends StorageAdapter {
    private _firebaseApp;
    private _options;
    private _db;
    /**
     * Initializes the adapter.
     * @param {IApplication} _app The application that the adapter belongs to.
     * @param {FirebaseOptions} options The options to initialize the adapter with.
     * @returns {void}
     */
    initialize(_app: IApplication, options: FirebaseOptions): void;
    /**
     * Returns the Firebase app.
     * @returns {FirebaseApp} The Firebase app.
     */
    get firebaseApp(): FirebaseApp;
    /**
     * Returns the Firestore database.
     * @returns {Firestore} The Firestore database.
     */
    get db(): Firestore;
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
    save(collectionName: string, data: DocumentData, id?: string): Promise<DocumentData>;
    /**
     * Get a single document by its ID.
     * @param collectionName The name of the collection.
     * @param id The ID of the document to get.
     * @returns The document, or null if not found.
     *
     * @example
     * await this.app.firebase.getDocumentById('users', 'custom-id');
     */
    getDocumentById(collectionName: string, id: string): Promise<DocumentData | null>;
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
    getDocumentByField(collectionName: string, field: string, value: unknown): Promise<DocumentData | null>;
    /**
     * Get all documents in a collection.
     * @param collectionName The name of the collection.
     * @returns An array of documents.
     *
     * @example
     * await this.app.firebase.getCollection('users');
     */
    getCollection(collectionName: string): Promise<DocumentData[]>;
    /**
     * Delete a document by its ID.
     * @param collectionName The name of the collection.
     * @param id The ID of the document to delete.
     * @returns The deleted document, or null if not found.
     *
     * @example
     * await this.app.firebase.deleteDocumentById('users', 'custom-id');
     */
    deleteDocumentById(collectionName: string, id: string): Promise<DocumentData | null>;
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
    deleteDocumentByField(collectionName: string, field: string, value: unknown): Promise<DocumentData | null>;
    /**
     * Delete all documents in a collection.
     * @param collectionName The name of the collection.
     * @returns void
     *
     * @example
     * await this.app.firebase.deleteCollection('users');
     */
    deleteCollection(collectionName: string): Promise<void>;
    /**
     * Query a collection.
     * @param collectionName The name of the collection.
     * @param queries The query constraints to apply.
     * @returns An array of documents.
     *
     * @example
     * await this.app.firebase.queryCollection('users', where('score', '>', 0), limit(10));
     */
    queryCollection(collectionName: string, ...queries: QueryConstraint[]): Promise<DocumentData[]>;
}
//# sourceMappingURL=index.d.ts.map