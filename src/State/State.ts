import {gsap} from "gsap";
import {Point} from "pixi.js";
import {SignalConnections} from "typed-signals";
import {Application} from "../Application";
import {Container} from "../GameObjects";
import {AssetMapData} from "../Load";
import {Add, Make} from "../Utils/Factory";

/**
 * State
 */
export abstract class State extends Container {
	public static NAME: string = "State";
	protected _size: Point;
	protected _gsapContext: gsap.Context | null = null;
	protected _connections: SignalConnections = new SignalConnections();


	constructor() {
		super(false);
		this._size = new Point();
		this.gsapContextRevert = this.gsapContextRevert.bind(this);
	}

	public static get ID(): string {
		return "State";
	}

	public static get Assets(): AssetMapData[] {
		return [];
	}

	/**
	 * gets the Applicationinstance
	 */
	public get app(): Application {
		return Application.instance;
	}

	/**
	 * gets the Add factory
	 */
	public get add(): Add {
		return this._addFactory;
	}

	/**
	 * gets the Make factory
	 */
	public get make(): typeof Make {
		return Make;
	}

	/**
	 * Gets the GSAP animation context for this state
	 */
	public get animationContext(): gsap.Context {
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
	public init(pSize: Point, pData?: any): void {
		this.onResize(pSize);
	}

	/**
	 * Updates state
	 * @param pDeltaTime
	 */
	public update(pDeltaTime: number): void {
		// override
	}

	/**
	 * Determines whether resize on
	 * @param pSize
	 */
	public onResize(pSize: Point): void {
		this._size.copyFrom(pSize);
		this.position.set(this._size.x * 0.5, this._size.y * 0.5);
	}

	/**
	 * Animates in
	 * @param pOnComplete
	 */
	public animateIn(pOnComplete: () => void): void {
		pOnComplete();
	}

	/**
	 * Animates out
	 * @param pOnComplete
	 */
	public animateOut(pOnComplete: () => void): void {
		pOnComplete();
	}

	/**
	 * Destroys state.
	 * @param pOptions
	 */
	public destroy(
		pOptions: Parameters<typeof Container.prototype.destroy>[0] = {
			children: true,
		}
	): void {
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
	protected gsapContextRevert() {
		// override me to provide custom gsap cleanup function
	}

	protected gsapContextAdd(func: () => void) {
		return this.animationContext.add(func);
	}


}
