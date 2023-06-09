import {Bodies} from "matter-js";
import {Container, Graphics} from "pixi.js";
import {Application} from "../Application";


export type BodyLike = Matter.Body | Matter.Composite | Matter.Constraint | Matter.MouseConstraint | Matter.World;

export interface IPhysicsObject {
	body: BodyLike;

	update(): void;
}

export type PointLike = { x: number, y: number };


export class Physics {

	private _updateables: IPhysicsObject[] = [];
	private _debug: boolean = true;
	private _engine: Matter.Engine;
	private _debugGraphics: Graphics;
	private _debugContainer: Container;
	private _bounds: PointLike = {x: 0, y: 0};
	private _isRunning: boolean = false;

	constructor(private app: Application) {
	}

	public get engine() {
		return this._engine;
	}

	async init(pAutoStart: boolean = false, pEngineOptions: Matter.IEngineDefinition = {}, pDebug: boolean = false, autoCreateBounds: boolean = true) {
		// don't load the matter js module until we need it
		await import('matter-js').then((module) => {
			globalThis.Matter = module;
		});

		const opts = pEngineOptions || {};

		this._debug = pDebug;
		this._engine = Matter.Engine.create(opts);

		if (pAutoStart) {
			this.start();
		}

		if (autoCreateBounds) {
			this.createWorldBounds();
		}

		return Promise.resolve();
	}

	public createWorldBounds(useStage: boolean = true) {
		const thickness = 50; // or however thick you want the boundaries to be
		const width = useStage ? this.app.size.x : this._bounds.x;
		const height = useStage ? this.app.size.y : this._bounds.y

		// Top boundary
		const top = Bodies.rectangle(-thickness / 2, -height / 2 - thickness / 2, width + thickness, thickness, {isStatic: true});

		// Bottom boundary
		const bottom = Bodies.rectangle(-thickness / 2, height / 2 + thickness / 2, width + thickness, thickness, {isStatic: true});

		// Left boundary
		const left = Bodies.rectangle(-width / 2 - thickness / 2, -thickness / 2, thickness, height + thickness, {isStatic: true});

		// Right boundary
		const right = Bodies.rectangle(width / 2 + thickness / 2, -thickness / 2, thickness, height + thickness, {isStatic: true});

		// Add these bodies to the world
		this.add(top, bottom, left, right);
	}

	public start() {
		this._isRunning = true;
	}

	public stop() {
		this._isRunning = false;
	}

	add(...objects: (IPhysicsObject | BodyLike)[]) {
		objects.forEach((obj) => {
			let body: BodyLike;
			if (obj.hasOwnProperty("body")) {
				body = (obj as IPhysicsObject).body;
				this._updateables.push(obj as IPhysicsObject);
			} else {
				body = obj as BodyLike;
			}
			Matter.World.add(this._engine.world, body);
		});

	}

	remove(...bodies: BodyLike[]) {
		bodies.forEach((body) => {
			Matter.World.remove(this._engine.world, body);
		});
	}

	drawDebug() {
		const bodies = Matter.Composite.allBodies(this._engine.world);
		if (!this._debugGraphics) {
			this._debugContainer = this.app.make.container();
			this.app.add.existing(this._debugContainer);
			this._debugGraphics = this.app.make.graphics();
			this._debugContainer.addChild(this._debugGraphics);
			this._debugContainer.x = this.app.resizer.getSize().x * 0.5;
			this._debugContainer.y = this.app.resizer.getSize().y * 0.5;
			this.app.stage.setChildIndex(this._debugContainer, this.app.stage.children.length - 1);
		}
		this._debugGraphics.clear();

		for (let i = 0; i < bodies.length; i++) {
			const vertices = bodies[i].vertices;

			this._debugGraphics.lineStyle(1, 0x00ff00, 1);
			this._debugGraphics.beginFill(0xff0000, 0.5);
			this._debugGraphics.moveTo(vertices[0].x, vertices[0].y);

			for (let j = 1; j < vertices.length; j++) {
				this._debugGraphics.lineTo(vertices[j].x, vertices[j].y);
			}

			this._debugGraphics.lineTo(vertices[0].x, vertices[0].y);
			this._debugGraphics.endFill();
		}
	}

	public update(deltaTime: number) {
		if (!this._isRunning) {
			return;
		}
		if (typeof Matter === `undefined` || !this._engine) {
			return;
		}
		if (this._engine) {
			Matter.Engine.update(this._engine, 16.666666666666668, 1);
			this._updateables.forEach((obj) => {
				obj.update();
			})
		}
		if (this._debug) {
			this.drawDebug();
		}
	}
}
