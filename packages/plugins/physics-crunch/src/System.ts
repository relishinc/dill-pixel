import { Container, Graphics } from 'pixi.js';
import { Actor } from './Actor';
import CrunchPhysicsPlugin from './CrunchPhysicsPlugin';
import { Entity } from './Entity';
import { Group } from './Group';
import { Sensor } from './Sensor';
import { Solid } from './Solid';
import {
  Collision,
  PhysicsEntityConfig,
  PhysicsEntityType,
  PhysicsEntityView,
  Rectangle,
  SensorOverlap,
} from './types';

/**
 * Configuration options for the Crunch physics system.
 * These options control the core behavior of the physics simulation.
 *
 * @example
 * ```typescript
 * const options: PhysicsSystemOptions = {
 *   gridSize: 32,
 *   gravity: 980,
 *   maxVelocity: 1000,
 *   debug: true,
 *   boundary: { x: 0, y: 0, width: 800, height: 600 },
 *   shouldCull: true,
 *   collisionResolver: (collisions) => {
 *     for (const collision of collisions) {
 *       handleCollision(collision);
 *     }
 *   }
 * };
 * ```
 */
export interface PhysicsSystemOptions {
  /** Reference to the parent Crunch physics plugin */
  plugin: CrunchPhysicsPlugin;
  /** Size of each grid cell for spatial partitioning (in pixels) */
  gridSize: number;
  /** Gravity strength in pixels per second squared */
  gravity: number;
  /** Maximum velocity for any entity in pixels per second */
  maxVelocity: number;
  /** Whether to render debug visualizations */
  debug?: boolean;
  /** World boundary for culling entities */
  boundary?: Rectangle;
  /** Whether to automatically cull out-of-bounds entities */
  shouldCull?: boolean;
  /** Custom handler for resolving collisions */
  collisionResolver?: (collisions: Collision[]) => void;
  /** Custom handler for resolving sensor overlaps */
  overlapResolver?: (overlaps: SensorOverlap[]) => void;
}

/**
 * Core physics system that manages all physics entities and their interactions.
 * Handles spatial partitioning, collision detection, and entity lifecycle.
 *
 * Features:
 * - Grid-based spatial partitioning for efficient collision checks
 * - Entity management (actors, solids, sensors, groups)
 * - Collision and overlap detection
 * - Debug visualization
 * - Culling system for out-of-bounds entities
 *
 * @example
 * ```typescript
 * // Create the physics system
 * const system = new System({
 *   gridSize: 32,
 *   gravity: 980,
 *   maxVelocity: 1000
 * });
 *
 * // Add entities
 * const player = system.createActor({
 *   type: 'Player',
 *   position: [100, 100]
 * });
 *
 * const platform = system.createSolid({
 *   type: 'Platform',
 *   position: [0, 500],
 *   size: [800, 32]
 * });
 *
 * // Update physics (in game loop)
 * system.update(deltaTime);
 * ```
 */
export class System {
  private readonly options: PhysicsSystemOptions;
  // Public collections
  public actors: Set<Actor> = new Set();
  public solids: Set<Solid> = new Set();
  public sensors: Set<Sensor> = new Set();
  public groups: Set<Group> = new Set();
  // Type-based lookup maps
  private actorsByType: Map<string, Set<Actor>> = new Map();
  private solidsByType: Map<string, Set<Solid>> = new Map();
  private sensorsByType: Map<string, Set<Sensor>> = new Map();
  private groupsByType: Map<string, Set<Group>> = new Map();
  // Collision exclusion tracking
  private collisionExclusions: Map<Entity, Set<PhysicsEntityType>> = new Map();

  // Followers tracking
  private followers: Map<Entity, Set<Entity>> = new Map();

  // Spatial partitioning
  private grid: Map<string, Set<Solid>> = new Map();
  // Collision tracking
  private collisions: Collision[] = [];
  private sensorOverlaps: SensorOverlap[] = [];
  // Debugging
  private _debugContainer: Container;
  private _debugGfx: Graphics | null = null;
  private _debug: boolean = false;

  set debug(value: boolean) {
    this._debug = value;

    if (this._debug) {
      if (!this._debugContainer) {
        this._debugContainer = this.options.plugin.container.addChild(new Container());
      }
      if (!this._debugGfx) {
        this._debugGfx = new Graphics();
      }
      this._debugContainer.addChild(this._debugGfx);
    } else {
      this._debugGfx?.clear();
      this._debugContainer?.removeChildren();
    }
  }

