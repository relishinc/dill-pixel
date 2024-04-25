import { CorePlugin } from '../core/decorators';
import type { IPlugin } from './Plugin';
import { Plugin } from './Plugin';

export interface IAssetManager extends IPlugin {}

@CorePlugin
export class AssetManager extends Plugin implements IAssetManager {
  public destroy(): void {}
}
