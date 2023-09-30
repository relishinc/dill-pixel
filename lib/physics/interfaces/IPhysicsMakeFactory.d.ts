import { Texture } from 'pixi.js';
import { SpritesheetLike } from '../../utils/Types';
import { IPhysicsObject } from '../interfaces';
import { PhysicsBodyType } from '../types';
export interface IPhysicsMakeFactory {
    physicsSprite(pTexture: string | Texture, pSheet?: SpritesheetLike, pSize?: {
        x: number;
        y: number;
    } | [number, number?] | number, pBodyType?: PhysicsBodyType): IPhysicsObject;
}
//# sourceMappingURL=IPhysicsMakeFactory.d.ts.map