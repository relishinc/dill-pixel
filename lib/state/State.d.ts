import { Point } from 'pixi.js';
import { SignalConnections } from 'typed-signals';
import { Application } from '../core';
import { Container } from '../gameobjects';
import { AssetMapData } from '../load';
import { Add, Make } from '../utils/factory';
/**
 * State
 */
export declare abstract class State extends Container {
    static NAME: string;
    private static _assets;
    protected _size: Point;
    protected _connections: SignalConnections;
    protected _data: any;
    set size(value: Point);
    get size(): Point;
    set data(value: any);
    get data(): any;
    protected constructor();
    static get ID(): string;
    static set Assets(pAssets: AssetMapData[]);
    static get Assets(): AssetMapData[];
    /**
     * gets the Application instance
     */
    get app(): Application;
    /**
     * gets the Add factory
     */
    get add(): Add;
    /**
     * gets the Make factory
     */
    get make(): typeof Make;
    /**
     * Inits state
     * @param size{Point}
     */
    init(size: Point): Promise<void> | void;
    /**
     * Updates state
     * @param _deltaTime
     */
    update(_deltaTime: number): void;
    positionSelfCenter(size: Point): void;
    /**
     * Determines whether resize on
     * @param size
     */
    onResize(size: Point): void;
    /**
     * Animates in
     * @param callback
     */
    animateIn(callback: () => void): void;
    /**
     * Animates out
     * @param callback
     */
    animateOut(callback: () => void): void;
    /**
     * Destroys state.
     * @param pOptions
     */
    destroy(pOptions?: Parameters<typeof Container.prototype.destroy>[0]): void;
}
//# sourceMappingURL=State.d.ts.map