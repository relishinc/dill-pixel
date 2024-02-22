import { Container as PIXIContainer, Sprite, Texture } from 'pixi.js';
import { Logger } from '../utils';
import { resolvePointLike } from '../utils/functions';
import { PointLike } from '../utils/types';

export interface AbstractProps {
  [key: string]: any;
}

export interface PositionProps {
  x: number;
  y: number;
  position: PointLike;
}

export interface PivotProps {
  pivot: PointLike;
}

export interface VisibilityProps {
  alpha: number;
  visible: boolean;
}

export interface SpriteProps extends AbstractProps, PositionProps, VisibilityProps {
  anchor: PointLike;
}

export interface ContainerProps extends AbstractProps, PositionProps, PivotProps, VisibilityProps {}

export interface IFactoryMethods {
  container: (props: Partial<ContainerProps>) => PIXIContainer;
  sprite: (props: Partial<SpriteProps>) => Sprite;
}

// Use a generic for extending the factory methods
interface IExtendedContainer<T extends IFactoryMethods = IFactoryMethods> extends PIXIContainer {
  add: T;
  make: T;
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

function resolveUnknownKeys(props: any, entity: any) {
  for (const key in props) {
    try {
      (entity as any)[key] = props[key];
    } catch (e) {
      Logger.error(`Error setting property ${key}`, e);
    }
  }
}

function resolvePosition(props: Partial<PositionProps>, entity: any) {
  const pos = resolvePointLike(props.position, props.x, props.y);
  entity.x = pos.x;
  entity.y = pos.y;
}

function resolveAnchor(anchor: PointLike | undefined, entity: any) {
  if (anchor !== undefined) {
    const anchorPoint = resolvePointLike(anchor);
    entity.anchor.set(anchorPoint.x, anchorPoint.y);
  }
}

function resolvePivot(pivot: PointLike | undefined, entity: any) {
  if (pivot !== undefined) {
    const pivotPoint = resolvePointLike(pivot);
    entity.pivot.set(pivotPoint.x, pivotPoint.y);
  }
}

export const defaultFactoryMethods: IFactoryMethods = {
  container: (props: Partial<ContainerProps>) => {
    const entity = new Container();
    const { position, x, y, pivot, ...rest } = props;
    resolvePosition({ position, x, y }, entity);
    resolvePivot(pivot, entity);
    resolveUnknownKeys(rest, entity);
    return entity;
  },
  sprite: (props: Partial<SpriteProps>) => {
    const entity = new Sprite(Texture.from(props.asset));
    const { position, x, y, anchor, pivot, ...rest } = props;
    resolvePosition({ position, x, y }, entity);
    resolveAnchor(anchor, entity);
    resolvePivot(pivot, entity);
    resolveUnknownKeys(rest, entity);
    return entity;
  },
};

export function extendContainer<T extends IFactoryMethods = IFactoryMethods>(
  extensions: Partial<T>,
): new () => IExtendedContainer<T> {
  return class ExtendedContainer extends PIXIContainer implements IExtendedContainer<T> {
    add: T;
    make: T;

    constructor() {
      super();
      this.add = createFactoryMethods(extensions, this, true);
      this.make = createFactoryMethods(extensions, this, false);
    }
  };
}

const Container = extendContainer(defaultFactoryMethods);

/*
// Example of extending the factory methods
export interface IPhysicsFactoryMethods {
  physicsSprite: () => Sprite;
}
const PhysicsContainer = extendContainer<IFactoryMethods & IPhysicsFactoryMethods>({
  ...defaultFactoryMethods,
  physicsSprite: () => {
    return new Sprite();
  },
});
 */

export { Container };

class Test extends Container {
  constructor() {
    super();
    this.add.container({ x: 0, y: 0, alpha: 1, visible: true });
  }
}
