import { Assets, Graphics, Sprite, Spritesheet, Texture } from 'pixi.js';
import { Logger, PointLike, resolvePointLike } from '../../utils';

import { Application } from '../../core/Application';
import { PositionProps, ScaleProps, TextureProps } from './props';

let errorTexture: Texture | undefined;

export function resolveUnknownKeys(props: any, entity: any) {
  for (const key in props) {
    try {
      (entity as any)[key] = props[key];
    } catch (e) {
      Logger.warn(`Error setting property ${key}`, e);
    }
  }
}

export function getErrorTexture() {
  if (!errorTexture) {
    const gfx = new Graphics();
    gfx.rect(0, 0, 100, 100);
    gfx.fill({ color: 0xff0000 });
    gfx.stroke({ color: 0xffffff, width: 1, alignment: 0 });
    // draw an X across the rectangle
    gfx.moveTo(0, 0);
    gfx.lineTo(100, 100);
    gfx.moveTo(100, 0);
    gfx.lineTo(0, 100);
    gfx.stroke({ color: 0xffffff, width: 2, alignment: 0.5 });
    errorTexture = Application.getInstance().renderer.generateTexture(gfx);
    gfx.destroy();
  }
  return errorTexture;
}

export function resolveTexture(props?: Partial<TextureProps>): Texture {
  let texture: Texture | undefined;
  const asset = props?.asset;
  const assetAsString = asset as string;
  const sheet = props?.sheet;
  if (asset instanceof Texture) {
    texture = asset;
  } else if (!sheet || sheet?.length === 0) {
    if (Assets.cache.has(assetAsString)) {
      texture = Assets.get(assetAsString)!;
    } else if (Assets.get(assetAsString)) {
      texture = Assets.get(assetAsString).texture!;
    } else {
      Logger.error('Asset "' + asset + '" not loaded into Pixi cache');
      texture = getErrorTexture();
      //throw new Error('Asset "' + asset + '" not loaded into Pixi cache');
    }
  } else {
    if (!Assets.get(sheet)) {
      // throw new Error('Spritesheet "' + sheet + '" not loaded into Pixi cache');
      Logger.error('Spritesheet "' + sheet + '" not loaded into Pixi cache');
      return getErrorTexture();
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
            Logger.error(
              'Asset "' + asset + '" not found inside spritesheet "' + asset + "' or any of its linked sheets",
            );
            texture = getErrorTexture();
          }
        } else {
          Logger.error('Asset "' + asset + '" not found inside spritesheet "' + sheet + "'");
          texture = getErrorTexture();
        }
      } else {
        Logger.error('Spritesheet "' + sheet + '" loaded but textures arent?!');
        texture = getErrorTexture();
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

export function resolveScale(props: Partial<ScaleProps>, entity: any) {
  if (!props) {
    return;
  }
  if (props.scale === undefined) {
    if (props.scaleX === undefined && props.scaleY === undefined) {
      return;
    }
    if (props.scaleX === undefined) {
      props.scaleX = 1;
    }
    if (props.scaleY === undefined) {
      props.scaleY = 1;
    }
  }
  const scale = resolvePointLike(props.scale, false, props.scaleX, props.scaleY);
  entity.scale.set(scale.x, scale.y);
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
