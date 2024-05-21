import type { IPlugin } from './Plugin';
import { Plugin } from './Plugin';

export interface IAssetPlugin extends IPlugin {}

export class AssetPlugin extends Plugin implements IAssetPlugin {
  public readonly id: string = 'assets';

  public destroy(): void {}
}