  set gridSize(value: number) {
    this.options.gridSize = value;
    this.grid.clear();

    for (const solid of this.solids) {
      this.addSolidToGrid(solid);
    }
  }

  set gravity(value: number) {
    this.options.gravity = value;
  }

  get gravity(): number {
    return this.options.gravity;
  }

  set maxVelocity(value: number) {
    this.options.maxVelocity = value;
  }

  get maxVelocity(): number {
    return this.options.maxVelocity;
  }

  set boundary(value: Rectangle) {
    this.options.boundary = value;
  }

  get boundary(): Rectangle {
    return this.options.boundary!;
  }

  get container(): Container {
    return this.options.plugin.container;
  }

  public addView(view: PhysicsEntityView): void {
    this.container.addChild(view);
  }

  constructor(options: PhysicsSystemOptions) {
    this.options = {
      ...options,
      shouldCull: options.shouldCull ?? false,
    };
    this.debug = options.debug ?? false;
  }

  public update(dt: number): void {
    if (!this.options.plugin.enabled) return;
    // Clear collisions from previous frame
    this.collisions = [];
    this.sensorOverlaps = [];

    // Convert delta time to seconds
    const deltaTime = dt / 60;

    // Update containers first
    for (const group of this.groups) {
      if (group.following) {
        continue;
      }
      group.update(deltaTime);
    }

    // Update solids
    for (const solid of this.solids) {
      if (solid.following) {
        continue;
      }
      solid.preUpdate();
      solid.update(deltaTime);
      solid.postUpdate();

      if (solid.moving) {
        // Remove from old grid cells
        this.removeSolidFromGrid(solid);

        // Move the solid (which will handle pushing/carrying actors and sensors)
        solid.move(0, 0, this.actors, this.sensors);

        // Add to new grid cells
        this.addSolidToGrid(solid);
      }
    }

    // Update sensors (before actors so they can detect entry/exit in the same frame)
    for (const sensor of this.sensors) {
      if (sensor.following) {
        continue;
      }
      this.updateSensor(sensor, deltaTime);
    }

    // Update followers
    for (const [entity, followers] of this.followers) {
      for (const follower of followers) {
        follower.setPosition(entity.x + follower.followOffset.x, entity.y + follower.followOffset.y);
      }
    }

    // Update actors
    for (const actor of this.actors) {
      if (actor.following) {
        continue;
      }
      this.updateActor(actor, deltaTime);
    }

    // Process overlaps if resolver is set
    if (this.options.overlapResolver && this.sensorOverlaps.length > 0) {
      this.options.overlapResolver(this.sensorOverlaps);
    }

    // Process collisions if resolver is set
    if (this.options.collisionResolver && this.collisions.length > 0) {
      this.options.collisionResolver(this.collisions);
    }

    // Cull out-of-bounds entities if enabled and boundary is set
    if (this.options.shouldCull && this.options.boundary) {
      this.cullOutOfBounds();
    }

    // Update debug rendering if enabled
    if (this._debug) {
      this.debugRender();
    }
  }

  private updateActor(actor: Actor, dt: number): void {
    actor.preUpdate();
    actor.update(dt);
    actor.postUpdate();

    for (const result of actor.collisions) {
      this.collisions.push({
        type: `${actor.type}|${result.solid!.type}`,
        entity1: actor,
        entity2: result.solid!,
        result: {
          collided: result.collided,
          normal: result.normal,
          penetration: result.penetration,
          solid: result.solid,
        },
      });
    }
  }

  private updateSensor(sensor: Sensor, dt: number): void {
    sensor.preUpdate();
    sensor.update(dt);
    sensor.postUpdate();

    const overlaps = sensor.checkActorOverlaps();
    this.sensorOverlaps.push(...overlaps);
  }

  public createEntity(config: PhysicsEntityConfig): Actor | Solid | Sensor {
    if (config.type === 'actor') {
      return this.createActor(config);
    } else if (config.type === 'solid') {
      return this.createSolid(config);
    } else if (config.type === 'sensor') {
      return this.createSensor(config);
    }
    throw new Error(`Invalid entity type: ${config.type}`);
  }

