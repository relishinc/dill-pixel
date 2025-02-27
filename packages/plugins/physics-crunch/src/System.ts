import { Container, Graphics } from 'pixi.js';
import { Actor } from './Actor';
import CrunchPhysicsPlugin from './CrunchPhysicsPlugin';
import { Entity } from './Entity';
import { Group } from './Group';
import { Sensor } from './Sensor';
import { Solid } from './Solid';
import {
  ActorCollision,
  ActorCollisionResult,
  Collision,
  PhysicsEntityConfig,
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
 *   culling: true,
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
  culling?: boolean;
  /** Custom handler for resolving collisions */
  collisionResolver?: (collisions: Collision[]) => void;
  /** Custom handler for resolving sensor overlaps */
  overlapResolver?: (overlaps: SensorOverlap[]) => void;
  /** Custom handler for resolving actor-to-actor collisions */
  actorCollisionResolver?: (collisions: ActorCollision[]) => void;
  /** Whether to enable actor-to-actor collisions */
  enableActorCollisions?: boolean;
  /** Default collision layer for new entities */
  defaultCollisionLayer?: number;
  /** Default collision mask for new entities */
  defaultCollisionMask?: number;
}

/**
 * Represents a cell in the spatial partitioning grid that can contain both solids and actors
 */
interface GridCell {
  solids: Set<Solid>;
  actors: Set<Actor>;
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
  public entities: Set<Entity> = new Set();
  private _flaggedEntities: Set<Entity> = new Set();
  // Type-based lookup maps
  public actors: Set<Actor> = new Set();
  public solids: Set<Solid> = new Set();
  public sensors: Set<Sensor> = new Set();
  public groups: Set<Group> = new Set();
  // Type-based lookup maps
  private actorsByType: Map<string, Set<Actor>> = new Map();
  private solidsByType: Map<string, Set<Solid>> = new Map();
  private sensorsByType: Map<string, Set<Sensor>> = new Map();
  private groupsByType: Map<string, Set<Group>> = new Map();

  // Followers tracking
  private followers: Map<Entity, Set<Entity>> = new Map();

  // groups tracking
  private groupWithEntities: Map<Group, Set<Entity>> = new Map();

  // Single grid for both solids and actors
  private grid: Map<string, GridCell> = new Map();

  // Collision tracking
  private collisions: Collision[] = [];
  private sensorOverlaps: SensorOverlap[] = [];
  private actorCollisions: ActorCollision[] = [];

  // Reusable data structures for actor collision detection
  private _checkedPairs: Set<string> = new Set();

  // Object pools for collision results to reduce GC pressure
  private _collisionResultPool: ActorCollisionResult[] = [];
  private _collisionResultPoolIndex: number = 0;
  private _actorCollisionPool: ActorCollision[] = [];
  private _actorCollisionPoolIndex: number = 0;

  // Debugging
  private _debugContainer: Container;
  private _debugGfx: Graphics | null = null;
  private _debug: boolean = false;

