import { Entity } from './Entity';

export type CollisionDirection = 'top' | 'bottom' | 'left' | 'right';
export type Side = 'top' | 'bottom' | 'left' | 'right';

export type EntityType = 'Player' | 'Actor' | 'Solid' | 'Wall' | 'Sensor' | string;

export type Collision = {
  top: boolean;
  bottom: boolean;
  left: boolean;
  right: boolean;
  entity1?: Entity;
  entity2?: Entity;
  type: `${EntityType}|${EntityType}`;
};
