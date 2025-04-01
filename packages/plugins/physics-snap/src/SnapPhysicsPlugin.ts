import { Application, IApplication, Logger, Plugin } from 'dill-pixel';
import { Point } from 'pixi.js';
import { pointExtras } from './extras';
import { System } from './System';
import { version } from './version';

export interface ISnapPhysicsPlugin extends Plugin {
  get system(): typeof System;
  get gridCellSize(): number;
  set gridCellSize(value: number);
  get useSpatialHashGrid(): boolean;
  set useSpatialHashGrid(value: boolean);
  get fps(): number;
  set fps(value: number);
}

type SnapPhysicsPluginOptions = {
  useSpatialHashGrid: boolean;
  gridCellSize: number;
  fps: number;
  debug: boolean;
};

const defaultOptions = {
  useSpatialHashGrid: false,
  gridCellSize: -1,
  fps: -1,
  debug: false,
};

export class SnapPhysicsPlugin extends Plugin<Application, SnapPhysicsPluginOptions> {
  public readonly id = 'SnapPhysicsPlugin';

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

  private hello() {
    const hello = `%c Dill Pixel Snap Physics Plugin v${version}`;
    console.log(hello, 'background: rgba(31, 41, 55, 1);color: #74b64c');

    if (this.options.debug) {
      Logger.log(this.options);
    }
  }

  destroy() {
    Logger.log('SnapPhysicsPlugin:: destroy');
    this.system.enabled = false;
    System.cleanup();
    super.destroy();
  }

  public async initialize(app: IApplication, options?: Partial<SnapPhysicsPluginOptions>) {
    this._addMathExtras();
    this._options = { ...defaultOptions, ...options };
    this.system.app = app;
    this.system.plugin = this;

    if (this.options.useSpatialHashGrid && this.options.gridCellSize > 0) {
      this.system.useSpatialHashGrid(this.options.gridCellSize);
    }
    if (this.options.fps > 0) {
      System.fps = this.options.fps;
    }
    this.hello();
  }

  private _addMathExtras() {
    Object.assign(Point.prototype, pointExtras);
  }
}
