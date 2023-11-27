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
export function bindAllMethods(instance, excludePrefixes = ['_'], excludeMethodNames = []) {
    const prototype = Object.getPrototypeOf(instance);
    Object.getOwnPropertyNames(prototype).forEach((propertyName) => {
        const descriptor = Object.getOwnPropertyDescriptor(prototype, propertyName);
        if (descriptor && typeof descriptor.value === 'function' && propertyName !== 'constructor') {
            // check if methodName starts with any of the prefixes
            if (excludePrefixes.some((prefix) => propertyName.startsWith(prefix))) {
                return;
            }
            if (excludeMethodNames.includes(propertyName)) {
                return;
            }
            instance[propertyName] = instance[propertyName].bind(instance);
        }
        // Note: Getters and setters are not bound here
    });
}
//# sourceMappingURL=FrameworkUtils.js.map