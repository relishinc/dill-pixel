import { Container, Texture } from 'pixi.js';
import { PointLike } from '../../../utils';
import { IPhysicsAddFactory, IPhysicsObject } from '../../interfaces';
import { PhysicsBodyType } from '../../types';
import { Make } from './Make';
export declare class Add implements IPhysicsAddFactory {
    private defaultContainer;
    constructor(defaultContainer: Container);
    set container(value: Container);
    get make(): typeof Make;
    physicsSprite(pTexture: string | Texture, pSheet?: string | undefined, pSize?: PointLike, pType?: PhysicsBodyType, pAlpha?: number, pPosition?: PointLike): IPhysicsObject;
    existing(pObject: any): any;
}
//# sourceMappingURL=Add.d.ts.map