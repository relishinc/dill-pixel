import { Point } from 'pixi.js';
import { ResizeManager } from './ResizeManager';
/**
 * Default options for Resizer module.
 */
const defaultOptions = {
    autoScroll: false,
    useAspectRatio: false,
    fixed: false,
    minSize: { width: 0, height: 0 },
};
export class ResizeManagerNew extends ResizeManager {
    constructor() {
        super(...arguments);
        this.id = 'resizer';
        this._size = new Point();
        this._screenSize = new Point();
    }
    get options() {
        return this._options;
    }
    set options(value) {
        this._options = value;
        window?.dispatchEvent(new Event('resize'));
    }
    get size() {
        return this._size;
    }
    get screenSize() {
        return this._screenSize;
    }
    get scale() {
        return this._scale;
    }
    /**
     * Initializes the Resizer module.
     */
    async initialize(options = {}) {
        this._options = { ...defaultOptions, ...options };
        this.resize();
    }
    /**
     * Resizes the application based on window size and module options.
     */
    resize() {
        let screenWidth = window.innerWidth;
        let screenHeight = window.innerHeight;
        const el = this.app.renderer.view?.parentElement;
        if (el && el?.getBoundingClientRect()) {
            screenWidth = el.offsetWidth;
            screenHeight = el.offsetHeight;
        }
        const minWidth = this._options.minSize.width;
        const minHeight = this._options.minSize.height;
        // Calculate renderer and canvas sizes based on current dimensions
        const scaleX = screenWidth < minWidth ? minWidth / screenWidth : 1;
        const scaleY = screenHeight < minHeight ? minHeight / screenHeight : 1;
        const scale = scaleX > scaleY ? scaleX : scaleY;
        this._scale = scale;
        const width = screenWidth * scale;
        const height = screenHeight * scale;
        // Update canvas style dimensions and scroll window up to avoid issues on mobile resize
        this.app.renderer.view.style.width = `${screenWidth}px`;
        this.app.renderer.view.style.height = `${screenHeight}px`;
        if (this._options.autoScroll) {
            window?.scrollTo(0, 0);
        }
        this._screenSize.x = screenWidth;
        this._screenSize.y = screenHeight;
        // Update renderer and navigation screens dimensions
        this.app.renderer.resize(width, height);
        this._size.x = width;
        this._size.y = height;
    }
    getSize() {
        return this._size;
    }
}
//# sourceMappingURL=ResizeManagerNew.js.map