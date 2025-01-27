import { PointLike, SizeLike } from 'dill-pixel';
import { Container } from 'pixi.js';

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

export interface PhysicsEntityConfig {
  type: PhysicsEntityType;
  position?: PointLike;
  size?: SizeLike;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  restitution?: number;
}

export interface CollisionResult {
  collided: boolean;
  normal?: Vector2;
  penetration?: number;
}

export type PhysicsEntityView = Container;
export type PhysicsEntityType = 'Actor' | 'Solid' | string;
