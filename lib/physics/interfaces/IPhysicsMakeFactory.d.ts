import { Texture } from 'pixi.js';
import { PointLike, SpritesheetLike } from '../../utils';
import { PositionSettings, ScaleSettings, SpriteSettings } from '../../utils/factory/Make';
import { IPhysicsBodySettings, IPhysicsObject } from '../interfaces';
import { PhysicsBodyType } from '../types';
export interface PhysicsSpriteSettings extends SpriteSettings, PositionSettings, ScaleSettings, IPhysicsBodySettings {
}
export interface IPhysicsMakeFactory {
    physicsSprite(settings: PhysicsSpriteSettings): IPhysicsObject;
    physicsSprite(asset: string | Texture, sheet?: SpritesheetLike, size?: PointLike, bodyType?: PhysicsBodyType, alpha?: number, position?: PointLike, scale?: PointLike): IPhysicsObject;
}
//# sourceMappingURL=IPhysicsMakeFactory.d.ts.map