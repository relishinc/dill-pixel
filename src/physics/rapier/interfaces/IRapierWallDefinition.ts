import { PointObjectLike } from '../types';

export interface IRapierWallDefinition {
  position: PointObjectLike;
  size: PointObjectLike;
  angle?: number;
}