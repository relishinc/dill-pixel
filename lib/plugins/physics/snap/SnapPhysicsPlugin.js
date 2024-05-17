import { Plugin } from '../../Plugin';
import { System } from './System';
const defaultOptions = {
    useSpatialHashGrid: false,
    gridCellSize: -1,
    fps: -1,
};
export class SnapPhysicsPlugin extends Plugin {
    id = 'SnapPhysicsPlugin';
    options;
    get gridCellSize() {
        return this.options.gridCellSize;
    }
    set gridCellSize(value) {
        this.options.gridCellSize = value;
        if (this.options.useSpatialHashGrid && this.options.gridCellSize > 0) {
            System.useSpatialHashGrid(this.options.gridCellSize);
        }
    }
    get useSpatialHashGrid() {
        return this.options.useSpatialHashGrid;
    }
    set useSpatialHashGrid(value) {
        this.options.useSpatialHashGrid = value;
        if (this.options.useSpatialHashGrid && this.options.gridCellSize > 0) {
            System.useSpatialHashGrid(this.options.gridCellSize);
        }
        else {
            System.removeSpatialHashGrid();
        }
    }
    set fps(value) {
        this.options.fps = value;
        System.fps = value;
        this.app.ticker.maxFPS = value;
    }
    get system() {
        return System;
    }
    destroy() {
        this.system.enabled = false;
        System.cleanup();
        super.destroy();
    }
    async initialize(app, options) {
        this.options = { ...defaultOptions, ...options };
        this.system.enabled = true;
        if (this.options.useSpatialHashGrid && this.options.gridCellSize > 0) {
            this.system.useSpatialHashGrid(this.options.gridCellSize);
        }
        if (this.options.fps > 0) {
            System.fps = this.options.fps;
            app.ticker.maxFPS = System.fps;
        }
    }
}
