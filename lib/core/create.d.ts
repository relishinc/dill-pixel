import { Application, IApplication, RequiredApplicationConfig } from './Application';
export declare function create<T extends IApplication = Application>(ApplicationClass: new () => T, config?: RequiredApplicationConfig, domElement?: string | Window | HTMLElement, speak?: boolean): Promise<T>;
//# sourceMappingURL=create.d.ts.map