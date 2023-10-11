import { PointLike } from '../../types';

export interface IRapierWallDefinition {
  position: PointLike;
  size: PointLike;
  angle?: number;
}