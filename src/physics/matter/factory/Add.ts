import { Container, Texture } from 'pixi.js';
import { PointLike, SpritesheetLike } from '../../../utils';
import { IPhysicsAddFactory, IPhysicsObject } from '../../interfaces';
import { PhysicsBodyType } from '../../types';
import { Make, PhysicsSpriteSettings } from './Make';

export class Add implements IPhysicsAddFactory {
  constructor(private defaultContainer: Container) {}

  set container(value: Container) {
    this.defaultContainer = value;
  }

  get make(): typeof Make {
    return Make;
  }

  // add physics sprite
  physicsSprite(settings: PhysicsSpriteSettings): IPhysicsObject;
  physicsSprite(
    asset?: string | Texture,
    sheet?: SpritesheetLike,
    size?: PointLike,
    bodyType?: PhysicsBodyType,
    alpha?: number,
    position?: PointLike,
    anchor?: PointLike,
    scale?: PointLike,
  ): IPhysicsObject;
  physicsSprite(
    settingsOrAsset?: string | Texture | PhysicsSpriteSettings,
    sheet?: SpritesheetLike,
    size?: PointLike,
    bodyType?: PhysicsBodyType,
    alpha: number = 1,
    position: PointLike = 0,
    scale: PointLike = 1,
  ): IPhysicsObject {
    const mfs: IPhysicsObject =
      typeof settingsOrAsset === 'string' || settingsOrAsset instanceof Texture
        ? this.make.physicsSprite(settingsOrAsset, sheet, size, bodyType, alpha, position, scale)
        : this.make.physicsSprite(settingsOrAsset as PhysicsSpriteSettings);

    return this.defaultContainer.addChild(mfs);
  }

  existing(pObject: any) {
    return this.defaultContainer.addChild(pObject);
  }
}
