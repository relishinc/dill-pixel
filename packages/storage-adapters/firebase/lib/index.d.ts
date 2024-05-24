import { StorageAdapter, IApplication } from 'dill-pixel';
import { FirebaseApp, FirebaseOptions } from 'firebase/app';
import { Firestore, DocumentData } from 'firebase/firestore';

export * from 'firebase/firestore';
export default class FirebaseAdapter extends StorageAdapter {
    private _firebaseApp;
    private _options;
    private _db;
    initialize(_app: IApplication, options: FirebaseOptions): void;
    get firebaseApp(): FirebaseApp;
    get db(): Firestore | null;
    save(collectionId: string, data: DocumentData): Promise<void>;
    loadAll(collectionId: string): Promise<any>;
    load(collectionId: string, id: string): Promise<any>;
    getCollection(collectionId: string): import('@firebase/firestore').CollectionReference<DocumentData, DocumentData>;
}
//# sourceMappingURL=index.d.ts.map