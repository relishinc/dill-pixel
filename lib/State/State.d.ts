import { Layout, LayoutStyles } from "@pixi/layout";
import { Container, Point } from 'pixi.js';
import { Application } from "../Application";
import * as Factory from "../Utils/Factory";
/**
 * State
 */
export declare abstract class State extends Container {
    static DEFAULT_LAYOUT_STYLES: LayoutStyles;
    static DEFAULT_LAYOUT_OPTIONS: any;
    protected _layout: Layout;
    protected _size: Point;
    protected _addFactory: Factory.AddFactory;
    private _gsapContext;
    protected constructor();
    /**
     * gets the Applicationinstance
     */
    get app(): Application;
    /**
     * gets the Add factory
     */
    get add(): Factory.AddFactory;
    /**
     * gets the Make factory
     */
    get make(): Factory.MakeFactory;
    /**
     * Gets the GSAP animation context for this state
     */
    get animationContext(): gsap.Context;
    /**
     * Gets the current layout for the state, if it exists
     */
    get layout(): Layout;
    /**
     * Gets default layout options
     */
    get defaultLayoutOptions(): any;
    getLayoutById(id: string): Layout | null;
    /**
     * Inits state
     * @param pSize{Point}
     * @param pData
     */
    init(pSize: Point, pData?: any): void;
    /**
     * Creates layout
     * see https://pixijs.io/layout/storybook/?path=/story/complex--application-layout for more info
     * @param options
     */
    createLayout(options?: any): void;
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
}
//# sourceMappingURL=State.d.ts.map