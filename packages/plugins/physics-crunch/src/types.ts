import { PointLike, SizeLike } from 'dill-pixel';
import { Container } from 'pixi.js';
import { Actor } from './Actor';
import { Sensor } from './Sensor';
import { Solid } from './Solid';

export interface Vector2 {
  x: number;
  y: number;
}

export interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type CollisionShape = 'rectangle';
export type EntityData = {
  [key: string]: any;
};

export type PhysicsEntityClass = new (config?: PhysicsEntityConfig) => Actor | Solid | Sensor;

export interface PhysicsEntityConfig<D extends EntityData = EntityData> {
  id?: string;
  class?: PhysicsEntityClass;
  type?: PhysicsEntityType;
  position?: PointLike;
  size?: SizeLike;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  restitution?: number;
  view?: PhysicsEntityView;
  data?: Partial<D>;
}

export interface CollisionResult {
  collided: boolean;
  normal?: Vector2;
  penetration?: number;
  solid: Solid;
}

export interface SensorOverlap {
  type: `${PhysicsEntityType}|${PhysicsEntityType}`;
  actor: Actor;
  sensor: Sensor;
}

export interface CollisionResult {
  collided: boolean;
  normal?: Vector2;
  penetration?: number;
  solid: Solid;
  pushingSolid?: Solid;
}

export interface Collision {
  type: `${PhysicsEntityType}|${PhysicsEntityType}`;
  entity1: Actor | Sensor;
  entity2: Actor | Solid;
  result: CollisionResult;
}

export type PhysicsEntityView = Container;
export type PhysicsEntityType = 'Actor' | 'Solid' | string;
