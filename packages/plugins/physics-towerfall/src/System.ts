import { Container, Graphics } from 'pixi.js';
import { Actor } from './Actor';
import { Solid } from './Solid';
import { Circle, PhysicsBodyConfig, PhysicsObjectView, Rectangle, Vector2 } from './types';

export interface PhysicsSystemOptions {
  gridSize: number;
  gravity: number;
  maxVelocity: number;
}

export interface CollisionResult {
  collided: boolean;
  normal?: Vector2;
  penetration?: number;
  restitution?: number;
}

export class System {
  private actors: Set<Actor> = new Set();
  private solids: Set<Solid> = new Set();
  private movingSolids: Set<Solid> = new Set();
  private grid: Map<string, Set<Solid>> = new Map();
  private debugGfx: Graphics;
  private readonly options: PhysicsSystemOptions;

  constructor(options: PhysicsSystemOptions) {
    this.options = options;
  }

  public addMovingSolid(solid: Solid): void {
    this.movingSolids.add(solid);
  }

  public removeMovingSolid(solid: Solid): void {
    this.movingSolids.delete(solid);
  }

  public update(dt: number): void {
    // Convert delta time to seconds
    const deltaTime = dt / 60;

    // First update moving solids
    for (const solid of this.movingSolids) {
      // Calculate movement delta
      const dx = solid.x - solid.lastX;
      const dy = solid.y - solid.lastY;

      if (dx !== 0 || dy !== 0) {
        // Find all actors that are riding this solid
        for (const actor of this.actors) {
          if (actor.isRiding(solid)) {
            // Move actor with solid, but only by half the movement to prevent overshooting
            if (dx !== 0) {
              this.moveX(actor, dx * 0.5);
            }
            if (dy !== 0) {
              this.moveY(actor, dy);
            }
          }
        }
      }
    }

    // Then update actors
    for (const actor of this.actors) {
      this.updateActor(actor, deltaTime);
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
      this.moveX(actor, actor.velocity.x * dt);
    }

    // Move vertically
    if (actor.velocity.y !== 0) {
      this.moveY(actor, actor.velocity.y * dt);
    }

    // Update view
    actor.updateView();
  }

  private moveX(actor: Actor, amount: number): void {
    const step = Math.sign(amount);
    const steps = Math.abs(Math.round(amount));

    for (let i = 0; i < steps; i++) {
      const nextX = actor.x + step;
      const bounds = this.getActorBounds(actor, nextX, actor.y);
      const collision = this.checkCollision(actor, bounds);

      if (collision.collided) {
        // Move actor out of collision by penetration amount if available
        if (collision.normal && collision.penetration) {
          actor.x += collision.normal.x * collision.penetration + collision.restitution! * collision.normal.x;
        }

        // Pass direction, normal, and penetration to callback
        actor.onCollideX?.(step, collision.normal, collision.penetration);
        break;
      }

      actor.x = nextX;
    }
  }

  private moveY(actor: Actor, amount: number): void {
    const step = Math.sign(amount);
    const steps = Math.abs(Math.round(amount));

    for (let i = 0; i < steps; i++) {
      const nextY = actor.y + step;
      const bounds = this.getActorBounds(actor, actor.x, nextY);
      const collision = this.checkCollision(actor, bounds);

      if (collision.collided) {
        // Move actor out of collision by penetration amount if available
        if (collision.normal && collision.penetration) {
          actor.y += collision.normal.y * collision.penetration + collision.restitution! * collision.normal.y;
        }

        // Pass direction, normal, and penetration to callback
        actor.onCollideY?.(step, collision.normal, collision.penetration);
        break;
      }

      actor.y = nextY;
    }
  }

  private checkCollision(actor: Actor, bounds: Rectangle): CollisionResult {
    const cells = this.getCells(bounds);

    for (const cell of cells) {
      const solids = this.grid.get(cell);
      if (!solids) continue;

      for (const solid of solids) {
        if (actor.shape === 'circle' && solid.shape === 'circle') {
          const result = this.circleToCircle(actor.getCircle(), solid.getCircle());
          if (result.collided) {
            result.restitution = solid.restitution + actor.restitution;
            return result;
          }
        } else if (actor.shape === 'circle') {
          const result = this.circleToRect(actor.getCircle(), solid.getBounds());
          if (result.collided) {
            result.restitution = solid.restitution + actor.restitution;
            return result;
          }
        } else if (solid.shape === 'circle') {
          const result = this.circleToRect(solid.getCircle(), actor.getBounds());
          if (result.collided) {
            result.restitution = solid.restitution + actor.restitution;
            return result;
          }
        } else {
          const result = this.rectToRect(bounds, solid.getBounds());
          if (result.collided) {
            result.restitution = solid.restitution + actor.restitution;
            return result;
          }
        }
      }
    }

    return { collided: false };
  }

