import { Assets, Container as PIXIContainer, Graphics, Sprite, Spritesheet, Texture } from 'pixi.js';
import { Container } from '../../display';
import { Logger, PointLike, resolvePointLike, SpriteSheetLike, TextureLike } from '../../utils';

export interface AbstractProps {
  [key: string]: any;
}

export interface TextureProps {
  asset: TextureLike;
  sheet: SpriteSheetLike;
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

export interface GraphicsProps extends AbstractProps, PositionProps, PivotProps, VisibilityProps {}

export interface SpriteProps extends AbstractProps, TextureProps, PositionProps, VisibilityProps {
  anchor: PointLike;
}

export interface ContainerProps extends AbstractProps, PositionProps, PivotProps, VisibilityProps {}

export interface IFactoryMethods {
  texture: (props: Partial<TextureProps>) => Texture;
  container: (props?: Partial<ContainerProps>) => Container;
  sprite: (props?: Partial<SpriteProps>) => Sprite;
  graphics: (props?: Partial<GraphicsProps>) => Graphics;
}

// Default factory methods
export const defaultFactoryMethods: IFactoryMethods = {
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

function resolveUnknownKeys(props: any, entity: any) {
  for (const key in props) {
    try {
      (entity as any)[key] = props[key];
    } catch (e) {
      Logger.error(`Error setting property ${key}`, e);
    }
  }
}

function resolveTexture(props?: Partial<TextureProps>): Texture {
  let texture: Texture | undefined;
  const asset = props?.asset;
  const assetAsString = asset as string;
  const sheet = props?.sheet;

  if (!sheet || sheet?.length === 0) {
    if (Assets.cache.has(assetAsString)) {
      texture = Assets.get(assetAsString)!;
    } else if (Assets.get(assetAsString)) {
      texture = Assets.get(assetAsString).texture!;
    } else {
      throw new Error('Asset "' + asset + '" not loaded into Pixi cache');
    }
  } else {
    if (!Assets.get(sheet)) {
      throw new Error('Spritesheet "' + sheet + '" not loaded into Pixi cache');
    } else {
      const spriteSheet: Spritesheet = Assets.get(sheet) as Spritesheet;
      const textures = spriteSheet.textures;
      if (textures !== undefined) {
        // eslint-disable-next-line no-prototype-builtins
        if (textures.hasOwnProperty(assetAsString)) {
          texture = textures[assetAsString];
        } else if (spriteSheet.linkedSheets !== undefined && spriteSheet.linkedSheets.length > 0) {
          for (const linkedSheet of spriteSheet.linkedSheets) {
            // eslint-disable-next-line no-prototype-builtins
            if (linkedSheet.textures !== undefined && linkedSheet.textures.hasOwnProperty(assetAsString)) {
              texture = linkedSheet.textures[assetAsString];
              break;
            }
          }
          if (texture === undefined) {
            throw new Error(
              'Asset "' + asset + '" not found inside spritesheet "' + asset + "' or any of its linked sheets",
            );
          }
        } else {
          throw new Error('Asset "' + asset + '" not found inside spritesheet "' + sheet + "'");
        }
      } else {
        throw new Error('Spritesheet "' + sheet + '" loaded but textures arent?!');
      }
    }
  }
  return texture || new Sprite().texture;
}

function resolvePosition(props: Partial<PositionProps>, entity: any) {
  const pos = resolvePointLike(props.position, false, props.x, props.y);
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

export { Factory } from './mixin';


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

