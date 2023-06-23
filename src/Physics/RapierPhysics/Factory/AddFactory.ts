import {Container, Texture} from "pixi.js";
import {BodyType} from "../../../GameObjects";
import {resolveXYFromObjectOrArray} from "../../../Utils";
import {IPhysicsAddFactory, IPhysicsObject} from "../../index";
import MakeFactory from "./MakeFactory";

export default class AddFactory implements IPhysicsAddFactory {
	protected _make: MakeFactory;

	constructor(private defaultContainer: Container) {
		this._make = new MakeFactory();
	}

	set container(value: Container) {
		this.defaultContainer = value;
	}

	get make(): MakeFactory {
		return this._make;
	}

	// add physics sprite
	physicsSprite(pTexture: string | Texture,
	              pSheet?: string | string[] | undefined,
	              pSize?: { x: number; y: number } | [number, number?] | number,
	              pType: BodyType = BodyType.RECTANGLE,
	              pAlpha: number = 1,
	              pPosition: { x: number; y: number } | [number, number?] | number = {x: 0, y: 0},
	): IPhysicsObject {
		const sprite = this._make.physicsSprite(pTexture, pSheet, pSize, pType);
		sprite.alpha = pAlpha;
		const resolvedPosition = resolveXYFromObjectOrArray(pPosition);
		sprite.x = resolvedPosition.x;
		sprite.y = resolvedPosition.y;
		return this.defaultContainer.addChild(sprite);
	}

	existing(pObject: any) {
		return this.defaultContainer.addChild(pObject);
	}
}
