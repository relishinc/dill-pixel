import { IModule } from '../../IModule';

export interface IAssetManager extends IModule {}

export class AssetManager implements IModule {
  public readonly id: string = 'AssetManager';

  constructor() {}

  public destroy(): void {}

  public initialize(): Promise<void> {
    return Promise.resolve(undefined);
  }
}
