import {Container, DisplayObject, Texture} from "pixi.js";
import {Application} from "../Application";
import {BodyType} from "../GameObjects";
import {SpritesheetLike} from "../Utils/Types";

export enum PhysicsEngineType {MATTER = "matter", RAPIER = "rapier"}

export interface IPhysicsBase {
	update: (pDeltaTime: number) => void;

	get debug(): boolean;

	init(pAutoStart: boolean, pDebug: boolean, autoCreateBounds: boolean, pEngineOptions: any): void;
}

export class PhysicsBase implements IPhysicsBase {
	_factory: IPhysicsFactory;

	protected _debug: boolean = false;

	constructor(protected app: Application) {
	}

	get factory(): IPhysicsFactory {
		return this._factory
	}

	set debug(value: boolean) {
		this._debug = value;
	}

	get debug(): boolean {
		return false;
	}

	get add(): IPhysicsAddFactory {
		return this.factory.add;
	}

	set container(value: Container) {
		this.factory.container = value;
	}

	init(pAutoStart: boolean, pDebug: boolean, autoCreateBounds?: boolean, pEngineOptions?: any): void {
		// noop
	}

	update(pDeltaTime: number) {
		// noop
	}

	addToWorld(body: any) {
		// noop
	}

	removeFromWorld(body: any) {
		// noop
	}
}

export interface IPhysicsObject extends Container {
	visual: DisplayObject;
	body: any;
}

export interface IPhysicsAddFactory {
	set container(value: Container);

	physicsSprite(pTexture: string | Texture,
	              pSheet?: string | string[] | undefined,
	              pSize?: { x: number; y: number } | [number, number?] | number,
	              pType?: BodyType,
	              pAlpha?: number,
	              pPosition?: { x: number; y: number } | [number, number?] | number): IPhysicsObject

	existing(pSprite: DisplayObject): IPhysicsObject
}

export interface IPhysicsMakeFactory {
	physicsSprite(pTexture: string | Texture, pSheet?: SpritesheetLike, pSize?: {
		x: number;
		y: number
	} | [number, number?] | number, pBodyType?: BodyType): IPhysicsObject
}

export interface IPhysicsFactory {
	add: IPhysicsAddFactory;
	make: IPhysicsMakeFactory;

	set container(value: Container);
}

export type PointLike = { x: number, y: number };
