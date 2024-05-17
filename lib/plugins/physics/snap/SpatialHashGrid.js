import { Rectangle } from 'pixi.js';
import { System } from './System';
export class SpatialHashGrid {
    cells = new Map();
    constructor(cellSize, insertEntities = false) {
        this._cellSize = cellSize;
        if (insertEntities) {
            System.all.forEach((entity) => this.insert(entity));
        }
    }
    _cellSize;
    get cellSize() {
        return this._cellSize;
    }
    set cellSize(size) {
        this._cellSize = size;
        this.cells.clear();
        this.updateAll();
    }
    destroy() {
        this.cells.clear();
    }
    insert(entity) {
        const bounds = entity.getBoundingBox();
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
    remove(entity) {
        this.cells.forEach((entities) => {
            entities.delete(entity);
        });
    }
    query(range, filter) {
        const foundEntities = new Set();
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
                            }
                            else {
                                if (filter(entity)) {
                                    foundEntities.add(entity);
                                }
                            }
                        }
                        else {
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
    updateEntity(entity) {
        // Remove the entity from its current cell
        this.remove(entity);
        // Re-insert the entity into the grid based on its new position
        this.insert(entity);
    }
    draw(gfx) {
        const rects = this._getDebugRects();
        rects.forEach((rect) => {
            gfx.rect(rect.left, rect.top, rect.width, rect.height);
            gfx.stroke({ color: 0x00ff00 });
        });
    }
    _getDebugRects() {
        const rects = [];
        this.cells.forEach((_cell, key) => {
            const [x, y] = key.split(':').map(Number);
            if (_cell.size) {
                rects.push(new Rectangle(x * this._cellSize, y * this._cellSize, this._cellSize, this._cellSize));
            }
        });
        return rects;
    }
    getGridKey(x, y) {
        const cellX = Math.floor(x / this._cellSize);
        const cellY = Math.floor(y / this._cellSize);
        return `${cellX}:${cellY}`;
    }
}
