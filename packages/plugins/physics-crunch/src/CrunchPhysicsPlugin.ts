import { IApplication, IPlugin, isDev, Logger, Plugin, version } from 'dill-pixel';
import { Container as PIXIContainer, Rectangle, Ticker } from 'pixi.js';
import { Actor } from './Actor';
import { Group } from './Group';
import { AABBLike, CrunchPhysicsOptions } from './interfaces';
import { Sensor } from './Sensor';
import { Solid } from './Solid';
import { System } from './System';
import {
  ActorCollision,
  Collision,
  CollisionLayer,
  CollisionLayers,
  PhysicsEntityConfig,
  RegisteredCollisionLayer,
  SensorOverlap,
} from './types';

/**
 * Interface for the Crunch physics plugin, providing a simple yet powerful 2D physics system
 * inspired by Towerfall's physics mechanics. Supports dynamic actors, static solids, and trigger sensors.
 *
 * @example
 * ```typescript
 * // Initialize the physics system
 * const physics = this.app.getPlugin('crunch-physics') as ICrunchPhysicsPlugin;
 *
 * const physics = await this.physics.initialize({
 *   gravity: 900,
 *   debug: true,
 *   gridSize: 32
 * });
 *
 * // Create a player character
 * const playerSprite = this.add.sprite({asset:Texture.WHITE, width: 32, height: 64});
 *
 * const player = physics.createActor({
 *   type: 'Player',
 *   position: [100, 100],
 *   size: [32, 64],
 *   view: playerSprite
 * });
 *
 * // Create a platform
 * const platformSprite = this.add.sprite({asset:Texture.WHITE, width: 800, height: 32, tint: 0x00FF00});
 * const platform = physics.createSolid({
 *   type: 'Platform',
 *   position: [0, 500],
 *   size: [800, 32],
 *   view: platformSprite
 * });
 *
 * // Create a coin pickup sensor
 * const coinSprite = this.add.sprite({asset:Texture.WHITE, width: 32, height: 32, tint: 0x00FF00});
 * const coin = physics.createSensor({
 *   type: 'Coin',
 *   position: [400, 400],
 *   size: [32, 32],
 *   view: coinSprite
 * });
 * ```
 */
export interface ICrunchPhysicsPlugin extends IPlugin<CrunchPhysicsOptions> {
  system: System;
  container: PIXIContainer;
  enabled: boolean;

  /**
   * Initializes the physics system with the specified options.
   */
  initialize(options?: Partial<CrunchPhysicsOptions>, app?: IApplication): Promise<void>;

  /**
   * Sets a custom collision resolver function that will be called when collisions occur.
   *
   * @param resolver - Function to handle collisions
   *
   * @example
   * ```typescript
   * physics.setCollisionResolver((collisions) => {
   *   collisions.forEach(collision => {
   *     if (collision.actor.type === 'Player' && collision.solid.type === 'Spike') {
   *       player.damage(10);
   *     }
   *   });
   * });
   * ```
   */
  setCollisionResolver(resolver: (collisions: Collision[]) => void): void;

  /**
   * Sets a custom resolver for actor-to-actor collisions.
   *
   * @param resolver - Function to handle actor-to-actor collisions
   *
   * @example
   * ```typescript
   * physics.setActorCollisionResolver((collisions) => {
   *   collisions.forEach(collision => {
   *     if (collision.actor1.type === 'Player' && collision.actor2.type === 'Enemy') {
   *       player.takeDamage(10);
   *     }
   *   });
   * });
   * ```
   */
  setActorCollisionResolver(resolver: (collisions: ActorCollision[]) => void): void;

  /**
   * Enables or disables actor-to-actor collision detection.
   *
   * @param enabled - Whether to enable actor-to-actor collisions
   *
   * @example
   * ```typescript
   * // Enable actor-to-actor collisions
   * physics.setActorCollisionsEnabled(true);
   *
   * // Disable actor-to-actor collisions for performance
   * physics.setActorCollisionsEnabled(false);
   * ```
   */
  setActorCollisionsEnabled(enabled: boolean): void;

