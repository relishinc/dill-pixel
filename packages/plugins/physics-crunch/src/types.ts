import { PointLike, SizeLike } from 'dill-pixel';
import { Container } from 'pixi.js';
import { Actor } from './Actor';
import { Entity } from './Entity';
import { Group } from './Group';
import { Sensor } from './Sensor';
import { Solid } from './Solid';

export interface Vector2 {
  x: number;
  y: number;
}

export interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type CollisionShape = 'rectangle';
export type EntityData = {
  [key: string]: any;
};

export type PhysicsEntityClass = new (config?: PhysicsEntityConfig) => Actor | Solid | Sensor;

/**
 * Collision layers using bitwise flags
 * Each entity can belong to multiple layers (using bitwise OR)
 * and can collide with multiple layers (using bitwise AND)
 */
export enum CollisionLayer {
  NONE = 0,
  DEFAULT = 1 << 0,
  PLAYER = 1 << 1,
  ENEMY = 1 << 2,
  PROJECTILE = 1 << 3,
  PLATFORM = 1 << 4,
  TRIGGER = 1 << 5,
  ITEM = 1 << 6,
  WALL = 1 << 7,
  FX = 1 << 8,
  // Reserve first 16 bits for built-in layers
  // Bits 16-31 are available for user-defined layers
  ALL = 0xffffffff, // All bits set to 1
}

/**
 * Interface for a registered collision layer
 */
export interface RegisteredCollisionLayer {
  /** Name of the collision layer */
  name: string;
  /** Numeric value of the collision layer (bitwise) */
  value: number;
  /** Description of the collision layer (optional) */
  description?: string;
}

/**
 * Registry for tracking custom collision layers
 */
export class CollisionLayerRegistry {
  private static _instance: CollisionLayerRegistry;
  private _layers: Map<string, RegisteredCollisionLayer> = new Map();
  private _usedIndices: Set<number> = new Set();

  /**
   * Get the singleton instance of the registry
   */
  public static get instance(): CollisionLayerRegistry {
    if (!CollisionLayerRegistry._instance) {
      CollisionLayerRegistry._instance = new CollisionLayerRegistry();
    }
    return CollisionLayerRegistry._instance;
  }

  /**
   * Register a new collision layer
   *
   * @param name Name of the collision layer
   * @param index Index from 0-15 representing which user bit to use (gets shifted to bits 16-31)
   * @param description Optional description of the layer
   * @returns The registered collision layer
   */
  public register(name: string, index: number, description?: string): RegisteredCollisionLayer {
    if (index < 0 || index > 15) {
      throw new Error('Custom collision layer index must be between 0 and 15');
    }

    if (this._usedIndices.has(index)) {
      throw new Error(`Collision layer index ${index} is already in use`);
    }

    if (this._layers.has(name)) {
      throw new Error(`Collision layer with name "${name}" already exists`);
    }

    const value = 1 << (index + 16);
    const layer: RegisteredCollisionLayer = { name, value, description };

    this._layers.set(name, layer);
    this._usedIndices.add(index);

    return layer;
  }

  /**
   * Get a registered collision layer by name
   *
   * @param name Name of the collision layer
   * @returns The registered collision layer or undefined if not found
   */
  public get(name: string): RegisteredCollisionLayer | undefined {
    return this._layers.get(name);
  }

  /**
   * Get all registered collision layers
   *
   * @returns Array of all registered collision layers
   */
  public getAll(): RegisteredCollisionLayer[] {
    return Array.from(this._layers.values());
  }

  /**
   * Check if a collision layer with the given name exists
   *
   * @param name Name of the collision layer
   * @returns True if the layer exists
   */
  public has(name: string): boolean {
    return this._layers.has(name);
  }

  /**
   * Remove a registered collision layer
   *
   * @param name Name of the collision layer to remove
   * @returns True if the layer was removed, false if it didn't exist
   */
  public remove(name: string): boolean {
    const layer = this._layers.get(name);
    if (!layer) return false;

    // Calculate the index from the value
    const value = layer.value;
    const index = Math.log2(value) - 16;

    this._usedIndices.delete(index);
    return this._layers.delete(name);
  }

  /**
   * Clear all registered collision layers
   */
  public clear(): void {
    this._layers.clear();
    this._usedIndices.clear();
  }

  /**
   * Get the next available index for a custom collision layer
   *
   * @returns The next available index or -1 if all indices are used
   */
  public getNextAvailableIndex(): number {
    for (let i = 0; i < 16; i++) {
      if (!this._usedIndices.has(i)) {
        return i;
      }
    }
    return -1;
  }
}

