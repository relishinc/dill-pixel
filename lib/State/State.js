import { gsap } from "gsap";
import { Point } from "pixi.js";
import { SignalConnections } from "typed-signals";
import { Application } from "../Application";
import { Container } from "../GameObjects";
import { Make } from "../Utils/Factory";
/**
 * State
 */
export class State extends Container {
    constructor() {
        super(false);
        this._gsapContext = null;
        this._connections = new SignalConnections();
        this._size = new Point();
        this.gsapContextRevert = this.gsapContextRevert.bind(this);
    }
    static get ID() {
        return "State";
    }
    static get Assets() {
        return [];
    }
    /**
     * gets the Applicationinstance
     */
    get app() {
        return Application.instance;
    }
    /**
     * gets the Add factory
     */
    get add() {
        return this._addFactory;
    }
    /**
     * gets the Make factory
     */
    get make() {
        return Make;
    }
    /**
     * Gets the GSAP animation context for this state
     */
    get animationContext() {
        if (!this._gsapContext) {
            this._gsapContext = gsap.context(() => {
                // add to the gsap context later if desired
                return this.gsapContextRevert;
            });
        }
        return this._gsapContext;
    }
    /**
     * Inits state
     * @param pSize{Point}
     * @param pData
     */
    init(pSize, pData) {
        this.onResize(pSize);
    }
    /**
     * Updates state
     * @param pDeltaTime
     */
    update(pDeltaTime) {
        // override
    }
    /**
     * Determines whether resize on
     * @param pSize
     */
    onResize(pSize) {
        this._size.copyFrom(pSize);
        this.position.set(this._size.x * 0.5, this._size.y * 0.5);
    }
    /**
     * Animates in
     * @param pOnComplete
     */
    animateIn(pOnComplete) {
        pOnComplete();
    }
    /**
     * Animates out
     * @param pOnComplete
     */
    animateOut(pOnComplete) {
        pOnComplete();
    }
    /**
     * Destroys state.
     * @param pOptions
     */
    destroy(pOptions = {
        children: true,
    }) {
        super.destroy(pOptions);
        // if (this._gsapContext) {
        // 	try {
        // 		this._gsapContext.revert();
        // 	} catch (e) {
        // 		// ignore for now
        // 	}
        // }
    }
    /**
     * Reverts the gsap context
     * override this to provide custom cleanup
     * @protected
     */
    gsapContextRevert() {
        // override me to provide custom gsap cleanup function
    }
    gsapContextAdd(func) {
        return this.animationContext.add(func);
    }
}
State.NAME = "State";
//# sourceMappingURL=State.js.map