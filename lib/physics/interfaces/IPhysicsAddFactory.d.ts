import { Container, DisplayObject, Texture } from 'pixi.js';
import { PhysicsBodyType } from '../types';
import { IPhysicsObject } from './IPhysicsObject';
export interface IPhysicsAddFactory {
    set container(value: Container);
    physicsSprite(pTexture: string | Texture, pSheet?: string | string[] | undefined, pSize?: {
        x: number;
        y: number;
    } | [number, number?] | number, pType?: PhysicsBodyType, pAlpha?: number, pPosition?: {
        x: number;
        y: number;
    } | [number, number?] | number): IPhysicsObject;
    existing(pSprite: DisplayObject): IPhysicsObject;
}
//# sourceMappingURL=IPhysicsAddFactory.d.ts.map