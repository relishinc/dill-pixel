import { Graphics, Rectangle } from 'pixi.js';
import { Entity } from './Entity';
import { SpatialHashGridFilter } from './types';

export declare class SpatialHashGrid {
    private cells;
    constructor(cellSize: number, insertEntities?: boolean);
    private _cellSize;
    get cellSize(): number;
    set cellSize(size: number);
    destroy(): void;
    insert(entity: Entity): void;
    remove(entity: Entity): void;
    query(range: Rectangle, filter?: SpatialHashGridFilter | string[]): Entity[];
    updateAll(): void;
    updateEntity(entity: Entity): void;
    draw(gfx: Graphics): void;
    private _getDebugRects;
    private getGridKey;
}
//# sourceMappingURL=SpatialHashGrid.d.ts.map