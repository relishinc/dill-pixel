/**
 * Maintains a list of callbacks for specific web events and invokes callbacks when event occurs.
 */
export class WebEventsManager {
    /**
     * Creates callback arrays and registers to web events.
     */
    constructor(app) {
        this.app = app;
        this._visibilityChangedCallbacks = [];
        document.addEventListener('visibilitychange', this.onVisibilityChanged.bind(this), false);
        window.addEventListener('pagehide', this.onPageHide.bind(this), false);
        window.addEventListener('pageshow', this.onPageShow.bind(this), false);
        this._resizeCallbacks = [];
        window.addEventListener('resize', this.onResize.bind(this));
        document.addEventListener('fullscreenchange', this.onResize.bind(this));
    }
    /**
     * Registers a callback interested in visibility changes. Callbacks will be told if the page is visible.
     * @param pCallback The callback to register.
     * @returns False if the callback was previously added.
     */
    registerVisibilityChangedCallback(pCallback) {
        const index = this._visibilityChangedCallbacks.indexOf(pCallback);
        if (index === -1) {
            this._visibilityChangedCallbacks.push(pCallback);
            return true;
        }
        return false;
    }
    /**
     * Unregisters a visibility change callback.
     * @param pCallback The callback to unregister.
     */
    unregisterVisibilityChangedCallback(pCallback) {
        const index = this._visibilityChangedCallbacks.indexOf(pCallback);
        if (index > -1) {
            this._visibilityChangedCallbacks.splice(index, 1);
        }
    }
    /**
     * Registers a callback interested in browser resize.
     * @param pCallback The callback to register.
     * @returns False if the callback was previously added.
     */
    registerResizeCallback(pCallback) {
        const index = this._resizeCallbacks.indexOf(pCallback);
        if (index === -1) {
            this._resizeCallbacks.push(pCallback);
            return true;
        }
        return false;
    }
    /**
     * Unregisters a resize callback.
     * @param pCallback The callback to unregister.
     */
    unregisterResizeCallback(pCallback) {
        const index = this._resizeCallbacks.indexOf(pCallback);
        if (index > -1) {
            this._resizeCallbacks.splice(index, 1);
        }
    }
    onPageHide() {
        this.onVisibilityChanged(null, false);
    }
    onPageShow() {
        this.onVisibilityChanged(null, true);
    }
    /**
     * Called when the browser visibility changes. Passes the `hidden` flag of the document to all callbacks.
     */
    onVisibilityChanged(e, visible) {
        this._visibilityChangedCallbacks.forEach((callback) => {
            // We are sending a ! param so that the registered functions get pVisible instead of pHidden
            callback(visible === undefined ? !document.hidden : visible);
        });
    }
    /**
     * Called when the browser resizes.
     */
    onResize() {
        this._resizeCallbacks.forEach((callback) => {
            callback();
        });
    }
}
//# sourceMappingURL=WebEventsManager.js.map