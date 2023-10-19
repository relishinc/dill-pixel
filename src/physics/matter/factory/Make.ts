import { Texture } from 'pixi.js';
import { PointLike, SpritesheetLike } from '../../../utils';
import { IPhysicsObject } from '../../interfaces';
import { PhysicsBodyType } from '../../types';
import { MatterPhysicsSprite } from '../gameobjects';

export class Make {
  public static physicsSprite(
    pTexture: string | Texture,
    pSheet?: SpritesheetLike,
    pSize?: PointLike,
    pBodyType?: PhysicsBodyType,
  ): IPhysicsObject {
    return new MatterPhysicsSprite(pTexture, pSheet, pSize, pBodyType);
  }
}