  private circleToCircle(a: Circle, b: Circle): CollisionResult {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    const distanceSquared = dx * dx + dy * dy;
    const radiusSum = a.radius + b.radius;

    if (distanceSquared <= radiusSum * radiusSum) {
      const distance = Math.sqrt(distanceSquared);
      const penetration = radiusSum - distance;
      const normal = distance === 0 ? { x: 1, y: 0 } : { x: dx / distance, y: dy / distance };

      return {
        collided: true,
        normal,
        penetration,
      };
    }

    return { collided: false };
  }

  private circleToRect(circle: Circle, rect: Rectangle): CollisionResult {
    // Find the closest point to the circle within the rectangle
    const closestX = Math.max(rect.x, Math.min(circle.x, rect.x + rect.width));
    const closestY = Math.max(rect.y, Math.min(circle.y, rect.y + rect.height));

    // Calculate the vector from closest point to circle center
    const dx = circle.x - closestX;
    const dy = circle.y - closestY;
    const distanceSquared = dx * dx + dy * dy;

    // If the distance is less than the circle's radius, an intersection occurs
    if (distanceSquared <= circle.radius * circle.radius) {
      const distance = Math.sqrt(distanceSquared);

      // If we're at a distance, use the vector to circle center as normal
      if (distance > 0) {
        return {
          collided: true,
          normal: {
            x: dx / distance,
            y: dy / distance,
          },
          penetration: circle.radius - distance,
        };
      }

      // If we're at zero distance (inside), push out in the shortest direction
      const toLeft = circle.x - rect.x;
      const toRight = rect.x + rect.width - circle.x;
      const toTop = circle.y - rect.y;
      const toBottom = rect.y + rect.height - circle.y;
      const minDist = Math.min(toLeft, toRight, toTop, toBottom);

      if (minDist === toLeft) return { collided: true, normal: { x: -1, y: 0 }, penetration: toLeft };
      if (minDist === toRight) return { collided: true, normal: { x: 1, y: 0 }, penetration: toRight };
      if (minDist === toTop) return { collided: true, normal: { x: 0, y: -1 }, penetration: toTop };
      return { collided: true, normal: { x: 0, y: 1 }, penetration: toBottom };
    }

    return { collided: false };
  }

  private rectToRect(a: Rectangle, b: Rectangle): CollisionResult {
    // Check if rectangles overlap
    if (!(a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y)) {
      return { collided: false };
    }

    // Calculate overlap on each axis
    const overlapX = Math.min(a.x + a.width - b.x, b.x + b.width - a.x);
    const overlapY = Math.min(a.y + a.height - b.y, b.y + b.height - a.y);

    // Use the smallest overlap to determine the collision normal and penetration
    if (overlapX < overlapY) {
      // X-axis collision
      const fromRight = a.x + a.width / 2 > b.x + b.width / 2;
      return {
        collided: true,
        normal: { x: fromRight ? 1 : -1, y: 0 },
        penetration: overlapX,
      };
    } else {
      // Y-axis collision
      const fromBottom = a.y + a.height / 2 > b.y + b.height / 2;
      return {
        collided: true,
        normal: { x: 0, y: fromBottom ? 1 : -1 },
        penetration: overlapY,
      };
    }
  }

  private getCells(bounds: Rectangle): string[] {
    const cells: string[] = [];
    const { gridSize } = this.options;

    const startX = Math.floor(bounds.x / gridSize);
    const startY = Math.floor(bounds.y / gridSize);
    const endX = Math.ceil((bounds.x + bounds.width) / gridSize);
    const endY = Math.ceil((bounds.y + bounds.height) / gridSize);

    for (let x = startX; x <= endX; x++) {
      for (let y = startY; y <= endY; y++) {
        cells.push(`${x},${y}`);
      }
    }

    return cells;
  }

