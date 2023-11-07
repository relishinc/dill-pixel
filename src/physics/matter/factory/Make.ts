import { Texture } from 'pixi.js';
import { PointLike, resolvePointLike, SpritesheetLike } from '../../../utils';
import { IPhysicsObject, PhysicsSpriteSettings } from '../../interfaces';
import { PhysicsBodyType } from '../../types';
import { MatterPhysicsSprite } from '../gameobjects';

export class Make {
  static physicsSprite(settings: PhysicsSpriteSettings): IPhysicsObject;
  static physicsSprite(
    asset?: string | Texture,
    sheet?: SpritesheetLike,
    size?: PointLike,
    bodyType?: PhysicsBodyType,
    alpha?: number,
    position?: PointLike,
    anchor?: PointLike,
    scale?: PointLike,
  ): IPhysicsObject;
  static physicsSprite(
    settingsOrAsset?: string | Texture | PhysicsSpriteSettings,
    sheet?: SpritesheetLike,
    size?: PointLike,
    bodyType?: PhysicsBodyType,
    alpha: number = 1,
    position: PointLike = 0,
    scale: PointLike = 1,
  ): IPhysicsObject {
    let visible = true;
    let asset = settingsOrAsset as string | Texture | undefined;
    if (typeof settingsOrAsset === 'object' && !(settingsOrAsset instanceof Texture)) {
      const settings = settingsOrAsset as PhysicsSpriteSettings;
      asset = settings.asset;
      sheet = settings.sheet;
      size = settings.size;
      bodyType = settings.bodyType;
      alpha = settings.alpha ?? 1;
      position = settings.position ?? 0;
      scale = settings.scale ?? 1;
      visible = settings.visible !== false;
    }
    if (!asset) {
      asset = Texture.WHITE;
    }
    const sprite = new MatterPhysicsSprite(asset, sheet, size, bodyType);
    sprite.alpha = alpha;
    if (position) {
      const resolvedPosition = resolvePointLike(position);
      sprite.position.set(resolvedPosition.x, resolvedPosition.y);
    }
    if (scale) {
      const resolvedScale = resolvePointLike(scale);
      sprite.scale.set(resolvedScale.x, resolvedScale.y);
    }
    sprite.visible = visible;
    return sprite;
  }
}