  private _movedActors: Set<Actor> = new Set();
  private _activeGridCells: Set<string> = new Set();
  private _potentialCollisions: Map<string, [Actor, Actor]> = new Map();

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
      culling: options.culling ?? false,
    };
    this.debug = options.debug ?? false;
    this._debugContainer = new Container();
    options.plugin.container.addChild(this._debugContainer);
  }

  private _resetPositionFlags(entity: Entity): void {
    entity.updatedFollowPosition = false;
    entity.updatedGroupPosition = false;
  }

  public update(dt: number): void {
    if (!this.options.plugin.enabled) return;

    // Clear collections at the start with pre-allocated capacity
    this.collisions.length = 0;
    this.sensorOverlaps.length = 0;
    this.actorCollisions.length = 0;

    // Reset object pools
    this.resetCollisionPools();

    // Convert delta time to seconds (cache this calculation)
    const deltaTime = dt / 60;

    // Update containers first (groups)
    for (const group of this.groups) {
      group.update(deltaTime);
    }

    // Update solids with optimized grid management
    this.updateSolids(deltaTime);

    // Update sensors (before actors so they can detect entry/exit in the same frame)
    for (const sensor of this.sensors) {
      this.updateSensor(sensor, deltaTime);
    }

    // Clear actor collision lists before updating actors
    for (const actor of this.actors) {
      if (actor.actorCollisions.length > 0) {
        actor.actorCollisions.length = 0;
      }
    }

    // Update actors with potential batching
    this.updateActors(deltaTime);

    // Process position updates for followers and group entities
    this.updateEntityPositions();

    // Process overlaps, collisions, and culling in batch operations
    this.processCollisionsAndOverlaps();

    // Cull out-of-bounds entities if enabled and boundary is set
    if (this.options.culling && this.options.boundary) {
      this.cullOutOfBounds();
    }

    // Update debug rendering if enabled
    if (this._debug) {
      this.debugRender();
    }
  }

  // New optimized methods to break up the update loop
  private updateSolids(deltaTime: number): void {
    // Fast path if no solids are moving
    let hasMovingSolids = false;

    for (const solid of this.solids) {
      solid.preUpdate();
      solid.update(deltaTime);
      solid.postUpdate();

      if (solid.moving) {
        hasMovingSolids = true;
      }
    }

    // Skip grid updates if nothing is moving
    if (!hasMovingSolids) return;

    // Batch grid updates for moving solids
    const movedSolids = new Set<Solid>();

    for (const solid of this.solids) {
      if (solid.moving) {
        // Remove from old grid cells
        this.removeSolidFromGrid(solid);
        // Move the solid (which will handle pushing/carrying actors and sensors)
        solid.move(0, 0, this.actors, this.sensors, true);
        // Track for batch grid update
        movedSolids.add(solid);
      }
    }

    // Batch add to grid after all movements are complete
    for (const solid of movedSolids) {
      this.addSolidToGrid(solid);
    }
  }

  private updateActors(deltaTime: number): void {
    // Skip if no active actors
    if (this.actors.size === 0) return;

    // Use for...of instead of forEach for better performance
    for (const actor of this.actors) {
      if (actor.active) {
        actor.preUpdate();
        actor.update(deltaTime);
        actor.postUpdate();

        // Collect collisions in batch
        const actorCollisions = actor.collisions;
        if (actorCollisions.length > 0) {
          for (const result of actorCollisions) {
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
      }
    }
  }

  private updateEntityPositions(): void {
    this._flaggedEntities.clear();

    // Process followers first (most dependent)
    for (const [entity, followers] of this.followers) {
      const followX = entity.x;
      const followY = entity.y;

      for (const follower of followers) {
        if (!follower.updatedFollowPosition) {
          // Cache group checks to avoid repeated property access
          const hasGroup = follower.group !== null;
          const sameGroup = hasGroup && follower.group === entity.group;

          if (sameGroup) {
            // Get the entity's position relative to its group using the offset
            const entityGroupOffset = entity.groupOffset;
            const groupX = follower.group!.x;
            const groupY = follower.group!.y;

            // Set position using combined offsets relative to group
            follower.setPosition(
              groupX + entityGroupOffset.x + follower.followOffset.x,
              groupY + entityGroupOffset.y + follower.followOffset.y,
            );
          } else if (hasGroup) {
            // Different groups or followed entity not in a group
            follower.setPosition(
              followX + follower.followOffset.x + follower.group!.x + follower.groupOffset.x,
              followY + follower.followOffset.y + follower.group!.y + follower.groupOffset.y,
            );
          } else {
            // No group, just following
            follower.setPosition(followX + follower.followOffset.x, followY + follower.followOffset.y);
          }

          follower.updatedFollowPosition = true;
          this._flaggedEntities.add(follower);

          if (hasGroup) {
            follower.updatedGroupPosition = true;
          }
        }
      }
    }

    // Process remaining group entities
    for (const [group, groupEntities] of this.groupWithEntities) {
      const groupX = group.x;
      const groupY = group.y;

      for (const entity of groupEntities) {
        if (!entity.updatedGroupPosition && !entity.updatedFollowPosition) {
          entity.setPosition(groupX + entity.groupOffset.x, groupY + entity.groupOffset.y);
          entity.updatedGroupPosition = true;
          this._flaggedEntities.add(entity);
        }
      }
    }

    // Reset flags in batch
    this._flaggedEntities.forEach(this._resetPositionFlags);
  }

  private processCollisionsAndOverlaps(): void {
    // Process overlaps if resolver is set and we have overlaps
    if (this.options.overlapResolver && this.sensorOverlaps.length > 0) {
      this.options.overlapResolver(this.sensorOverlaps);
    }

    // Check actor-to-actor collisions if enabled and we have multiple actors
    if (this.options.enableActorCollisions && this.actors.size > 1) {
      this.checkActorCollisions();
    }

    // Process collisions if resolver is set and we have collisions
    if (this.collisions.length > 0 && this.options.collisionResolver) {
      this.options.collisionResolver(this.collisions);
    }

    // Process actor-to-actor collisions if resolver is set and we have collisions
    if (this.actorCollisions.length > 0 && this.options.actorCollisionResolver) {
      this.options.actorCollisionResolver(this.actorCollisions);
    }
  }

  // Optimize the cullOutOfBounds method
  private cullOutOfBounds(): void {
    // Skip if no boundary
    if (!this.options.boundary) return;

    const boundary = this.options.boundary;
    // Pre-allocate removal arrays with reasonable capacity
    const toRemoveActors: Actor[] = [];
    const toRemoveSolids: Solid[] = [];
    const toRemoveSensors: Sensor[] = [];
    const toRemoveGroups: Group[] = [];

    // Cache boundary values to avoid repeated property access
    const boundX = boundary.x;
    const boundY = boundary.y;
    const boundRight = boundX + boundary.width;
    const boundBottom = boundY + boundary.height;

    // Check actors with optimized bounds check
    for (const actor of this.actors) {
      const actorRight = actor.x + actor.width;
      const actorBottom = actor.y + actor.height;

      const inBounds = !(
        actor.x >= boundRight || // Completely to the right
        actorRight <= boundX || // Completely to the left
        actor.y >= boundBottom || // Completely below
        actorBottom <= boundY // Completely above
      );

      if (!inBounds) {
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

    // Check solids with the same optimized bounds check
    for (const solid of this.solids) {
      const solidRight = solid.x + solid.width;
      const solidBottom = solid.y + solid.height;

      const inBounds = !(
        solid.x >= boundRight ||
        solidRight <= boundX ||
        solid.y >= boundBottom ||
        solidBottom <= boundY
      );

      if (!inBounds) {
        if (!solid.isCulled) {
          solid.onCull();
        }
        if (solid.shouldRemoveOnCull) {
          toRemoveSolids.push(solid);
        }
      } else if (solid.isCulled) {
        solid.onUncull();
      }
    }

    // Check sensors with the same optimized bounds check
    for (const sensor of this.sensors) {
      const sensorRight = sensor.x + sensor.width;
      const sensorBottom = sensor.y + sensor.height;

      const inBounds = !(
        sensor.x >= boundRight ||
        sensorRight <= boundX ||
        sensor.y >= boundBottom ||
        sensorBottom <= boundY
      );

      if (!inBounds) {
        if (!sensor.isCulled) {
          sensor.onCull();
        }
        if (sensor.shouldRemoveOnCull) {
          toRemoveSensors.push(sensor);
        }
      } else if (sensor.isCulled) {
        sensor.onUncull();
      }
    }

    // Check groups with the same optimized bounds check
    for (const group of this.groups) {
      const groupRight = group.x + group.width;
      const groupBottom = group.y + group.height;

      const inBounds = !(
        group.x >= boundRight ||
        groupRight <= boundX ||
        group.y >= boundBottom ||
        groupBottom <= boundY
      );

      if (!inBounds) {
        if (!group.isCulled) {
          group.onCull();
        }
        if (group.shouldRemoveOnCull) {
          toRemoveGroups.push(group);
        }
      } else if (group.isCulled) {
        group.onUncull();
      }
    }

    // Batch remove culled entities if any exist
    const actorCount = toRemoveActors.length;
    const solidCount = toRemoveSolids.length;
    const sensorCount = toRemoveSensors.length;
    const groupCount = toRemoveGroups.length;

    if (actorCount + solidCount + sensorCount + groupCount === 0) return;

    // Use for loops instead of forEach for better performance
    for (let i = 0; i < actorCount; i++) {
      this.removeActor(toRemoveActors[i]);
    }

    for (let i = 0; i < solidCount; i++) {
      this.removeSolid(toRemoveSolids[i]);
    }

    for (let i = 0; i < sensorCount; i++) {
      this.removeSensor(toRemoveSensors[i]);
    }

    for (let i = 0; i < groupCount; i++) {
      this.removeGroup(toRemoveGroups[i]);
    }
  }

  private updateSensor(sensor: Sensor, dt: number): void {
    sensor.preUpdate();
    sensor.update(dt);
    sensor.postUpdate();

    const overlaps = sensor.checkActorOverlaps();
    this.sensorOverlaps.push(...overlaps);
  }

  public createEntity(config: PhysicsEntityConfig): Actor | Solid | Sensor | Group {
    if (config.type === 'actor') {
      return this.createActor(config);
    } else if (config.type === 'solid') {
      return this.createSolid(config);
    } else if (config.type === 'sensor') {
      return this.createSensor(config);
    } else if (config.type === 'group') {
      return this.createGroup(config);
    }
    throw new Error(`Invalid entity type: ${config.type}`);
  }

  public addEntity(entity: Entity | Actor | Solid | Sensor | Group): Actor | Solid | Sensor | Group {
    if (!entity || !entity.entityType) {
      throw new Error('Entity is required');
    }
    if (entity.entityType === 'Actor') {
      return this.addActor(entity as Actor);
    } else if (entity.entityType === 'Solid') {
      return this.addSolid(entity as Solid);
    } else if (entity.entityType === 'Sensor') {
      return this.addSensor(entity as Sensor);
    } else if (entity.entityType === 'Group') {
      return this.addGroup(entity as Group);
    }
    throw new Error(`Invalid entity type: ${entity!.entityType}`);
  }

  public removeEntity(entity: Entity | Actor | Solid | Sensor | Group): void {
    if (entity.entityType === 'Actor') {
      this.removeActor(entity as Actor);
    } else if (entity.entityType === 'Solid') {
      this.removeSolid(entity as Solid);
    } else if (entity.entityType === 'Sensor') {
      this.removeSensor(entity as Sensor);
    } else if (entity.entityType === 'Group') {
      this.removeGroup(entity as Group);
    }
  }

  public createActor(config: PhysicsEntityConfig): Actor {
    // Apply default collision settings if not specified in config
    if (this.options.defaultCollisionLayer !== undefined && config.collisionLayer === undefined) {
      config.collisionLayer = this.options.defaultCollisionLayer;
    }
    if (this.options.defaultCollisionMask !== undefined && config.collisionMask === undefined) {
      config.collisionMask = this.options.defaultCollisionMask;
    }

    const actor = config.class ? (new config.class(config) as Actor) : new Actor(config);
    return this.addActor(actor);
  }

  public addActor(actor: Actor): Actor {
    this.entities.add(actor);
    this.actors.add(actor);

    // Add to type index
    if (!this.actorsByType.has(actor.type)) {
      this.actorsByType.set(actor.type, new Set());
    }
    this.actorsByType.get(actor.type)!.add(actor);

    // Add to actor grid if actor collisions are enabled
    if (this.options.enableActorCollisions) {
      actor.updateGridCells();
    }

    return actor;
  }

  public createSensor(config: PhysicsEntityConfig): Sensor {
    // Apply default collision settings if not specified in config
    if (this.options.defaultCollisionLayer !== undefined && config.collisionLayer === undefined) {
      config.collisionLayer = this.options.defaultCollisionLayer;
    }
    if (this.options.defaultCollisionMask !== undefined && config.collisionMask === undefined) {
      config.collisionMask = this.options.defaultCollisionMask;
    }

    const sensor = config.class ? (new config.class(config) as Sensor) : new Sensor(config);
    return this.addSensor(sensor);
  }

  public addSensor(sensor: Sensor): Sensor {
    this.entities.add(sensor);
    this.sensors.add(sensor);
    // Add to type index
    if (!this.sensorsByType.has(sensor.type)) {
      this.sensorsByType.set(sensor.type, new Set());
    }
    this.sensorsByType.get(sensor.type)!.add(sensor);
    return sensor;
  }

  public createSolid(config: PhysicsEntityConfig): Solid {
    // Apply default collision settings if not specified in config
    if (this.options.defaultCollisionLayer !== undefined && config.collisionLayer === undefined) {
      config.collisionLayer = this.options.defaultCollisionLayer;
    }
    if (this.options.defaultCollisionMask !== undefined && config.collisionMask === undefined) {
      config.collisionMask = this.options.defaultCollisionMask;
    }

    const solid = config.class ? (new config.class(config) as Solid) : new Solid(config);
    return this.addSolid(solid);
  }

  public addSolid(solid: Solid): Solid {
    this.entities.add(solid);
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
    this.entities.delete(actor);
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

    // Remove from actor grid
    if (this.options.enableActorCollisions) {
      this.removeActorFromGrid(actor);
    }
  }

  public removeSolid(solid: Solid, destroyView: boolean = true): void {
    this.entities.delete(solid);
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
    this.entities.delete(sensor);
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
    // Early return if entity has no collision mask
    if (entity.collisionMask === 0) return [];

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
    // Pre-allocate result array with a reasonable size to avoid resizing
    const result: Solid[] = [];
    const seen = new Set<Solid>();

    // Cache entity collision layer and mask for faster access
    const entityLayer = entity.collisionLayer;
    const entityMask = entity.collisionMask;

    for (const cell of cells) {
      const gridCell = this.grid.get(cell);
      if (gridCell) {
        for (const solid of gridCell.solids) {
          // Skip already seen solids
          if (seen.has(solid)) continue;

          // Fast collision layer check
          if ((entityLayer & solid.collisionMask) === 0 || (solid.collisionLayer & entityMask) === 0) continue;

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
    // Logger.log('adding follower', entity.type, follower.type);
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

  public addToGroup(group: Group, entity: Entity): Entity {
    if (!this.groupWithEntities.has(group)) {
      this.groupWithEntities.set(group, new Set());
    }
    this.groupWithEntities.get(group)!.add(entity);
    return entity;
  }

  public removeFromGroup(entity: Entity): Entity {
    for (const group of this.groupWithEntities.values()) {
      group.delete(entity);
    }
    return entity;
  }

  public getEntitiesInGroup(group: Group): Entity[] {
    return Array.from(this.groupWithEntities.get(group) || []);
  }

  public removeEntitiesOfGroup(group: Group): Entity[] {
    const entities = Array.from(this.groupWithEntities.get(group) || []) || [];
    entities.forEach((entity) => {
      entity.setGroup(null);
    });
    this.groupWithEntities.delete(group);
    return entities;
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

    // Pre-allocate array with exact size to avoid resizing
    cells.length = (endX - startX) * (endY - startY);

    // Use a single index counter to avoid array.push() operations
    let index = 0;

    // Only check one additional cell in the direction of movement for actors
    // For solids or static bounds, just use the exact cells
    for (let x = startX; x < endX; x++) {
      for (let y = startY; y < endY; y++) {
        // Use template string only once per iteration
        cells[index++] = `${x},${y}`;
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
        this.grid.set(cell, { solids: new Set(), actors: new Set() });
      }
      this.grid.get(cell)!.solids.add(solid);
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
      const gridCell = this.grid.get(cell);
      if (gridCell) {
        gridCell.solids.delete(solid);
        if (gridCell.solids.size === 0 && gridCell.actors.size === 0) {
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
    this.entities.clear();

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

  /**
   * Gets a collision result object from the pool or creates a new one if needed
   */
  private getCollisionResult(): ActorCollisionResult {
    if (this._collisionResultPoolIndex < this._collisionResultPool.length) {
      const result = this._collisionResultPool[this._collisionResultPoolIndex++];
      result.collided = false;
      result.actor = null as any;
      result.normal = undefined;
      result.penetration = 0;
      return result;
    }

    // Create a new object and add it to the pool
    const newResult: ActorCollisionResult = {
      collided: false,
      actor: null as any,
      normal: undefined,
      penetration: 0,
    };

    this._collisionResultPool.push(newResult);
    this._collisionResultPoolIndex++;
    return newResult;
  }

  /**
   * Gets an actor collision object from the pool or creates a new one if needed
   */
  private getActorCollision(): ActorCollision {
    if (this._actorCollisionPoolIndex < this._actorCollisionPool.length) {
      return this._actorCollisionPool[this._actorCollisionPoolIndex++];
    }

    // Create a new object and add it to the pool
    const newCollision: ActorCollision = {
      type: 'unknown|unknown' as `${string}|${string}`,
      actor1: null as any,
      actor2: null as any,
      result: null as any,
    };

    this._actorCollisionPool.push(newCollision);
    this._actorCollisionPoolIndex++;
    return newCollision;
  }

  /**
   * Resets the collision result pools for the next frame
   */
  private resetCollisionPools(): void {
    this._collisionResultPoolIndex = 0;
    this._actorCollisionPoolIndex = 0;
  }

  /**
   * Updates an actor's position in the grid.
   * This is called when an actor moves or when its size changes.
   *
   * @param actor - The actor to update in the grid
   */
  public updateActorInGrid(actor: Actor): void {
    // Skip if actor collisions are disabled
    if (!this.options.enableActorCollisions) return;

    // Skip if actor can't collide
    if (!actor.active || actor.collisionLayer === 0 || actor.collisionMask === 0) {
      // If actor has cells, remove it from them
      if (actor.currentGridCells.length > 0) {
        this.removeActorFromGrid(actor);
      }
      return;
    }

    // First remove from current cells
    this.removeActorFromGrid(actor);

    // Calculate new cells
    const bounds = {
      x: actor.x,
      y: actor.y,
      width: actor.width,
      height: actor.height,
    };

    const cells = this.getCells(bounds);

    // Store new cells in actor
    actor.currentGridCells = cells;

    // Add to new cells
    for (const cell of cells) {
      if (!this.grid.has(cell)) {
        this.grid.set(cell, { solids: new Set(), actors: new Set() });
      }

      const gridCell = this.grid.get(cell)!;
      gridCell.actors.add(actor);
    }
  }

  /**
   * Removes an actor from its current grid cells.
   *
   * @param actor - The actor to remove from the grid
   */
  public removeActorFromGrid(actor: Actor): void {
    const currentCells = actor.currentGridCells;

    for (const cell of currentCells) {
      const gridCell = this.grid.get(cell);

      if (gridCell) {
        gridCell.actors.delete(actor);

        // Remove the cell if it's empty
        if (gridCell.actors.size === 0 && gridCell.solids.size === 0) {
          this.grid.delete(cell);
        }
      }
    }

    // Clear the actor's cells
    actor.currentGridCells = [];
  }

  /**
   * Checks for collisions between all active actors.
   * This is an O(n²) operation, so it can be expensive with many actors.
   */
  private checkActorCollisions(): void {
    // Skip if there are no actors or only one actor
    if (this.actors.size <= 1 || !this.options.enableActorCollisions) return;

    // Clear the checked pairs set and potential collisions
    this._checkedPairs.clear();
    this._potentialCollisions.clear();
    this._activeGridCells.clear();

    // First pass: Mark cells with moving actors as active
    for (const [cellKey, gridCell] of this.grid.entries()) {
      for (const actor of gridCell.actors) {
        if (!actor.active) continue;

        // If actor is moving or recently moved
        if (actor.velocity.x !== 0 || actor.velocity.y !== 0) {
          this._activeGridCells.add(cellKey);
          break;
        }
      }
    }

    // Second pass: Generate potential collision pairs from active cells
    for (const cellKey of this._activeGridCells) {
      const gridCell = this.grid.get(cellKey);
      if (!gridCell || gridCell.actors.size <= 1) continue;

      const actorsInCell = Array.from(gridCell.actors);
      const cellActorCount = actorsInCell.length;

      // Check each actor against others in the same cell
      for (let i = 0; i < cellActorCount; i++) {
        const actor1 = actorsInCell[i];
        if (!actor1.active) continue;

        for (let j = i + 1; j < cellActorCount; j++) {
          const actor2 = actorsInCell[j];
          if (!actor2.active) continue;

          // Create a unique key for this actor pair
          const pairKey = actor1.id < actor2.id ? `${actor1.id}|${actor2.id}` : `${actor2.id}|${actor1.id}`;

          // Skip if we've already checked this pair
          if (this._checkedPairs.has(pairKey)) continue;
          this._checkedPairs.add(pairKey);

          // Fast collision layer check
          if (
            (actor1.collisionLayer & actor2.collisionMask) === 0 &&
            (actor2.collisionLayer & actor1.collisionMask) === 0
          )
            continue;

          // Fast AABB check
          if (
            actor1.x < actor2.x + actor2.width &&
            actor1.x + actor1.width > actor2.x &&
            actor1.y < actor2.y + actor2.height &&
            actor1.y + actor1.height > actor2.y
          ) {
            // Store potential collision pair
            this._potentialCollisions.set(pairKey, [actor1, actor2]);
          }
        }
      }
    }

    // Final pass: Detailed collision checks for potential pairs
    for (const [actor1, actor2] of this._potentialCollisions.values()) {
      // Check for collision
      const collisionResult = actor1.checkActorCollision(actor2);

      if (collisionResult.collided) {
        // Add to actor1's collision list
        actor1.actorCollisions.push(collisionResult);

        // Get a mirrored result from the pool
        const mirroredResult = this.getCollisionResult();
        mirroredResult.collided = true;
        mirroredResult.actor = actor1;

        if (collisionResult.normal) {
          if (!mirroredResult.normal) {
            mirroredResult.normal = { x: 0, y: 0 };
          }
          mirroredResult.normal.x = -collisionResult.normal.x;
          mirroredResult.normal.y = -collisionResult.normal.y;
        } else {
          mirroredResult.normal = undefined;
        }

        mirroredResult.penetration = collisionResult.penetration;

        // Add to actor2's collision list
        actor2.actorCollisions.push(mirroredResult);

        // Get an actor collision from the pool and add to system's collision list
        const actorCollision = this.getActorCollision();
        actorCollision.type = `${actor1.type}|${actor2.type}`;
        actorCollision.actor1 = actor1;
        actorCollision.actor2 = actor2;
        actorCollision.result = collisionResult;
        this.actorCollisions[this._actorCollisionPoolIndex++] = actorCollision;

        // Call collision handlers
        actor1.onActorCollide(collisionResult);
        actor2.onActorCollide(mirroredResult);

        // Resolve the collision
        actor1.resolveActorCollision(collisionResult);
        actor2.resolveActorCollision(mirroredResult);
      }
    }

    // Process collisions with resolver if provided
    if (this._actorCollisionPoolIndex > 0 && this.options.actorCollisionResolver) {
      this.options.actorCollisionResolver(this.actorCollisions.slice(0, this._actorCollisionPoolIndex));
    }
  }

  setCollisionResolver(resolver: (collisions: Collision[]) => void): void {
    this.options.collisionResolver = resolver;
  }

  /**
   * Sets a custom resolver for actor-to-actor collisions.
   *
   * @param resolver - Function to handle actor-to-actor collisions
   */
  public setActorCollisionResolver(resolver: (collisions: ActorCollision[]) => void): void {
    this.options.actorCollisionResolver = resolver;
  }

  /**
   * Returns whether actor-to-actor collision detection is enabled.
   *
   * @returns True if actor collisions are enabled
   */
  public get enableActorCollisions(): boolean {
    return !!this.options.enableActorCollisions;
  }

  /**
   * Enables or disables actor-to-actor collision detection.
   * When enabled, it initializes the grid for all existing actors.
   *
   * @param enabled - Whether to enable actor-to-actor collisions
   */
  public setActorCollisionsEnabled(enabled: boolean): void {
    const wasEnabled = this.options.enableActorCollisions;
    this.options.enableActorCollisions = enabled;

    // If newly enabled, add all actors to the grid
    if (enabled && !wasEnabled) {
      for (const actor of this.actors) {
        actor.updateGridCells();
      }
    } else if (!enabled && wasEnabled) {
      // If newly disabled, clear the actor grid
      this.grid.clear();

      // Clear all actors' grid cells
      for (const actor of this.actors) {
        actor.currentGridCells = [];
      }
    }
  }

  public createGroup(config: PhysicsEntityConfig): Group {
    // Apply default collision settings if not specified in config
    if (this.options.defaultCollisionLayer !== undefined && config.collisionLayer === undefined) {
      config.collisionLayer = this.options.defaultCollisionLayer;
    }
    if (this.options.defaultCollisionMask !== undefined && config.collisionMask === undefined) {
      config.collisionMask = this.options.defaultCollisionMask;
    }

    const group = config.class ? (new config.class(config) as unknown as Group) : new Group(config);
    return this.addGroup(group);
  }

  public addGroup(group: Group): Group {
    this.entities.add(group);
    this.groups.add(group);

    // Add to type index
    if (!this.groupsByType.has(group.type)) {
      this.groupsByType.set(group.type, new Set());
    }
    this.groupsByType.get(group.type)!.add(group);

    return group;
  }

  public removeGroup(group: Group, destroyView: boolean = true): void {
    // Early return if group doesn't exist
    if (!this.groups.has(group)) return;

    this.entities.delete(group);
    this.groups.delete(group);

    // Remove from type index
    const typeSet = this.groupsByType.get(group.type);
    if (typeSet) {
      typeSet.delete(group);
      if (typeSet.size === 0) {
        this.groupsByType.delete(group.type);
      }
    }

    // Get all entities in the group before removing them
    const groupEntities = this.groupWithEntities.get(group);
    if (groupEntities && groupEntities.size > 0) {
      // Create arrays for each entity type to batch process
      const actors: Actor[] = [];
      const solids: Solid[] = [];
      const sensors: Sensor[] = [];

      // Sort entities by type for batch processing
      for (const entity of groupEntities) {
        if (entity.entityType === 'Actor') {
          actors.push(entity as Actor);
        } else if (entity.entityType === 'Solid') {
          solids.push(entity as Solid);
        } else if (entity.entityType === 'Sensor') {
          sensors.push(entity as Sensor);
        }
      }

      // Batch remove entities by type
      for (const actor of actors) {
        this.removeActor(actor, destroyView);
      }

      for (const solid of solids) {
        this.removeSolid(solid, destroyView);
      }

      for (const sensor of sensors) {
        this.removeSensor(sensor, destroyView);
      }
    }

    // Clean up the group's entry in the tracking map
    this.groupWithEntities.delete(group);

    group.onRemoved();
  }

  /**
   * Get all groups of a specific type
   * @param type The type to look for
   * @returns Array of groups matching the type
   */
  public getGroupsByType(type: string | string[]): Group[] {
    if (Array.isArray(type)) {
      // Pre-calculate total size to avoid array resizing
      let totalSize = 0;
      for (const t of type) {
        const set = this.groupsByType.get(t);
        if (set) totalSize += set.size;
      }

      // Pre-allocate result array
      const result = new Array<Group>(totalSize);
      let index = 0;

      // Fill array without using flatMap (more efficient)
      for (const t of type) {
        const set = this.groupsByType.get(t);
        if (set) {
          for (const group of set) {
            result[index++] = group;
          }
        }
      }

      return result;
    }

    return Array.from(this.groupsByType.get(type) || new Set());
  }
}
