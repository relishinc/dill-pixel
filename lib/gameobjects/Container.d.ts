import { Container as PIXIContainer, IDestroyOptions, IPoint } from 'pixi.js';
import { SignalConnection, SignalConnections } from 'typed-signals';
import { Application } from '../core';
import { Editor } from '../misc';
import { Add, Make } from '../utils';
/**
 * Enhanced PIXI Container that has:
 * a factory for adding children,
 * a reference to the Application instance,
 * a signal connection manager,
 * and auto update / resize capabilities
 * @class Container
 * @extends PIXIContainer
 */
export declare class Container extends PIXIContainer {
    protected _addFactory: Add;
    protected _signalConnections: SignalConnections;
    protected _editMode: boolean;
    protected editor: Editor;
    editable: boolean;
    childrenEditable: boolean;
    constructor(autoResize?: boolean, autoUpdate?: boolean, autoBindMethods?: boolean);
    set editMode(value: boolean);
    get editMode(): boolean;
    enableEditMode(): void;
    disableEditMode(): void;
    get add(): Add;
    get make(): typeof Make;
    get app(): Application;
    destroy(_options?: IDestroyOptions | boolean): void;
    onResize(_size: IPoint): void;
    update(_deltaTime: number): void;
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
    /**
     * @param methodNames
     * @protected
     */
    protected bindMethods(...methodNames: string[]): void;
    protected bindAllMethods(): void;
}
//# sourceMappingURL=Container.d.ts.map