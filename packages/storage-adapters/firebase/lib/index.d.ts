import { StorageAdapter, IApplication } from 'dill-pixel';
import { FirebaseApp, FirebaseOptions } from 'firebase/app';
import { Firestore, DocumentData, QueryConstraint } from 'firebase/firestore';

interface DocumentResult extends DocumentData {
    id: string;
}
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
    initialize(_app: IApplication, options?: Partial<FirebaseOptions>): void;
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
     * @param {string} collectionName The name of the collection.
     * @param {DocumentData} data The data to save or update.
     * @param {string} id The ID of the document to save or update, if applicable.
     * @returns {Promise<DocumentResult>} The saved or updated document.
     *
     * @example
     * await this.app.firebase.save('users', { username: 'relish', score: 50 }, 'custom-id');
     */
    save(collectionName: string, data: DocumentData, id?: string): Promise<DocumentResult>;
    /**
     * Get a single document by its ID.
     * @param {string} collectionName The name of the collection.
     * @param {string} id The ID of the document to get.
     * @returns {Promise<DocumentResult | null>} The document, or null if not found.
     *
     * @example
     * await this.app.firebase.getDocumentById('users', 'custom-id');
     */
    getDocumentById(collectionName: string, id: string): Promise<DocumentResult | null>;
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
    getDocumentWhere(collectionName: string, field: string, value: unknown): Promise<DocumentResult | null>;
    /**
     * Get all documents in a collection.
     * @param {string} collectionName The name of the collection.
     * @returns {Promise<DocumentResult[]>} An array of documents.
     *
     * @example
     * await this.app.firebase.getCollection('users');
     */
    getCollection(collectionName: string): Promise<DocumentResult[]>;
    /**
     * Delete a document by its ID.
     * @param {string} collectionName The name of the collection.
     * @param {string} id The ID of the document to delete.
     * @returns {Promise<DocumentResult | null>} The deleted document, or null if not found.
     *
     * @example
     * await this.app.firebase.deleteDocumentById('users', 'custom-id');
     */
    deleteDocumentById(collectionName: string, id: string): Promise<DocumentResult | null>;
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
    deleteDocumentWhere(collectionName: string, field: string, value: unknown): Promise<DocumentResult | null>;
    /**
     * Delete all documents in a collection.
     * @param {string} collectionName The name of the collection.
     * @returns {Promise<void>} A promise that resolves when the operation is complete.
     *
     * @example
     * await this.app.firebase.deleteCollection('users');
     */
    deleteCollection(collectionName: string): Promise<void>;
    /**
     * Query a collection.
     * @param {string} collectionName The name of the collection.
     * @param {QueryConstraint[]} queries The query constraints to apply.
     * @returns {Promise<DocumentResult[]>} An array of documents.
     *
     * @example
     * await this.app.firebase.queryCollection('users', where('score', '>', 0), limit(10));
     */
    queryCollection(collectionName: string, ...queries: QueryConstraint[]): Promise<DocumentResult[]>;
}
export {};
//# sourceMappingURL=index.d.ts.map