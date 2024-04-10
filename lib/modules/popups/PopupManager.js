var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CoreModule } from '../../core/decorators';
import { Container } from '../../display/Container';
import { Signal } from '../../signals';
import { getLastMapEntry } from '../../utils/map';
import { bindAllMethods } from '../../utils/methodBinding';
import { Module } from '../Module';
/**
 * PopupManager
 */
let PopupManager = class PopupManager extends Module {
    constructor() {
        super(...arguments);
        this.id = 'PopupManager'; // The id of the PopupManager
        this.view = new Container(); // The view of the PopupManager
        // signals
        this.onPopupShown = new Signal(); // Signal for when a popup is shown
        this.onPopupHidden = new Signal(); // Signal for when a popup is hidden
        this._currentPopupId = undefined; // The id of the current popup
        this._popups = new Map(); // Map of popups
        this._activePopups = new Map(); // Map of active popups
    }
    get currentPopupId() {
        return this._currentPopupId;
    }
    get popupCount() {
        return this._popups.size;
    }
    get current() {
        if (this._currentPopupId === undefined) {
            return undefined;
        }
        return this._activePopups.get(this._currentPopupId);
    }
    /**
     * Initialize the PopupManager
     * @param app - The application
     */
    initialize(app) {
        bindAllMethods(this);
        this.view.name = 'PopupManager';
        this._setupAppListeners();
    }
    /**
     * Destroy the PopupManager
     */
    destroy() {
        this._activePopups.clear();
        super.destroy();
    }
    /**
     * Add a popup
     * @param id - The id of the popup
     * @param popup - The popup constructor
     */
    add(id, popup) {
        this._popups.set(id, popup);
    }
    /**
     * Show a popup
     * @param id - The id of the popup
     * @param config - The configuration for the popup
     * @returns a promise resolving to the popup, if it exists
     */
    async show(id, config = {}) {
        const popup = this._popups.get(id);
        if (popup) {
            const instance = this.view.add.existing(new popup(id, config));
            instance.initialize();
            await instance.show();
            instance.afterShow();
            this._activePopups.set(id, instance);
            this._currentPopupId = id;
            this.onPopupShown.emit();
            instance.start();
            return instance;
        }
        return;
    }
    /**
     * Hide a popup
     * @param id - The id of the popup
     * @returns a promise resolving to the popup, if it exists
     */
    async hide(id) {
        const popup = this._activePopups.get(id);
        if (popup) {
            popup.beforeHide();
            await popup.hide();
            this.view.removeChild(popup);
            this._activePopups.delete(id);
            this._currentPopupId = getLastMapEntry(this._activePopups)?.[0] || undefined;
            this.onPopupHidden.emit();
            popup.end();
            return popup;
        }
        return;
    }
    /**
     * Remove all popups
     * @param animate - Whether to animate the removal
     */
    removeAll(animate = false) {
        if (animate) {
            this._activePopups.forEach((popup) => {
                popup.hide();
            });
        }
        else {
            this._activePopups.clear();
            this.view.removeChildren();
        }
    }
    /**
     * Setup application listeners
     * @private
     */
    _setupAppListeners() {
        this.addSignalConnection(this.app.scenes.onSceneChangeStart.connect(() => this.removeAll()));
        this.app.keyboard.onKeyUp('Escape').connect(this._handleEscape);
    }
    /**
     * Handle escape key press
     * if the current popup should close when escape is pressed (true by default), closes it
     * @private
     */
    _handleEscape() {
        if (this.current && this.current.config.closeOnEscape) {
            void this.hide(this.current.id);
        }
    }
};
PopupManager = __decorate([
    CoreModule
], PopupManager);
export { PopupManager };
//# sourceMappingURL=PopupManager.js.map