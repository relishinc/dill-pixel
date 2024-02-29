import { Container as PIXIContainer, Graphics, Sprite, Text, TextOptions, Texture } from 'pixi.js';
import { Container } from '../../display';
import { omitKeys, resolvePointLike } from '../../utils';
import { ContainerProps, ExistingProps, GraphicsProps, SpriteProps, TextProps, TextureProps } from './props';
import {
  resolveAnchor,
  resolvePivot,
  resolvePosition,
  resolveScale,
  resolveTexture,
  resolveUnknownKeys,
} from './utils';

// Default factory methods
export const defaultFactoryMethods: IFactoryMethods = {
  existing: <TEntity>(entity: TEntity, props?: Partial<ExistingProps>): TEntity => {
    if (!props) {
      return entity;
    }

    const { position, x, y, pivot, scale, scaleX, scaleY, ...rest } = props;
    resolvePosition({ position, x, y }, entity);
    resolveScale({ scale, scaleX, scaleY }, entity);
    resolvePivot(pivot, entity);
    resolveUnknownKeys(rest, entity);
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
    const { position, x, y, pivot, scale, scaleX, scaleY, ...rest } = props;
    resolvePosition({ position, x, y }, entity);
    resolveScale({ scale, scaleX, scaleY }, entity);
    resolvePivot(pivot, entity);
    resolveUnknownKeys(rest, entity);
    return entity;
  },
  sprite: (props?: Partial<SpriteProps>) => {
    if (!props) {
      return new Sprite();
    }
    const entity = new Sprite(resolveTexture(props));
    const { position, x, y, anchor, pivot, scale, scaleX, scaleY, ...rest } = props;
    resolvePosition({ position, x, y }, entity);
    resolveScale({ scale, scaleX, scaleY }, entity);
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
    const { position, x, y, pivot, scale, scaleX, scaleY, ...rest } = props;
    resolvePosition({ position, x, y }, entity);
    resolveScale({ scale, scaleX, scaleY }, entity);
    resolvePivot(pivot, entity);
    resolveUnknownKeys(rest, entity);
    return entity;
  },
  text: (props?: Partial<TextProps>) => {
    const options = {} as Partial<TextOptions>;
    if (props?.text) {
      options.text = props.text;
    }

    if (props?.roundPixels) {
      options.roundPixels = props.roundPixels;
    }

    if (props?.resolution) {
      options.resolution = props.resolution;
    }

    if (props?.style) {
      options.style = props.style;
    }
    if (props?.anchor) {
      options.anchor = resolvePointLike(props.anchor, true);
    }
    const entity = new Text(options);
    if (!props) {
      return entity;
    }

    const { position, x, y, scale, scaleX, scaleY, pivot } = props;

    resolvePosition({ position, x, y }, entity);
    resolveScale({ scale, scaleX, scaleY }, entity);
    resolvePivot(pivot, entity);

    const unknowns = omitKeys<
      TextProps,
      'x' | 'y' | 'position' | 'text' | 'roundPixels' | 'resolution' | 'style' | 'anchor' | 'pivot'
    >(['x', 'y', 'position', 'text', 'roundPixels', 'resolution', 'style', 'anchor', 'pivot'], props);

    resolveUnknownKeys(unknowns, entity);
    return entity;
  },
};

// Use a generic for extending the factory methods
export interface IExtendedContainer<T extends IFactoryMethods = IFactoryMethods> extends PIXIContainer {
  add: T;
  make: T;
}

export interface IFactoryMethods {
  existing: <TEntity>(entity: TEntity, props?: Partial<ExistingProps>) => TEntity;
  texture: (props: Partial<TextureProps>) => Texture;
  container: (props?: Partial<ContainerProps>) => Container;
  sprite: (props?: Partial<SpriteProps>) => Sprite;
  graphics: (props?: Partial<GraphicsProps>) => Graphics;
  text: (props?: Partial<TextProps>) => Text;
}

function createFactoryMethods<T extends IFactoryMethods = IFactoryMethods>(
  methods: Partial<T>,
  instance: any,
  addToStage: boolean,
): T {
  const factoryMethods: any = {};
  for (const key in methods) {
    factoryMethods[key] = (...args: any[]) => {
      // @ts-ignore
      const obj = methods[key](...args);
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
