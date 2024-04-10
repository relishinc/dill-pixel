import { Application } from '../core/Application';
import { Signal } from '../signals';
import { Size } from '../utils/types';
import type { IModule } from './Module';
import { Module } from './Module';
export interface IWebEventsManager extends IModule {
    onResize: Signal<(size: {
        width: number;
        height: number;
    }) => void>;
    onVisibilityChanged: Signal<(visible: boolean) => void>;
}
/**
 * Maintains a list of callbacks for specific web events and invokes callbacks when event occurs.
 */
export declare class WebEventsManager extends Module implements IWebEventsManager {
    readonly id = "WebEventsManager";
    onResize: Signal<(size: Size) => void>;
    onVisibilityChanged: Signal<(visible: boolean) => void>;
    /**
     * Creates callback arrays and registers to web events.
     */
    constructor();
    get app(): Application;
    initialize(): void;
    destroy(): void;
    /**
     * Called when the browser visibility changes. Passes the `hidden` flag of the document to all callbacks.
     */
    private _onVisibilityChanged;
    /**
     * Called when the browser resizes.
     */
    private _onResize;
}
//# sourceMappingURL=WebEventsManager.d.ts.map