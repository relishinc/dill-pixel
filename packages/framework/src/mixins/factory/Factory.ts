import { Container as PIXIContainer } from 'pixi.js';
import { defaultFactoryMethods } from './index';
import { createFactoryMethods } from './methods';

export interface IFactory<T extends typeof defaultFactoryMethods = typeof defaultFactoryMethods> extends PIXIContainer {
  add: T;
  make: T;
}

export function Factory<T extends typeof defaultFactoryMethods = typeof defaultFactoryMethods>(
  extensions?: Partial<T>,
): new () => IFactory<T> {
  return class ExtendedContainer extends PIXIContainer implements IFactory<T> {
    add: T;
    make: T;

    constructor() {
      super();
      extensions = Object.assign(defaultFactoryMethods, extensions);
      this.make = createFactoryMethods(extensions, this, false);
      this.add = createFactoryMethods(extensions, this, true);
    }
  };
}