  /**
   * Creates a generic physics entity based on the provided configuration.
   * Use this when you need to create an entity without knowing its specific type at compile time.
   *
   * @param config - Configuration for the physics entity
   * @returns The created physics entity
   *
   * @example
   * ```typescript
   * const entityConfig = {
   *   type: 'Platform',
   *   position: [100, 100],
   *   size: [200, 32],
   *   view: sprite
   * };
   * const entity = physics.createEntity(entityConfig);
   * ```
   */
  createEntity(config: PhysicsEntityConfig): Actor | Solid | Sensor | Group;

  /**
   * Adds an existing physics entity to the system.
   * Useful when you want to manage entity creation yourself.
   *
   * @param entity - The physics entity to add
   * @returns The added entity
   *
   * @example
   * ```typescript
   * class CustomActor extends Actor {
   *   constructor() {
   *     super({ type: 'Custom', position: [0, 0], size: [32, 32] });
   *   }
   * }
   *
   * const customActor = new CustomActor();
   * physics.addEntity(customActor);
   * ```
   */
  addEntity(entity: Actor | Solid | Sensor | Group): Actor | Solid | Sensor | Group;

  /**
   * Creates a dynamic physics actor that can move and collide with other entities.
   * Actors are typically used for players, enemies, or any moving game objects.
   *
   * @param config - Configuration for the actor
   * @returns The created actor
   *
   * @example
   * ```typescript
   * // Create a player character
   * const player = physics.createActor({
   *   type: 'Player',
   *   position: [100, 100],
   *   size: [32, 64],
   *   view: playerSprite
   * });
   *
   * // Update player in game loop
   * player.velocity.x = 300; // Move right
   * player.velocity.y = -600; // Jump
   * ```
   */
  createActor(config: PhysicsEntityConfig): Actor;

  /**
   * Creates a static solid object that other entities can collide with.
   * Solids are typically used for platforms, walls, and other immovable objects.
   *
   * @param config - Configuration for the solid
   * @returns The created solid
   *
   * @example
   * ```typescript
   * // Create a static platform
   * const platform = physics.createSolid({
   *   type: 'Platform',
   *   position: [0, 500],
   *   size: [800, 32],
   *   view: platformSprite
   * });
   *
   * // Create a moving platform
   * const movingPlatform = physics.createSolid({
   *   type: 'Platform',
   *   position: [100, 300],
   *   size: [200, 32],
   *   view: platformSprite
   * });
   *
   * // Update platform position
   * gsap.to(movingPlatform, {
   *   x: 500,
   *   duration: 2,
   *   yoyo: true,
   *   repeat: -1
   * });
   * ```
   */
  createSolid(config: PhysicsEntityConfig): Solid;

  /**
   * Creates a sensor zone that can detect overlaps with other entities.
   * Sensors are typically used for triggers, collectibles, or detection zones.
   *
   * @param config - Configuration for the sensor
   * @returns The created sensor
   *
   * @example
   * ```typescript
   * // Create a coin pickup
   * const coin = physics.createSensor({
   *   type: 'Coin',
   *   position: [400, 300],
   *   size: [32, 32],
   *   view: coinSprite
   * });
   *
   * // Handle coin collection
   * coin.onActorEnter = (actor) => {
   *   if (actor.type === 'Player') {
   *     increaseScore(10);
   *     physics.removeSensor(coin);
   *   }
   * };
   * ```
   */
  createSensor(config: PhysicsEntityConfig): Sensor;

  createGroup(config: PhysicsEntityConfig): Group;

  addActor(actor: Actor): Actor;

  addSolid(solid: Solid): Solid;

  addSensor(sensor: Sensor): Sensor;

  addGroup(group: Group): Group;

  /**
   * Removes an actor from the physics system.
   *
   * @param actor - The actor to remove
   *
   * @example
   * ```typescript
   * // Remove player when they die
   * function killPlayer(player: Actor) {
   *   playDeathAnimation();
   *   physics.removeActor(player);
   * }
   * ```
   */
  removeActor(actor: Actor): void;

