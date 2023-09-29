import { Assets, LoadFontData } from 'pixi.js';
import { AssetType } from '../../utils';
import { AssetMapData } from '../AssetMapData';
import { IAsset } from './IAsset';

export class WebFontAsset extends AssetMapData implements IAsset<Partial<LoadFontData>> {
  constructor(assetName: string, data?: any, assetPath?: string) {
    super(assetName, AssetType.WEB_FONT);
    this.data = data;
    if (assetPath) {
      this.assetPath = assetPath;
    }
  }

  public getAsset(): LoadFontData {
    const data = Assets.get(this.assetName)?.data;
    if (!data) {
      throw new Error(`Font asset ${this.assetName} is not loaded.`);
    }
    return data;
  }

  public isLoaded(): boolean {
    return !!Assets.get(this.assetName);
  }
}
