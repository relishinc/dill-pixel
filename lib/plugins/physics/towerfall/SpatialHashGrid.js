import { Rectangle } from 'pixi.js';
export class SpatialHashGrid {
    cells = new Map();
    cellSize;
    constructor(cellSize) {
        this.cellSize = cellSize;
    }
    insert(entity) {
        const bounds = entity.getBoundingBox();
        const startX = Math.floor(bounds.x / this.cellSize);
        const startY = Math.floor(bounds.y / this.cellSize);
        const endX = Math.floor((bounds.x + bounds.width) / this.cellSize);
        const endY = Math.floor((bounds.y + bounds.height) / this.cellSize);
        for (let x = startX; x <= endX; x++) {
            for (let y = startY; y <= endY; y++) {
                const key = this.getGridKey(x, y);
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
        const startX = Math.floor(range.x / this.cellSize);
        const startY = Math.floor(range.y / this.cellSize);
        const endX = Math.floor((range.x + range.width) / this.cellSize);
        const endY = Math.floor((range.y + range.height) / this.cellSize);
        for (let x = startX; x <= endX; x++) {
            for (let y = startY; y <= endY; y++) {
                const key = this.getGridKey(x, y);
                const cellEntities = this.cells.get(key);
                if (cellEntities) {
                    cellEntities.forEach((entity) => {
                        if (filter !== undefined) {
                            if (Array.isArray(filter)) {
                                if (!filter.includes(entity.type)) {
                                    return;
                                }
                            }
                            else {
                                if (!filter(entity)) {
                                    return;
                                }
                            }
                        }
                        foundEntities.add(entity);
                    });
                }
            }
        }
        return [...foundEntities];
    }
    updateEntity(entity) {
        // Remove the entity from its current cell
        this.remove(entity);
        // Re-insert the entity into the grid based on its new position
        this.insert(entity);
    }
    draw(gfx) {
        console.log(this.cells);
        const rects = this._getDebugRects();
        rects.forEach((rect) => {
            gfx.rect(rect.x, rect.y, rect.width, rect.height);
            gfx.stroke();
        });
    }
    _getDebugRects() {
        const rects = [];
        this.cells.forEach((_, key) => {
            const [x, y] = key.split(':').map(Number);
            rects.push(new Rectangle(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize));
        });
        return rects;
    }
    getGridKey(x, y) {
        const cellX = Math.floor(x / this.cellSize);
        const cellY = Math.floor(y / this.cellSize);
        return `${cellX}:${cellY}`;
    }
}
