import { Graphics, Rectangle } from 'pixi.js';
import { Entity } from './Entity';
import { SpatialHashGridFilter } from './types';
export declare class SpatialHashGrid {
    private cells;
    private cellSize;
    constructor(cellSize: number);
    insert(entity: Entity): void;
    remove(entity: Entity): void;
    query(range: Rectangle, filter?: SpatialHashGridFilter | string[]): Entity[];
    updateEntity(entity: Entity): void;
    draw(gfx: Graphics): void;
    private _getDebugRects;
    private getGridKey;
}
