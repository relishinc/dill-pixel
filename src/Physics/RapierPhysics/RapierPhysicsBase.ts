import RAPIER from "@dimforge/rapier2d";
import {Container, Graphics} from "pixi.js";
import {Application} from "../../Application";
import {PointLike} from "../index";
import {IRapierPhysicsObject, RapierBodyLike} from "./index";

export interface WallDefinition {
	position: PointLike;
	size: PointLike;
	angle?: number;
}

export default class RapierPhysicsBase {
	private _updateables: IRapierPhysicsObject[] = [];
	private _debug: boolean = true;
	private _world: RAPIER.World;
	private _debugGraphics: Graphics;
	private _debugContainer: Container;
	private _bounds: PointLike = {x: 0, y: 0};
	private _isRunning: boolean = false;

	constructor(private app: Application) {
	}

	public get world(): RAPIER.World {
		return this._world;
	}

	public set debug(pDebug: boolean) {
		this._debug = pDebug;
		if (!this._debug) {
			this._debugContainer?.parent.removeChild(this._debugContainer);
			this._debugGraphics?.destroy({children: true});
			this._debugContainer?.destroy({children: true});
		}
	}

	public get debug(): boolean {
		return this._debug
	}

	async init(pAutoStart: boolean = false, pDebug: boolean = false, autoCreateBounds: boolean = true, pEngineOptions = {
		x: 0.0,
		y: -9.81
	}) {
		const opts = pEngineOptions || {x: 0.0, y: -9.81};
		this._debug = pDebug;
		this._world = new RAPIER.World(opts);

		if (autoCreateBounds) {
			this.createWorldBounds();
		}

		if (pAutoStart) {
			this.start();
		}

		return Promise.resolve();

	}

	public makeWall(def: WallDefinition) {
		const bodyDesc = RAPIER.RigidBodyDesc.newStatic().setTranslation(def.position.x, def.position.y).setRotation(def.angle || 0);
		const body = this._world.createRigidBody(bodyDesc);
		const colliderDesc = RAPIER.ColliderDesc.cuboid(def.size.x / 2, def.size.y / 2).setTranslation(0, 0);
		const collider = this._world.createCollider(colliderDesc, body);

		return {body, collider, definition: def}
	}

	public createWorldBounds(useStage: boolean = true) {
		const thickness = 50; // or however thick you want the boundaries to be
		const width = useStage ? this.app.size.x : this._bounds.x;
		const height = useStage ? this.app.size.y : this._bounds.y

		const bottom = this.makeWall({
			size: {y: window.innerHeight, x: thickness},
			position: {x: 0, y: window.innerHeight / 2},
		})

		// // Top boundary
		// const top = Bodies.rectangle(-thickness / 2, -height / 2 - thickness / 2, width + thickness, thickness, {isStatic: true});
		//
		// // Bottom boundary
		// const bottom = Bodies.rectangle(-thickness / 2, height / 2 + thickness / 2, width + thickness, thickness, {isStatic: true});
		//
		// // Left boundary
		// const left = Bodies.rectangle(-width / 2 - thickness / 2, -thickness / 2, thickness, height + thickness, {isStatic: true});
		//
		// // Right boundary
		// const right = Bodies.rectangle(width / 2 + thickness / 2, -thickness / 2, thickness, height + thickness, {isStatic: true});
		//
		// // Add these bodies to the world
		// this.add(top, bottom, left, right);
	}

	public start() {
		this._isRunning = true;
	}

	public stop() {
		this._isRunning = false;
	}

	add(...objects: (IRapierPhysicsObject | RapierBodyLike)[]) {
		objects.forEach((obj) => {
			let body: RapierBodyLike;
			if (obj.hasOwnProperty("body")) {
				body = (obj as IRapierPhysicsObject).body;
				this._updateables.push(obj as IRapierPhysicsObject);
			} else {
				body = obj as RapierBodyLike;
			}
		});

	}

	remove(...bodies: RapierBodyLike[]) {
		bodies.forEach((body) => {
			this.world.removeRigidBody(body);
		});
	}

	drawDebug() {
		if (!this._debugGraphics || !this._debugContainer || !this._debugGraphics.parent) {
			this._debugContainer = this.app.make.container();
			this.app.add.existing(this._debugContainer);
			this._debugGraphics = this.app.make.graphics();
			this._debugContainer.addChild(this._debugGraphics);
			this._debugContainer.x = this.app.resizer.getSize().x * 0.5;
			this._debugContainer.y = this.app.resizer.getSize().y * 0.5;
			this.app.stage.setChildIndex(this._debugContainer, this.app.stage.children.length - 1);
		}

		this._debugGraphics.clear();
		for (let i = 0; i < this._updateables.length; i++) {
			const updateable = this._updateables[i];
			const body = this._updateables[i].body as RAPIER.RigidBody;
			const color = updateable?.debugColor || 0x29c5f6;
			const numColliders = body.numColliders();
			for (let j = 0; j < numColliders; j++) {
				const collider = body.collider(j);
				const vertices = collider.vertices() as unknown as RAPIER.Vector[];
				if (vertices && vertices.length > 0) {
					this._debugGraphics.lineStyle(1, 0x00ff00, 1);
					this._debugGraphics.beginFill(color, 0.5);
					this._debugGraphics.moveTo(vertices[0].x, vertices[0].y);

					for (let k = 1; k < vertices.length; k++) {
						this._debugGraphics.lineTo(vertices[k].x, vertices[k].y);
					}

					this._debugGraphics.lineTo(vertices[0].x, vertices[0].y);
					this._debugGraphics.endFill();
				}
			}
		}
	}

	public update(deltaTime: number) {
		if (!this._isRunning) {
			return;
		}

		if (this.world) {
			this._updateables.forEach((obj) => {
				obj.update();
			})
			if (this._debug) {
				this.drawDebug();
			}
			this.world.step();
		}

	}
}
