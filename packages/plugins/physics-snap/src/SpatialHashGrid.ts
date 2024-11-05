import { Graphics, Rectangle } from 'pixi.js';
import { Entity } from './Entity';
import { System } from './System';
import { SpatialHashGridFilter } from './types';

type GridKey = string;

export class SpatialHashGrid {
  private cells: Map<GridKey, Entity[]> = new Map();

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
        const key = this.getGridKey(x, y);
        if (!this.cells.has(key)) {
          this.cells.set(key, []);
        }

        const cellEntities = this.cells.get(key)!;
        if (!cellEntities.includes(entity)) {
          cellEntities.push(entity);
        }
      }
    }
  }

  remove(entity: Entity): void {
    const keysToRemove: GridKey[] = [];
    this.cells.forEach((entities, key) => {
      const index = entities.indexOf(entity);
      if (index !== -1) {
        entities.splice(index, 1);
        if (entities.length === 0) {
          keysToRemove.push(key);
        }
      }
    });
    keysToRemove.forEach((key) => this.cells.delete(key));
  }

  query<T extends Entity = Entity>(
    range: Rectangle,
    filter?: SpatialHashGridFilter,
    dx: number = 0,
    dy: number = 0,
    exclude?: Entity | Entity[],
    debug?: boolean,
  ): Set<T> {
    let uidsToExclude: number[] = [];
    if (exclude) {
      if (Array.isArray(exclude)) {
        uidsToExclude = exclude.map((e) => e.uid);
      } else {
        uidsToExclude = [exclude.uid];
      }
    }
    void debug;
    const expandedRange = new Rectangle(
      range.x - Math.abs(dx),
      range.y - Math.abs(dy),
      range.width + 2 * Math.abs(dx),
      range.height + 2 * Math.abs(dy),
    );
    const foundEntities = new Set<T>();

    const startX = Math.floor(Math.min(expandedRange.x, expandedRange.x + expandedRange.width) / this._cellSize);
    const startY = Math.floor(Math.min(expandedRange.y, expandedRange.y + expandedRange.height) / this._cellSize);
    const endX = Math.floor(Math.max(expandedRange.x, expandedRange.x + expandedRange.width) / this._cellSize);
    const endY = Math.floor(Math.max(expandedRange.y, expandedRange.y + expandedRange.height) / this._cellSize);

    for (let x = startX; x <= endX; x++) {
      for (let y = startY; y <= endY; y++) {
        const key = this.getGridKey(x, y);
        const cellEntities = this.cells.get(key);
        if (cellEntities) {
          cellEntities.forEach((entity) => {
            if (!uidsToExclude.includes(entity.uid)) {
              if (filter === undefined || this.matchesFilter(entity, filter)) {
                foundEntities.add(entity as T);
              }
            }
          });
        }
      }
    }
    return foundEntities;
  }

  private matchesFilter(entity: Entity, filter: SpatialHashGridFilter): boolean {
    switch (typeof filter) {
      case 'string':
        return (
          filter === entity.type ||
          (filter === 'solid' && entity.isSolid) ||
          (filter === 'actor' && entity.isActor) ||
          (filter === 'sensor' && entity.isSensor)
        );
      case 'object':
        return Array.isArray(filter) && filter.includes(entity.type);
      case 'function':
        return filter(entity);
      default:
        return false;
    }
  }

  updateAll() {
    System.all.forEach((entity) => this.updateEntity(entity));
  }

  updateEntity(entity: Entity): void {
    this.remove(entity);
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
      if (_cell.length) {
        rects.push(new Rectangle(x * this._cellSize, y * this._cellSize, this._cellSize, this._cellSize));
      }
    });
    return rects;
  }

  private getGridKey(cellX: number, cellY: number): GridKey {
    return `${cellX}:${cellY}`;
  }
}
