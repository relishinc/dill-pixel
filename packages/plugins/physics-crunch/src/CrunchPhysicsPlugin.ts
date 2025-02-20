import { Application, IPlugin, Plugin } from 'dill-pixel';
import { Container as PIXIContainer, Ticker } from 'pixi.js';
import { Actor } from './Actor';
import { Group } from './Group';
import { CrunchPhysicsOptions } from './interfaces';
import { Sensor } from './Sensor';
import { Solid } from './Solid';
import { System } from './System';
import { Collision, PhysicsEntityConfig, SensorOverlap } from './types';

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
export interface ICrunchPhysicsPlugin extends IPlugin {
  system: System;
  container: PIXIContainer;
  enabled: boolean;

  /**
   * Initializes the physics system with the specified options.
   *
   * @param app - The main application instance
   * @param options - Configuration options for the physics system
   *
   * @example
   * ```typescript
   * // Basic initialization
   * await physics.initialize(app);
   *
   * // Advanced initialization with custom options
   * await physics.initialize(app, {
   *   container: customContainer,
   *   gravity: 900,
   *   maxVelocity: 400,
   *   gridSize: 32,
   *   debug: true,
   *   shouldCull: true,
   *   boundary: new Rectangle(0, 0, 800, 600),
   *   collisionResolver: (collisions) => {
   *     collisions.forEach(collision => {
   *       console.log(`${collision.actor.type} collided with ${collision.solid.type}`);
   *     });
   *   }
   * });
   * ```
   */
  initialize(app: Application, options: Partial<CrunchPhysicsOptions>): Promise<void>;

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
}

/**
 * Implementation of the Crunch physics plugin.
 * See {@link ICrunchPhysicsPlugin} for detailed API documentation and examples.
 */
export default class CrunchPhysicsPlugin extends Plugin implements ICrunchPhysicsPlugin {
  public system: System;
  public container: PIXIContainer;
  public enabled = false;
  private collisionResolver?: (collisions: Collision[]) => void;
  private overlapResolver?: (overlaps: SensorOverlap[]) => void;

  constructor() {
    super('crunch-physics');
  }

  public async initialize(
    app: Application,
    options: Partial<CrunchPhysicsOptions> = { container: app.stage },
  ): Promise<void> {
    const { gridSize = 8, gravity = 900, maxVelocity = 400, debug = false } = options;

    this.container = options.container!;
    this.collisionResolver = options.collisionResolver;
    this.overlapResolver = options.overlapResolver;

    if (this.system) {
      app.ticker.remove(this.update);
      this.system.destroy();
      // @ts-expect-error system can't be null
      this.system = null;
    }

    this.system = new System({
      gridSize,
      gravity,
      maxVelocity,
      boundary: options.boundary,
      shouldCull: options.shouldCull,
      plugin: this,
      collisionResolver: this.collisionResolver,
      overlapResolver: this.overlapResolver,
    });

    if (debug) {
      this.system.debug = true;
    }

    this.enabled = true;
    // Register update loop
    app.ticker.add(this.update);
  }

  public setCollisionResolver(resolver: (collisions: Collision[]) => void): void {
    this.collisionResolver = resolver;
    this.system.setCollisionResolver(resolver);
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
}
