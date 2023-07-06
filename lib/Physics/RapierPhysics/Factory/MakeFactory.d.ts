import { Texture } from "pixi.js";
import { SpritesheetLike } from "../../../Utils/Types";
import { IPhysicsObject, PhysicsBodyType } from "../../index";
export default class MakeFactory {
    physicsSprite(pTexture: string | Texture, pSheet?: SpritesheetLike, pSize?: {
        x: number;
        y: number;
    } | [number, number?] | number, pBodyType?: PhysicsBodyType): IPhysicsObject;
}
//# sourceMappingURL=MakeFactory.d.ts.map