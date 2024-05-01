import { AssetType } from '../../utils/AssetUtils';
import { AssetMapData } from '../AssetMapData';
import { IAsset } from './IAsset';

export class JsonAsset<T> extends AssetMapData implements IAsset<T> {
  constructor(assetName: string, assetPath?: string) {
    super(assetName, AssetType.JSON);
    if (assetPath) {
      this.assetPath = assetPath;
    }
  }

  public getAsset(): T {
    return this.getResource().data;
  }
}
