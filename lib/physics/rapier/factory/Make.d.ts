import { Texture } from 'pixi.js';
import { SpritesheetLike } from '../../../utils';
import { IPhysicsObject } from '../../interfaces';
import { PhysicsBodyType } from '../../types';
export declare class Make {
    static physicsSprite(pTexture: string | Texture, pSheet?: SpritesheetLike, pSize?: {
        x: number;
        y: number;
    } | [number, number?] | number, pBodyType?: PhysicsBodyType): IPhysicsObject;
}
//# sourceMappingURL=Make.d.ts.map