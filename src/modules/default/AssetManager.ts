import { CoreModule } from '../../core/decorators';
import type { IModule } from '../Module';
import { Module } from '../Module';

export interface IAssetManager extends IModule {}

@CoreModule
export class AssetManager extends Module implements IAssetManager {
  public destroy(): void {}
}
