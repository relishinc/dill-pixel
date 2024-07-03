import { Entity } from './Entity';
import { Bounds, Circle, Rectangle } from 'pixi.js';

export type CollisionDirection = 'top' | 'bottom' | 'left' | 'right';
export type Side = 'top' | 'bottom' | 'left' | 'right';

export type EntityType = 'Player' | 'Actor' | 'Solid' | 'Wall' | 'Sensor' | string;

export type Collision = {
  top: number;
  bottom: number;
  left: number;
  right: number;
  overlap: {
    x: number;
    y: number;
  };
  direction: CollisionDirection | undefined;
  entity1: Entity;
  entity2: Entity;
  area: number;
  type: `${EntityType}|${EntityType}`;
};

export type SnapBoundary = Bounds | Rectangle | Circle;

export type SpatialHashGridFilter = ((entity: Entity) => boolean) | string[] | 'solid' | 'actor' | 'sensor';
