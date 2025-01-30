import { Container, Rectangle } from 'pixi.js';
import { Collision, SensorOverlap } from './types';

export interface TowerfallPhysicsOptions {
  container: Container;
  /** Grid cell size in pixels */
  gridSize?: number;
  /** Gravity strength */
  gravity?: number;
  /** Maximum velocity */
  maxVelocity?: number;
  /** Whether to enable debug rendering */
  debug?: boolean;
  /** Whether to cull out-of-bounds entities */
  shouldCull?: boolean;
  /** Whether to remove entities from the system after culling */
  boundary?: Rectangle;
  /** Collision resolver */
  collisionResolver?: (collisions: Collision[]) => void;
  /** Overlap resolver */
  overlapResolver?: (overlaps: SensorOverlap[]) => void;
}
