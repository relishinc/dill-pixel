import {Container, Sprite, Texture} from "pixi.js";
import {Application} from "../../../Application";
import {resolveXYFromObjectOrArray} from "../../../Utils";
import {SpritesheetLike} from "../../../Utils/Types";
import {IPhysicsObject, PhysicsBodyType} from "../../index";
import MatterPhysicsBase from "../MatterPhysics";

export class MatterPhysicsSprite extends Container implements IPhysicsObject {
	public static readonly DEFAULT_DEBUG_COLOR: number = 0x29c5f6;
	visual: Sprite;
	body: Matter.Body;
	_size: { x: number, y: number };
	_bodyType: PhysicsBodyType;

	constructor(pTexture: string | Texture, pSheet?: SpritesheetLike, pSize?: {
		x: number;
		y: number
	} | [number, number?] | number, pBodyType: PhysicsBodyType = PhysicsBodyType.RECTANGLE) {
		super();
		this.onAdded = this.onAdded.bind(this);
		this.visual = typeof pTexture === 'string' ? this.addChild(this.app.make.sprite(pTexture, pSheet)) : this.addChild(new Sprite(pTexture));
		this.visual.anchor.set(0.5, 0.5);

		if (pSize) {
			this._size = resolveXYFromObjectOrArray(pSize);
			this.visual.width = this._size.x;
			this.visual.height = this._size.y;
		}

		this._bodyType = pBodyType;

		this.on('added', this.onAdded);
		this.on('removed', this.onRemoved);
	}

	get physics(): MatterPhysicsBase {
		return this.app.physics as MatterPhysicsBase;
	}


	public get debugColor(): number {
		return MatterPhysicsSprite.DEFAULT_DEBUG_COLOR;
	}

	get app(): Application {
		return Application.instance;
	}

	onAdded() {
		this.createBody();
		this.physics.addToWorld(this);
	}

	onRemoved(): void {
		this.physics.removeFromWorld(this.body);
	}

	createBody() {
		switch (this._bodyType) {
			case PhysicsBodyType.RECTANGLE:
				this.body = Matter.Bodies.rectangle(this.x, this.y, this.visual.width, this.visual.height);
				break;
			case PhysicsBodyType.CIRCLE:
				this.body = Matter.Bodies.circle(this.x, this.y, this.visual.width * 0.5);
				break;
			case PhysicsBodyType.CONVEX:
				// this.body = Bodies.fromVertices(this.sprite.x, this.sprite.y, this.sprite.width, this.sprite.height);
				break;
			case PhysicsBodyType.TRAPEZOID:
				this.body = Matter.Bodies.trapezoid(this.x, this.y, this.visual.width, this.visual.height, 0.5);
				break
		}
	}

	update() {
		if (this.visual && this.body) {
			this.x = this.body.position.x;
			this.y = this.body.position.y;
			this.rotation = this.body.angle;
		}
	}
}
