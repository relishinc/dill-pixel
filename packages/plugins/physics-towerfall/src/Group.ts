import { Application } from 'dill-pixel';
import { Actor } from './Actor';
import { Entity } from './Entity';
import { Sensor } from './Sensor';
import { Solid } from './Solid';
import { PhysicsEntityConfig } from './types';

export class Group<T extends Application = Application> extends Entity<T> {
  private children: Set<Entity> = new Set();
  private childOffsets: Map<Entity, { x: number; y: number }> = new Map();
  public isStatic: boolean = true;

  public getChildOffset(entity: Entity): { x: number; y: number } {
    return this.childOffsets.get(entity) ?? { x: 0, y: 0 };
  }

  set x(value: number) {
    this._x = value;
  }

  get x(): number {
    return this._x;
  }

  set y(value: number) {
    this._y = value;
  }

  get y(): number {
    return this._y;
  }

  constructor(config?: PhysicsEntityConfig) {
    super(config);
  }

  /**
   * Add an entity to this container
   * @param entity The entity to add
   * @param preserveWorldPosition If true, the entity's world position will be preserved
   */
  public add(entity: Entity, preserveWorldPosition: boolean = true): void {
    if (this.children.has(entity)) return;

    const worldX = preserveWorldPosition ? entity.x : this.x + entity.x;
    const worldY = preserveWorldPosition ? entity.y : this.y + entity.y;

    // Store the relative offset from container
    this.childOffsets.set(entity, {
      x: worldX - this.x,
      y: worldY - this.y,
    });

    this.children.add(entity);
    entity.group = this;
  }

  /**
   * Remove an entity from this container
   */
  public removeChild(entity: Entity): void {
    if (!this.children.has(entity)) return;

    this.children.delete(entity);
    this.childOffsets.delete(entity);
    entity.group = null;
  }

  /**
   * Move the container and all its children
   */
  public move(x: number, y: number): void {
    // Update container position
    this._x += x;
    this._y += y;

    // Move all children
    for (const child of this.children) {
      if (child instanceof Actor) {
        child.moveX(x);
        child.moveY(y);
      } else if (child instanceof Solid) {
        child.x += x;
        child.y += y;
      } else if (child instanceof Sensor) {
        child.x += x;
        child.y += y;
      }
    }

    this.updateView();
  }

  /**
   * Force move the container and all its children to an absolute position
   */
  public moveTo(x: number, y: number): void {
    const dx = x - this.x;
    const dy = y - this.y;
    this.move(dx, dy);
  }

  /**
   * Update the container and all its children
   */
  public update(dt: number): void {
    super.update(dt);

    // Update child offsets based on their current positions
    for (const child of this.children) {
      this.childOffsets.set(child, {
        x: child.x - this.x,
        y: child.y - this.y,
      });
    }
  }

  /**
   * Get all children of a specific type
   */
  public getChildrenByType<E extends Entity>(type: new (...args: any[]) => E): E[] {
    return Array.from(this.children).filter((child): child is E => child instanceof type);
  }

  /**
   * Get all actors in this container
   */
  public getActors(): Actor[] {
    return this.getChildrenByType(Actor);
  }

  /**
   * Get all solids in this container
   */
  public getSolids(): Solid[] {
    return this.getChildrenByType(Solid);
  }

  /**
   * Get all sensors in this container
   */
  public getSensors(): Sensor[] {
    return this.getChildrenByType(Sensor);
  }

  public destroy(): void {
    super.destroy();
    this.children.clear();
    this.childOffsets.clear();
  }
}
