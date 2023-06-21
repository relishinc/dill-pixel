import {Container, Graphics} from "pixi.js";
import {Vec2} from "planck/dist/planck-with-testbed";
import {Application} from "../Application";
import {PointLike} from "./index";

export type PlanckBodyLike =
	planck.Body
	| planck.World;

export interface IPhysicsObject {
	body: PlanckBodyLike;
	debugColor: number

	update(): void;
}

export interface IPlanckWorldDef {
	gravity?: Vec2,
	allowSleep?: boolean,
	warmStarting?: boolean,
	continuousPhysics?: boolean,
	subStepping?: boolean,
	blockSolve?: boolean,
	velocityIterations?: number,
	positionIterations?: number
}

export class Base {
	private _updateables: IPhysicsObject[] = [];
	private _debug: boolean = true;
	private _world: planck.World;
	private _debugGraphics: Graphics;
	private _debugContainer: Container;
	private _bounds: PointLike = {x: 0, y: 0};
	private _isRunning: boolean = false;

	constructor(private app: Application) {
	}

	public get world() {
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

	async init(pAutoStart: boolean = false, pDebug: boolean = false, autoCreateBounds: boolean = true, pEngineOptions: IPlanckWorldDef) {
		// don't load the matter js module until we need it
		await import('planck').then((module) => {
			(globalThis as any).planck = module;
		});


		const opts = pEngineOptions || {gravity: Vec2(0, 0)};

		this._debug = pDebug;
		this._world = new planck.World(pEngineOptions);

		if (autoCreateBounds) {
			this.createWorldBounds();
		}

		if (pAutoStart) {
			this.start();
		}

		return Promise.resolve();
	}

	public createWorldBounds(useStage: boolean = true) {
		const thickness = 50; // or however thick you want the boundaries to be
		const width = useStage ? this.app.size.x : this._bounds.x;
		const height = useStage ? this.app.size.y : this._bounds.y

		const boundary = this._world.createBody({				// The confinement area for our sandbox
			userData: {
				type: "boundary",
				label: "boundary"
			}
		});

		// // Top boundary
		// const top = this._world.createBody(-thickness / 2, -height / 2 - thickness / 2, width + thickness, thickness, {isStatic: true});
		//
		// // Bottom boundary
		// const bottom = Bodies.rectangle(-thickness / 2, height / 2 + thickness / 2, width + thickness, thickness, {isStatic: true});
		//
		// // Left boundary
		// const left = Bodies.rectangle(-width / 2 - thickness / 2, -thickness / 2, thickness, height + thickness, {isStatic: true});
		//
		// // Right boundary
		// const right = Bodies.rectangle(width / 2 + thickness / 2, -thickness / 2, thickness, height + thickness, {isStatic: true});

		// Add these bodies to the world
		// this.add(top, bottom, left, right);
	}

	public start() {
		this._isRunning = true;
	}

	public stop() {
		this._isRunning = false;
	}

	add(...objects: (IPhysicsObject | PlanckBodyLike)[]) {
		objects.forEach((obj) => {
			let body: PlanckBodyLike;
			if (obj.hasOwnProperty("body")) {
				body = (obj as IPhysicsObject).body;
				this._updateables.push(obj as IPhysicsObject);
			} else {
				body = obj as PlanckBodyLike;
			}
		});

	}

	remove(...bodies: PlanckBodyLike[]) {
		bodies.forEach((body) => {
			this._world.destroyBody(body);
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
			const body = this._updateables[i].body as planck.Body;
			const color = updateable?.debugColor || 0x29c5f6;


			this._debugGraphics.lineStyle(1, 0x00ff00, 1);
			this._debugGraphics.beginFill(color, 0.5);
			for (let fixture = body.getFixtureList(); fixture; fixture = fixture.getNext()) {
				// Draw or update fixture
				// "circle" | "edge" | "polygon" | "chain"
				const shape = fixture.getShape();
				switch (shape.m_type) {
					case  "circle":
						break;
					case  "edge":
						break;
					case  "polygon":
						break;
					case  "chain":
						break;
				}
			}
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
			this._updateables.forEach((obj) => {
				obj.update();
			})
			if (this._debug) {
				this.drawDebug();
			}
			Matter.Engine.update(this._engine, 16.666666666666668, 1);
		}

	}
}
