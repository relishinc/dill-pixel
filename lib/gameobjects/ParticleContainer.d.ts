import { IDestroyOptions, IPoint, ParticleContainer as PIXIParticleContainer } from 'pixi.js';
import { SignalConnection, SignalConnections } from 'typed-signals';
import { Application } from '../core';
import { Editor } from '../misc';
import { Add, Make } from '../utils/factory';
export interface ParticleContainerProps {
    maxSize: number;
    properties: {
        scale: boolean;
        position: boolean;
        rotation: boolean;
        uvs: boolean;
        tint: boolean;
    };
    batchSize: number;
    autoResize: boolean;
}
/**
 * Enhanced PIXI Container that has:
 * a factory for adding children,
 * a reference to the Application instance,
 * a signal connection manager,
 * and auto update / resize capabilities
 * @class ParticleContainer
 * @extends PIXIParticleContainer
 */
export declare class ParticleContainer extends PIXIParticleContainer {
    protected _addFactory: Add;
    protected _signalConnections: SignalConnections;
    protected _editMode: boolean;
    protected editor: Editor;
    editable: boolean;
    childrenEditable: boolean;
    constructor(props?: Partial<ParticleContainerProps>, autoResize?: boolean, autoUpdate?: boolean);
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
}
//# sourceMappingURL=ParticleContainer.d.ts.map