  public addEntity(entity: Actor | Solid | Sensor): Actor | Solid | Sensor {
    if (!entity || !entity.entityType) {
      throw new Error('Entity is required');
    }
    if (entity.entityType === 'Actor') {
      return this.addActor(entity as Actor);
    } else if (entity.entityType === 'Solid') {
      return this.addSolid(entity as Solid);
    } else if (entity.entityType === 'Sensor') {
      return this.addSensor(entity as Sensor);
    }
    throw new Error(`Invalid entity type: ${entity!.entityType}`);
  }

  public createActor(config: PhysicsEntityConfig): Actor {
    const actor = config.class ? (new config.class(config) as Actor) : new Actor(config);
    return this.addActor(actor);
  }

  public addActor(actor: Actor): Actor {
    this.actors.add(actor);

    // Add to type index
    if (!this.actorsByType.has(actor.type)) {
      this.actorsByType.set(actor.type, new Set());
    }
    this.actorsByType.get(actor.type)!.add(actor);
    return actor;
  }

  public createSensor(config: PhysicsEntityConfig): Sensor {
    const sensor = config.class ? (new config.class(config) as Sensor) : new Sensor(config);
    return this.addSensor(sensor);
  }

  public addSensor(sensor: Sensor): Sensor {
    this.sensors.add(sensor);
    // Add to type index
    if (!this.sensorsByType.has(sensor.type)) {
      this.sensorsByType.set(sensor.type, new Set());
    }
    this.sensorsByType.get(sensor.type)!.add(sensor);
    return sensor;
  }

  public createSolid(config: PhysicsEntityConfig): Solid {
    const solid = config.class ? (new config.class(config) as Solid) : new Solid(config);
    return this.addSolid(solid);
  }

  public addSolid(solid: Solid): Solid {
    this.solids.add(solid);
    // Add to type index
    if (!this.solidsByType.has(solid.type)) {
      this.solidsByType.set(solid.type, new Set());
    }
    this.solidsByType.get(solid.type)!.add(solid);
    // Add to spatial grid
    this.addSolidToGrid(solid);

    return solid;
  }

  public removeActor(actor: Actor, destroyView: boolean = true): void {
    this.collisionExclusions.delete(actor);
    this.actors.delete(actor);
    // Remove from type index
    const typeSet = this.actorsByType.get(actor.type);
    if (typeSet) {
      typeSet.delete(actor);
      if (typeSet.size === 0) {
        this.actorsByType.delete(actor.type);
      }
    }
    actor.onRemoved();

    if (destroyView) {
      actor.view?.removeFromParent();
    }
  }

  public removeSolid(solid: Solid, destroyView: boolean = true): void {
    this.collisionExclusions.delete(solid);
    this.solids.delete(solid);
    // Remove from type index
    const typeSet = this.solidsByType.get(solid.type);
    if (typeSet) {
      typeSet.delete(solid);
      if (typeSet.size === 0) {
        this.solidsByType.delete(solid.type);
      }
    }
    this.removeSolidFromGrid(solid);

    if (destroyView) {
      solid.view?.removeFromParent();
    }

    solid.onRemoved();
  }

  public removeSensor(sensor: Sensor, destroyView: boolean = true): void {
    this.collisionExclusions.delete(sensor);
    this.sensors.delete(sensor);
    // Remove from type index
    const typeSet = this.sensorsByType.get(sensor.type);
    if (typeSet) {
      typeSet.delete(sensor);
      if (typeSet.size === 0) {
        this.sensorsByType.delete(sensor.type);
      }
    }

    sensor.onRemoved();

    if (destroyView) {
      sensor.view?.removeFromParent();
    }
  }

  public moveSolid(solid: Solid, x: number, y: number): void {
    // Remove from old grid cells
    this.removeSolidFromGrid(solid);

    // Move the solid (which will handle pushing/carrying actors)
    solid.move(x, y, this.actors, this.sensors);

    // Add to new grid cells
    this.addSolidToGrid(solid);

    solid.updateView();
  }

