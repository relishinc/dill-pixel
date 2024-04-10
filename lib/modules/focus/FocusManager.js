var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Container } from 'pixi.js';
import { CoreModule } from '../../core/decorators';
import { Signal } from '../../signals';
import { Logger } from '../../utils/console/Logger';
import { getLastMapEntry, getPreviousMapEntry } from '../../utils/map';
import { bindMethods } from '../../utils/methodBinding';
import { Module } from '../Module';
import { FocusOutliner } from './FocusOutliner';
class FocusLayer {
    constructor(id) {
        this.id = id;
        this.currentFocusable = null;
        this.lastFocusable = null;
        this.defaultFocusable = null;
        this._focusables = [];
        this._currentIndex = 0;
        this._current = false;
    }
    set current(value) {
        this._current = value;
        this.setCurrent();
    }
    get availableFocusables() {
        return this._focusables.filter((f) => f.focusEnabled);
    }
    setCurrent() {
        if (this._current) {
            if (!this.defaultFocusable) {
                this.defaultFocusable = this._focusables[0];
            }
            this.sortFocusables();
        }
        else {
            for (let i = 0; i < this._focusables.length; i++) {
                this._focusables[i].accessible = false;
            }
        }
    }
    hasFocusable(focusable) {
        if (!focusable) {
            return false;
        }
        return this._focusables.indexOf(focusable) > -1;
    }
    addFocusable(focusable, isDefault = false) {
        this._focusables.push(focusable);
        if (isDefault) {
            this.defaultFocusable = focusable;
        }
        if (this._current) {
            this.sortFocusables();
        }
    }
    removeFocusable(focusable) {
        const index = this._focusables.indexOf(focusable);
        if (index !== -1) {
            this._focusables.splice(index, 1);
            if (this.currentFocusable === focusable) {
                this.currentFocusable = null;
            }
            if (this.lastFocusable === focusable) {
                this.lastFocusable = null;
            }
            if (this.defaultFocusable === focusable) {
                this.defaultFocusable = null;
            }
        }
        if (this._current) {
            this.sortFocusables();
        }
    }
    sortFocusables() {
        for (let i = 0; i < this._focusables.length; i++) {
            this._focusables[i].accessible = this._current;
            this._focusables[i].tabIndex = this._current ? Math.max(i, 1) + 1 : -1;
            if (this._focusables[i] === this.defaultFocusable) {
                this._focusables[i].tabIndex = this._current ? 1 : -1;
            }
        }
        if (this._current) {
            this._focusables.sort((a, b) => a.tabIndex - b.tabIndex);
        }
    }
    setCurrentFocusable(focusable) {
        if (focusable) {
            this._currentIndex = this._focusables.indexOf(focusable);
            this.currentFocusable = focusable;
        }
        else {
            this._currentIndex = -1;
            this.currentFocusable = null;
        }
        return this.currentFocusable;
    }
}
let FocusManager = class FocusManager extends Module {
    constructor() {
        super(...arguments);
        this.id = 'FocusManager';
        this.view = new Container();
        // signals
        this.onFocusManagerActivated = new Signal();
        this.onFocusManagerDeactivated = new Signal();
        this.onFocusLayerChange = new Signal();
        this.onFocusChange = new Signal();
        this._layers = new Map();
        this._currentLayerId = null;
        this._focusTarget = null;
        this._active = false;
        this._enabled = true;
    }
    get enabled() {
        return this._enabled;
    }
    set enabled(value) {
        this._enabled = value;
    }
    get active() {
        return this._active;
    }
    get currentLayerId() {
        return this._currentLayerId;
    }
    get layerCount() {
        return this._layers.size;
    }
    get layers() {
        return this._layers;
    }
    initialize(app) {
        this._updateAccesibilityDivId();
        bindMethods(this, 'removeAllFocusLayers', '_handleGlobalMouseMove', '_handleGlobalPointerDown');
        const options = app.config?.focusOptions || {};
        this._focusOutliner =
            typeof options === 'function'
                ? new options()
                : new FocusOutliner(options);
        this.view.addChild(this._focusOutliner);
        this._setupKeyboardListeners();
        this._setupAppListeners();
    }
    destroy() {
        this._removeGlobalListeners();
        this.deactivate();
        this._focusOutliner.destroy();
        this._layers.clear();
        super.destroy();
    }
    deactivate() {
        this._setTarget(null);
        this._updateOutliner();
        this._active = false;
    }
    add(focusable, layerId, isDefault = false) {
        this.addFocusable(focusable, layerId, isDefault);
    }
    addFocusable(focusable, layerId, isDefault = false) {
        if (layerId === undefined || layerId == null) {
            layerId = this._currentLayerId ?? null;
        }
        const layer = this._layers.get(layerId);
        if (!layer) {
            Logger.error(`Layer with ID ${layerId} does not exist.`);
            return;
        }
        if (!Array.isArray(focusable)) {
            focusable = [focusable];
        }
        focusable.forEach((f, idx) => {
            layer.addFocusable(f, idx === 0 && isDefault);
        });
        if (this._active && this.app.renderer.accessibility.isActive && isDefault) {
            this._setTarget(layer.currentFocusable || layer.defaultFocusable || null, !this._active);
        }
    }
    remove(focusable) {
        this.removeFocusable(focusable);
    }
    removeFocusable(focusable) {
        if (!Array.isArray(focusable)) {
            focusable = [focusable];
        }
        this._layers.forEach((layer) => {
            focusable.forEach((f) => {
                layer.removeFocusable(f);
            });
        });
    }
    setLayerOrder(layerIds) {
        const newLayers = new Map();
        layerIds.forEach((layerId) => {
            if (!this._layers.has(layerId)) {
                throw new Error(`Layer with ID ${layerId} does not exist.`);
            }
            newLayers.set(layerId, this._layers.get(layerId));
        });
        this._layers = newLayers;
    }
    addFocusLayer(layerId, focusables, setAsCurrent = true) {
        if (layerId === undefined) {
            layerId = this._layers.size;
        }
        let newLayer;
        if (this._layers.has(layerId)) {
            Logger.error(`Layer with ID ${layerId} already exists.`);
            newLayer = this._layers.get(layerId);
        }
        else {
            newLayer = new FocusLayer(layerId);
            this._layers.set(layerId, newLayer);
        }
        if (setAsCurrent || this._currentLayerId === null) {
            this.setFocusLayer(layerId);
        }
        if (focusables) {
            this.addFocusable(focusables, layerId);
        }
        return newLayer;
    }
    removeFocusLayer(layerId, removeTopLayerIfUndefined = true) {
        if (layerId === undefined && removeTopLayerIfUndefined) {
            return this._removeTopLayer();
        }
        if (!this._layers.has(layerId)) {
            throw new Error(`Layer with ID ${layerId} does not exist.`);
        }
        const nextLayerId = getPreviousMapEntry(this._layers, layerId)?.[0];
        this._layers.delete(layerId);
        this._postDelete(nextLayerId);
    }
    restart(reverse = false) {
        const layer = this._getCurrentLayer();
        this._setTarget(reverse
            ? layer?.availableFocusables?.[layer?.availableFocusables?.length - 1] || null
            : layer?.defaultFocusable || null);
    }
    forceFocus(focusable) {
        this.focus(focusable);
    }
    setFocus(focusable) {
        this.focus(focusable);
    }
    focus(focusable) {
        this._setTarget(focusable);
    }
    setFocusLayer(layerId) {
        if (!this._layers.has(layerId)) {
            throw new Error(`Layer with ID ${layerId} does not exist.`);
        }
        this._currentLayerId = layerId;
        const currentLayer = this._getCurrentLayer();
        if (currentLayer) {
            currentLayer.current = true;
            this._layers.forEach((layer, key) => {
                layer.current = key === layerId;
            });
            currentLayer.sortFocusables();
            this._setTarget(currentLayer.currentFocusable || currentLayer.defaultFocusable || null, !this._active);
        }
        this.onFocusLayerChange.emit(this._currentLayerId);
    }
    removeAllFocusLayers() {
        this._layers.clear();
        this._setTarget(null);
    }
    _updateAccesibilityDivId() {
        // @ts-ignore
        this.app.renderer.accessibility._div.setAttribute('id', 'pixi-accessibility');
    }
    _getCurrentLayer() {
        return this._currentLayerId != null ? this._layers.get(this._currentLayerId) : null;
    }
    _removeTopLayer() {
        const layerId = getLastMapEntry(this._layers)?.[0];
        const nextLayerId = getPreviousMapEntry(this._layers, layerId)?.[0];
        if (layerId === undefined) {
            return;
        }
        this._layers.delete(layerId);
        this._postDelete(nextLayerId);
    }
    _postDelete(nextLayerId) {
        if (this._layers.size === 0) {
            this._currentLayerId = null;
        }
        else if (nextLayerId !== undefined) {
            this.setFocusLayer(nextLayerId);
        }
    }
    _setTarget(focusTarget, setInactiveOnNull = true) {
        const layer = this._getCurrentLayer();
        const oldFocusTarget = this._focusTarget;
        this._focusTarget = focusTarget;
        // call the focus out methods on the current focusable, which is changing
        if (oldFocusTarget && this._active) {
            this._clearFocusTarget(oldFocusTarget);
        }
        if (this.app.renderer.accessibility.isActive) {
            if (this._focusTarget) {
                if (!this._active) {
                    this._active = true;
                }
                //@ts-ignore
                if (!this._focusTarget._accessibleDiv) {
                    this.app.renderer.accessibility.postrender();
                }
                this.app.ticker.addOnce(() => {
                    this._focusTarget?._accessibleDiv?.focus();
                });
                if (layer?.hasFocusable(focusTarget)) {
                    // call focusIn on the focusable
                    if (this._focusTarget) {
                        this._focusTarget.focusIn();
                        this._focusTarget.isFocused = true;
                        this._focusTarget.onFocusIn.emit(this._focusTarget);
                        layer.setCurrentFocusable(this._focusTarget);
                        this._updateOutliner();
                    }
                }
                else {
                    Logger.warn(`The focusable`, focusTarget, `does not exist on the current focus layer: ${this._currentLayerId}`);
                }
            }
        }
        else {
            this._focusOutliner.clear();
            if (this._active && setInactiveOnNull) {
                this._active = false;
                this.onFocusManagerDeactivated.emit();
                return;
            }
        }
        if (oldFocusTarget !== focusTarget && this._active) {
            this.onFocusChange.emit({ focusable: this._focusTarget, layer: this._currentLayerId });
        }
    }
    _clearFocusTarget(focusTarget) {
        if (!focusTarget) {
            return;
        }
        focusTarget.focusOut();
        focusTarget.isFocused = false;
        focusTarget.onFocusOut.emit(focusTarget);
        focusTarget.blur();
        focusTarget.onBlur.emit(focusTarget);
    }
    _setupKeyboardListeners() {
        window.addEventListener('keydown', (e) => {
            if (!this._enabled) {
                return;
            }
            if (e.key === 'Tab') {
                const layer = this._getCurrentLayer();
                const focusables = layer?.availableFocusables;
                if (!focusables) {
                    return;
                }
                // check if we're on the last focusable
                if ((e.shiftKey && this._focusTarget === focusables[0]) ||
                    (!e.shiftKey && this._focusTarget === focusables[focusables.length - 1])) {
                    e.preventDefault();
                    this.restart(e.shiftKey);
                }
            }
        });
        this._addGlobalListeners();
    }
    _addGlobalListeners() {
        globalThis.document.addEventListener('mousemove', this._handleGlobalMouseMove);
        globalThis.document.addEventListener('pointerdown', this._handleGlobalPointerDown);
    }
    _removeGlobalListeners() {
        globalThis.document.removeEventListener('mousemove', this._handleGlobalMouseMove);
        globalThis.document.removeEventListener('pointerdown', this._handleGlobalPointerDown);
    }
    _handleGlobalMouseMove(e) {
        if (!this._enabled) {
            return;
        }
        if (this._active) {
            this.deactivate();
        }
    }
    _handleGlobalPointerDown(e) {
        if (!this._enabled) {
            return;
        }
        if (this._active) {
            this.deactivate();
        }
        if (this.app.renderer.accessibility.isActive) {
            // @ts-ignore
            this.app.renderer.accessibility._deactivate();
        }
    }
    _setupAppListeners() {
        this.app.scenes.onSceneChangeStart.connect(this.removeAllFocusLayers);
    }
    _updateOutliner() {
        if (this._focusTarget) {
            this._focusOutliner.position.set(this._focusTarget.position.x, this._focusTarget.position.y);
            this._focusOutliner.draw(this._focusTarget);
        }
        else {
            this._focusOutliner.clear();
        }
    }
};
FocusManager = __decorate([
    CoreModule
], FocusManager);
export { FocusManager };
//# sourceMappingURL=FocusManager.js.map