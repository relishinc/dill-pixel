import {Container, Texture} from "pixi.js";
import {resolveXYFromObjectOrArray} from "../../../Utils";
import {IPhysicsAddFactory, IPhysicsObject, PhysicsBodyType} from "../../index";
import {Make} from "./Make";

export class Add implements IPhysicsAddFactory {

	constructor(private defaultContainer: Container) {
	}

	set container(value: Container) {
		this.defaultContainer = value;
	}

	get make(): typeof Make {
		return Make;
	}

	// add physics sprite
	physicsSprite(pTexture: string | Texture,
	              pSheet?: string | undefined,
	              pSize?: { x: number; y: number } | [number, number?] | number,
	              pType: PhysicsBodyType = PhysicsBodyType.RECTANGLE,
	              pAlpha: number = 1,
	              pPosition: { x: number; y: number } | [number, number?] | number = {x: 0, y: 0},
	): IPhysicsObject {
		const sprite = this.make.physicsSprite(pTexture, pSheet, pSize, pType);
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
