var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Container } from 'pixi.js';
import { CoreFunction, CorePlugin } from '../../core/decorators';
import { Signal } from '../../signals';
import { Logger } from '../../utils/console/Logger';
import { getLastMapEntry, getPreviousMapEntry } from '../../utils/map';
import { bindMethods } from '../../utils/methodBinding';
import { Plugin } from '../Plugin';
import { FocusOutliner } from './FocusOutliner';
class FocusLayer {
    id;
    currentFocusable = null;
    lastFocusable = null;
    defaultFocusable = null;
    _focusables = [];
    _currentIndex = 0;
    _current = false;
    constructor(id) {
        this.id = id;
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
    next() {
        this._currentIndex = this._currentIndex + 1;
        if (this._currentIndex >= this._focusables.length) {
            this._currentIndex = 0;
        }
        this.currentFocusable = this._focusables[this._currentIndex];
        return this.currentFocusable;
    }
    prev() {
        this._currentIndex = this._currentIndex - 1;
        if (this._currentIndex < 0) {
            this._currentIndex = this._focusables.length - 1;
        }
        this.currentFocusable = this._focusables[this._currentIndex];
        return this.currentFocusable;
    }
}
let FocusManager = class FocusManager extends Plugin {
    id = 'FocusManager';
    view = new Container();
    // signals
    onFocusManagerActivated = new Signal();
    onFocusManagerDeactivated = new Signal();
    onFocusLayerChange = new Signal();
    onFocusChange = new Signal();
    //
    _focusOutliner;
    _layers = new Map();
    _currentLayerId = null;
    _focusTarget = null;
    _keyboardActive = false;
    _active = false;
    _enabled = true;
    _options;
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
        bindMethods(this, 'removeAllFocusLayers', '_handleGlobalMouseMove', '_handleGlobalPointerDown');
        const options = app.config?.focusOptions || {};
        options.usePixiAccessibility = options.usePixiAccessibility ?? false;
        this._focusOutliner =
            typeof options?.outliner === 'function'
                ? new options.outliner()
                : new FocusOutliner(options.outliner);
        this._options = options;
        this.view.addChild(this._focusOutliner);
        this._updatePixiAccessibility();
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
        if (this._active && isDefault) {
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
    addFocusLayer(layerId, setAsCurrent = true, focusables) {
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
            : layer?.availableFocusables?.[0] || null);
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    postInitialize(_app) { }
    clearFocus() {
        this._setTarget(null);
    }
    removeAllFocusLayers() {
        this._layers.clear();
        this._setTarget(null);
    }
    _onKeyDown(e) {
        if (!this._enabled || (e.key !== 'Tab' && e.key !== 'Enter' && e.key !== ' ' && e.key !== 'Space')) {
            return;
        }
        if (!this._options.usePixiAccessibility) {
            e.preventDefault();
            if (e.key === 'Tab') {
                const layer = this._getCurrentLayer();
                const focusables = layer?.availableFocusables;
                if (!focusables) {
                    return;
                }
                if (!this._keyboardActive) {
                    this._activate();
                    this._setTarget(layer.currentFocusable || layer.defaultFocusable || null);
                }
                else {
                    // check if we're on the last focusable
                    if (e.shiftKey) {
                        this._prev();
                    }
                    else {
                        this._next();
                    }
                }
            }
            else if (e.key === 'Enter' || e.key === ' ' || e.key === 'Space') {
                if (this._focusTarget && this._focusTarget.isFocused) {
                    this._focusTarget.emit('pointerdown', { type: 'pointerdown' });
                }
            }
        }
    }
    _onKeyUp(e) {
        if (!this._enabled || (e.key !== 'Enter' && e.key !== ' ' && e.key !== 'Space')) {
            return;
        }
        if (!this._options.usePixiAccessibility) {
            e.preventDefault();
            if (this._focusTarget && this._focusTarget.isFocused) {
                this._focusTarget.emit('click', { type: 'click' });
                this._focusTarget.emit('pointerup', { type: 'pointerup' });
            }
        }
    }
    _onMouseMove(e) {
        if (e.movementX === 0 && e.movementY === 0) {
            return;
        }
        this._deactivate();
    }
    _next() {
        const nextTarget = this._getCurrentLayer()?.next();
        if (!nextTarget) {
            Logger.error('FocusManager:: _next():: No focusable found in the current layer.');
            return;
        }
        this._setTarget(nextTarget);
    }
    _prev() {
        const nextTarget = this._getCurrentLayer()?.prev();
        if (!nextTarget) {
            Logger.error('FocusManager:: _prev():: No focusable found in the current layer.');
            return;
        }
        this._setTarget(nextTarget);
    }
    _deactivate() {
        if (!this._keyboardActive) {
            return;
        }
        this._keyboardActive = false;
    }
    _activate() {
        if (this._keyboardActive) {
            return;
        }
        this._keyboardActive = true;
        globalThis.document.addEventListener('mousemove', this._onMouseMove, true);
    }
    _updatePixiAccessibility() {
        // @ts-expect-error _div is protected
        this.app.renderer.accessibility._div.setAttribute('id', 'pixi-accessibility');
        if (!this._options.usePixiAccessibility) {
            // @ts-expect-error _div is protected
            this.app.renderer.accessibility._div.setAttribute('disabled', 'disabled');
            this.app.renderer.accessibility.destroy();
            globalThis.addEventListener('keydown', this._onKeyDown, false);
            globalThis.addEventListener('keyup', this._onKeyUp, false);
        }
    }
    _getCurrentLayer() {
        return this._currentLayerId != null ? this._layers.get(this._currentLayerId) || null : null;
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
        if (this.app.renderer.accessibility.isActive || this._keyboardActive) {
            if (this._focusTarget) {
                if (!this._active) {
                    this._active = true;
                }
                if (this._options.usePixiAccessibility && !this._focusTarget._accessibleDiv) {
                    this.app.renderer.accessibility.postrender();
                }
                if (this._options.usePixiAccessibility) {
                    this.app.ticker.addOnce(() => {
                        this._focusTarget?._accessibleDiv?.focus();
                    });
                }
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
            else {
                this._focusOutliner.clear();
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
        window.addEventListener('keydown', this._onKeyDown, false);
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
    _handleGlobalMouseMove() {
        if (!this._enabled) {
            return;
        }
        if (this._active) {
            this.deactivate();
        }
    }
    _handleGlobalPointerDown() {
        if (!this._enabled) {
            return;
        }
        if (this._active) {
            this.deactivate();
        }
        if (this.app.renderer.accessibility.isActive || this._keyboardActive) {
            // @ts-expect-error _deactivate is protected
            this.app.renderer.accessibility._deactivate();
            this._deactivate();
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
__decorate([
    CoreFunction,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Boolean]),
    __metadata("design:returntype", void 0)
], FocusManager.prototype, "addFocusable", null);
__decorate([
    CoreFunction,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FocusManager.prototype, "removeFocusable", null);
__decorate([
    CoreFunction,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], FocusManager.prototype, "setLayerOrder", null);
__decorate([
    CoreFunction,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Boolean, Object]),
    __metadata("design:returntype", Object)
], FocusManager.prototype, "addFocusLayer", null);
__decorate([
    CoreFunction,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], FocusManager.prototype, "removeFocusLayer", null);
__decorate([
    CoreFunction,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FocusManager.prototype, "setFocus", null);
__decorate([
    CoreFunction,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FocusManager.prototype, "setFocusLayer", null);
__decorate([
    CoreFunction,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FocusManager.prototype, "clearFocus", null);
__decorate([
    CoreFunction,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FocusManager.prototype, "removeAllFocusLayers", null);
FocusManager = __decorate([
    CorePlugin
], FocusManager);
export { FocusManager };
