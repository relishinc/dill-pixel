import { extensions } from 'pixi.js';
import { CorePlugin } from '../../core/decorators';
import { Plugin } from '../Plugin';

@CorePlugin
export class SpinePlugin extends Plugin {
  public readonly id = 'SpinePlugin';

  public async initialize() {
    await import('./pixi-spine').then(({ Spine, spineTextureAtlasLoader, spineLoaderExtension }) => {
      extensions.add(spineTextureAtlasLoader);
      extensions.add(spineLoaderExtension);
      (window as any).Spine = Spine;
    });
  }
}
