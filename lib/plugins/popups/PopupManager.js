var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
import { CoreFunction, CorePlugin } from '../../core/decorators';
import { Container } from '../../display/Container';
import { Signal } from '../../signals';
import { getLastMapEntry } from '../../utils/map';
import { bindAllMethods } from '../../utils/methodBinding';
import { Plugin } from '../Plugin';
/**
 * PopupManager
 */
let PopupManager = class PopupManager extends Plugin {
    id = 'PopupManager'; // The id of the PopupManager
    view = new Container(); // The view of the PopupManager
    // signals
    onShowPopup = new Signal(); // Signal for when a popup is shown
    onHidePopup = new Signal(); // Signal for when a popup is hidden
    _currentPopupId = undefined; // The id of the current popup
    _popups = new Map(); // Map of popups
    _activePopups = new Map(); // Map of active popups
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
    addPopup(id, popup) {
        this._popups.set(id, popup);
    }
    /**
     * Show a popup
     * @param id - The id of the popup
     * @param config - The configuration for the popup
     * @returns a promise resolving to the popup, if it exists
     */
    async showPopup(id, config = {}) {
        const popup = this._popups.get(id);
        if (popup) {
            config.id = id;
            const instance = this.view.add.existing(new popup(id, config));
            instance.initialize();
            this.app.focus.clearFocus();
            await instance.show();
            this.app.focus.setFocusLayer(id);
            instance.afterShow();
            this._activePopups.set(id, instance);
            this._currentPopupId = id;
            this.onShowPopup.emit({ id, data: config?.data });
            instance.start();
            return instance;
        }
        return;
    }
    /**
     * Hide a popup
     * @param id - The id of the popup
     * @param data
     * @returns a promise resolving to the popup, if it exists
     */
    async hidePopup(id, data) {
        const popup = this._activePopups.get(id);
        if (popup) {
            popup.beforeHide();
            await popup.hide();
            this.view.removeChild(popup);
            this._activePopups.delete(id);
            this._currentPopupId = getLastMapEntry(this._activePopups)?.[0] || undefined;
            this.onHidePopup.emit({ id, data });
            popup.end();
            return popup;
        }
        return;
    }
    /**
     * Remove all popups
     * @param animate - Whether to animate the removal
     */
    removeAllPopups(animate = false) {
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
        this.addSignalConnection(this.app.scenes.onSceneChangeStart.connect(() => this.removeAllPopups()));
        this.app.keyboard.onKeyUp('Escape').connect(this._handleEscape);
    }
    /**
     * Handle escape key press
     * if the current popup should close when escape is pressed (true by default), closes it
     * @private
     */
    _handleEscape() {
        if (this.current && this.current.config.closeOnEscape) {
            void this.hidePopup(this.current.id);
        }
    }
};
__decorate([
    CoreFunction,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PopupManager.prototype, "addPopup", null);
__decorate([
    CoreFunction,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PopupManager.prototype, "showPopup", null);
__decorate([
    CoreFunction,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof T !== "undefined" && T) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], PopupManager.prototype, "hidePopup", null);
__decorate([
    CoreFunction,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", void 0)
], PopupManager.prototype, "removeAllPopups", null);
PopupManager = __decorate([
    CorePlugin
], PopupManager);
export { PopupManager };
