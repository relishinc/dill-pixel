import { IStorageAdapter } from './IStorageAdapter';
export declare class LocalStorageAdapter implements IStorageAdapter {
    protected namespace: string;
    readonly id: string;
    constructor(namespace?: string, id?: string);
    get prefix(): string;
    save(key: string, data: any): any;
    load<T = any>(key: string): T;
    destroy(): void;
    initialize(): boolean;
    clear(key: string): void;
}
//# sourceMappingURL=LocalStorageAdapter.d.ts.map