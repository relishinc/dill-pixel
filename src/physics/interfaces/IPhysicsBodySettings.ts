import { PointLike } from '../../utils';
import { PhysicsBodyType } from '../types';

export interface IPhysicsBodySettings {
  size?: PointLike;
  bodyType?: PhysicsBodyType;

  [key: string]: any;
}
