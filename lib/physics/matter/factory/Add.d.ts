import { Container, Texture } from 'pixi.js';
import { IPhysicsAddFactory, IPhysicsObject } from '../../interfaces';
import { PhysicsBodyType } from '../../types';
import { Make } from './Make';
export declare class Add implements IPhysicsAddFactory {
    private defaultContainer;
    constructor(defaultContainer: Container);
    set container(value: Container);
    get make(): typeof Make;
    physicsSprite(pTexture: string | Texture, pSheet?: string | undefined, pSize?: {
        x: number;
        y: number;
    } | [number, number?] | number, pType?: PhysicsBodyType, pAlpha?: number, pPosition?: {
        x: number;
        y: number;
    } | [number, number?] | number): IPhysicsObject;
    existing(pObject: any): any;
}
//# sourceMappingURL=Add.d.ts.map