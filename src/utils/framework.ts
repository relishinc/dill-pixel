import { isPromise } from './async';
import { Constructor, ImportListItem, ImportListItemModule } from './types';

/**
 * Checks if the given value is a class.
 * @param {any} value The value to check.
 * @returns {boolean} True if the value is a class, false otherwise.
 */
function isClass(value: any): boolean {
  return typeof value === 'function' && /^class\s/.test(Function.prototype.toString.call(value));
}

/**
 * Retrieves the constructor of the module from the given import list item.
 * If the module is a promise, it waits for it to resolve.
 * If the module is a class, it returns it directly.
 * If the module has a named export specified in the item, it returns that.
 * Otherwise, it returns the default export of the module.
 * @param {ImportListItem<T>} item The import list item to get the module from.
 * @returns {Promise<Constructor<T>>} A promise that resolves to the constructor of the module.
 */
export async function getDynamicModuleFromImportListItem<T = any>(
  item: ImportListItem<T>,
): Promise<ImportListItemModule<T>> {
  let module;
  let ctor: ImportListItemModule<T>;

  if (isPromise(item.module)) {
    module = await item.module;
    ctor = item?.namedExport ? module[item.namedExport] : module.default;
  } else if (typeof item.module === 'function') {
    if (isClass(item.module)) {
      module = item.module;
      ctor = module as Constructor<T>;
    } else {
      module = await (item.module as () => Promise<any>)();
      ctor = item?.namedExport ? module[item.namedExport] : module.default;
    }
  } else {
    module = item.module;
    ctor = module;
  }

  return ctor;
}
