import type {Vector2, World} from '@dimforge/rapier2d'
import {Application} from "Application";
import {Container, Graphics} from "pixi.js";
import {PhysicsBase, PointLike} from "../index";
import {Factory} from "./Factory";
import {IRapierPhysicsObject, RapierBodyLike} from "./index";

export interface WallDefinition {
	position: PointLike;
	size: PointLike;
	angle?: number;
}

export default class RapierPhysics extends PhysicsBase {
	protected _debug: boolean = true;
	private _updateables: IRapierPhysicsObject[] = [];
	private _world: World;
	private _debugGraphics: Graphics;
	private _debugContainer: Container;
	private _bounds: PointLike = {x: 0, y: 0};
	private _isRunning: boolean = false;
	private _systemOfUnitsFactor: number = 500;

	constructor(protected app: Application) {
		super(app);
		this._factory = new Factory();
	}

	public get SIFactor(): number {
		return this._systemOfUnitsFactor;
	}

	public get world(): World {
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

	async init(pAutoStart: boolean = false, pDebug: boolean = false, autoCreateBounds: boolean = true, pEngineOptions?: {
		gravity: Vector2,
		systemOfUnitsFactor: number,
	}) {
		await import("@dimforge/rapier2d").then(module => {
			(globalThis as any).RAPIER = module;
		});

		const defaults = {systemOfUnitsFactor: this._systemOfUnitsFactor}
		pEngineOptions = Object.assign({}, defaults, pEngineOptions)
		const opts = Object.assign({}, {
			gravity: new RAPIER.Vector2(0.0, 9.81 * pEngineOptions.systemOfUnitsFactor)
		}, pEngineOptions);
		this._systemOfUnitsFactor = pEngineOptions.systemOfUnitsFactor;
		this._debug = pDebug;
		this._world = new RAPIER.World(opts.gravity);

		if (autoCreateBounds) {
			this.createWorldBounds();
		}

		if (pAutoStart) {
			this.start();
		}

		return Promise.resolve();

	}

	destroy() {
		this._updateables = [];
		this._world.free();
		this._isRunning = false;
	}

	public makeWall(def: WallDefinition) {
		const bodyDesc = RAPIER.RigidBodyDesc.fixed().setTranslation(def.position.x, def.position.y).setRotation(def.angle || 0);
		const body = this.world.createRigidBody(bodyDesc);
		const colliderDesc = RAPIER.ColliderDesc.cuboid(def.size.x / 2, def.size.y / 2).setTranslation(0, 0).setRestitution(0);
		const collider = this.world.createCollider(colliderDesc, body);

		return {body, collider, definition: def}
	}

	public createWorldBounds(useStage: boolean = true) {
		const thickness = 50; // or however thick you want the boundaries to be
		const width = useStage ? this.app.size.x : this._bounds.x;
		const height = useStage ? this.app.size.y : this._bounds.y

		this.makeWall({
			size: {x: width, y: thickness},
			position: {x: 0, y: -height / 2 - thickness / 2}
		});
		this.makeWall({
			size: {x: width, y: thickness},
			position: {x: 0, y: height / 2 + thickness / 2}
		});
		this.makeWall({
			size: {x: thickness, y: height},
			position: {x: -width / 2 - thickness / 2, y: 0}
		});

		this.makeWall({
			size: {x: thickness, y: height},
			position: {x: width / 2 + thickness / 2, y: 0}
		});
	}

	public start() {
		this._isRunning = true;
	}

	public stop() {
		this._isRunning = false;
	}

	addToWorld(...objects: (IRapierPhysicsObject | RapierBodyLike)[]) {
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

	removeFromWorld(...bodies: RapierBodyLike[]) {
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
			this._debugContainer.scale.set(1, -1);
			this.app.stage.setChildIndex(this._debugContainer, this.app.stage.children.length - 1);
		}

		this._debugGraphics.clear();
		const buffers = this.world.debugRender();
		const vtx = buffers.vertices;
		const cls = buffers.colors;
		const color = 0xff0000;
		for (let i = 0; i < vtx.length / 4; i += 1) {
			this._debugGraphics.lineStyle(1.0, color, cls[i * 8 + 3], 1, true);
			this._debugGraphics.moveTo(vtx[i * 4], -vtx[i * 4 + 1]);
			this._debugGraphics.lineTo(vtx[i * 4 + 2], -vtx[i * 4 + 3]);
		}
	}

	public update(deltaTime: number) {
		if (!this._isRunning) {
			return;
		}

		if (this.world) {
			if (deltaTime) {
				this.world.timestep = deltaTime;
			}
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
