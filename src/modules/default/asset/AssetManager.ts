import { IModule } from '../../IModule';

export interface IAssetManager extends IModule {}

export class AssetManager implements IModule {
  public readonly id: string = 'assetManager';

  constructor() {}

  public destroy(): void {}

  public initialize(): Promise<void> {
    return Promise.resolve(undefined);
  }
}
