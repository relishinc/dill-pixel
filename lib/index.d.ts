import { Application, IApplication, RequiredApplicationConfig } from './core';
export * from './pixi';
export * from './core';
export * from './display';
export * from './modules';
export * from './store';
export * from './utils';
export declare function create<T extends IApplication = Application>(ApplicationClass: new () => T, config?: RequiredApplicationConfig, domElement?: string | HTMLElement, speak?: boolean): Promise<T>;
//# sourceMappingURL=index.d.ts.map