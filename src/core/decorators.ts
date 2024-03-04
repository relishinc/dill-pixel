import {Signal} from '../signals';
import {Constructor, Logger} from '../utils';
import {coreFunctionRegistry} from './coreFunctionRegistry';
import {coreSignalRegistry} from './coreSignalRegistry';

/**
 * MethodBindingRoot is a decorator that marks a class as the root of a method binding tree
 * when calling bindAllMethods. This is used to prevent bindAllMethods from binding methods
 * all the way up the prototype chain to e.g. Object.prototype.
 * @param constructor
 * @constructor
 */
export function MethodBindingRoot(constructor: any) {
  constructor.__dill_pixel_method_binding_root = true;
}

/**
 * CoreFunction is a decorator that marks a method as a core functions
 * core functions get added to the global function registry
 * and can be called from anywhere in the application
 * using the app.func method
 * @param target
 * @param {string | symbol} prop
 * @constructor
 */
export function CoreFunction(target: any, prop: string | symbol) {
  if (!target.constructor.__dill_pixel_core_functions) {
    target.constructor.__dill_pixel_core_functions = [];
  }
  target.constructor.__dill_pixel_core_functions.push(prop);
}

/**
 * CoreModule is a decorator that marks a class as a core module
 * core modules' signals get added to the global signal registry
 * and can be connected to from anywhere in the application
 * using the app.on method
 * core modules' functions get added to the global function registry
 * @param {Constructor<any>} constructor
 * @returns {any}
 * @constructor
 */
export function CoreModule(constructor: Constructor<any>) {
  const original = constructor;

  function construct(constructor: Constructor<any>, args: any[]) {
    const c: any = function () {
      return new constructor(...args);
    };
    c.prototype = constructor.prototype;
    const instance = new c();
    Object.keys(instance).forEach((key) => {
      if (instance[key] instanceof Signal) {
        let signalName = key.toString();
        // remove "on" prefix and lowercase first letter
        signalName = signalName.charAt(2).toLowerCase() + signalName.slice(3);
        // check if signal registry exists
        if (coreSignalRegistry[signalName]) {
          // throw
          Logger.error(`Signal with name ${signalName} already exists in the global signal registry`);
        } else {
          coreSignalRegistry[signalName] = instance[key];
        }
      }
    });
    const coreFunctions = (constructor as any).__dill_pixel_core_functions;
    coreFunctions?.forEach((functionName: string) => {
      if (coreFunctionRegistry[functionName]) {
        // throw
        Logger.error(`Function with name ${functionName} already exists in the global function registry`);
      } else {
        coreFunctionRegistry[functionName] = instance[functionName].bind(instance);
      }
    });
    return instance;
  }

  const newConstructor: any = function (...args: any[]) {
    // @ts-ignore
    return construct(original, args);
  };
  newConstructor.prototype = original.prototype;

  // reset its name to the original constructor's name
  Object.defineProperty(newConstructor, 'name', { value: constructor.name, configurable: true });
  return newConstructor;
}
