import { Container, Texture } from 'pixi.js';
import { PointLike, SpritesheetLike } from '../../../utils';
import { IPhysicsAddFactory, IPhysicsObject, PhysicsSpriteSettings } from '../../interfaces';
import { PhysicsBodyType } from '../../types';
import { Make } from './Make';
export declare class Add implements IPhysicsAddFactory {
    private defaultContainer;
    constructor(defaultContainer: Container);
    set container(value: Container);
    get make(): typeof Make;
    physicsSprite(settings: PhysicsSpriteSettings): IPhysicsObject;
    physicsSprite(asset?: string | Texture, sheet?: SpritesheetLike, size?: PointLike, bodyType?: PhysicsBodyType, alpha?: number, position?: PointLike, anchor?: PointLike, scale?: PointLike): IPhysicsObject;
    existing(pObject: any): any;
}
//# sourceMappingURL=Add.d.ts.map