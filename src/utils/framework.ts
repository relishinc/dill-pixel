import { isPromise } from './async';
import { Constructor, ImportListItem } from './types';

function isClass(value: any): boolean {
  return typeof value === 'function' && /^class\s/.test(Function.prototype.toString.call(value));
}

export async function getDynamicModuleFromImportListItem<T = any>(item: ImportListItem<T>): Promise<Constructor<T>> {
  let module;
  let ctor: Constructor<T>;

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
