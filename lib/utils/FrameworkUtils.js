/**
 * A helper method for binding methods to the class instance
 * @param instance - The instance of the class where the methods are to be bound
 * @param methodNames - The names of the methods to be bound
 * @example
 * this.bindMethods('onResize', 'onUpdate');
 */
export function bindMethods(instance, ...methodNames) {
    methodNames.forEach((methodName) => {
        const method = instance[methodName];
        if (typeof method === 'function') {
            instance[methodName] = method.bind(instance);
        }
    });
}
/**
 * Get all method names of instance and any prototype it extends, all the way up the tree
 * @param instance - The instance of the class
 * @param excludePrefixes - The prefixes of the methods to be excluded
 * @param excludeMethodNames - The names of the methods to be excluded
 * @returns An array of method names
 */
function getInstanceMethodNames(instance, excludePrefixes = [], excludeMethodNames = []) {
    const methodNames = [];
    let prototype = Object.getPrototypeOf(instance);
    while (prototype) {
        const filteredMethodNames = Object.getOwnPropertyNames(prototype).filter((propertyName) => {
            const ownDescriptor = Object.getOwnPropertyDescriptor(prototype, propertyName);
            if (!ownDescriptor || typeof ownDescriptor.value !== 'function' || propertyName === 'constructor') {
                return false;
            }
            if (excludePrefixes.some((prefix) => propertyName.startsWith(prefix))) {
                return false;
            }
            return !excludeMethodNames.includes(propertyName);
        });
        methodNames.push(...filteredMethodNames);
        if (prototype === Object.prototype || prototype.constructor.hasOwnProperty('__dill_pixel_top_level_class')) {
            break;
        }
        prototype = Object.getPrototypeOf(prototype);
    }
    return methodNames;
}
/**
 * Bind all methods of an instance
 * @param instance - The instance of the class
 * @param excludePrefixes - The prefixes of the methods to be excluded
 * @param excludeMethodNames - The names of the methods to be excluded
 */
export function bindAllMethods(instance, excludePrefixes = [], excludeMethodNames = []) {
    const methodNames = getInstanceMethodNames(instance, excludePrefixes, excludeMethodNames);
    methodNames.forEach((methodName) => {
        instance[methodName] = instance[methodName].bind(instance);
    });
}
/**
 * Check if a method exists in an object and invoke it if it does
 * @param obj - The object to check
 * @param methodName - The name of the method to check and invoke
 * @param methodArgs - The arguments to pass to the method if it exists and is invoked
 */
export function checkAndInvokeMethod(obj, methodName, ...methodArgs) {
    if (methodName in obj && typeof obj[methodName] === 'function') {
        obj[methodName](...methodArgs);
    }
}
//# sourceMappingURL=FrameworkUtils.js.map