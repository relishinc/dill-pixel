import { Texture } from 'pixi.js';
import { PointLike, SpritesheetLike } from '../../../utils';
import { IPhysicsObject, PhysicsSpriteSettings } from '../../interfaces';
import { PhysicsBodyType } from '../../types';
export declare class Make {
    static physicsSprite(settings: PhysicsSpriteSettings): IPhysicsObject;
    static physicsSprite(asset?: string | Texture, sheet?: SpritesheetLike, size?: PointLike, bodyType?: PhysicsBodyType, alpha?: number, position?: PointLike, anchor?: PointLike, scale?: PointLike): IPhysicsObject;
}
//# sourceMappingURL=Make.d.ts.map