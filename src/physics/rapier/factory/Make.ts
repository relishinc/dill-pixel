import { Texture } from 'pixi.js';
import { PointLike, SpritesheetLike } from '../../../utils';
import { IPhysicsObject } from '../../interfaces';
import { PhysicsBodyType } from '../../types';
import { RapierPhysicsSprite } from '../gameobjects';

export class Make {
  public static physicsSprite(
    pTexture: string | Texture,
    pSheet?: SpritesheetLike,
    pSize?: PointLike,
    pBodyType?: PhysicsBodyType,
  ): IPhysicsObject {
    return new RapierPhysicsSprite(pTexture, pSheet, pSize, pBodyType);
  }
}
