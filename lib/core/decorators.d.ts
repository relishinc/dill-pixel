import { Constructor } from '../utils/types';
/**
 * MethodBindingRoot is a decorator that marks a class as the root of a method binding tree
 * when calling bindAllMethods. This is used to prevent bindAllMethods from binding methods
 * all the way up the prototype chain to e.g. Object.prototype.
 * @param constructor
 * @constructor
 */
export declare function MethodBindingRoot(constructor: any): void;
/**
 * CoreFunction is a decorator that marks a method as a core functions
 * core functions get added to the global function registry
 * and can be called from anywhere in the application
 * using the app.func method
 * @param target
 * @param {string | symbol} prop
 * @constructor
 */
export declare function CoreFunction(target: any, prop: string | symbol): void;
/**
 * CorePlugin is a decorator that marks a core plugin
 * core modules' signals get added to the global signal registry
 * and can be connected to from anywhere in the application
 * using the app.on method
 * core modules' functions get added to the global function registry
 * @param {Constructor<any>} constructor
 * @returns {any}
 * @constructor
 */
export declare function CorePlugin(constructor: Constructor<any>): any;
