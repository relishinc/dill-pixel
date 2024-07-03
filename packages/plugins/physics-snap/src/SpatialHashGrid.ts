import { Graphics, Rectangle } from 'pixi.js';
import { Entity } from './Entity';
import { SpatialHashGridFilter } from './types';
import { System } from './System';

type GridKey = string;

export class SpatialHashGrid {
  private cells: Map<GridKey, Set<Entity>> = new Map();

  constructor(cellSize: number, insertEntities: boolean = false) {
    this._cellSize = cellSize;
    if (insertEntities) {
      System.all.forEach((entity) => this.insert(entity));
    }
  }

  private _cellSize: number;

  get cellSize(): number {
    return this._cellSize;
  }

  set cellSize(size: number) {
    this._cellSize = size;
    this.cells.clear();
    this.updateAll();
  }

  destroy() {
    this.cells.clear();
  }

  insert(entity: Entity): void {
    const bounds = entity.boundingRect;

    const startX = Math.floor(bounds.x / this._cellSize);
    const startY = Math.floor(bounds.y / this._cellSize);
    const endX = Math.floor((bounds.x + bounds.width) / this._cellSize);
    const endY = Math.floor((bounds.y + bounds.height) / this._cellSize);

    for (let x = startX; x <= endX; x++) {
      for (let y = startY; y <= endY; y++) {
        const key = this.getGridKey(x, y); // Use cell coordinates directly
        if (!this.cells.has(key)) {
          this.cells.set(key, new Set());
        }

        this.cells.get(key)?.add(entity);
      }
    }
  }

  remove(entity: Entity): void {
    this.cells.forEach((entities) => {
      entities.delete(entity);
    });
  }

  query<T extends Entity = Entity>(
    range: Rectangle,
    filter?: SpatialHashGridFilter,
    dx: number = 0,
    dy: number = 0,
    debug?: boolean,
  ): Set<T> {
    void debug;
    const expandedRange = new Rectangle(
      range.x - Math.abs(dx),
      range.y - Math.abs(dy),
      range.width + 2 * Math.abs(dx),
      range.height + 2 * Math.abs(dy),
    );
    const foundEntities = new Set<T>();

    // Ensure we handle negative or reverse ranges appropriately
    const startX = Math.floor(Math.min(expandedRange.x, expandedRange.x + expandedRange.width) / this._cellSize);
    const startY = Math.floor(Math.min(expandedRange.y, expandedRange.y + expandedRange.height) / this._cellSize);
    const endX = Math.floor(Math.max(expandedRange.x, expandedRange.x + expandedRange.width) / this._cellSize);
    const endY = Math.floor(Math.max(expandedRange.y, expandedRange.y + expandedRange.height) / this._cellSize);

    for (let x = startX; x <= endX; x++) {
      for (let y = startY; y <= endY; y++) {
        const key = this.getGridKey(x, y); // Use cell coordinates directly
        const cellEntities = this.cells.get(key);
        if (cellEntities) {
          cellEntities.forEach((entity) => {
            if (filter === undefined) {
              foundEntities.add(entity as T);
            } else {
              switch (typeof filter) {
                case 'string':
                  if (
                    filter === entity.type ||
                    (filter === 'solid' && entity.isSolid) ||
                    (filter === 'actor' && entity.isActor) ||
                    (filter === 'sensor' && entity.isSensor)
                  ) {
                    foundEntities.add(entity as T);
                  }
                  break;
                case 'object':
                  if (Array.isArray(filter) && filter.includes(entity.type)) {
                    foundEntities.add(entity as T);
                  }
                  break;
                case 'function':
                  if (filter(entity)) {
                    foundEntities.add(entity as T);
                  }
                  break;
              }
            }
          });
        }
      }
    }
    return foundEntities;
  }

  updateAll() {
    System.all.forEach((entity) => this.updateEntity(entity));
  }

  updateEntity(entity: Entity): void {
    // Remove the entity from its current cell
    this.remove(entity);

    // Re-insert the entity into the grid based on its new position
    this.insert(entity);
  }

  draw(gfx: Graphics) {
    const rects = this._getDebugRects();
    rects.forEach((rect) => {
      gfx.rect(rect.left, rect.top, rect.width, rect.height);
      gfx.stroke({ color: 0x00ff00 });
    });
  }

  private _getDebugRects() {
    const rects: Rectangle[] = [];
    this.cells.forEach((_cell, key) => {
      const [x, y] = key.split(':').map(Number);
      if (_cell.size) {
        rects.push(new Rectangle(x * this._cellSize, y * this._cellSize, this._cellSize, this._cellSize));
      }
    });
    return rects;
  }

  private getGridKey(cellX: number, cellY: number): GridKey {
    return `${cellX}:${cellY}`;
  }
}
