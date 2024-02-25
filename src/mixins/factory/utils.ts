import { Assets, Sprite, Spritesheet, Texture } from 'pixi.js';
import { Logger, PointLike, resolvePointLike } from '../../utils';
import { PositionProps, TextureProps } from './props';

export function resolveUnknownKeys(props: any, entity: any) {
  for (const key in props) {
    try {
      (entity as any)[key] = props[key];
    } catch (e) {
      Logger.error(`Error setting property ${key}`, e);
    }
  }
}

export function resolveTexture(props?: Partial<TextureProps>): Texture {
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

export function resolvePosition(props: Partial<PositionProps>, entity: any) {
  const pos = resolvePointLike(props.position, false, props.x, props.y);
  entity.x = pos.x;
  entity.y = pos.y;
}

export function resolveAnchor(anchor: PointLike | undefined, entity: any) {
  if (anchor !== undefined) {
    const anchorPoint = resolvePointLike(anchor);
    entity.anchor.set(anchorPoint.x, anchorPoint.y);
  }
}

export function resolvePivot(pivot: PointLike | undefined, entity: any) {
  if (pivot !== undefined) {
    const pivotPoint = resolvePointLike(pivot);
    entity.pivot.set(pivotPoint.x, pivotPoint.y);
  }
}
