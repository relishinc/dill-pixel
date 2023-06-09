import {Bodies} from "matter-js";
import {Container, Sprite} from "pixi.js";
import {Application} from "../Application";
import {IPhysicsObject} from "../Physics";
import {ObjectOrArrayXY, resolveXYFromObjectOrArray} from "../Utils/Factory/utils";
import {SpritesheetLike} from "../Utils/Types";

export class PhysicsSprite extends Container implements IPhysicsObject {
	sprite: Sprite;
	body: Matter.Body;

	_size: { x: number, y: number };

	constructor(pTexture: string, pSheet?: SpritesheetLike, position: ObjectOrArrayXY = 0, size?: ObjectOrArrayXY) {
		super();
		this.onAdded = this.onAdded.bind(this);
		this.sprite = this.addChild(this.app.make.sprite(pTexture, pSheet));

		const pos = resolveXYFromObjectOrArray(position);
		this.sprite.position.set(pos.x, pos.y)
		this.sprite.anchor.set(0.5, 0.5);

		if (size) {
			this._size = resolveXYFromObjectOrArray(size);
			this.sprite.width = this._size.x;
			this.sprite.height = this._size.y;
		}

		this.createBody();

		this.on('added', this.onAdded);
		this.on('removed', this.onRemoved);
	}

	get app(): Application {
		return Application.instance;
	}

	onAdded() {
		console.log('onAdded called');
		this.app.physics.add(this);
	}

	onRemoved(): void {
		this.app.physics.remove(this.body);
	}

	createBody() {
		this.body = Bodies.rectangle(this.sprite.x, this.sprite.y, this.sprite.width, this.sprite.height);
	}

	update() {
		if (this.sprite && this.body) {
			this.sprite.position.x = this.body.position.x;
			this.sprite.position.y = this.body.position.y;
			this.sprite.rotation = this.body.angle;
		}

	}
}
