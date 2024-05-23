import { ImportListItem, ImportListItemModule } from './types';

/**
 * Retrieves the constructor of the module from the given import list item.
 * If the module is a promise, it waits for it to resolve.
 * If the module is a class, it returns it directly.
 * If the module has a named export specified in the item, it returns that.
 * Otherwise, it returns the default export of the module.
 * @param {ImportListItem<T>} item The import list item to get the module from.
 * @returns {Promise<Constructor<T>>} A promise that resolves to the constructor of the module.
 */
export declare function getDynamicModuleFromImportListItem<T = any>(item: ImportListItem<T>): Promise<ImportListItemModule<T>>;
//# sourceMappingURL=framework.d.ts.map