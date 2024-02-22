import { IStorageAdapter } from './adapters';
type AdapterSaveConfig = {
    adapterKey: string;
    awaitSave: boolean;
};
export interface IStore {
    destroy(): void;
    registerAdapter(adapter: IStorageAdapter): void;
    getAdapter<T extends IStorageAdapter>(adapterId: string): T;
}
export declare class Store implements IStore {
    protected adapters: Map<string, IStorageAdapter>;
    constructor();
    registerAdapter(adapter: IStorageAdapter): Promise<void>;
    getAdapter<T extends IStorageAdapter>(adapterId: string): T;
    destroy(): void;
    save(adapterKey: string | string[] | Partial<AdapterSaveConfig>[], key: string, data: any, awaitSave?: boolean): Promise<any>;
    load(adapterKey: string, key: string): Promise<any>;
}
export {};
//# sourceMappingURL=Store.d.ts.map