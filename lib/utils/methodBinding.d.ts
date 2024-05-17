/**
 * Binds the provided methods to the provided instance.
 * @param instance - The instance to which the methods should be bound.
 * @param methodNames - The names of the methods to bind.
 */
export declare function bindMethods(instance: unknown, ...methodNames: string[]): void;
/**
 * Binds all methods of an instance to the instance.
 * @param instance - The instance to which the methods should be bound.
 * @param excludePrefixes - An array of prefixes to exclude from the method names.
 * @param excludeMethodNames - An array of method names to exclude.
 */
export declare function bindAllMethods(instance: any, excludePrefixes?: string[], excludeMethodNames?: string[]): void;
/**
 * Checks if a method exists on an object and, if it does, invokes it with the provided arguments.
 * @param obj - The object on which to check for the method.
 * @param methodName - The name of the method to check for and invoke.
 * @param methodArgs - The arguments to pass to the method.
 */
export declare function checkAndInvokeMethod(obj: any, methodName: string, ...methodArgs: any[]): void;
