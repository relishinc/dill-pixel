import { Container as PIXIContainer, IDestroyOptions, IPoint, Point } from 'pixi.js';
import { SignalConnection, SignalConnections } from 'typed-signals';
import { Application } from '../core';
import { IFocusable } from '../input';
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
export declare class Container<T extends Application = Application> extends PIXIContainer implements IFocusable {
    editable: boolean;
    childrenEditable: boolean;
    protected _addFactory: Add;
    protected _signalConnections: SignalConnections;
    protected _editMode: boolean;
    protected editor: Editor;
    protected _focusable: boolean;
    private _focusSize;
    private _focusPosition;
    constructor(autoResize?: boolean, autoUpdate?: boolean, autoBindMethods?: boolean);
    get focusPosition(): Point;
    set focusPosition(value: Point);
    get focusSize(): Point;
    set focusSize(value: Point);
    get focusable(): boolean;
    set focusable(value: boolean);
    get editMode(): boolean;
    set editMode(value: boolean);
    get add(): Add;
    get make(): typeof Make;
    get app(): T;
    destroy(_options?: IDestroyOptions | boolean): void;
    onFocusBegin(): void;
    onFocusEnd(): void;
    onFocusActivated(): void;
    getFocusPosition(): Point;
    getFocusSize(): IPoint;
    isFocusable(): boolean;
    enableEditMode(): void;
    disableEditMode(): void;
    onResize(_size: IPoint): void;
    update(_deltaTime: number): void;
    protected updateFocusValues(): void;
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