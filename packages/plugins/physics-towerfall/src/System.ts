import { Container, Graphics } from 'pixi.js';
import { Actor } from './Actor';
import { Sensor } from './Sensor';
import { Solid } from './Solid';
import TowerfallPhysicsPlugin from './TowerfallPhysicsPlugin';
import { Collision, PhysicsEntityConfig, PhysicsEntityView, Rectangle, SensorOverlap } from './types';

export interface PhysicsSystemOptions {
  plugin: TowerfallPhysicsPlugin;
  gridSize: number;
  gravity: number;
  maxVelocity: number;
  debug?: boolean;
  boundary?: Rectangle;
  shouldCull?: boolean;
  collisionResolver?: (collisions: Collision[]) => void;
  overlapResolver?: (overlaps: SensorOverlap[]) => void;
}

export class System {
  private readonly options: PhysicsSystemOptions;
  // Public collections
  public actors: Set<Actor> = new Set();
  public solids: Set<Solid> = new Set();
  public sensors: Set<Sensor> = new Set();
  // Type-based lookup maps
  private actorsByType: Map<string, Set<Actor>> = new Map();
  private solidsByType: Map<string, Set<Solid>> = new Map();
  private sensorsByType: Map<string, Set<Sensor>> = new Map();

  private grid: Map<string, Set<Solid>> = new Map();
  private collisions: Collision[] = [];
  private sensorOverlaps: SensorOverlap[] = [];
  // debugging
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

    // Update solids
    for (const solid of this.solids) {
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
      this.updateSensor(sensor, deltaTime);
    }

    // Update actors
    for (const actor of this.actors) {
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
    sensor.update(dt);
    const overlaps = sensor.checkActorOverlaps();
    this.sensorOverlaps.push(...overlaps);
  }

  public addActor(actor: Actor): void {
    this.actors.add(actor);
    // Add to type index
    if (!this.actorsByType.has(actor.type)) {
      this.actorsByType.set(actor.type, new Set());
    }
    this.actorsByType.get(actor.type)!.add(actor);
  }

  public createActor(config: PhysicsEntityConfig): Actor {
    const actor = new Actor(config);
    this.addActor(actor);
    return actor;
  }

  public createSensor(config: PhysicsEntityConfig): Sensor {
    const sensor = new Sensor(config);
    this.addSensor(sensor);
    return sensor;
  }

  public addSensor(sensor: Sensor): void {
    this.sensors.add(sensor);
    // Add to type index
    if (!this.sensorsByType.has(sensor.type)) {
      this.sensorsByType.set(sensor.type, new Set());
    }
    this.sensorsByType.get(sensor.type)!.add(sensor);
  }

  public createSolid(config: PhysicsEntityConfig): Solid {
    const solid = new Solid(config);
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

    const result: Solid[] = [];
    const seen = new Set<Solid>();

    for (const cell of cells) {
      const solids = this.grid.get(cell);
      if (solids) {
        for (const solid of solids) {
          // Skip if we've already checked this solid
          if (seen.has(solid)) continue;
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

  public destroy(): void {
    this.debug = false;
    this.gravity = 0;
    this.maxVelocity = 0;

    this.grid.clear();
    this.solids.clear();
    this.actors.clear();
    this.sensors.clear();

    this.solidsByType.clear();
    this.actorsByType.clear();
    this.sensorsByType.clear();
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
}
