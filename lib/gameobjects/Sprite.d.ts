import { Texture } from '@pixi/core';
import { IPoint, Point, Sprite as PIXISprite } from 'pixi.js';
import { SignalConnection, SignalConnections } from 'typed-signals';
import { Application } from '../core';
import { IFocusable } from '../input';
import { Add, Make } from '../utils';
export declare class Sprite<T extends Application = Application> extends PIXISprite implements IFocusable {
    editable: boolean;
    protected _addFactory: Add;
    protected _signalConnections: SignalConnections;
    protected _focusable: boolean;
    protected _focusSize: Point;
    protected _focusPosition: Point;
    constructor(texture?: Texture);
    get focusPosition(): Point;
    set focusPosition(value: Point);
    get focusSize(): Point;
    set focusSize(value: Point);
    get add(): Add;
    get make(): typeof Make;
    get app(): T;
    get focusable(): boolean;
    set focusable(value: boolean);
    getFocusPosition(): Point;
    getFocusSize(): IPoint;
    isFocusable(): boolean;
    onFocusActivated(): void;
    onFocusBegin(): void;
    onFocusEnd(): void;
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
    /**
     * @protected
     */
    protected bindAllMethods(): void;
}
//# sourceMappingURL=Sprite.d.ts.map