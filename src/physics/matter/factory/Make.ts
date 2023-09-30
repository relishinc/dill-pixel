import { Texture } from 'pixi.js';
import { SpritesheetLike } from '../../../utils/Types';
import { IPhysicsObject } from '../../interfaces';
import { PhysicsBodyType } from '../../types';
import { MatterPhysicsSprite } from '../gameobjects/MatterPhysicsSprite';

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
    return new MatterPhysicsSprite(pTexture, pSheet, pSize, pBodyType);
  }
}
