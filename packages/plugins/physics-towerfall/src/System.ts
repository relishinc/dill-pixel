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
}

export class PhysicsSystem {
  private actors: Set<Actor> = new Set();
  private solids: Set<Solid> = new Set();
  private grid: Map<string, Set<Solid>> = new Map();
  private debugGfx: Graphics;
  private readonly options: PhysicsSystemOptions;

  constructor(options: PhysicsSystemOptions) {
    this.options = options;
  }

  public update(dt: number): void {
    // Convert delta time to seconds
    const deltaTime = dt / 60;

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
        if (collision.normal && actor.shape === 'circle') {
          // Project velocity onto the collision normal
          const dot = actor.velocity.x * collision.normal.x + actor.velocity.y * collision.normal.y;

          // Remove the velocity component in the normal direction
          actor.velocity.x -= dot * collision.normal.x;
          actor.velocity.y -= dot * collision.normal.y;
        } else {
          actor.velocity.x = 0;
        }
        actor.onCollideX?.(step);
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
        if (collision.normal && actor.shape === 'circle') {
          // Project velocity onto the collision normal
          const dot = actor.velocity.x * collision.normal.x + actor.velocity.y * collision.normal.y;

          // Remove the velocity component in the normal direction
          actor.velocity.x -= dot * collision.normal.x;
          actor.velocity.y -= dot * collision.normal.y;
        } else {
          actor.velocity.y = 0;
        }
        actor.onCollideY?.(step);
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
          if (result.collided) return result;
        } else if (actor.shape === 'circle') {
          const result = this.circleToRect(actor.getCircle(), solid.getBounds());
          if (result.collided) return result;
        } else if (solid.shape === 'circle') {
          const result = this.circleToRect(solid.getCircle(), actor.getBounds());
          if (result.collided) return result;
        } else {
          if (this.rectToRect(bounds, solid.getBounds())) {
            return { collided: true };
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

  private rectToRect(a: Rectangle, b: Rectangle): boolean {
    return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
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
    gfx.lineStyle(1, 0x666666, 0.5);
    for (const cell of this.grid.keys()) {
      const [x, y] = cell.split(',').map(Number);
      gfx.rect(x * this.options.gridSize, y * this.options.gridSize, this.options.gridSize, this.options.gridSize);
    }

    // Draw solids
    gfx.lineStyle(2, 0x00ff00);
    for (const solid of this.solids) {
      if (solid.shape === 'circle') {
        gfx.circle(solid.x, solid.y, solid.radius!);
      } else {
        gfx.rect(solid.x, solid.y, solid.width, solid.height);
      }
    }

    // Draw actors and their collision normals
    for (const actor of this.actors) {
      // Draw actor shape
      gfx.lineStyle(2, 0xff0000);
      if (actor.shape === 'circle') {
        gfx.circle(actor.x, actor.y, actor.radius!);
      } else {
        gfx.rect(actor.x, actor.y, actor.width, actor.height);
      }

      // Check and draw collision normals
      const bounds = this.getActorBounds(actor, actor.x, actor.y);
      const collision = this.checkCollision(actor, bounds);

      if (collision.collided && collision.normal) {
        // Draw collision normal
        const normalLength = 20;
        gfx.lineStyle(2, 0xffff00);
        gfx.moveTo(actor.x, actor.y);
        gfx.lineTo(actor.x + collision.normal.x * normalLength, actor.y + collision.normal.y * normalLength);

        // Draw velocity vector
        gfx.lineStyle(2, 0x00ffff);
        gfx.moveTo(actor.x, actor.y);
        const velocityScale = 0.1;
        gfx.lineTo(actor.x + actor.velocity.x * velocityScale, actor.y + actor.velocity.y * velocityScale);
      }
    }
  }
}
