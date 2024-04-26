import { Plugin } from '../../Plugin';
import { System } from './System';

export class TowerFallPhysicsPlugin extends Plugin {
  public readonly id = 'TowerFallPhysicsPlugin';

  public get system(): typeof System {
    return System;
  }

  public async initialize() {
    console.log('TowerFallPhysicsPlugin initialized!');
  }
}
