import { IApplication } from '../../core/Application';
import { Container } from '../../display/Container';
import { IPopup, PopupConfig, PopupConstructor } from '../../display/Popup';
import { Signal } from '../../signals';
import type { IModule } from '../Module';
import { Module } from '../Module';
/**`
 * Interface for PopupManager
 */
export interface IPopupManager extends IModule {
    readonly view: Container;
    readonly current: IPopup | undefined;
    readonly popupCount: number;
    readonly currentPopupId: string | number | undefined;
    onPopupShown: Signal<() => void>;
    onPopupHidden: Signal<() => void>;
    add(id: string | number, popup: PopupConstructor): void;
    show(id: string | number, config?: Partial<PopupConfig>): Promise<IPopup | undefined>;
    hide(id: string | number): Promise<IPopup | undefined>;
    removeAll(animate?: boolean): void;
}
/**
 * PopupManager
 */
export declare class PopupManager extends Module implements IPopupManager {
    readonly id: string;
    readonly view: Container<import("../../core/Application").Application<import("pixi.js").Renderer>>;
    onPopupShown: Signal<() => void>;
    onPopupHidden: Signal<() => void>;
    private _currentPopupId;
    private _popups;
    private _activePopups;
    get currentPopupId(): string | number | undefined;
    get popupCount(): number;
    get current(): IPopup | undefined;
    /**
     * Initialize the PopupManager
     * @param app - The application
     */
    initialize(app: IApplication): void;
    /**
     * Destroy the PopupManager
     */
    destroy(): void;
    /**
     * Add a popup
     * @param id - The id of the popup
     * @param popup - The popup constructor
     */
    add(id: string | number, popup: PopupConstructor): void;
    /**
     * Show a popup
     * @param id - The id of the popup
     * @param config - The configuration for the popup
     * @returns a promise resolving to the popup, if it exists
     */
    show(id: string | number, config?: Partial<PopupConfig>): Promise<IPopup | undefined>;
    /**
     * Hide a popup
     * @param id - The id of the popup
     * @returns a promise resolving to the popup, if it exists
     */
    hide(id: string | number): Promise<IPopup | undefined>;
    /**
     * Remove all popups
     * @param animate - Whether to animate the removal
     */
    removeAll(animate?: boolean): void;
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
//# sourceMappingURL=PopupManager.d.ts.map