  /**
   * Removes a solid from the physics system.
   *
   * @param solid - The solid to remove
   *
   * @example
   * ```typescript
   * // Remove a platform when it's destroyed
   * function destroyPlatform(platform: Solid) {
   *   playBreakAnimation();
   *   physics.removeSolid(platform);
   * }
   * ```
   */
  removeSolid(solid: Solid): void;

  /**
   * Removes a sensor from the physics system.
   *
   * @param sensor - The sensor to remove
   *
   * @example
   * ```typescript
   * // Remove a coin when it's collected
   * function collectCoin(coin: Sensor) {
   *   playCollectSound();
   *   physics.removeSensor(coin);
   * }
   * ```
   */
  removeSensor(sensor: Sensor): void;

  /**
   * Cleans up the physics system and removes all entities.
   * Call this when transitioning between scenes or shutting down the game.
   *
   * @example
   * ```typescript
   * class GameScene extends Scene {
   *   destroy() {
   *     this.physics.destroy();
   *     super.destroy();
   *   }
   * }
   * ```
   */
  destroy(): void;

  /**
   * Creates a custom collision layer.
   *
   * @param index Index from 0-15 representing which user bit to use (gets shifted to bits 16-31)
   * @returns A unique collision layer value
   *
   * @example
   * ```typescript
   * // Create custom collision layers
   * const WATER_LAYER = physics.createCollisionLayer(0);
   * const LAVA_LAYER = physics.createCollisionLayer(1);
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
  createCollisionLayer(index: number): number;

  /**
   * Creates a collision mask from multiple layers.
   *
   * @param layers Array of collision layers to combine
   * @returns A combined collision mask
   *
   * @example
   * ```typescript
   * // Create a mask that collides with players, enemies and projectiles
   * const mask = physics.createCollisionMask([
   *   CollisionLayer.PLAYER,
   *   CollisionLayer.ENEMY,
   *   CollisionLayer.PROJECTILE
   * ]);
   * ```
   */
  createCollisionMask(...layers: number[]): number;

  /**
   * Registers a named collision layer for better intellisense support.
   *
   * @param name Name of the collision layer (used for intellisense)
   * @param indexOrDescription Index or description of the layer
   * @param description Optional description of the layer
   * @returns The numeric value of the registered collision layer
   *
   * @example
   * ```typescript
   * // Register named collision layers
   * const WATER = physics.registerCollisionLayer('WATER', 0, 'Water surfaces');
   * const LAVA = physics.registerCollisionLayer('LAVA', 1, 'Lava surfaces that damage players');
   *
   * // Use in entity creation
   * const waterEntity = physics.createActor({
   *   type: 'Water',
   *   position: [100, 400],
   *   size: [800, 100],
   *   collisionLayer: WATER,
   *   collisionMask: CollisionLayer.PLAYER | CollisionLayer.ENEMY
   * });
   * ```
   */
  registerCollisionLayer(name: string, indexOrDescription?: number | string, description?: string): number;

  /**
   * Gets a registered collision layer by name.
   *
   * @param name Name of the collision layer
   * @returns The numeric value of the registered collision layer or undefined if not found
   *
   * @example
   * ```typescript
   * // Get a registered collision layer
   * const waterLayer = physics.getCollisionLayer('WATER');
   * if (waterLayer !== undefined) {
   *   // Use the layer
   *   entity.setCollisionLayer(waterLayer);
   * }
   * ```
   */
  getCollisionLayer(name: string): number | undefined;

  /**
   * Gets all registered collision layers.
   *
   * @returns Array of all registered collision layers
   *
   * @example
   * ```typescript
   * // Get all registered collision layers
   * const layers = physics.getCollisionLayers();
   * console.log(`Registered layers: ${layers.map(l => l.name).join(', ')}`);
   * ```
   */
  getCollisionLayers(): RegisteredCollisionLayer[];

