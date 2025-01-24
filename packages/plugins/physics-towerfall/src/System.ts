import { PointLike, resolvePointLike } from 'dill-pixel';
import { Container, Graphics } from 'pixi.js';
import { Actor } from './Actor';
import { Solid } from './Solid';
import TowerfallPhysicsPlugin from './TowerfallPhysicsPlugin';
import { PhysicsBodyConfig, PhysicsObjectView, Rectangle, Vector2 } from './types';

export interface PhysicsSystemOptions {
  plugin: TowerfallPhysicsPlugin;
  gridSize: number;
  gravity: number;
  maxVelocity: number;
  debug?: boolean;
}

export interface CollisionResult {
  collided: boolean;
  normal?: Vector2;
  penetration?: number;
  restitution?: number;
}

export class System {
  private readonly options: PhysicsSystemOptions;
  private actors: Set<Actor> = new Set();
  private solids: Set<Solid> = new Set();
  private grid: Map<string, Set<Solid>> = new Map();
  // debugging
  private _debugContainer: Container;
  private _debugGfx: Graphics | null = null;
  private _debug: boolean = false;

  set debug(value: boolean) {
    this._debug = value;

    if (this._debug) {
      if (!this._debugContainer) {
        this._debugContainer = this.options.plugin.container.addChild(new Container());
        this._debugGfx = new Graphics();
        this._debugContainer.addChild(this._debugGfx);
      }
    } else {
      this._debugGfx?.clear();
      this._debugContainer?.removeChildren();
      this._debugContainer?.destroy();
    }
  }

  set gridSize(value: number) {
    this.options.gridSize = value;
    this.grid.clear();

    for (const solid of this.solids) {
      this.addSolidToGrid(solid);
    }
  }

  constructor(options: PhysicsSystemOptions) {
    this.options = options;
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

  public createActor(position: PointLike, bodyConfig: PhysicsBodyConfig, view: PhysicsObjectView): Actor {
    const { x, y } = resolvePointLike(position);
    const actor = new Actor(x, y, bodyConfig, view);
    this.actors.add(actor);
    actor.updateView();
    return actor;
  }

  public createSolid(position: PointLike, bodyConfig: PhysicsBodyConfig, view: PhysicsObjectView): Solid {
    const { x, y } = resolvePointLike(position);
    const solid = new Solid(x, y, bodyConfig, view);
    this.solids.add(solid);
    // Add to spatial grid
    this.addSolidToGrid(solid);
    solid.updateView();

    return solid;
  }

  public removeActor(actor: Actor): void {
    this.actors.delete(actor);
  }

  public removeSolid(solid: Solid): void {
    this.solids.delete(solid);
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

  public destroy(): void {
    this.debug = false;
    this.grid.clear();
    this.solids.clear();
    this.actors.clear();
  }
}
