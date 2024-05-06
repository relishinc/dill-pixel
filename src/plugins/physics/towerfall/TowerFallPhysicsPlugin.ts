import { IApplication } from '../../../core/Application';
import { Plugin } from '../../Plugin';
import { System } from './System';

type TowerFallPhysicsPluginOptions = {
  gridCellSize: number;
  fps: number;
};

const defaultOptions = {
  gridCellSize: -1,
  fps: -1,
};

export class TowerFallPhysicsPlugin extends Plugin {
  public readonly id = 'TowerFallPhysicsPlugin';
  public options: TowerFallPhysicsPluginOptions;

  public get system(): typeof System {
    return System;
  }

  public async initialize(app: IApplication, options?: Partial<TowerFallPhysicsPluginOptions>) {
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
