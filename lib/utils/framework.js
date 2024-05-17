import { isPromise } from './async';
/**
 * Checks if the given value is a class.
 * @param {any} value The value to check.
 * @returns {boolean} True if the value is a class, false otherwise.
 */
function isClass(value) {
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
export async function getDynamicModuleFromImportListItem(item) {
    let module;
    let ctor;
    if (isPromise(item.module)) {
        module = await item.module;
        ctor = item?.namedExport ? module[item.namedExport] : module.default;
    }
    else if (typeof item.module === 'function') {
        if (isClass(item.module)) {
            module = item.module;
            ctor = module;
        }
        else {
            module = await item.module();
            ctor = item?.namedExport ? module[item.namedExport] : module.default;
        }
    }
    else {
        module = item.module;
        ctor = module;
    }
    return ctor;
}
