/**
 * A helper method for binding methods to the class instance
 * @param instance
 * @param methodNames
 * @example
 * this.bindMethods('onResize', 'onUpdate');
 * @protected
 */
export function bindMethods(instance, ...methodNames) {
    methodNames.forEach((methodName) => {
        const method = instance[methodName];
        if (typeof method === 'function') {
            instance[methodName] = method.bind(instance);
        }
    });
}
// get all method names of instance and any prototype it extends, all the way up the tree
function getInstanceMethodNames(instance, excludePrefixes = [], excludeMethodNames = []) {
    const methodNames = [];
    let prototype = Object.getPrototypeOf(instance);
    while (prototype) {
        // console.log('binding', prototype.constructor.name, prototype);
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
            // console.log('breaking on prototype', prototype.constructor.name);
            break;
        }
        prototype = Object.getPrototypeOf(prototype);
    }
    return methodNames;
}
export function bindAllMethods(instance, excludePrefixes = [], excludeMethodNames = []) {
    // console.group('bindAllMethods', instance.constructor.name);
    const methodNames = getInstanceMethodNames(instance, excludePrefixes, excludeMethodNames);
    // console.groupEnd();
    methodNames.forEach((methodName) => {
        instance[methodName] = instance[methodName].bind(instance);
    });
}
export function checkAndInvokeMethod(obj, methodName, ...methodArgs) {
    if (methodName in obj && typeof obj[methodName] === 'function') {
        obj[methodName](...methodArgs);
    }
}
//# sourceMappingURL=methodBinding.js.map