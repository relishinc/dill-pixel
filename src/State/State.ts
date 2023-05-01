import * as PIXI from "pixi.js";
import {Application} from "../Application";
import {AddFactory} from "../Utils/Add";
import {MakeFactory} from "../Utils/Make";

/**
 * State
 */
export abstract class State extends PIXI.Container {
    protected _size: PIXI.Point;
    protected _add: AddFactory;

    constructor() {
        super();
        this._size = new PIXI.Point();
        this._add = new AddFactory(this);
    }

    public get app(): Application {
        return Application.instance;
    }

    public get add(): AddFactory {
        return this._add;
    }

    public get make(): MakeFactory {
        return this.app.make;
    }

    public

    /**
     * Inits state
     * @param pSize
     */
    public init(pSize: PIXI.Point, pData?: any): void {
        this.onResize(pSize);
    }

    /**
     * Animates in
     * @param pOnComplete
     */
    public animateIn(pOnComplete: () => void): void {
        pOnComplete();
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
    public onResize(pSize: PIXI.Point): void {
        this._size.copyFrom(pSize);
        this.position.set(this._size.x * 0.5, this._size.y * 0.5);
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
    public destroy(pOptions: Parameters<typeof PIXI.Container.prototype.destroy>[0] = {children: true}): void {
        super.destroy(pOptions);
    }
}
