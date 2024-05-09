import { Application, IApplication } from '../core/Application';
import { SignalConnection, SignalConnections } from '../signals';
export interface IPlugin {
    id: string;
    app: IApplication;
    initialize(_app: IApplication, options?: any): Promise<void> | void;
    postInitialize(_app: IApplication): Promise<void> | void;
    destroy(): void;
    addSignalConnection(...args: SignalConnection[]): void;
    clearSignalConnections(): void;
}
export declare class Plugin<T extends Application = Application> implements IPlugin {
    id: string;
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
}
