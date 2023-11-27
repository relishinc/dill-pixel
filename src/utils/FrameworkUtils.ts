type MethodNames = {
  [key: string]: any;
};

/**
 * A helper method for binding methods to the class instance
 * @param instance
 * @param methodNames
 * @example
 * this.bindMethods('onResize', 'onUpdate');
 * @protected
 */
export function bindMethods(instance: unknown, ...methodNames: string[]) {
  methodNames.forEach((methodName) => {
    const method = (instance as MethodNames)[methodName];
    if (typeof method === 'function') {
      (instance as MethodNames)[methodName] = method.bind(instance);
    }
  });
}

export function bindAllMethods(
  instance: unknown,
  excludePrefixes: string[] = ['_'],
  excludeMethodNames: string[] = [],
) {
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
      (instance as any)[propertyName] = (instance as any)[propertyName].bind(instance);
    }
    // Note: Getters and setters are not bound here
  });
}
