import { Application } from '../../../core';
import { Signal } from '../../../signals';
import { bindAllMethods } from '../../../utils/methodBinding';
/**
 * Maintains a list of callbacks for specific web events and invokes callbacks when event occurs.
 */
export class WebEventsManager {
    /**
     * Creates callback arrays and registers to web events.
     */
    constructor() {
        this.id = 'webEventsManager';
        // signals
        this.onResize = new Signal();
        this.onVisibilityChanged = new Signal();
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
        this.onResize.emit({ width: window.innerWidth, height: window.innerHeight });
    }
}
//# sourceMappingURL=WebEventsManager.js.map