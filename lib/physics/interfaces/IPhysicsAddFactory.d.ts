import { Container, DisplayObject, Texture } from 'pixi.js';
import { PointLike, SpritesheetLike } from '../../utils';
import { PhysicsBodyType } from '../types';
import { PhysicsSpriteSettings } from './IPhysicsMakeFactory';
import { IPhysicsObject } from './IPhysicsObject';
export interface IPhysicsAddFactory {
    set container(value: Container);
    physicsSprite(settings: PhysicsSpriteSettings): IPhysicsObject;
    physicsSprite(asset: string | Texture, sheet?: SpritesheetLike, size?: PointLike, bodyType?: PhysicsBodyType, alpha?: number, position?: PointLike, scale?: PointLike, [key]?: any): IPhysicsObject;
    existing(pSprite: DisplayObject): IPhysicsObject;
}
//# sourceMappingURL=IPhysicsAddFactory.d.ts.map