import { IApplication } from '../core';
import { SignalConnection, SignalConnections } from '../signals';
import { Application } from '../Application';

export interface IPlugin {
    id: string;
    app: IApplication;
    initialize(_app: IApplication, options?: any): Promise<void> | void;
    postInitialize(_app: IApplication): Promise<void> | void;
    destroy(): void;
    addSignalConnection(...args: SignalConnection[]): void;
    clearSignalConnections(): void;
    registerCoreFunctions(): void;
    registerCoreSignals(): void;
}
export declare class Plugin<T extends Application = Application> implements IPlugin {
    id: string;
    __dill_pixel_method_binding_root: boolean;
    protected _signalConnections: SignalConnections;
    constructor(id?: string);
    get app(): T;
    destroy(): void;
    initialize(_app: IApplication, options?: any): Promise<void> | void;
    postInitialize(_app: IApplication): Promise<void> | void;
    /**
     * Add signal connections to the container.
     * @param args - The signal connections to add.
     */
    addSignalConnection(...args: SignalConnection[]): void;
    clearSignalConnections(): void;
    /**
     * @override
     * @protected
     */
    registerCoreFunctions(): void;
    /**
     * @override
     * @protected
     */
    registerCoreSignals(): void;
    protected getCoreFunctions(): string[];
    protected getCoreSignals(): string[];
}
//# sourceMappingURL=Plugin.d.ts.map