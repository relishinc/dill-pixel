import { Texture } from "pixi.js";
import { BodyType } from "../../../GameObjects";
import { SpritesheetLike } from "../../../Utils/Types";
import { IPhysicsObject } from "../../index";
export default class MakeFactory {
    physicsSprite(pTexture: string | Texture, pSheet?: SpritesheetLike, pSize?: {
        x: number;
        y: number;
    } | [number, number?] | number, pBodyType?: BodyType): IPhysicsObject;
}
//# sourceMappingURL=MakeFactory.d.ts.map