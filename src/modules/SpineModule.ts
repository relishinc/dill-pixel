import { IApplication } from '../core/Application';
import { Logger } from '../utils/console/Logger';
import { Module } from './Module';

export class SpineModule extends Module {
  public readonly id = 'SpineModule';

  public async initialize(app: IApplication) {
    Logger.log('SpineModule initialized', app);
    await import('@pixi/spine-pixi').then((module) => {
      (globalThis as any).Spine = module.Spine;
    });
  }
}
