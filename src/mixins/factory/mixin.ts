import { Container as PIXIContainer } from 'pixi.js';
import { IExtendedContainer, IFactoryMethods } from './index';

function createFactoryMethods<T extends IFactoryMethods = IFactoryMethods>(
  methods: Partial<T>,
  instance: any,
  addToStage: boolean,
): T {
  const factoryMethods: any = {};
  for (const key in methods) {
    factoryMethods[key] = (config: any) => {
      // @ts-ignore
      const obj = methods[key](config);
      if (addToStage) {
        instance.addChild(obj);
      }
      return obj;
    };
  }
  return factoryMethods as T;
}

export function Factory<T extends IFactoryMethods = IFactoryMethods>(
  extensions: Partial<T>,
): new () => IExtendedContainer<T> {
  return class ExtendedContainer extends PIXIContainer implements IExtendedContainer<T> {
    add: T;
    make: T;

    constructor() {
      super();
      this.make = createFactoryMethods(extensions, this, false);
      this.add = createFactoryMethods(extensions, this, true);
    }
  };
}
