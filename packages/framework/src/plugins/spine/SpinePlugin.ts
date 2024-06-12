import { Plugin } from '../Plugin';
import { extensions } from 'pixi.js';
import { Spine, spineLoaderExtension, SpinePipe, spineTextureAtlasLoader } from './pixi-spine';
import { Logger } from '../../utils';

export class SpinePlugin extends Plugin {
  public readonly id = 'SpinePlugin';

  public async initialize() {
    extensions.add(spineTextureAtlasLoader);
    extensions.add(spineLoaderExtension);
    extensions.add(SpinePipe);
    (window as any).Spine = Spine;
    Logger.log('SpinePlugin', 'initialize', (window as any).Spine);
  }
}
