import { Application, IApplication } from '../core/Application';
import { SignalConnection, SignalConnections } from '../signals/Signal';
export interface IModule {
    id: string;
    app: IApplication;
    initialize(app: IApplication, options?: any): Promise<void> | void;
    postInitialize(app: IApplication): Promise<void> | void;
    destroy(): void;
    addSignalConnection(...args: SignalConnection[]): void;
}
export declare class Module<T extends Application = Application> implements IModule {
    readonly id: string;
    protected _signalConnections: SignalConnections;
    constructor(id?: string);
    get app(): T;
    destroy(): void;
    initialize(app: IApplication, options?: any): Promise<void> | void;
    postInitialize(app: IApplication): Promise<void> | void;
    /**
     * Add signal connections to the container.
     * @param args - The signal connections to add.
     */
    addSignalConnection(...args: SignalConnection[]): void;
}
//# sourceMappingURL=Module.d.ts.map