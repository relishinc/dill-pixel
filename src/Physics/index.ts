import {DisplayObject} from "pixi.js";

export enum PhysicsEngineType {MATTER = "matter", RAPIER = "rapier"}

export interface IPhysicsObject {
	visual: DisplayObject;
	body: any;
}

export type PointLike = { x: number, y: number };

export * as MatterPhysics from './MatterPhysics'
