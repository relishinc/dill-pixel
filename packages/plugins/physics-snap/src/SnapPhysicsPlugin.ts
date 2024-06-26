import { IApplication, Plugin } from 'dill-pixel';
import { System } from './System';
import { Point } from 'pixi.js';
import { pointExtras } from './extras';

type SnapPhysicsPluginOptions = {
  useSpatialHashGrid: boolean;
  gridCellSize: number;
  fps: number;
};

const defaultOptions = {
  useSpatialHashGrid: false,
  gridCellSize: -1,
  fps: -1,
};

export class SnapPhysicsPlugin extends Plugin {
  public readonly id = 'SnapPhysicsPlugin';
  public options: SnapPhysicsPluginOptions;

  get gridCellSize(): number {
    return this.options.gridCellSize;
  }

  set gridCellSize(value: number) {
    this.options.gridCellSize = value;
    if (this.options.useSpatialHashGrid && this.options.gridCellSize > 0) {
      System.useSpatialHashGrid(this.options.gridCellSize);
    }
  }

  get useSpatialHashGrid(): boolean {
    return this.options.useSpatialHashGrid;
  }

  set useSpatialHashGrid(value: boolean) {
    this.options.useSpatialHashGrid = value;

    if (this.options.useSpatialHashGrid && this.options.gridCellSize > 0) {
      System.useSpatialHashGrid(this.options.gridCellSize);
    } else {
      System.removeSpatialHashGrid();
    }
  }

  set fps(value: number) {
    this.options.fps = value;
    System.fps = value;
  }

  public get system(): typeof System {
    return System;
  }

  destroy() {
    this.system.enabled = false;
    System.cleanup();
    super.destroy();
  }

  public async initialize(app: IApplication, options?: Partial<SnapPhysicsPluginOptions>) {
    this._addMathExtras();
    this.options = { ...defaultOptions, ...options };
    this.system.app = app;
    this.system.plugin = this;

    if (this.options.useSpatialHashGrid && this.options.gridCellSize > 0) {
      this.system.useSpatialHashGrid(this.options.gridCellSize);
    }
    if (this.options.fps > 0) {
      System.fps = this.options.fps;
    }
  }

  private _addMathExtras() {
    Object.assign(Point.prototype, pointExtras);
  }
}
