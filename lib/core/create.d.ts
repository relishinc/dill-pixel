import { AppConfig, Application, IApplication } from './Application';
export declare function create<T extends IApplication = Application>(ApplicationClass: new () => T, config?: AppConfig, domElement?: string | Window | HTMLElement, speak?: boolean): Promise<T>;
