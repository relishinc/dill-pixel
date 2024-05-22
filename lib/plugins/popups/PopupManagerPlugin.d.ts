import { IApplication } from '../../core/Application';
import { Container } from '../../display/Container';
import { PopupConfig, PopupConstructor, IPopup } from '../../display/Popup';
import { Signal } from '../../signals';
import { IPlugin, Plugin } from '../Plugin';

/**`
 * Interface for PopupManager
 */
export interface IPopupManagerPlugin extends IPlugin {
    readonly view: Container;
    readonly current: IPopup | undefined;
    readonly popupCount: number;
    readonly currentPopupId: string | number | undefined;
    onShowPopup: Signal<(detail: PopupSignalDetail) => void>;
    onHidePopup: Signal<(detail: PopupSignalDetail) => void>;
    addPopup(id: string | number, popup: PopupConstructor): void;
    showPopup<T = any>(id: string | number, config: Partial<PopupConfig<T>>): Promise<IPopup<T> | undefined>;
    hidePopup<T = any>(id: string | number, data?: any): Promise<IPopup<T> | undefined>;
    removeAllPopups(animate?: boolean): void;
}
export type PopupSignalDetail<T = any> = {
    id: string | number;
    data?: T;
};
/**
 * PopupManager
 */
export declare class PopupManagerPlugin extends Plugin implements IPopupManagerPlugin {
    readonly id: string;
    readonly view: Container<import('../../core/Application').Application<import('pixi.js').Renderer>>;
    onShowPopup: Signal<(detail: PopupSignalDetail) => void>;
    onHidePopup: Signal<(detail: PopupSignalDetail) => void>;
    private _popups;
    private _activePopups;
    private _currentPopupId;
    get currentPopupId(): string | number | undefined;
    get popupCount(): number;
    get current(): IPopup | undefined;
    /**
     * Initialize the PopupManager
     * @param _app
     */
    initialize(_app: IApplication): void;
    /**
     * Destroy the PopupManager
     */
    destroy(): void;
    /**
     * Add a popup
     * @param id - The id of the popup
     * @param popup - The popup constructor
     */
    addPopup<T = any>(id: string | number, popup: PopupConstructor<T>): void;
    /**
     * Show a popup
     * @param id - The id of the popup
     * @param config - The configuration for the popup
     * @returns a promise resolving to the popup, if it exists
     */
    showPopup<T = any>(id: string | number, config?: Partial<PopupConfig<T>>): Promise<IPopup<T> | undefined>;
    /**
     * Hide a popup
     * @param id - The id of the popup
     * @param data
     * @returns a promise resolving to the popup, if it exists
     */
    hidePopup<T = any>(id: string | number, data?: T): Promise<IPopup<T> | undefined>;
    /**
     * Remove all popups
     * @param animate - Whether to animate the removal
     */
    removeAllPopups(animate?: boolean): void;
    protected getCoreFunctions(): string[];
    protected getCoreSignals(): string[];
    /**
     * Setup application listeners
     * @private
     */
    private _setupAppListeners;
    /**
     * Handle escape key press
     * if the current popup should close when escape is pressed (true by default), closes it
     * @private
     */
    private _handleEscape;
}
//# sourceMappingURL=PopupManagerPlugin.d.ts.map