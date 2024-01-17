export interface IObjectPoolItem {
    release: (...args: any[]) => void;
    destroy: (...args: any[]) => void;
}
export declare class ObjectPool<T extends IObjectPoolItem> {
    classType: new (...args: any[]) => T;
    initialSize: number;
    maxSize: number;
    private pool;
    constructor(classType: new (...args: any[]) => T, initialSize?: number, maxSize?: number);
    get(): T;
    release(item: T): void;
    conditionalRelease(item: T, condition: (item: T) => boolean): void;
    clear(destroyItems?: boolean): void;
}
//# sourceMappingURL=ObjectPool.d.ts.map