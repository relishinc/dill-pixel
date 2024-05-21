import type { IPlugin } from './Plugin';
import { Plugin } from './Plugin';

export interface IAssetsPlugin extends IPlugin {}

export class AssetsPlugin extends Plugin implements IAssetsPlugin {
  public readonly id: string = 'assets';

  public destroy(): void {}
}