  public getSolidsAt(x: number, y: number, entity: Actor | Sensor): Solid[] {
    const bounds = {
      x,
      y,
      width: entity.width,
      height: entity.height,
    };

    // Calculate movement direction from current position to check position
    const dx = x - entity.x;
    const dy = y - entity.y;

    // Get the base cells that the bounds intersect
    const cells = this.getCells(bounds);

    // Add one extra cell in the direction of movement
    if (dx !== 0) {
      const extraX =
        dx > 0 ? Math.ceil((x + bounds.width) / this.options.gridSize) : Math.floor(x / this.options.gridSize) - 1;

      for (
        let y = Math.floor(bounds.y / this.options.gridSize);
        y < Math.ceil((bounds.y + bounds.height) / this.options.gridSize);
        y++
      ) {
        cells.push(`${extraX},${y}`);
      }
    }

    if (dy !== 0) {
      const extraY =
        dy > 0 ? Math.ceil((y + bounds.height) / this.options.gridSize) : Math.floor(y / this.options.gridSize) - 1;

      for (
        let x = Math.floor(bounds.x / this.options.gridSize);
        x < Math.ceil((bounds.x + bounds.width) / this.options.gridSize);
        x++
      ) {
        cells.push(`${x},${extraY}`);
      }
    }

    // Create a Set of excluded types for O(1) lookups
    const excludedTypes = entity.excludedCollisionTypes;
    const result: Solid[] = [];
    const seen = new Set<Solid>();

    for (const cell of cells) {
      const solids = this.grid.get(cell);
      if (solids) {
        for (const solid of solids) {
          // Skip if we've already checked this solid, if its type is excluded, or if it has no collisions
          if (seen.has(solid) || excludedTypes.has(solid.type) || !solid.collideable) continue;
          seen.add(solid);

          // Only add solids that actually overlap with the entity's bounds
          if (
            this.overlaps(bounds, {
              x: solid.x,
              y: solid.y,
              width: solid.width,
              height: solid.height,
            })
          ) {
            result.push(solid);
          }
        }
      }
    }

    return result;
  }

  public addFollower(entity: Entity, follower: Entity): void {
    if (!this.followers.has(entity)) {
      this.followers.set(entity, new Set());
    }
    this.followers.get(entity)!.add(follower);
  }

  public removeFollower(entity: Entity): void {
    // remove the entity from any set in the followers map
    for (const followers of this.followers.values()) {
      followers.delete(entity);
    }
  }

  public getFollowersOf(entity: Entity): Entity[] {
    return Array.from(this.followers.get(entity) || []);
  }

  public removeFollowersOf(entity: Entity): void {
    const set = this.followers.get(entity);
    if (set) {
      set.forEach((follower) => {
        follower.destroy();
      });
      set.clear();
      this.followers.delete(entity);
    }
  }

  private overlaps(a: Rectangle, b: Rectangle): boolean {
    return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
  }

  private getCells(bounds: Rectangle): string[] {
    const cells: string[] = [];
    const { gridSize } = this.options;

    // Calculate the exact grid cells that the bounds intersect with
    const startX = Math.floor(bounds.x / gridSize);
    const startY = Math.floor(bounds.y / gridSize);
    const endX = Math.ceil((bounds.x + bounds.width) / gridSize);
    const endY = Math.ceil((bounds.y + bounds.height) / gridSize);

    // Only check one additional cell in the direction of movement for actors
    // For solids or static bounds, just use the exact cells
    for (let x = startX; x < endX; x++) {
      for (let y = startY; y < endY; y++) {
        cells.push(`${x},${y}`);
      }
    }

    return cells;
  }

  private addSolidToGrid(solid: Solid): void {
    const bounds = {
      x: solid.x,
      y: solid.y,
      width: solid.width,
      height: solid.height,
    };
    const cells = this.getCells(bounds);

    for (const cell of cells) {
      if (!this.grid.has(cell)) {
        this.grid.set(cell, new Set());
      }
      this.grid.get(cell)!.add(solid);
    }
  }

  private removeSolidFromGrid(solid: Solid): void {
    const bounds = {
      x: solid.x,
      y: solid.y,
      width: solid.width,
      height: solid.height,
    };
    const cells = this.getCells(bounds);

    for (const cell of cells) {
      const solids = this.grid.get(cell);
      if (solids) {
        solids.delete(solid);
        if (solids.size === 0) {
          this.grid.delete(cell);
        }
      }
    }
  }

