import { Container, Rectangle } from 'pixi.js';

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
}
