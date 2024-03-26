/// <reference types="@pixi/spine-pixi" />
import { Container as PIXIContainer, Graphics, Sprite, Text } from 'pixi.js';
import { Button } from '../../display/Button';
import { Container } from '../../display/Container';
import { FlexContainer, FlexContainerConfig, FlexContainerConfigKeys } from '../../display/FlexContainer';
import { resolvePointLike } from '../../utils/functions';
import { omitKeys, pluck } from '../../utils/object';
import {
  ButtonProps,
  ContainerProps,
  ExistingProps,
  FlexContainerProps,
  GraphicsProps,
  SpineProps,
  SpriteProps,
  TextProps,
} from './props';
import {
  resolveAnchor,
  resolvePivot,
  resolvePosition,
  resolveScale,
  resolveTexture,
  resolveUnknownKeys,
} from './utils';

export const defaultFactoryMethods = {
  existing: <TEntity>(entity: TEntity, props?: Partial<ExistingProps>): TEntity => {
    if (!props) return entity;
    const { position, x, y, pivot, scale, scaleX, scaleY, ...rest } = props;
    resolvePosition({ position, x, y }, entity);
    resolveScale({ scale, scaleX, scaleY }, entity);
    resolvePivot(pivot, entity);
    resolveUnknownKeys(rest, entity);
    return entity;
  },
  texture: resolveTexture,
  container: (props?: Partial<ContainerProps>) => {
    const entity = new Container();
    if (!props) return entity;
    const { position, x, y, pivot, scale, scaleX, scaleY, ...rest } = props;
    resolvePosition({ position, x, y }, entity);
    resolveScale({ scale, scaleX, scaleY }, entity);
    resolvePivot(pivot, entity);
    resolveUnknownKeys(rest, entity);
    return entity;
  },
  sprite: (props?: Partial<SpriteProps>) => {
    const entity = new Sprite(props ? resolveTexture(props) : undefined);
    if (!props) return entity;
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
    if (!props) return entity;
    const { position, x, y, pivot, scale, scaleX, scaleY, ...rest } = props;
    resolvePosition({ position, x, y }, entity);
    resolveScale({ scale, scaleX, scaleY }, entity);
    resolvePivot(pivot, entity);
    resolveUnknownKeys(rest, entity);
    return entity;
  },
  text: (props?: Partial<TextProps>) => {
    const options = props
      ? {
          text: props.text,
          roundPixels: props.roundPixels,
          resolution: props.resolution,
          style: props.style,
          anchor: props.anchor ? resolvePointLike(props.anchor, true) : undefined,
        }
      : {};
    const entity = new Text(options);
    if (!props) return entity;
    const { position, x, y, scale, scaleX, scaleY, pivot } = props;
    resolvePosition({ position, x, y }, entity);
    resolveScale({ scale, scaleX, scaleY }, entity);
    resolvePivot(pivot, entity);
    const unknowns = omitKeys(
      ['x', 'y', 'position', 'text', 'roundPixels', 'resolution', 'style', 'anchor', 'pivot'],
      props,
    );
    resolveUnknownKeys(unknowns, entity);
    return entity;
  },
  // dill pixel specific stuff
  button: (props?: Partial<ButtonProps>) => {
    const entity = new Button(props?.config ?? {});
    if (!props) return entity;
    const { position, x, y, pivot, scale, scaleX, scaleY, ...rest } = props;
    resolvePosition({ position, x, y }, entity);
    resolveScale({ scale, scaleX, scaleY }, entity);
    resolvePivot(pivot, entity);
    resolveUnknownKeys(rest, entity);
    return entity;
  },
  flexContainer: (props?: Partial<FlexContainerProps>) => {
    const config = pluck(props ?? {}, FlexContainerConfigKeys);
    const otherProps = omitKeys<FlexContainerProps, keyof FlexContainerConfig>(FlexContainerConfigKeys, props ?? {});
    const entity = new FlexContainer(config);
    if (!otherProps) return entity;
    const { position, x, y, pivot, scale, scaleX, scaleY, ...rest } = otherProps;
    resolvePosition({ position, x, y }, entity);
    resolveScale({ scale, scaleX, scaleY }, entity);
    resolvePivot(pivot, entity);
    resolveUnknownKeys(rest, entity);
    return entity;
  },
  spine: (props?: Partial<SpineProps>): import('@pixi/spine-pixi').Spine => {
    let data = props?.data;
    if (typeof data === 'string') {
      // get the spine data from cache
      // check if '.json' is the last part of the asset string, and add it if not
      if (data.slice(-5) !== '.json') {
        data = { skeleton: data + '.json', atlas: data + '.atlas' };
      }
    }
    const entity: import('@pixi/spine-pixi').Spine = (globalThis as any).Spine.from(data);
    if (!props) return entity;
    if (props.autoUpdate !== undefined) entity.autoUpdate = props.autoUpdate;
    if (props.animationName) entity.state.setAnimation(props.trackIndex ?? 0, props.animationName, props.loop);
    const { position, x, y, anchor, pivot, scale, scaleX, scaleY, ...rest } = props;
    resolvePosition({ position, x, y }, entity);
    resolveScale({ scale, scaleX, scaleY }, entity);
    resolveAnchor(anchor, entity);
    resolvePivot(pivot, entity);
    resolveUnknownKeys(rest, entity);
    return entity;
  },
};

export interface IExtendedContainer<T extends typeof defaultFactoryMethods = typeof defaultFactoryMethods>
  extends PIXIContainer {
  add: T;
  make: T;
}

function createFactoryMethods<T extends typeof defaultFactoryMethods = typeof defaultFactoryMethods>(
  methods: Partial<T>,
  instance: any,
  addToStage: boolean,
): T {
  const factoryMethods: any = {};
  for (const key in methods) {
    factoryMethods[key] = (...args: any[]) => {
      // @ts-ignore
      const obj = methods[key](...args);
      if (addToStage) instance.addChild(obj);
      return obj;
    };
  }
  return factoryMethods as T;
}

export function Factory<T extends typeof defaultFactoryMethods = typeof defaultFactoryMethods>(
  extensions?: Partial<T>,
): new () => IExtendedContainer<T> {
  return class ExtendedContainer extends PIXIContainer implements IExtendedContainer<T> {
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
