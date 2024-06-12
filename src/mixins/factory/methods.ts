import { defaultFactoryMethods } from './index';

export function createFactoryMethods<T extends typeof defaultFactoryMethods = typeof defaultFactoryMethods>(
  methods: Partial<T>,
  instance: any,
  addToStage: boolean,
): T {
  const factoryMethods: any = {};
  for (const key in methods) {
    factoryMethods[key] = (...args: any[]) => {
      // @ts-expect-error - this is fine
      const obj = methods[key](...args);
      if (addToStage) {
        instance.addChild(obj);
        // instance.addChild(obj);
      }
      return obj;
    };
  }
  return factoryMethods as T;
}
