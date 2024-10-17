import { extensions } from 'pixi.js';
import { Plugin } from '../Plugin';
import { Spine, spineLoaderExtension, SpinePipe, spineTextureAtlasLoader } from './pixi-spine';

export class SpinePlugin extends Plugin {
  public readonly id = 'SpinePlugin';

  public async initialize() {
    extensions.add(spineTextureAtlasLoader);
    extensions.add(spineLoaderExtension);
    extensions.add(SpinePipe);
    (window as any).Spine = Spine;
  }
}
