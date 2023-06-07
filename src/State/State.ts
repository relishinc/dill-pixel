import {gsap} from 'gsap';
import {Container, Point} from 'pixi.js';
import {Application} from "../Application";
import * as Factory from "../Utils/Factory";

/**
 * State
 */
export abstract class State extends Container {
	protected _size: Point;
	protected _addFactory: Factory.AddFactory;
	private _gsapContext: gsap.Context | null = null;

	protected constructor() {
		super();
		this._size = new Point();
		this._addFactory = new Factory.AddFactory(this);

		this.gsapContextRevert = this.gsapContextRevert.bind(this);
	}

	public get app(): Application {
		return Application.instance;
	}

	public get add(): Factory.AddFactory {
		return this._addFactory;
	}

	public get make(): Factory.MakeFactory {
		return this.app.make;
	}

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
		if (this._gsapContext) {
			this._gsapContext.revert();
		}
	}

	protected gsapContextRevert() {
		// override me to provide custom gsap cleanup function
	}
}
