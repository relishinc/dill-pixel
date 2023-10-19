import { Texture } from 'pixi.js';
import { SpritesheetLike } from '../Types';

export declare function resolvePointLike(
  position:
    | {
        x: number;
        y: number;
      }
    | [number, number?]
    | number,
): {
  x: number;
  y: number;
};

export declare function getSheetLikeString(pSheet: SpritesheetLike): SpritesheetLike;

export declare function setObjectName(object: any, pTexture: string | Texture, pSheet: SpritesheetLike): void;

//# sourceMappingURL=utils.d.ts.map
