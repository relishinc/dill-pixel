import { Point } from 'pixi.js';
import { SignalConnections } from 'typed-signals';
import { Application } from '../core/Application';
import { Container } from '../gameobjects';
import { Make } from '../utils/factory';
/**
 * State
 */
export class State extends Container {
    static { this.NAME = 'State'; }
    constructor() {
        super(false);
        this._connections = new SignalConnections();
        this._size = new Point();
    }
    static get ID() {
        return 'State';
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
     * Inits state
     * @param pSize{Point}
     * @param pData
     */
    init(pSize, pData) {
        this.onResize(pSize);
        this._data = pData;
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
    }
}
//# sourceMappingURL=State.js.map