  /**
   * Removes a registered collision layer.
   *
   * @param name Name of the collision layer to remove
   * @returns True if the layer was removed, false if it didn't exist
   *
   * @example
   * ```typescript
   * // Remove a registered collision layer
   * physics.removeCollisionLayer('WATER');
   * ```
   */
  removeCollisionLayer(name: string): boolean;

  /**
   * Clears all registered collision layers.
   *
   * @example
   * ```typescript
   * // Clear all registered collision layers
   * physics.clearCollisionLayers();
   * ```
   */
  clearCollisionLayers(): void;
}

const defaultOptions: Partial<CrunchPhysicsOptions> = {
  gridSize: 128,
  gravity: 900,
  maxVelocity: 400,
  debug: false,
  culling: true,
  boundary: new Rectangle(0, 0, 800, 600),
};

/**
 * Implementation of the Crunch physics plugin.
 * See {@link ICrunchPhysicsPlugin} for detailed API documentation and examples.
 */
export default class CrunchPhysicsPlugin extends Plugin<CrunchPhysicsOptions> implements ICrunchPhysicsPlugin {
  public system: System;
  public container: PIXIContainer;
  public enabled = false;
  private collisionResolver?: (collisions: Collision[]) => void;
  private overlapResolver?: (overlaps: SensorOverlap[]) => void;
  private actorCollisionResolver?: (collisions: ActorCollision[]) => void;

  constructor() {
    super('crunch-physics');
  }

  private hello() {
    const hello = `%c Dill Pixel Crunch Physics Plugin v${version}`;
    console.log(hello, 'background: rgba(31, 41, 55, 1);color: #74b64c');
  }

  public async initialize(options?: Partial<CrunchPhysicsOptions>, _app: IApplication): Promise<void> {
    this.hello();
    if (!options) {
      return;
    }

    this._options = { ...defaultOptions, ...options } as CrunchPhysicsOptions;

    this.enabled = true;
    this.container = options.container || this.app.stage;

    if (isDev) {
      Logger.log(this._options);
    }

    // Create the physics system
    const gridSize = options.gridSize ?? 32;
    const gravity = options.gravity ?? 900;
    const maxVelocity = options.maxVelocity ?? 400;
    const debug = options.debug ?? false;
    const enableActorCollisions = options.enableActorCollisions ?? false;

    // Create the system with default collision layers set to NONE for better performance
    this.system = new System({
      gridSize,
      gravity,
      maxVelocity,
      boundary: options.boundary,
      culling: options.culling,
      plugin: this,
      collisionResolver: this.collisionResolver,
      overlapResolver: this.overlapResolver,
      actorCollisionResolver: this.actorCollisionResolver,
      enableActorCollisions,
      defaultCollisionLayer: CollisionLayer.NONE,
      defaultCollisionMask: CollisionLayer.NONE,
    });

    if (debug) {
      this.system.debug = true;
    }

    // Register update loop
    this.app.ticker.add(this.update);
  }

  public setCollisionResolver(resolver: (collisions: Collision[]) => void): void {
    this.collisionResolver = resolver;
    this.system.setCollisionResolver(resolver);
  }

  public setActorCollisionResolver(resolver: (collisions: ActorCollision[]) => void): void {
    this.actorCollisionResolver = resolver;
    this.system.setActorCollisionResolver(resolver);
  }

  public setActorCollisionsEnabled(enabled: boolean): void {
    this.system.setActorCollisionsEnabled(enabled);
  }

  public createEntity(config: PhysicsEntityConfig): Actor | Solid | Sensor | Group {
    return this.system.createEntity(config);
  }

  public addEntity(entity: Actor | Solid | Sensor | Group): Actor | Solid | Sensor | Group {
    return this.system.addEntity(entity);
  }

  public createActor(config: PhysicsEntityConfig): Actor {
    return this.system.createActor(config);
  }

  public createSolid(config: PhysicsEntityConfig): Solid {
    return this.system.createSolid(config);
  }

  public createSensor(config: PhysicsEntityConfig): Sensor {
    return this.system.createSensor(config);
  }

  public createGroup(config: PhysicsEntityConfig): Group {
    return this.system.createGroup(config);
  }

