import { Point } from 'pixi.js';
import { SignalConnections } from 'typed-signals';
import { Application } from '../core';
import { Container } from '../gameobjects';
import { Make } from '../utils';
/**
 * State
 */
export class State extends Container {
    static { this._assets = []; }
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
        return State._assets || [];
    }
    static set Assets(pAssets) {
        this._assets = pAssets;
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
    get size() {
        return this._size;
    }
    set size(value) {
        this._size.copyFrom(value);
    }
    get data() {
        return this._data;
    }
    set data(value) {
        this._data = value;
    }
    /**
     * Updates state
     * @param deltaTime
     */
    update(deltaTime) {
        // override
    }
    /**
     * Determines whether resize on
     * @param size
     */
    onResize(size) {
        // override
    }
    /**
     * Destroys state.
     * @param destroyOptions
     */
    destroy(destroyOptions = {
        children: true,
    }) {
        super.destroy(destroyOptions);
    }
    async init(size) {
        // override
    }
    positionSelfCenter(size) {
        this.position.set(size.x * 0.5, size.y * 0.5);
    }
    async animateIn(callback) {
        callback();
    }
    async animateOut(callback) {
        callback();
    }
}
//# sourceMappingURL=State.js.map