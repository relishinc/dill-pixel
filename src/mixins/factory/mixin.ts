import { Container as PIXIContainer, Graphics, Sprite, Texture } from 'pixi.js';
import { Container } from '../../display';
import { AbstractProps, ContainerProps, GraphicsProps, SpriteProps, TextureProps } from './props';
import { resolveAnchor, resolvePivot, resolvePosition, resolveTexture, resolveUnknownKeys } from './utils';

// Default factory methods
export const defaultFactoryMethods: IFactoryMethods = {
  existing: <T>(entity: T, props?: AbstractProps) => {
    resolveUnknownKeys(props, entity);
    return entity;
  },
  texture: (props: Partial<TextureProps>) => {
    return resolveTexture(props);
  },
  container: (props?: Partial<ContainerProps>) => {
    const entity = new Container();
    if (!props) {
      return entity;
    }
    const { position, x, y, pivot, ...rest } = props;
    resolvePosition({ position, x, y }, entity);
    resolvePivot(pivot, entity);
    resolveUnknownKeys(rest, entity);
    return entity;
  },
  sprite: (props?: Partial<SpriteProps>) => {
    if (!props) {
      return new Sprite();
    }
    const entity = new Sprite(resolveTexture(props));
    const { position, x, y, anchor, pivot, ...rest } = props;
    resolvePosition({ position, x, y }, entity);
    resolveAnchor(anchor, entity);
    resolvePivot(pivot, entity);
    resolveUnknownKeys(rest, entity);
    return entity;
  },
  graphics: (props?: Partial<GraphicsProps>) => {
    const entity = new Graphics();
    if (!props) {
      return entity;
    }
    const { position, x, y, pivot, ...rest } = props;
    resolvePosition({ position, x, y }, entity);
    resolvePivot(pivot, entity);
    resolveUnknownKeys(rest, entity);
    return entity;
  },
};

// Use a generic for extending the factory methods
export interface IExtendedContainer<T extends IFactoryMethods = IFactoryMethods> extends PIXIContainer {
  add: T;
  make: T;
}

export interface IFactoryMethods {
  existing: <T>(entity: T, props?: AbstractProps) => T;
  texture: (props: Partial<TextureProps>) => Texture;
  container: (props?: Partial<ContainerProps>) => Container;
  sprite: (props?: Partial<SpriteProps>) => Sprite;
  graphics: (props?: Partial<GraphicsProps>) => Graphics;
}

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
