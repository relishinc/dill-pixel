import { isPromise } from './async';
import { Constructor } from './types';

function isClass(value: any): boolean {
  return typeof value === 'function' && /^class\s/.test(Function.prototype.toString.call(value));
}

export async function getDynamicModuleFromListObject<T = any>(obj: {
  id: string;
  module: (() => Promise<any>) | Promise<any> | Constructor<T>;
}): Promise<Constructor<T>> {
  let module;
  let ctor;

  if (isPromise(obj.module)) {
    module = await obj.module;
  } else if (typeof obj.module === 'function') {
    if (isClass(obj.module)) {
      module = obj.module;
      ctor = module as Constructor<T>;
    } else {
      module = await (obj.module as () => Promise<any>)();
      ctor = (module[obj.id] ? module[obj.id] : module) as Constructor<T>;
    }
  } else {
    module = obj.module;
    ctor = module as Constructor<T>;
  }

  return ctor as Constructor<T>;
}
