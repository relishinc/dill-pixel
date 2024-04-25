import { Container } from 'pixi.js';
import { IApplication } from '../../../core/Application';
import { Logger } from '../../../utils/console/Logger';
import { Plugin } from '../../Plugin';
import { World } from './World';

export class TowerFallPhysicsPlugin extends Plugin {
  public readonly id = 'TowerFallPhysicsPlugin';

  public get world(): typeof World {
    return World;
  }

  public async initialize(app: IApplication, options?: any) {
    console.log('TowerFallPhysicsPlugin initialized!');
  }

  public setWorldContainer(container: Container<any>) {
    World.container = container;
  }

  public update(deltaTime: number) {
    if (!World.container) {
      Logger.error('TowerFallPhysicsPlugin: World container not set!');
    }
    World.worldStep(deltaTime);
  }
}