  public addActor(actor: Actor): Actor {
    return this.system.addActor(actor);
  }

  public addSolid(solid: Solid): Solid {
    return this.system.addSolid(solid);
  }

  public addSensor(sensor: Sensor): Sensor {
    return this.system.addSensor(sensor);
  }

  public addGroup(group: Group): Group {
    return this.system.addGroup(group);
  }

  public removeActor(actor: Actor): void {
    this.system.removeActor(actor);
  }

  public removeSolid(solid: Solid): void {
    this.system.removeSolid(solid);
  }

  public removeSensor(sensor: Sensor): void {
    this.system.removeSensor(sensor);
  }

  public removeGroup(group: Group): void {
    this.system.removeGroup(group);
  }

  public destroy(): void {
    this.enabled = false;
    this.app.ticker.remove(this.update);
    if (this.system) {
      this.system.destroy();
      // @ts-expect-error system can't be null
      this.system = null;
    }
    super.destroy();
  }

  private update(_ticker: Ticker) {
    if (!this.enabled) return;
    this.system.update(_ticker.deltaTime);
  }

  /**
   * Creates a custom collision layer.
   *
   * @param index Index from 0-15 representing which user bit to use (gets shifted to bits 16-31)
   * @returns A unique collision layer value
   */
  public createCollisionLayer(index: number): number {
    return CollisionLayers.createLayer(index);
  }

  /**
   * Creates a collision mask from multiple layers.
   *
   * @param layers Array of collision layers to combine
   * @returns A combined collision mask
   */
  public createCollisionMask(...layers: number[]): number {
    return CollisionLayers.createMask(layers);
  }

  /**
   * Registers a named collision layer for better intellisense support.
   *
   * @param name Name of the collision layer (used for intellisense)
   * @param indexOrDescription Index or description of the layer
   * @param description Optional description of the layer
   * @returns The numeric value of the registered collision layer
   */
  public registerCollisionLayer(name: string, indexOrDescription?: number | string, description?: string): number {
    const registry = CollisionLayers.getRegistry();

    // Handle overloaded method signature
    if (typeof indexOrDescription === 'number') {
      // First overload: registerCollisionLayer(name, index, description?)
      const index = indexOrDescription;
      const layer = registry.register(name, index, description);
      return layer.value;
    } else {
      // Second overload: registerCollisionLayer(name, description?)
      const layerDescription = indexOrDescription;
      const nextIndex = registry.getNextAvailableIndex();

      if (nextIndex === -1) {
        throw new Error('No more collision layer indices available (maximum 16)');
      }

      const layer = registry.register(name, nextIndex, layerDescription);
      return layer.value;
    }
  }

  /**
   * Gets a registered collision layer by name.
   *
   * @param name Name of the collision layer
   * @returns The numeric value of the registered collision layer or undefined if not found
   */
  public getCollisionLayer(name: string): number | undefined {
    const registry = CollisionLayers.getRegistry();
    const layer = registry.get(name);
    return layer?.value;
  }

  /**
   * Gets all registered collision layers.
   *
   * @returns Array of all registered collision layers
   */
  public getCollisionLayers(): RegisteredCollisionLayer[] {
    const registry = CollisionLayers.getRegistry();
    return registry.getAll();
  }

  /**
   * Removes a registered collision layer.
   *
   * @param name Name of the collision layer to remove
   * @returns True if the layer was removed, false if it didn't exist
   */
  public removeCollisionLayer(name: string): boolean {
    const registry = CollisionLayers.getRegistry();
    return registry.remove(name);
  }

  /**
   * Clears all registered collision layers.
   */
  public clearCollisionLayers(): void {
    const registry = CollisionLayers.getRegistry();
    registry.clear();
  }

  /**
   * Checks if two AABB rectangles overlap.
   *
   * @param a - The first AABB rectangle
   * @param b - The second AABB rectangle
   * @returns True if the rectangles overlap, false otherwise
   */
  public aabbOverlap(a: AABBLike, b: AABBLike): boolean {
    return this.system.aabbOverlap(a, b);
  }
}
