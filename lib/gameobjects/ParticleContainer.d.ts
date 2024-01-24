import { IDestroyOptions, IPoint, ParticleContainer as PIXIParticleContainer } from 'pixi.js';
import { SignalConnection, SignalConnections } from 'typed-signals';
import { Application } from '../core';
import { Editor } from '../misc';
import { Add, Make } from '../utils';
export interface ParticleContainerProps {
    maxSize: number;
    properties: Partial<{
        vertices: boolean;
        position: boolean;
        rotation: boolean;
        uvs: boolean;
        tint: boolean;
    }>;
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
    static __dill_pixel_top_level_class: boolean;
    editable: boolean;
    childrenEditable: boolean;
    protected _addFactory: Add;
    protected _signalConnections: SignalConnections;
    protected _editMode: boolean;
    protected editor: Editor;
    constructor(props?: Partial<ParticleContainerProps>, autoResize?: boolean, autoUpdate?: boolean);
    get editMode(): boolean;
    set editMode(value: boolean);
    get add(): Add;
    get make(): typeof Make;
    get app(): Application;
    destroy(_options?: IDestroyOptions | boolean): void;
    enableEditMode(): void;
    disableEditMode(): void;
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
}
//# sourceMappingURL=ParticleContainer.d.ts.map