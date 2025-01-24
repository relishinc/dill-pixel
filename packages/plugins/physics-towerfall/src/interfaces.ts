import { Container } from 'pixi.js';

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
}
