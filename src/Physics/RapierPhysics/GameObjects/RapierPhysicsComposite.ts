import RAPIER from "@dimforge/rapier2d";
import {Container, DisplayObject, Sprite} from "pixi.js";
import {Application} from "../../../Application";
import {resolveXYFromObjectOrArray} from "../../../Utils";
import {IPhysicsObject, PhysicsBodyType} from "../../index";
import RapierPhysics from "../RapierPhysics";

export class RapierPhysicsComposite extends Container implements IPhysicsObject {
	public static readonly DEFAULT_DEBUG_COLOR: number = 0x29c5f6;
	visual: Sprite;
	visuals: Sprite[] = []
	body: RAPIER.RigidBody;
	bodies: RAPIER.RigidBody[] = [];
	collider: RAPIER.Collider;
	colliders: RAPIER.Collider[] = []
	colliderRef: { collider: RAPIER.Collider, visual: DisplayObject, data?: any }[] = [];

	constructor() {
		super();
		this.onAdded = this.onAdded.bind(this);

		this.on('added', this.onAdded);
		this.on('removed', this.onRemoved);
	}

	get physics(): RapierPhysics {
		return this.app.physics as unknown as RapierPhysics;
	}

	get app(): Application {
		return Application.instance;
	}

	get world(): RAPIER.World {
		return (this.app.physics as RapierPhysics).world;
	}

	get activeCollisionTypes(): RAPIER.ActiveCollisionTypes {
		// tslint:disable-next-line:no-bitwise
		return RAPIER.ActiveCollisionTypes.DEFAULT |
			RAPIER.ActiveCollisionTypes.KINEMATIC_FIXED
	}

	get activeEvents(): RAPIER.ActiveEvents {
		// tslint:disable-next-line:no-bitwise
		return RAPIER.ActiveEvents.COLLISION_EVENTS;
	}

	get activeHooks(): RAPIER.ActiveHooks {
		return RAPIER.ActiveHooks.FILTER_CONTACT_PAIRS;
	}

	get debugColor(): number {
		return 0xff0000;
	}

	addVisual(color: number, size: [number, number], position: [number, number] = [0,
		0], type: PhysicsBodyType = PhysicsBodyType.RECTANGLE): Sprite {
		const visual = this.app.make.coloredSprite(color, size, type === PhysicsBodyType.CIRCLE ? 'circle' : 'rectangle');
		visual.position = resolveXYFromObjectOrArray(position);
		visual.anchor.set(0.5, 0.5);
		this.addChild(visual);
		return visual;
	}

	onAdded() {
		this.createBody();
		this.physics.addToWorld(this);
	}

	onRemoved(): void {
		this.physics.removeFromWorld(this.body);
	}

	createCollider(visual: Sprite, body: RAPIER.RigidBody, type: PhysicsBodyType = PhysicsBodyType.RECTANGLE): RAPIER.Collider {
		let colliderDesc: RAPIER.ColliderDesc;
		switch (type) {
			case PhysicsBodyType.CIRCLE:
				colliderDesc = RAPIER.ColliderDesc.ball(visual.width / 2)
					.setDensity(visual.width * visual.width)
					.setTranslation(0, 0);
				break;
			case PhysicsBodyType.RECTANGLE:
			default:
				colliderDesc = RAPIER.ColliderDesc.cuboid(visual.width / 2, visual.height / 2)
					.setDensity(visual.width * visual.height)
					.setTranslation(0, 0);
				break;
		}


		let collider: RAPIER.Collider;

		if (colliderDesc) {
			// tslint:disable-next-line:no-bitwise
			colliderDesc.setActiveEvents(this.activeEvents);
			colliderDesc.setActiveCollisionTypes(this.activeCollisionTypes);
			colliderDesc.setActiveHooks(this.activeHooks);
			collider = this.world.createCollider(colliderDesc, body);
		}

		return collider!;
	}

	createPiece(color: number, size: [number, number], position: [number, number] = [0,
		0], angle: number = 0, type: PhysicsBodyType = PhysicsBodyType.RECTANGLE, data?: any): {
		visual: Sprite,
		body: RAPIER.RigidBody,
		collider: RAPIER.Collider
	} {
		const visual = this.addVisual(color, size, position, type);
		const bodyDesc = RAPIER.RigidBodyDesc.dynamic()
			.setTranslation(this.x + position[0], this.y + position[1])
			.setRotation(this.angle + angle);

		const body = this.world.createRigidBody(bodyDesc);
		const collider = this.createCollider(visual, body, type);

		this.visuals.push(visual);
		this.bodies.push(body);
		this.colliders.push(collider);
		this.colliderRef.push({collider, visual, data});

		return {visual, body, collider};
	}

	createBody() {
		const main = this.createPiece(0x00fff0, [50, 150], [0, 0], 0, PhysicsBodyType.RECTANGLE, {isMain: true})

		// head
		const head = this.createPiece(0x0ff000, [25, 25], [0, -100], 0, PhysicsBodyType.CIRCLE);
		const headParams = RAPIER.JointData.fixed({x: 0, y: -75}, 0.0, {
			x: 0,
			y: 25
		}, 0.0)
		this.world.createImpulseJoint(headParams, main.body, head.body, true);

		// left arm
		const leftArm = this.createPiece(0x00ff00, [20, 60], [-35, 20]);
		this.world.createImpulseJoint(RAPIER.JointData.revolute({x: -25, y: -75}, {
			x: 0,
			y: -30
		}), main.body, leftArm.body, true);

		// right arm
		const rightArm = this.createPiece(0x00ff00, [20, 60], [35, 20]);
		this.world.createImpulseJoint(RAPIER.JointData.revolute({x: 25, y: -75}, {
			x: 0,
			y: -30
		}), main.body, rightArm.body, true);

		// left leg
		const leftLeg = this.createPiece(0x00ff00, [20, 80], [-35, 115]);
		this.world.createImpulseJoint(RAPIER.JointData.revolute({x: -25, y: 75}, {
			x: 0,
			y: -40
		}), main.body, leftLeg.body, true);

		// right leg
		const rightLeg = this.createPiece(0x00ff00, [20, 80], [35, 115]);
		this.world.createImpulseJoint(RAPIER.JointData.revolute({x: 25, y: 75}, {
			x: 0,
			y: -40
		}), main.body, rightLeg.body, true);

		this.visual = this.visuals[0];
		this.body = this.bodies[0];
		this.collider = this.colliders[0];
	}

	update() {
		if (this.visuals && this.body) {
			this.colliderRef.forEach(({collider, visual, data}) => {
				visual.rotation = collider.rotation();
				if (data?.isMain) {
					this.x = collider.translation().x;
					this.y = collider.translation().y;
				} else {
					visual.x = collider.translation().x - this.x;
					visual.y = collider.translation().y - this.y;
				}
			})

		}
	}
}
