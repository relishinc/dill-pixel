import { Container, Graphics } from 'pixi.js';
import { Actor } from './Actor';
import { Solid } from './Solid';
import TowerfallPhysicsPlugin from './TowerfallPhysicsPlugin';
import { PhysicsEntityConfig, PhysicsEntityView, Rectangle, Vector2 } from './types';

export interface PhysicsSystemOptions {
  plugin: TowerfallPhysicsPlugin;
  gridSize: number;
  gravity: number;
  maxVelocity: number;
  debug?: boolean;
  boundary?: Rectangle;
  shouldCull?: boolean;
}

export interface CollisionResult {
  collided: boolean;
  normal?: Vector2;
  penetration?: number;
}

export class System {
  private readonly options: PhysicsSystemOptions;
  private actors: Set<Actor> = new Set();
  private solids: Set<Solid> = new Set();
  private grid: Map<string, Set<Solid>> = new Map();
  // Type-based lookup maps
  private actorsByType: Map<string, Set<Actor>> = new Map();
  private solidsByType: Map<string, Set<Solid>> = new Map();
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

  set maxVelocity(value: number) {
    this.options.maxVelocity = value;
  }

  constructor(options: PhysicsSystemOptions) {
    this.options = {
      ...options,
      shouldCull: options.shouldCull ?? false,
    };
    this.debug = options.debug ?? false;
  }

  public update(dt: number): void {
    // Convert delta time to seconds
    const deltaTime = dt / 60;

    // Update solids
    for (const solid of this.solids) {
      if (solid.moving) {
        // Remove from old grid cells
        this.removeSolidFromGrid(solid);

        // Move the solid (which will handle pushing/carrying actors)
        solid.move(0, 0, this.actors);

        // Add to new grid cells
        this.addSolidToGrid(solid);
      }
    }

    // Update actors
    for (const actor of this.actors) {
      this.updateActor(actor, deltaTime);
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
    // Apply gravity
    actor.velocity.y += this.options.gravity * dt;

    // Clamp velocity
    actor.velocity.x = Math.min(Math.max(actor.velocity.x, -this.options.maxVelocity), this.options.maxVelocity);
    actor.velocity.y = Math.min(Math.max(actor.velocity.y, -this.options.maxVelocity), this.options.maxVelocity);

    // Move horizontally
    if (actor.velocity.x !== 0) {
      actor.moveX(actor.velocity.x * dt);
    }

    // Move vertically
    if (actor.velocity.y !== 0) {
      actor.moveY(actor.velocity.y * dt);
    }

    // Update view
    actor.updateView();
  }

  public addActor(actor: Actor): void {
    this.actors.add(actor);
    // Add to type index
    if (!this.actorsByType.has(actor.type)) {
      this.actorsByType.set(actor.type, new Set());
    }
    this.actorsByType.get(actor.type)!.add(actor);
    console.log(this.actorsByType);
    actor.updateView();
  }

  public createActor(config: PhysicsEntityConfig, view: PhysicsEntityView): Actor {
    const actor = new Actor(config, view);
    this.addActor(actor);
    return actor;
  }

  public createSolid(config: PhysicsEntityConfig, view: PhysicsEntityView): Solid {
    const solid = new Solid(config, view);
    this.solids.add(solid);
    // Add to type index
    if (!this.solidsByType.has(solid.type)) {
      this.solidsByType.set(solid.type, new Set());
    }
    this.solidsByType.get(solid.type)!.add(solid);
    // Add to spatial grid
    this.addSolidToGrid(solid);
    solid.updateView();

    return solid;
  }

  public removeActor(actor: Actor): void {
    this.actors.delete(actor);
    // Remove from type index
    const typeSet = this.actorsByType.get(actor.type);
    if (typeSet) {
      typeSet.delete(actor);
      if (typeSet.size === 0) {
        this.actorsByType.delete(actor.type);
      }
    }
  }

  public removeSolid(solid: Solid): void {
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
  }

  public moveSolid(solid: Solid, x: number, y: number): void {
    // Remove from old grid cells
    this.removeSolidFromGrid(solid);

    // Move the solid (which will handle pushing/carrying actors)
    solid.move(x, y, this.actors);

    // Add to new grid cells
    this.addSolidToGrid(solid);

    solid.updateView();
  }

  public getSolidsAt(x: number, y: number, actor: Actor): Solid[] {
    const bounds = {
      x,
      y,
      width: actor.width,
      height: actor.height,
    };

    // Calculate movement direction from current position to check position
    const dx = x - actor.x;
    const dy = y - actor.y;

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

          // Only add solids that actually overlap with the actor's bounds
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
      gfx.stroke({ color: 0x0000ff, width: 2, alignment: 0.5 });
    }

    // Draw grid
    for (const cell of this.grid.keys()) {
      const [x, y] = cell.split(',').map(Number);
      gfx.rect(x * this.options.gridSize, y * this.options.gridSize, this.options.gridSize, this.options.gridSize);
    }
    gfx.stroke({ color: 0x00ff00, width: 1, pixelLine: true, join: 'miter', cap: 'butt' });

    // Draw solids
    for (const solid of this.solids) {
      gfx.rect(solid.x, solid.y, solid.width, solid.height);
    }
    gfx.stroke({ color: 0xf0f0f0, width: 1, alignment: 0.5 });

    // Draw actors
    for (const actor of this.actors) {
      gfx.rect(actor.x, actor.y, actor.width, actor.height);
      gfx.stroke({ color: 0xff0000, width: 1, alignment: 0.5 });
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
  public getActorsByType(type: string): Actor[] {
    return Array.from(this.actorsByType.get(type) || new Set());
  }

  /**
   * Get all solids of a specific type
   * @param type The type to look for
   * @returns Array of solids matching the type
   */
  public getSolidsByType(type: string): Solid[] {
    return Array.from(this.solidsByType.get(type) || new Set());
  }

  public destroy(): void {
    this.debug = false;
    this.grid.clear();
    this.solids.clear();
    this.actors.clear();
    this.actorsByType.clear();
    this.solidsByType.clear();
  }

  private cullOutOfBounds(): void {
    const boundary = this.options.boundary!;
    const toRemoveActors: Actor[] = [];
    const toRemoveSolids: Solid[] = [];

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

    // Remove culled entities that should be removed
    for (const actor of toRemoveActors) {
      this.removeActor(actor);
    }
    for (const solid of toRemoveSolids) {
      this.removeSolid(solid);
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

  private isInBounds(entity: Actor | Solid, boundary: Rectangle): boolean {
    // Check if any part of the entity overlaps with the boundary
    return (
      entity.x < boundary.x + boundary.width &&
      entity.x + entity.width > boundary.x &&
      entity.y < boundary.y + boundary.height &&
      entity.y + entity.height > boundary.y
    );
  }
}
