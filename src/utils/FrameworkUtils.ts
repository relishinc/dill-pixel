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
