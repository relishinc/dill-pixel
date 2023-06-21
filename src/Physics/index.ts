import {DisplayObject} from "pixi.js";

export enum PhysicsEngineType {MATTER = "matter", PLANCK = "planck"}

export interface IPhysicsObject {
	visual: DisplayObject;
	body: any;
}

export type PointLike = { x: number, y: number };

export * as MatterPhysics from './MatterPhysics'
export * as PlanckPhysics from './PlanckPhysics';
