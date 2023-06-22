import {Texture} from "pixi.js";
import {BodyType, MatterPhysicsSprite} from "../../../GameObjects";
import {SpritesheetLike} from "../../../Utils/Types";
import {IPhysicsObject} from "../../index";

export default class MakeFactory {
	public physicsSprite(pTexture: string | Texture, pSheet?: SpritesheetLike, pSize?: {
		x: number,
		y: number
	} | [number, number?] | number, pBodyType?: BodyType): IPhysicsObject {
		return new MatterPhysicsSprite(pTexture, pSheet, pSize, pBodyType);
	}
}
