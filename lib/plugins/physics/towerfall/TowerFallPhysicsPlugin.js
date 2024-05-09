import { Plugin } from '../../Plugin';
import { System } from './System';
const defaultOptions = {
    gridCellSize: -1,
    fps: -1,
};
export class TowerFallPhysicsPlugin extends Plugin {
    id = 'TowerFallPhysicsPlugin';
    options;
    get system() {
        return System;
    }
    async initialize(app, options) {
        console.log('TowerFallPhysicsPlugin initialized!');
        this.options = { ...defaultOptions, ...options };
        if (this.options.gridCellSize > 0) {
            System.useSpatialHashGrid(this.options.gridCellSize);
        }
        if (this.options.fps > 0) {
            System.fps = this.options.fps;
            app.ticker.maxFPS = System.fps;
        }
    }
}
