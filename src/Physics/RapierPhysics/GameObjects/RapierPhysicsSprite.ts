import RAPIER from "@dimforge/rapier2d";
import {Container, Sprite, Texture} from "pixi.js";
import {Application} from "../../../Application";
import {resolveXYFromObjectOrArray} from "../../../Utils";
import {SpritesheetLike} from "../../../Utils/Types";
import {IPhysicsObject} from "../../index";
import RapierPhysics from "../RapierPhysics";

export enum BodyType {
	RECTANGLE = 'rectangle',
	CIRCLE = 'circle',
	CONVEX = 'convex',
	TRAPEZOID = 'trapezoid',
	POLYGON = 'polygon',
	CHAMFER = 'chamfer',
}

export class RapierPhysicsSprite extends Container implements IPhysicsObject {
	public static readonly DEFAULT_DEBUG_COLOR: number = 0x29c5f6;
	visual: Sprite;
	body: RAPIER.RigidBody;
	collider: RAPIER.Collider;

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

	get physics(): RapierPhysics {
		return this.app.physics as unknown as RapierPhysics;
	}


	public get debugColor(): number {
		return RapierPhysicsSprite.DEFAULT_DEBUG_COLOR;
	}

	get app(): Application {
		return Application.instance;
	}

	get world(): RAPIER.World {
		return (this.app.physics as RapierPhysics).world;
	}

	onAdded() {
		this.createBody();
		this.physics.addToWorld(this);
	}

	onRemoved(): void {
		this.physics.removeFromWorld(this.body);
	}

	createBody() {
		/*
		const bodyDesc = RAPIER.RigidBodyDesc.newStatic().setTranslation(def.position.x, def.position.y).setRotation(def.angle || 0);
		const body = this._world.createRigidBody(bodyDesc);
		const colliderDesc = RAPIER.ColliderDesc.cuboid(def.size.x / 2, def.size.y / 2).setTranslation(0, 0);
		const collider = this._world.createCollider(colliderDesc, body);
		 */
		let bodyDesc: RAPIER.RigidBodyDesc;
		let colliderDesc: RAPIER.ColliderDesc | null = null;

		bodyDesc = RAPIER.RigidBodyDesc.dynamic().setTranslation(this.x, this.y).setRotation(this.angle || 0);
		this.body = this.world.createRigidBody(bodyDesc);

		switch (this._bodyType) {
			case BodyType.RECTANGLE:
				// this.body = Matter.Bodies.rectangle(this.x, this.y, this.visual.width, this.visual.height);
				colliderDesc = RAPIER.ColliderDesc.cuboid(this.visual.width / 2, this.visual.height / 2)
					.setDensity(this.visual.width * this.visual.height)
					.setTranslation(0, 0)
				break;
			case BodyType.CIRCLE:
				// this.body = Matter.Bodies.circle(this.x, this.y, this.visual.width * 0.5);
				colliderDesc = RAPIER.ColliderDesc.ball(this.visual.width * 0.5)
					.setDensity(this.visual.width * this.visual.width)
					.setTranslation(0, 0);
				break;
			case BodyType.CONVEX:
				// this.body = Bodies.fromVertices(this.sprite.x, this.sprite.y, this.sprite.width, this.sprite.height);
				break;
			case BodyType.TRAPEZOID:
				// this.body = Matter.Bodies.trapezoid(this.x, this.y, this.visual.width, this.visual.height, 0.5);
				break
		}

		if (colliderDesc) {
			this.collider = this.world.createCollider(colliderDesc, this.body);
		}
	}

	update() {
		if (this.visual && this.body) {
			this.x = this.collider.translation().x;
			this.y = this.collider.translation().y;
			this.rotation = this.collider.rotation()
		}
	}
}
