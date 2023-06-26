import {Texture} from "pixi.js";
import {SpritesheetLike} from "../../../Utils/Types";
import {IPhysicsObject, PhysicsBodyType} from "../../index";
import {RapierPhysicsSprite} from "../GameObjects/RapierPhysicsSprite";

export default class MakeFactory {
	public physicsSprite(pTexture: string | Texture, pSheet?: SpritesheetLike, pSize?: {
		x: number,
		y: number
	} | [number, number?] | number, pBodyType?: PhysicsBodyType): IPhysicsObject {
		return new RapierPhysicsSprite(pTexture, pSheet, pSize, pBodyType);
	}
}
