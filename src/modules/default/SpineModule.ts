import { IApplication } from '../../core/Application';
import { Module } from '../Module';

export class SpineModule extends Module {
  public readonly id = 'SpineModule';
  public stats: any;

  public async initialize(app: IApplication) {
    if (app.config.useSpine) {
      await import('@pixi/spine-pixi').then((module) => {
        // append all the module exports to the global scope
        Object.assign(globalThis, module);
      });
    }
  }
}
