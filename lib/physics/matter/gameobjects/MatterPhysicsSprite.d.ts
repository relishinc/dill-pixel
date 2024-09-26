import { Container, Sprite, Texture } from 'pixi.js';
import { Application } from '../../../core';
import { SpritesheetLike } from '../../../utils';
import { IPhysicsObject } from '../../interfaces';
import { PhysicsBodyType } from '../../types';
import { MatterPhysics } from '../MatterPhysics';
export declare class MatterPhysicsSprite extends Container implements IPhysicsObject {
    static readonly DEFAULT_DEBUG_COLOR: number;
    visual: Sprite;
    body: Matter.Body;
    _size: {
        x: number;
        y: number;
    };
    _bodyType: PhysicsBodyType;
    constructor(pTexture: string | Texture, pSheet?: SpritesheetLike, pSize?: {
        x: number;
        y: number;
    } | [number, number?] | number, pBodyType?: PhysicsBodyType);
    get physics(): MatterPhysics;
    get debugColor(): number;
    get app(): Application;
    onAdded(): void;
    onRemoved(): void;
    createBody(): void;
    update(): void;
}
//# sourceMappingURL=MatterPhysicsSprite.d.ts.map