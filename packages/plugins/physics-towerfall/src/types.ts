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

export interface PhysicsBodyConfig {
  width: number;
  height: number;
  restitution?: number;
}

export interface CollisionResult {
  collided: boolean;
  normal?: Vector2;
  penetration?: number;
}

export type PhysicsObjectView = Container;
export type PhysicsObjectType = 'actor' | 'solid' | string;
