import { IApplication } from '../core';

export interface IModule {
  id: string;

  initialize(app: IApplication): Promise<void> | void;

  destroy(): void;
}
