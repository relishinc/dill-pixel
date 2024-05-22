import { Plugin } from '../Plugin';
import { extensions } from 'pixi.js';

export class SpinePlugin extends Plugin {
  public readonly id = 'SpinePlugin';

  public async initialize() {
    await import('./pixi-spine').then(({ Spine, spineTextureAtlasLoader, spineLoaderExtension, SpinePipe }) => {
      extensions.add(spineTextureAtlasLoader);
      extensions.add(spineLoaderExtension);
      extensions.add(SpinePipe);
      (window as any).Spine = Spine;
    });
  }
}
