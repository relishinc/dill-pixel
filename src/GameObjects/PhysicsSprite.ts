import {Bodies} from "matter-js";
import {Container, Sprite, Texture} from "pixi.js";
import {Application} from "../Application";
import {IPhysicsObject} from "../Physics";
import {resolveXYFromObjectOrArray} from "../Utils/Factory/utils";
import {SpritesheetLike} from "../Utils/Types";

export enum BodyType {
	RECTANGLE = 'rectangle',
	CIRCLE = 'circle',
	CONVEX = 'convex',
	TRAPEZOID = 'trapezoid',
	POLYGON = 'polygon',
	CHAMFER = 'chamfer',
}

export class PhysicsSprite extends Container implements IPhysicsObject {
	public static readonly DEFAULT_DEBUG_COLOR: number = 0x29c5f6;
	visual: Sprite;
	body: Matter.Body;
	_size: { x: number, y: number };
	_bodyType: BodyType;

	constructor(pTexture: string | Texture, pSheet?: SpritesheetLike, pSize?: {
		x: number;
		y: number
	} | [number, number?] | number, pBodyType: BodyType = BodyType.RECTANGLE) {
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


	public get debugColor(): number {
		return PhysicsSprite.DEFAULT_DEBUG_COLOR;
	}

	get app(): Application {
		return Application.instance;
	}

	onAdded() {
		this.createBody();
		this.app.physics.add(this);
	}

	onRemoved(): void {
		this.app.physics.remove(this.body);
	}

	createBody() {
		switch (this._bodyType) {
			case BodyType.RECTANGLE:
				this.body = Bodies.rectangle(this.x, this.y, this.visual.width, this.visual.height);
				break;
			case BodyType.CIRCLE:
				this.body = Bodies.circle(this.x, this.y, this.visual.width * 0.5);
				break;
			case BodyType.CONVEX:
				// this.body = Bodies.fromVertices(this.sprite.x, this.sprite.y, this.sprite.width, this.sprite.height);
				break;
			case BodyType.TRAPEZOID:
				this.body = Bodies.trapezoid(this.x, this.y, this.visual.width, this.visual.height, 0.5);
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
