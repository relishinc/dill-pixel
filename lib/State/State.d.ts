import { Point } from "pixi.js";
import { SignalConnections } from "typed-signals";
import { Application } from "../Application";
import { Container } from "../GameObjects";
import { AssetMapData } from "../Load";
import { Add, Make } from "../Utils/Factory";
/**
 * State
 */
export declare abstract class State extends Container {
    static NAME: string;
    protected _size: Point;
    protected _gsapContext: gsap.Context | null;
    protected _connections: SignalConnections;
    constructor();
    static get ID(): string;
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
     * Gets the GSAP animation context for this state
     */
    get animationContext(): gsap.Context;
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
    /**
     * Reverts the gsap context
     * override this to provide custom cleanup
     * @protected
     */
    protected gsapContextRevert(): void;
    protected gsapContextAdd(func: () => void): void;
}
//# sourceMappingURL=State.d.ts.map