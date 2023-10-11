import { Point } from 'pixi.js';
import { SignalConnections } from 'typed-signals';
import { Application } from '../core/Application';
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
    constructor();
    static get ID(): string;
    static set Assets(pAssets: AssetMapData[]);
    static get Assets(): AssetMapData[];
    /**
     * gets the Applicationinstance
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
     * @param pSize{Point}
     * @param pData
     */
    init(pSize: Point, pData?: any): void;
    /**
     * Updates state
     * @param pDeltaTime
     */
    update(pDeltaTime: number): void;
    /**
     * Determines whether resize on
     * @param pSize
     */
    onResize(pSize: Point): void;
    /**
     * Animates in
     * @param pOnComplete
     */
    animateIn(pOnComplete: () => void): void;
    /**
     * Animates out
     * @param pOnComplete
     */
    animateOut(pOnComplete: () => void): void;
    /**
     * Destroys state.
     * @param pOptions
     */
    destroy(pOptions?: Parameters<typeof Container.prototype.destroy>[0]): void;
}
//# sourceMappingURL=State.d.ts.map