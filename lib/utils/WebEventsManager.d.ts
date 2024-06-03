import { Application } from '../core/Application';
/**
 * Alias for the function signature of a visibility change callback.
 */
type VisibilityChangedCallback = (pVisible: boolean) => void;
/**
 * Alias for the function signature of a resize callback.
 */
type ResizeCallback = () => void;
/**
 * Maintains a list of callbacks for specific web events and invokes callbacks when event occurs.
 */
export declare class WebEventsManager {
    private app;
    /**
     * The callbacks interested in visibility change of the browser.
     */
    private _visibilityChangedCallbacks;
    /**
     * The callbacks interested in the resizing of the browser.
     */
    private _resizeCallbacks;
    /**
     * Creates callback arrays and registers to web events.
     */
    constructor(app: Application);
    /**
     * Registers a callback interested in visibility changes. Callbacks will be told if the page is visible.
     * @param pCallback The callback to register.
     * @returns False if the callback was previously added.
     */
    registerVisibilityChangedCallback(pCallback: VisibilityChangedCallback): boolean;
    /**
     * Unregisters a visibility change callback.
     * @param pCallback The callback to unregister.
     */
    unregisterVisibilityChangedCallback(pCallback: VisibilityChangedCallback): void;
    /**
     * Registers a callback interested in browser resize.
     * @param pCallback The callback to register.
     * @returns False if the callback was previously added.
     */
    registerResizeCallback(pCallback: ResizeCallback): boolean;
    /**
     * Unregisters a resize callback.
     * @param pCallback The callback to unregister.
     */
    unregisterResizeCallback(pCallback: ResizeCallback): void;
    private onPageHide;
    private onPageShow;
    /**
     * Called when the browser visibility changes. Passes the `hidden` flag of the document to all callbacks.
     */
    private onVisibilityChanged;
    /**
     * Called when the browser resizes.
     */
    private onResize;
}
export {};
//# sourceMappingURL=WebEventsManager.d.ts.map