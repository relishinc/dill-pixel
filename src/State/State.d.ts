import { Container, Point } from 'pixi.js';
import { Application } from "../Application";
import * as Factory from "../Utils/Factory";
/**
 * State
 */
export declare abstract class State extends Container {
    protected _size: Point;
    protected _addFactory: Factory.AddFactory;
    private _gsapContext;
    protected constructor();
    get app(): Application;
    get add(): Factory.AddFactory;
    get make(): Factory.MakeFactory;
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
    protected gsapContextRevert(): void;
}
//# sourceMappingURL=State.d.ts.map