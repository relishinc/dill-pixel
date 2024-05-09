var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CorePlugin } from '../core/decorators';
import { Container } from '../display/Container';
import { Plugin } from './Plugin';
/**
 * Default options for Resizer module.
 */
const defaultOptions = {
    autoScroll: false,
    useAspectRatio: false,
    fixed: false,
    minSize: { width: 0, height: 0 },
    maxSize: { width: 0, height: 0 },
    debug: false,
};
let Resizer = class Resizer extends Plugin {
    id = 'resizer';
    _options;
    _size;
    _debugContainer;
    _gfx;
    get size() {
        return this._size;
    }
    /**
     * Initializes the Resizer module.
     */
    async initialize(_app, options = {}) {
        this._options = { ...defaultOptions, ...options };
    }
    /**
     * Post-initialization of the Resizer module.
     * when this is called, the renderer is already created, and the dom element has been appended
     */
    async postInitialize() {
        this.resize();
    }
    /**
     * Resizes the application based on window size and module options.
     */
    resize() {
        let screenWidth = window.innerWidth;
        let screenHeight = window.innerHeight;
        const el = this.app.renderer.canvas?.parentElement;
        const bounds = el?.getBoundingClientRect();
        if (bounds) {
            screenWidth = bounds.width;
            screenHeight = bounds.height;
        }
        const minWidth = this._options.minSize.width;
        const minHeight = this._options.minSize.height;
        // Calculate renderer and canvas sizes based on current dimensions
        const scaleX = screenWidth < minWidth ? minWidth / screenWidth : 1;
        const scaleY = screenHeight < minHeight ? minHeight / screenHeight : 1;
        const scale = scaleX > scaleY ? scaleX : scaleY;
        const width = screenWidth * scale;
        const height = screenHeight * scale;
        // Update canvas style dimensions and scroll window up to avoid issues on mobile resize
        this.app.renderer.canvas.style.width = `${screenWidth}px`;
        this.app.renderer.canvas.style.height = `${screenHeight}px`;
        if (this._options.autoScroll) {
            window?.scrollTo(0, 0);
        }
        // Update renderer and navigation screens dimensions
        this.app.renderer.resize(width, height);
        this._size = { width, height };
        if (this._options.debug) {
            this._drawDebug();
        }
    }
    /**
     * Draws debug information if debug option is enabled.
     */
    _drawDebug() {
        if (!this._debugContainer) {
            this._debugContainer = this.app.stage.addChild(new Container());
            this._gfx = this._debugContainer.add.graphics();
        }
        this._gfx.clear();
        this._gfx.rect(0, 0, this._size.width, this._size.height);
        this._gfx.stroke({ width: 4, color: 0x000fff });
    }
};
Resizer = __decorate([
    CorePlugin
], Resizer);
export { Resizer };
