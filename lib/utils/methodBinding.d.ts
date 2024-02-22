/**
 * A helper method for binding methods to the class instance
 * @param instance
 * @param methodNames
 * @example
 * this.bindMethods('onResize', 'onUpdate');
 * @protected
 */
export declare function bindMethods(instance: unknown, ...methodNames: string[]): void;
export declare function bindAllMethods(instance: any, excludePrefixes?: string[], excludeMethodNames?: string[]): void;
export declare function checkAndInvokeMethod(obj: any, methodName: string, ...methodArgs: any[]): void;
//# sourceMappingURL=methodBinding.d.ts.map