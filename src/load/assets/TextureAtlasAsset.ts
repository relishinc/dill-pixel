import { AssetType } from '../../utils';
import { AssetMapData } from '../AssetMapData';
import { IAsset } from './IAsset';
import { Texture } from 'pixi.js';

export class TextureAtlasAsset extends AssetMapData implements IAsset<{ [name: string]: Texture }> {
  constructor(assetName: string, assetPath?: string) {
    super(assetName, AssetType.TEXTURE_ATLAS);
    if (assetPath) {
      this.assetPath = assetPath;
    }
  }

  public getAsset(): { [name: string]: Texture } {
    return this.getResource().textures!;
  }
}
