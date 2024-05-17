var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Application } from '../core/Application';
import { CorePlugin } from '../core/decorators';
import { Signal } from '../signals';
import { bindAllMethods } from '../utils/methodBinding';
import { Plugin } from './Plugin';
/**
 * Maintains a list of callbacks for specific web events and invokes callbacks when event occurs.
 */
let WebEventsManager = class WebEventsManager extends Plugin {
    id = 'WebEventsManager';
    // signals
    onResize = new Signal();
    onVisibilityChanged = new Signal();
    /**
     * Creates callback arrays and registers to web events.
     */
    constructor() {
        super();
        bindAllMethods(this);
    }
    get app() {
        return Application.getInstance();
    }
    initialize() {
        document.addEventListener('visibilitychange', this._onVisibilityChanged, false);
        window.addEventListener('resize', this._onResize);
        document.addEventListener('fullscreenchange', this._onResize);
    }
    destroy() {
        document.removeEventListener('visibilitychange', this._onVisibilityChanged, false);
        window.removeEventListener('resize', this._onResize);
        document.removeEventListener('fullscreenchange', this._onResize);
    }
    /**
     * Called when the browser visibility changes. Passes the `hidden` flag of the document to all callbacks.
     */
    _onVisibilityChanged() {
        this.onVisibilityChanged.emit(!document.hidden);
    }
    /**
     * Called when the browser resizes.
     */
    _onResize() {
        const el = this.app.renderer.canvas?.parentElement;
        let screenWidth = window.innerWidth;
        let screenHeight = window.innerHeight;
        if (el && el?.getBoundingClientRect()) {
            screenWidth = el.offsetWidth;
            screenHeight = el.offsetHeight;
        }
        this.onResize.emit({ width: screenWidth, height: screenHeight });
    }
};
WebEventsManager = __decorate([
    CorePlugin,
    __metadata("design:paramtypes", [])
], WebEventsManager);
export { WebEventsManager };
