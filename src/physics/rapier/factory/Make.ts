import { Texture } from 'pixi.js';
import { SpritesheetLike } from '../../../utils/Types';
import { IPhysicsObject, PhysicsBodyType } from '../../index';
import { RapierPhysicsSprite } from '../gameobjects';

export class Make {
  public static physicsSprite(
    pTexture: string | Texture,
    pSheet?: SpritesheetLike,
    pSize?:
      | {
          x: number;
          y: number;
        }
      | [number, number?]
      | number,
    pBodyType?: PhysicsBodyType,
  ): IPhysicsObject {
    return new RapierPhysicsSprite(pTexture, pSheet, pSize, pBodyType);
  }
}
