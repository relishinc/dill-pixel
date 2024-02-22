export interface IStorageAdapter {
    id: string;
    save(key: string, data: any): Promise<void> | void;
    load<T = any>(key: string): Promise<T> | T;
    initialize(): Promise<any> | any;
    destroy(): void;
}
//# sourceMappingURL=IStorageAdapter.d.ts.map