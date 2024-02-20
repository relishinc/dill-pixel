import { Application, IApplication, RequiredApplicationConfig } from './core';

export * from './core';
export * from './store';
export * from './modules';
export * from './utils';

export async function create<T extends IApplication = Application>(
  AppClass: T,
  config: RequiredApplicationConfig,
): Promise<IApplication> {
  return await AppClass.initialize(config);
}
