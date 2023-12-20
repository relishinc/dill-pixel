import { Point } from 'pixi.js';
import { SignalConnections } from 'typed-signals';
import { Application } from '../core';
import { Container } from '../gameobjects';
import { AssetMapData } from '../load';
import { Add, Make } from '../utils';
/**
 * State
 */
export declare abstract class State extends Container {
    private static _assets;
    static NAME: string;
    protected _size: Point;
    protected _connections: SignalConnections;
    protected _data: any;
    protected constructor();
    static get ID(): string;
    static get Assets(): AssetMapData[];
    static set Assets(pAssets: AssetMapData[]);
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
    get size(): Point;
    set size(value: Point);
    get data(): any;
    set data(value: any);
    /**
     * Updates state
     * @param deltaTime
     */
    update(deltaTime: number): void;
    /**
     * Determines whether resize on
     * @param size
     */
    onResize(size: Point): void;
    /**
     * Destroys state.
     * @param destroyOptions
     */
    destroy(destroyOptions?: Parameters<typeof Container.prototype.destroy>[0]): void;
    /**
     * Inits state
     * @param size{Point}
     */
    init(size: Point): Promise<void> | void;
    positionSelfCenter(size: Point): void;
    /**
     * Animates in
     * @param callback
     */
    animateIn(callback: () => void): Promise<void> | void;
    /**
     * Animates out
     * @param callback
     */
    animateOut(callback: () => void): Promise<void> | void;
}
//# sourceMappingURL=State.d.ts.map