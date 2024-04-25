import { IApplication } from '../core/Application';
import { CorePlugin } from '../core/decorators';
import { Plugin } from './Plugin';

@CorePlugin
export class SpinePlugin extends Plugin {
  public readonly id = 'SpineModule';

  public async initialize(app: IApplication) {
    await import('@pixi/spine-pixi').then((module) => {
      (globalThis as any).Spine = module.Spine;
    });
  }
}
