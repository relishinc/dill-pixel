/**
 * A helper method for binding methods to the class instance
 * @param instance - The instance of the class where the methods are to be bound
 * @param methodNames - The names of the methods to be bound
 * @example
 * this.bindMethods('onResize', 'onUpdate');
 */
export declare function bindMethods(instance: unknown, ...methodNames: string[]): void;
/**
 * Bind all methods of an instance
 * @param instance - The instance of the class
 * @param excludePrefixes - The prefixes of the methods to be excluded
 * @param excludeMethodNames - The names of the methods to be excluded
 */
export declare function bindAllMethods(instance: any, excludePrefixes?: string[], excludeMethodNames?: string[]): void;
/**
 * Check if a method exists in an object and invoke it if it does
 * @param obj - The object to check
 * @param methodName - The name of the method to check and invoke
 * @param methodArgs - The arguments to pass to the method if it exists and is invoked
 */
export declare function checkAndInvokeMethod(obj: any, methodName: string, ...methodArgs: any[]): void;
//# sourceMappingURL=FrameworkUtils.d.ts.map