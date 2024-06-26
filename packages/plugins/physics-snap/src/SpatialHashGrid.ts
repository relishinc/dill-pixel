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
        const key = this.getGridKey(x * this._cellSize, y * this._cellSize); // Use actual world coordinates
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

  query(range: Rectangle, filter?: SpatialHashGridFilter | string[]): Entity[] {
    const foundEntities = new Set<Entity>();

    // Ensure we handle negative or reverse ranges appropriately
    const startX = Math.floor(Math.min(range.x, range.x + range.width) / this._cellSize);
    const startY = Math.floor(Math.min(range.y, range.y + range.height) / this._cellSize);
    const endX = Math.floor(Math.max(range.x, range.x + range.width) / this._cellSize);
    const endY = Math.floor(Math.max(range.y, range.y + range.height) / this._cellSize);

    for (let x = startX; x <= endX; x++) {
      for (let y = startY; y <= endY; y++) {
        const key = this.getGridKey(x * this._cellSize, y * this._cellSize);

        const cellEntities = this.cells.get(key);
        if (cellEntities) {
          cellEntities.forEach((entity) => {
            if (filter !== undefined) {
              if (Array.isArray(filter)) {
                if (filter.includes(entity.type)) {
                  foundEntities.add(entity);
                }
              } else {
                if (filter(entity)) {
                  foundEntities.add(entity);
                }
              }
            } else {
              foundEntities.add(entity);
            }
          });
        }
      }
    }
    return [...foundEntities];
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

  private getGridKey(x: number, y: number): GridKey {
    const cellX = Math.floor(x / this._cellSize);
    const cellY = Math.floor(y / this._cellSize);
    return `${cellX}:${cellY}`;
  }
}
