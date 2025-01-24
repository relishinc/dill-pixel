import { Container, ViewContainer } from 'pixi.js';

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

export interface Circle {
  x: number;
  y: number;
  radius: number;
}

export type CollisionShape = 'rectangle' | 'circle';

export interface PhysicsBodyConfig {
  shape: CollisionShape;
  width?: number;
  height?: number;
  radius?: number;
}

export type PhysicsObjectView = Container | ViewContainer;

export interface PhysicsObject {
  x: number;
  y: number;
  width: number;
  height: number;
  shape: CollisionShape;
  radius?: number;
  view?: PhysicsObjectView;
  getBounds(): Rectangle;
  getCircle?(): Circle;
  updateView(): void;
}
