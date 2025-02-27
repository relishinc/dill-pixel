/**
 * This file provides TypeScript declaration merging for custom collision layers.
 *
 * To use this feature, create a declaration file in your project (e.g., collision-layers.d.ts)
 * and extend the UserCollisionLayers interface with your custom layers:
 *
 * ```typescript
 * // collision-layers.d.ts in your project
 * declare module '@dill-pixel/plugin-crunch-physics' {
 *   interface UserCollisionLayers {
 *     WATER: number;
 *     LAVA: number;
 *     CLOUD: number;
 *   }
 * }
 * ```
 *
 * Then you can access your custom layers with intellisense:
 *
 * ```typescript
 * import { physics } from 'dill-pixel';
 *
 * // Register your custom layers
 * physics.registerCollisionLayer('WATER', 0);
 * physics.registerCollisionLayer('LAVA', 1);
 * physics.registerCollisionLayer('CLOUD', 2);
 *
 * // Access with intellisense
 * const waterLayer = physics.getCollisionLayer('WATER');
 * ```
 */

/**
 * Interface for user-defined collision layers.
 * Extend this interface in your own declaration files to add intellisense support
 * for your custom collision layers.
 */
export interface UserCollisionLayers {
  // This is intentionally empty and should be extended by users
}

/**
 * Extended plugin interface with intellisense support for custom collision layers
 */
export interface CollisionLayerPluginExtensions {
  /**
   * Gets a registered collision layer by name with intellisense support.
   *
   * @param name Name of the collision layer
   * @returns The numeric value of the registered collision layer or undefined if not found
   */
  getCollisionLayer<K extends keyof UserCollisionLayers>(name: K): number | undefined;

  /**
   * Registers a named collision layer with intellisense support.
   *
   * @param name Name of the collision layer
   * @param index Index from 0-15 representing which user bit to use
   * @param description Optional description of the layer
   * @returns The numeric value of the registered collision layer
   */
  registerCollisionLayer<K extends keyof UserCollisionLayers>(name: K, index: number, description?: string): number;

  /**
   * Registers a named collision layer with automatic index assignment and intellisense support.
   *
   * @param name Name of the collision layer
   * @param description Optional description of the layer
   * @returns The numeric value of the registered collision layer
   */
  registerCollisionLayer<K extends keyof UserCollisionLayers>(name: K, description?: string): number;

  /**
   * Removes a registered collision layer with intellisense support.
   *
   * @param name Name of the collision layer to remove
   * @returns True if the layer was removed, false if it didn't exist
   */
  removeCollisionLayer<K extends keyof UserCollisionLayers>(name: K): boolean;
}

// Extend the ICrunchPhysicsPlugin interface to include the CollisionLayerPluginExtensions
import './CrunchPhysicsPlugin';

declare module './CrunchPhysicsPlugin' {
  interface ICrunchPhysicsPlugin extends CollisionLayerPluginExtensions {}
}
