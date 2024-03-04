import { IApplication } from '../../../core';
import { CoreModule } from '../../../core/decorators';
import type { IModule } from '../../Module';
import { Module } from '../../Module';

export interface IAssetManager extends IModule {}

@CoreModule
export class AssetManager extends Module implements IAssetManager {
  public readonly id: string = 'AssetManager';

  public destroy(): void {}

  public initialize(app: IApplication): Promise<void> {
    return Promise.resolve(undefined);
  }
}