/**
 * Utility functions for working with collision layers
 */
export const CollisionLayers = {
  /**
   * Creates a custom collision layer using bits 16-31 (user space)
   *
   * @param index Index from 0-15 representing which user bit to use (gets shifted to bits 16-31)
   * @returns A unique collision layer value
   *
   * @example
   * ```typescript
   * // Create custom collision layers
   * const WATER_LAYER = CollisionLayers.createLayer(0);  // 1 << 16
   * const LAVA_LAYER = CollisionLayers.createLayer(1);   // 1 << 17
   * const CLOUD_LAYER = CollisionLayers.createLayer(2);  // 1 << 18
   *
   * // Use in entity creation
   * const waterEntity = physics.createActor({
   *   type: 'Water',
   *   position: [100, 400],
   *   size: [800, 100],
   *   collisionLayer: WATER_LAYER,
   *   collisionMask: CollisionLayer.PLAYER | CollisionLayer.ENEMY
   * });
   * ```
   */
  createLayer(index: number): number {
    if (index < 0 || index > 15) {
      throw new Error('Custom collision layer index must be between 0 and 15');
    }
    return 1 << (index + 16);
  },

  /**
   * Creates a collision mask from multiple layers
   *
   * @param layers Array of collision layers to combine
   * @returns A combined collision mask
   *
   * @example
   * ```typescript
   * // Create a mask that collides with players, enemies and projectiles
   * const mask = CollisionLayers.createMask([
   *   CollisionLayer.PLAYER,
   *   CollisionLayer.ENEMY,
   *   CollisionLayer.PROJECTILE
   * ]);
   * ```
   */
  createMask(layers: number[]): number {
    return layers.reduce((mask, layer) => mask | layer, 0);
  },

  /**
   * Checks if a layer is included in a mask
   *
   * @param layer The layer to check
   * @param mask The mask to check against
   * @returns True if the layer is included in the mask
   *
   * @example
   * ```typescript
   * // Check if player layer is in the mask
   * if (CollisionLayers.isLayerInMask(CollisionLayer.PLAYER, entity.collisionMask)) {
   *   console.log('Entity can collide with players');
   * }
   * ```
   */
  isLayerInMask(layer: number, mask: number): boolean {
    return (layer & mask) !== 0;
  },

  /**
   * Get the registry for custom collision layers
   *
   * @returns The collision layer registry
   */
  getRegistry(): CollisionLayerRegistry {
    return CollisionLayerRegistry.instance;
  },
};

export interface PhysicsEntityConfig<D extends EntityData = EntityData> {
  id?: string;
  class?: PhysicsEntityClass;
  type?: PhysicsEntityType;
  position?: PointLike;
  size?: SizeLike;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  restitution?: number;
  view?: PhysicsEntityView;
  data?: Partial<D>;
  group?: Group;
  groupOffset?: PointLike;
  follows?: Entity;
  followOffset?: PointLike;
  /** Collision layer this entity belongs to (bitwise) */
  collisionLayer?: number;
  /** Collision mask defining which layers this entity collides with (bitwise) */
  collisionMask?: number;
  /** Whether to disable actor-to-actor collisions for this entity */
  disableActorCollisions?: boolean;
}

export interface CollisionResult {
  collided: boolean;
  normal?: Vector2;
  penetration?: number;
  solid: Solid;
}

export interface SensorOverlap {
  type: `${PhysicsEntityType}|${PhysicsEntityType}`;
  actor: Actor;
  sensor: Sensor;
}

export interface CollisionResult {
  collided: boolean;
  normal?: Vector2;
  penetration?: number;
  solid: Solid;
  pushingSolid?: Solid;
}

/**
 * Result of an actor-to-actor collision
 */
export interface ActorCollisionResult {
  collided: boolean;
  normal?: Vector2;
  penetration?: number;
  actor: Actor;
}

export interface Collision {
  type: `${PhysicsEntityType}|${PhysicsEntityType}`;
  entity1: Actor | Sensor;
  entity2: Actor | Solid;
  result: CollisionResult;
}

/**
 * Represents a collision between two actors
 */
export interface ActorCollision {
  type: `${PhysicsEntityType}|${PhysicsEntityType}`;
  actor1: Actor;
  actor2: Actor;
  result: ActorCollisionResult;
}

export type PhysicsEntityView = Container;
export type PhysicsEntityType = 'Actor' | 'Solid' | 'Sensor' | 'Group' | string;
