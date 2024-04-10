import { Container } from './Container';
export class Scene extends Container {
    constructor() {
        super({ autoResize: true, autoUpdate: true, priority: -9999 });
    }
    get assets() {
        return null;
    }
    get bundles() {
        return null;
    }
    async initialize() { }
    /**
     * Called to animate the scene in
     * @returns {Promise<void>}
     */
    enter() {
        return Promise.resolve();
    }
    /**
     * Called to animate the scene out
     * @returns {Promise<void>}
     */
    exit() {
        return Promise.resolve();
    }
    async start() { }
    /**
     * Called every frame
     * @param {Ticker} ticker
     */
    update(ticker) { }
    /**
     * Called when the window is resized
     * @param {Size} size
     */
    resize(size) { }
}
//# sourceMappingURL=Scene.js.map