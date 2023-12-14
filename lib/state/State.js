import { Point } from 'pixi.js';
import { SignalConnections } from 'typed-signals';
import { Application } from '../core';
import { Container } from '../gameobjects';
import { Make } from '../utils/factory';
/**
 * State
 */
export class State extends Container {
    static { this.NAME = 'State'; }
    static { this._assets = []; }
    set size(value) {
        this._size.copyFrom(value);
    }
    get size() {
        return this._size;
    }
    set data(value) {
        this._data = value;
    }
    get data() {
        return this._data;
    }
    constructor() {
        super(false);
        this._connections = new SignalConnections();
        this._size = new Point();
    }
    static get ID() {
        return 'State';
    }
    static set Assets(pAssets) {
        this._assets = pAssets;
    }
    static get Assets() {
        return State._assets || [];
    }
    /**
     * gets the Application instance
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
    async init(size) {
        // override
    }
    /**
     * Updates state
     * @param _deltaTime
     */
    update(_deltaTime) {
        // override
    }
    positionSelfCenter(size) {
        this.position.set(size.x * 0.5, size.y * 0.5);
    }
    /**
     * Determines whether resize on
     * @param size
     */
    onResize(size) {
        // override
    }
    /**
     * Animates in
     * @param callback
     */
    animateIn(callback) {
        callback();
    }
    /**
     * Animates out
     * @param callback
     */
    animateOut(callback) {
        callback();
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