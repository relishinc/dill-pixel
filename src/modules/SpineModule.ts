import { IApplication } from '../core/Application';
import { Module } from './Module';

export class SpineModule extends Module {
  public readonly id = 'SpineModule';

  public async initialize(app: IApplication) {
    await import('@pixi/spine-pixi').then((module) => {
      (globalThis as any).Spine = module.Spine;
    });
  }
}
