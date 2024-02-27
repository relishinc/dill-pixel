import { IApplication } from '../../../core';
import { Module } from '../../index';
import { IModule } from '../../Module';

export interface IAssetManager extends IModule {}

export class AssetManager extends Module implements IAssetManager {
  public readonly id: string = 'AssetManager';

  public destroy(): void {}

  public initialize(app: IApplication): Promise<void> {
    return Promise.resolve(undefined);
  }
}