  private getActorBounds(actor: Actor, x: number, y: number): Rectangle {
    if (actor.shape === 'circle') {
      return {
        x: x - actor.radius!,
        y: y - actor.radius!,
        width: actor.radius! * 2,
        height: actor.radius! * 2,
      };
    }
    return {
      x,
      y,
      width: actor.width,
      height: actor.height,
    };
  }

  public createActor(x: number, y: number, bodyConfig: PhysicsBodyConfig, view?: PhysicsObjectView): Actor {
    const actor = new Actor(x, y, bodyConfig, view);
    this.actors.add(actor);
    return actor;
  }

  public createSolid(x: number, y: number, bodyConfig: PhysicsBodyConfig, view?: PhysicsObjectView): Solid {
    const solid = new Solid(x, y, bodyConfig, view);
    this.solids.add(solid);

    // Add to spatial grid
    const bounds = solid.getBounds();
    const cells = this.getCells(bounds);

    for (const cell of cells) {
      if (!this.grid.has(cell)) {
        this.grid.set(cell, new Set());
      }
      this.grid.get(cell)!.add(solid);
    }

    return solid;
  }

  public removeActor(actor: Actor): void {
    this.actors.delete(actor);
  }

  public removeSolid(solid: Solid): void {
    this.solids.delete(solid);

    // Remove from spatial grid
    const bounds = solid.getBounds();
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

  public debugRender(container: Container): void {
    if (!this.debugGfx) {
      this.debugGfx = new Graphics();
      container.addChild(this.debugGfx);
    }
    const gfx = this.debugGfx;
    gfx.clear();

    // Draw grid
    for (const cell of this.grid.keys()) {
      const [x, y] = cell.split(',').map(Number);
      gfx.rect(x * this.options.gridSize, y * this.options.gridSize, this.options.gridSize, this.options.gridSize);
    }
    gfx.stroke({ color: 0x00ff00, width: 1, pixelLine: true, join: 'miter', cap: 'butt' });

    // Draw solids
    for (const solid of this.solids) {
      if (solid.shape === 'circle') {
        gfx.circle(solid.x, solid.y, solid.radius!);
      } else {
        gfx.rect(solid.x, solid.y, solid.width, solid.height);
      }
    }
    gfx.stroke({ color: 0xf0f0f0, width: 1, alignment: 0.5 });

    // Draw actors and their collision normals
    for (const actor of this.actors) {
      // Draw actor shape
      if (actor.shape === 'circle') {
        gfx.circle(actor.x, actor.y, actor.radius!);
      } else {
        gfx.rect(actor.x, actor.y, actor.width, actor.height);
      }

      gfx.stroke({ color: 0xff0000, width: 1, alignment: 0.5 });
      // Check and draw collision normals
      //   const bounds = this.getActorBounds(actor, actor.x, actor.y);
      //   const collision = this.checkCollision(actor, bounds);

      //   if (collision.collided && collision.normal) {
      //     // Draw collision normal
      //     const normalLength = 20;
      //     gfx.moveTo(actor.x, actor.y);
      //     gfx.lineTo(actor.x + collision.normal.x * normalLength, actor.y + collision.normal.y * normalLength);

      //     // Draw velocity vector
      //     gfx.moveTo(actor.x, actor.y);
      //     const velocityScale = 0.1;
      //     gfx.lineTo(actor.x + actor.velocity.x * velocityScale, actor.y + actor.velocity.y * velocityScale);
      //   }

      //   gfx.stroke({ color: 0xffff00, width: 1 });
    }
  }

  public updateSolidPosition(solid: Solid, newPosition: { x: number; y: number }): void {
    // Remove from old grid cells
    const oldBounds = solid.getBounds();
    const oldCells = this.getCells(oldBounds);

    for (const cell of oldCells) {
      const solids = this.grid.get(cell);
      if (solids) {
        solids.delete(solid);
        if (solids.size === 0) {
          this.grid.delete(cell);
        }
      }
    }
    // Add to new grid cells
    const newBounds = { x: newPosition.x, y: newPosition.y, width: solid.width, height: solid.height };
    const newCells = this.getCells(newBounds);
    for (const cell of newCells) {
      if (!this.grid.has(cell)) {
        this.grid.set(cell, new Set());
      }
      this.grid.get(cell)!.add(solid);
    }

    // Update position
    solid.updateView();
  }
}
