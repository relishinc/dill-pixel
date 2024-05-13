import { IApplication } from '../../../core/Application';
import { Plugin } from '../../Plugin';
import { System } from './System';

type SnapPhysicsPluginOptions = {
  useSpatialHash: boolean;
  gridCellSize: number;
  fps: number;
};

const defaultOptions = {
  useSpatialHash: false,
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

    if (this.options.useSpatialHash && this.options.gridCellSize > 0) {
      System.useSpatialHashGrid(this.options.gridCellSize);
    }
  }

  get useSpatialHash(): boolean {
    return this.options.useSpatialHash;
  }

  set useSpatialHash(value: boolean) {
    this.options.useSpatialHash = value;

    if (this.options.useSpatialHash && this.options.gridCellSize > 0) {
      System.useSpatialHashGrid(this.options.gridCellSize);
    } else {
      System.removeSpatialHashGrid();
    }
  }

  public get system(): typeof System {
    return System;
  }

  public async initialize(app: IApplication, options?: Partial<SnapPhysicsPluginOptions>) {
    this.options = { ...defaultOptions, ...options };
    if (this.options.useSpatialHash && this.options.gridCellSize > 0) {
      System.useSpatialHashGrid(this.options.gridCellSize);
    }
    if (this.options.fps > 0) {
      System.fps = this.options.fps;
      app.ticker.maxFPS = System.fps;
    }
  }
}
