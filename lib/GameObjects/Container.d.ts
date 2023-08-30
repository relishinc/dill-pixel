import { Container as PIXIContainer, IDestroyOptions, IPoint } from "pixi.js";
import { SignalConnection, SignalConnections } from "typed-signals";
import { Application } from "../Application";
import { Add, Make } from "../Utils/Factory";
/**
 * Enhanced PIXI Container that has a factory for adding children, and a reference to the Application instance
 * @class Container
 * @extends PIXIContainer
 */
export declare class Container extends PIXIContainer {
    protected _addFactory: Add;
    protected _connections: SignalConnections;
    constructor(listenForResize?: boolean);
    get add(): Add;
    get make(): typeof Make;
    get app(): Application;
    destroy(_options?: IDestroyOptions | boolean): void;
    onResize(size: IPoint): void;
    /**
     * @protected
     * adds a signal connection
     */
    protected addSignalConnection(pConnection: SignalConnection): void;
    /**
     * @protected
     * removes all signal connections
     */
    protected disconnectAllSignals(): void;
}
//# sourceMappingURL=Container.d.ts.map