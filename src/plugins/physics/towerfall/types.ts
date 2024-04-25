import { Entity } from './Entity';
import { ICollider } from './ICollider';

export type CollisionDirection = 'top' | 'bottom' | 'left' | 'right';
export type Collision = { entity: ICollider; intersection: IntersectionResult };

export type OverlapResultObject = {
  top: boolean;
  bottom: boolean;
  left: boolean;
  right: boolean;
  entity1?: Entity;
  entity2?: Entity;
};

export type OverlapResult = OverlapResultObject | false;

export type IntersectionResult = {
  inside: boolean;
  edges: {
    top: boolean;
    bottom: boolean;
    left: boolean;
    right: boolean;
  };
  corners: {
    topLeft: boolean;
    topRight: boolean;
    bottomLeft: boolean;
    bottomRight: boolean;
  };
};
