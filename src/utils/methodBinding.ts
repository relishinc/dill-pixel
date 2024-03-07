type MethodNames = {
  [key: string]: any;
};

/**
 * Binds the provided methods to the provided instance.
 * @param instance - The instance to which the methods should be bound.
 * @param methodNames - The names of the methods to bind.
 */
export function bindMethods(instance: unknown, ...methodNames: string[]) {
  methodNames.forEach((methodName) => {
    const method = (instance as MethodNames)[methodName];
    if (typeof method === 'function') {
      (instance as MethodNames)[methodName] = method.bind(instance);
    }
  });
}

/**
 * Retrieves the names of all methods in an instance's prototype chain.
 * @param instance - The instance from which to retrieve method names.
 * @param excludePrefixes - An array of prefixes to exclude from the method names.
 * @param excludeMethodNames - An array of method names to exclude.
 * @returns An array of method names.
 */
function getInstanceMethodNames(
  instance: any,
  excludePrefixes: string[] = [],
  excludeMethodNames: string[] = [],
): string[] {
  let prototype = Object.getPrototypeOf(instance);
  const methodNames: string[] = [];

  while (prototype) {
    const filteredMethodNames = Object.getOwnPropertyNames(prototype).filter((propertyName) => {
      const ownDescriptor = Object.getOwnPropertyDescriptor(prototype, propertyName);
      return (
        typeof ownDescriptor?.value === 'function' &&
        propertyName !== 'constructor' &&
        !excludePrefixes.some((prefix) => propertyName.startsWith(prefix)) &&
        !excludeMethodNames.includes(propertyName)
      );
    });

    methodNames.push(...filteredMethodNames);

    if (prototype === Object.prototype || prototype.constructor.hasOwnProperty('__dill_pixel_method_binding_root')) {
      break;
    }

    prototype = Object.getPrototypeOf(prototype);
  }

  return methodNames;
}

/**
 * Binds all methods of an instance to the instance.
 * @param instance - The instance to which the methods should be bound.
 * @param excludePrefixes - An array of prefixes to exclude from the method names.
 * @param excludeMethodNames - An array of method names to exclude.
 */
export function bindAllMethods(instance: any, excludePrefixes: string[] = [], excludeMethodNames: string[] = []) {
  getInstanceMethodNames(instance, excludePrefixes, excludeMethodNames).forEach((methodName) => {
    instance[methodName] = instance[methodName].bind(instance);
  });
}

/**
 * Checks if a method exists on an object and, if it does, invokes it with the provided arguments.
 * @param obj - The object on which to check for the method.
 * @param methodName - The name of the method to check for and invoke.
 * @param methodArgs - The arguments to pass to the method.
 */
export function checkAndInvokeMethod(obj: any, methodName: string, ...methodArgs: any[]): void {
  if (typeof obj[methodName] === 'function') {
    obj[methodName](...methodArgs);
  }
}