  public debugRender(): void {
    if (!this._debugGfx) {
      return;
    }
    const gfx = this._debugGfx!;
    gfx.clear();

    // Draw boundary if set
    if (this.options.boundary) {
      const b = this.options.boundary;
      gfx.rect(b.x, b.y, b.width, b.height);
      gfx.stroke({ color: 0xff0000, width: 2, alignment: 0.5 });
    }

    // Draw grid
    for (const cell of this.grid.keys()) {
      const [x, y] = cell.split(',').map(Number);
      gfx.rect(x * this.options.gridSize, y * this.options.gridSize, this.options.gridSize, this.options.gridSize);
    }
    gfx.stroke({ color: 0x00ff00, width: 1, join: 'miter', cap: 'butt' });

    // Draw solids
    for (const solid of this.solids) {
      gfx.rect(solid.x, solid.y, solid.width, solid.height);
      gfx.stroke({ color: solid.debugColor ?? 0x00ff00, alpha: 1 });
    }

    // Draw actors
    for (const actor of this.actors) {
      gfx.rect(actor.x, actor.y, actor.width, actor.height);
      gfx.stroke({ color: actor.debugColor ?? 0xff0000, alpha: 1 });
    }

    // Draw sensors
    for (const sensor of this.sensors) {
      gfx.rect(sensor.x, sensor.y, sensor.width, sensor.height);
      gfx.stroke({ color: sensor.debugColor ?? 0xffff00, alpha: 1 });
    }
  }

  /**
   * Get all entities of a specific type
   * @param type The type to look for
   * @returns Array of entities matching the type
   */
  public getByType(type: string): (Actor | Solid)[] {
    const actors = this.actorsByType.get(type) || new Set<Actor>();
    const solids = this.solidsByType.get(type) || new Set<Solid>();
    return [...actors, ...solids];
  }

  /**
   * Get all actors of a specific type
   * @param type The type to look for
   * @returns Array of actors matching the type
   */
  public getActorsByType(type: string | string[]): Actor[] {
    if (Array.isArray(type)) {
      return type.flatMap((t) => Array.from(this.actorsByType.get(t) || new Set()));
    }
    return Array.from(this.actorsByType.get(type) || new Set());
  }
  /**
   * Get all solids of a specific type
   * @param type The type to look for
   * @returns Array of solids matching the type
   */
  public getSolidsByType(type: string | string[]): Solid[] {
    if (Array.isArray(type)) {
      return type.flatMap((t) => Array.from(this.solidsByType.get(t) || new Set()));
    }
    return Array.from(this.solidsByType.get(type) || new Set());
  }
  /**
   * Get all sensors of a specific type
   * @param type The type to look for
   * @returns Array of sensors matching the type
   */
  public getSensorsByType(type: string | string[]): Sensor[] {
    if (Array.isArray(type)) {
      return type.flatMap((t) => Array.from(this.sensorsByType.get(t) || new Set()));
    }
    return Array.from(this.sensorsByType.get(type) || new Set());
  }

  public clearGrid(): void {
    this.grid.clear();
  }

  public clearAll(destroy: boolean = true) {
    this.grid.clear();

    if (destroy) {
      this.solids.forEach((solid) => {
        solid.destroy();
      });
      this.actors.forEach((actor) => {
        actor.destroy();
      });
      this.sensors.forEach((sensor) => sensor.destroy());
    }

    this.solids.clear();
    this.actors.clear();
    this.sensors.clear();

    this.solidsByType.clear();
    this.actorsByType.clear();
    this.sensorsByType.clear();
  }

  public destroy(): void {
    this.debug = false;
    this.gravity = 0;
    this.maxVelocity = 0;

    this.clearAll();
  }

