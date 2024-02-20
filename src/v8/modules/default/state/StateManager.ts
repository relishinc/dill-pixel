import { IModule } from '../../IModule';

export interface IStateManager extends IModule {}

export class StateManager implements IModule {
  constructor() {}

  public destroy(): void {}

  public initialize(): Promise<void> {
    return Promise.resolve(undefined);
  }
}
