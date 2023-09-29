import { Assets, Texture } from 'pixi.js';
import { AssetType } from '../../utils';
import { AssetMapData } from '../AssetMapData';
import { IAsset } from './IAsset';

export interface IBitmapFontData {
  font: string;
  size: number;
  lineHeight: number;
  chars: { [index: number]: IBitmapFontCharData };
}

export interface IBitmapFontCharData {
  xOffset: number;
  yOffset: number;
  xAdvance: number;
  kerning: object;
  texture: Texture;
  page: string;
}

export class FontAsset extends AssetMapData implements IAsset<IBitmapFontData> {
  constructor(assetName: string, assetPath?: string) {
    super(assetName, AssetType.FONT);
    if (assetPath) {
      this.assetPath = assetPath;
    }
  }

  public getAsset(): IBitmapFontData {
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