  private cullOutOfBounds(): void {
    const boundary = this.options.boundary!;
    const toRemoveActors: Actor[] = [];
    const toRemoveSolids: Solid[] = [];
    const toRemoveSensors: Sensor[] = [];
    // Check actors
    for (const actor of this.actors) {
      if (!this.isInBounds(actor, boundary)) {
        if (!actor.isCulled) {
          actor.onCull();
        }
        if (actor.shouldRemoveOnCull) {
          toRemoveActors.push(actor);
        }
      } else if (actor.isCulled) {
        // Uncull if back in bounds
        actor.onUncull();
      }
    }

    // Check solids
    for (const solid of this.solids) {
      if (!this.isInBounds(solid, boundary)) {
        if (!solid.isCulled) {
          solid.onCull();
        }
        if (solid.shouldRemoveOnCull) {
          toRemoveSolids.push(solid);
        }
      } else if (solid.isCulled) {
        // Uncull if back in bounds
        solid.onUncull();
      }
    }

    // check sensors
    for (const sensor of this.sensors) {
      if (!this.isInBounds(sensor, boundary)) {
        if (!sensor.isCulled) {
          sensor.onCull();
        }
        if (sensor.shouldRemoveOnCull) {
          toRemoveSensors.push(sensor);
        }
      } else if (sensor.isCulled) {
        // Uncull if back in bounds
        sensor.onUncull();
      }
    }

    // Remove culled entities that should be removed
    for (const actor of toRemoveActors) {
      this.removeActor(actor);
    }
    for (const solid of toRemoveSolids) {
      this.removeSolid(solid);
    }
    for (const sensor of toRemoveSensors) {
      this.removeSensor(sensor);
    }
  }

  /**
   * Force uncull an entity if it was culled
   * @param entity The entity to uncull
   */
  public uncullEntity(entity: Actor | Solid): void {
    if (entity.isCulled) {
      entity.onUncull();
    }
  }

  private isInBounds(entity: Actor | Solid | Sensor, boundary: Rectangle): boolean {
    // Only consider entity out of bounds if it's completely outside the boundary
    return !(
      entity.x >= boundary.x + boundary.width || // Completely to the right
      entity.x + entity.width <= boundary.x || // Completely to the left
      entity.y >= boundary.y + boundary.height || // Completely below
      entity.y + entity.height <= boundary.y // Completely above
    );
  }

  public setCollisionResolver(resolver: (collisions: Collision[]) => void): void {
    this.options.collisionResolver = resolver;
  }

  public createGroup(config: PhysicsEntityConfig): Group {
    const group = new Group(config);
    return this.addGroup(group);
  }

  public addGroup(group: Group): Group {
    this.groups.add(group);

    // Add to type index
    if (!this.groupsByType.has(group.type)) {
      this.groupsByType.set(group.type, new Set());
    }
    this.groupsByType.get(group.type)!.add(group);

    return group;
  }

  public removeGroup(group: Group, destroyView: boolean = true): void {
    this.groups.delete(group);

    // Remove from type index
    const typeSet = this.groupsByType.get(group.type);
    if (typeSet) {
      typeSet.delete(group);
      if (typeSet.size === 0) {
        this.groupsByType.delete(group.type);
      }
    }

    // Remove all children
    for (const actor of group.getActors()) {
      this.removeActor(actor, destroyView);
    }
    for (const solid of group.getSolids()) {
      this.removeSolid(solid, destroyView);
    }
    for (const sensor of group.getSensors()) {
      this.removeSensor(sensor, destroyView);
    }

    group.onRemoved();
  }

  /**
   * Excludes collision types for a specific entity
   */
  public excludeCollisionTypes(entity: Entity, ...types: PhysicsEntityType[]): void {
    if (!this.collisionExclusions.has(entity)) {
      this.collisionExclusions.set(entity, new Set());
    }
    const exclusions = this.collisionExclusions.get(entity)!;
    types.forEach((type) => exclusions.add(type));
  }

  /**
   * Adds back collision types for a specific entity
   */
  public includeCollisionTypes(entity: Entity, ...types: PhysicsEntityType[]): void {
    const exclusions = this.collisionExclusions.get(entity);
    if (!exclusions) return;
    types.forEach((type) => exclusions.delete(type));
    if (exclusions.size === 0) {
      this.collisionExclusions.delete(entity);
    }
  }

  /**
   * Checks if an entity can collide with a specific type
   */
  public canCollideWith(entity: Entity, type: PhysicsEntityType): boolean {
    const exclusions = this.collisionExclusions.get(entity);
    if (!exclusions) return true;
    return !exclusions.has(type);
  }

  /**
   * Gets the collision exclusions for an entity
   */
  public getCollisionExclusions(entity: Entity): Set<PhysicsEntityType> | undefined {
    return this.collisionExclusions.get(entity);
  }
}
