import { Container as l } from "pixi.js";
import { P as h, S as o, f as _, F as d, L as a, h as u, j as f } from "./index-DyK5nbTZ.mjs";
class b {
  constructor(e) {
    this.id = e, this.currentFocusable = null, this.lastFocusable = null, this.defaultFocusable = null, this._focusables = [], this._currentIndex = 0, this._current = !1;
  }
  set current(e) {
    this._current = e, this.setCurrent();
  }
  get availableFocusables() {
    return this._focusables.filter((e) => e.focusEnabled);
  }
  setCurrent() {
    if (this._current)
      this.defaultFocusable || (this.defaultFocusable = this._focusables[0]), this.sortFocusables();
    else
      for (let e = 0; e < this._focusables.length; e++)
        this._focusables[e].accessible = !1;
  }
  hasFocusable(e) {
    return e ? this._focusables.indexOf(e) > -1 : !1;
  }
  addFocusable(e, t = !1) {
    this._focusables.push(e), t && (this.defaultFocusable = e), this._current && this.sortFocusables();
  }
  removeFocusable(e) {
    const t = this._focusables.indexOf(e);
    t !== -1 && (this._focusables.splice(t, 1), this.currentFocusable === e && (this.currentFocusable = null), this.lastFocusable === e && (this.lastFocusable = null), this.defaultFocusable === e && (this.defaultFocusable = null)), this._current && this.sortFocusables();
  }
  sortFocusables() {
    for (let e = 0; e < this._focusables.length; e++)
      this._focusables[e].accessible = this._current, this._focusables[e].tabIndex = this._current ? Math.max(e, 1) + 1 : -1, this._focusables[e] === this.defaultFocusable && (this._focusables[e].tabIndex = this._current ? 1 : -1);
    this._current && this._focusables.sort((e, t) => e.tabIndex - t.tabIndex);
  }
  setCurrentFocusable(e) {
    return e ? (this._currentIndex = this._focusables.indexOf(e), this.currentFocusable = e) : (this._currentIndex = -1, this.currentFocusable = null), this.currentFocusable;
  }
  next() {
    return this._currentIndex = this._currentIndex + 1, this._currentIndex >= this._focusables.length && (this._currentIndex = 0), this.currentFocusable = this._focusables[this._currentIndex], this.currentFocusable;
  }
  prev() {
    return this._currentIndex = this._currentIndex - 1, this._currentIndex < 0 && (this._currentIndex = this._focusables.length - 1), this.currentFocusable = this._focusables[this._currentIndex], this.currentFocusable;
  }
}
class F extends h {
  constructor() {
    super(...arguments), this.id = "focus", this.view = new l(), this.onFocusManagerActivated = new o(), this.onFocusManagerDeactivated = new o(), this.onFocusLayerChange = new o(), this.onFocusChange = new o(), this._focusTarget = null, this._keyboardActive = !1, this._layers = /* @__PURE__ */ new Map(), this._currentLayerId = null, this._active = !1, this._enabled = !0;
  }
  get layers() {
    return this._layers;
  }
  get currentLayerId() {
    return this._currentLayerId;
  }
  get active() {
    return this._active;
  }
  get enabled() {
    return this._enabled;
  }
  set enabled(e) {
    this._enabled = e;
  }
  get layerCount() {
    return this._layers.size;
  }
  initialize(e) {
    var s;
    _(this, "removeAllFocusLayers", "_handleGlobalMouseMove", "_handleGlobalPointerDown");
    const t = ((s = e.config) == null ? void 0 : s.focusOptions) || {};
    t.usePixiAccessibility = t.usePixiAccessibility ?? !1, this._focusOutliner = typeof (t == null ? void 0 : t.outliner) == "function" ? new t.outliner() : new d(t.outliner), this._options = t, this.view.addChild(this._focusOutliner), this._updatePixiAccessibility(), this._setupKeyboardListeners(), this._setupAppListeners();
  }
  destroy() {
    this._removeGlobalListeners(), this.deactivate(), this._focusOutliner.destroy(), this._layers.clear(), super.destroy();
  }
  deactivate() {
    this._setTarget(null), this._updateOutliner(), this._active = !1;
  }
  add(e, t, s = !1) {
    this.addFocusable(e, t, s);
  }
  addFocusable(e, t, s = !1) {
    (t === void 0 || t == null) && (t = this._currentLayerId ?? null);
    const i = this._layers.get(t);
    if (!i) {
      a.error(`Layer with ID ${t} does not exist.`);
      return;
    }
    Array.isArray(e) || (e = [e]), e.forEach((r, n) => {
      i.addFocusable(r, n === 0 && s);
    }), this._active && s && this._setTarget(i.currentFocusable || i.defaultFocusable || null, !this._active);
  }
  remove(e) {
    this.removeFocusable(e);
  }
  removeFocusable(e) {
    Array.isArray(e) || (e = [e]), this._layers.forEach((t) => {
      e.forEach((s) => {
        t.removeFocusable(s);
      });
    });
  }
  setLayerOrder(e) {
    const t = /* @__PURE__ */ new Map();
    e.forEach((s) => {
      if (!this._layers.has(s))
        throw new Error(`Layer with ID ${s} does not exist.`);
      t.set(s, this._layers.get(s));
    }), this._layers = t;
  }
  addFocusLayer(e, t = !0, s) {
    e === void 0 && (e = this._layers.size);
    let i;
    return this._layers.has(e) ? (a.error(`Layer with ID ${e} already exists.`), i = this._layers.get(e)) : (i = new b(e), this._layers.set(e, i)), (t || this._currentLayerId === null) && this.setFocusLayer(e), s && this.addFocusable(s, e), i;
  }
  removeFocusLayer(e, t = !0) {
    var i;
    if (e === void 0 && t)
      return this._removeTopLayer();
    if (!this._layers.has(e))
      throw new Error(`Layer with ID ${e} does not exist.`);
    const s = (i = u(this._layers, e)) == null ? void 0 : i[0];
    this._layers.delete(e), this._postDelete(s);
  }
  restart(e = !1) {
    var s, i, r;
    const t = this._getCurrentLayer();
    this._setTarget(
      e ? ((i = t == null ? void 0 : t.availableFocusables) == null ? void 0 : i[((s = t == null ? void 0 : t.availableFocusables) == null ? void 0 : s.length) - 1]) || null : ((r = t == null ? void 0 : t.availableFocusables) == null ? void 0 : r[0]) || null
    );
  }
  forceFocus(e) {
    this.focus(e);
  }
  setFocus(e) {
    this.focus(e);
  }
  focus(e) {
    this._setTarget(e);
  }
  setFocusLayer(e) {
    if (!this._layers.has(e))
      throw new Error(`Layer with ID ${e} does not exist.`);
    this._currentLayerId = e;
    const t = this._getCurrentLayer();
    t && (t.current = !0, this._layers.forEach((s, i) => {
      s.current = i === e;
    }), t.sortFocusables(), this._setTarget(t.currentFocusable || t.defaultFocusable || null, !this._active)), this.onFocusLayerChange.emit(this._currentLayerId);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  postInitialize(e) {
  }
  clearFocus() {
    this._setTarget(null);
  }
  removeAllFocusLayers() {
    this._layers.clear(), this._setTarget(null);
  }
  _onKeyDown(e) {
    if (!(!this._enabled || e.key !== "Tab" && e.key !== "Enter" && e.key !== " " && e.key !== "Space") && !this._options.usePixiAccessibility)
      if (e.preventDefault(), e.key === "Tab") {
        const t = this._getCurrentLayer();
        if (!(t == null ? void 0 : t.availableFocusables))
          return;
        this._keyboardActive ? e.shiftKey ? this._prev() : this._next() : (this._activate(), this._setTarget(t.currentFocusable || t.defaultFocusable || null));
      } else
        (e.key === "Enter" || e.key === " " || e.key === "Space") && this._focusTarget && this._focusTarget.isFocused && this._focusTarget.emit("pointerdown", { type: "pointerdown" });
  }
  _onKeyUp(e) {
    !this._enabled || e.key !== "Enter" && e.key !== " " && e.key !== "Space" || this._options.usePixiAccessibility || (e.preventDefault(), this._focusTarget && this._focusTarget.isFocused && (this._focusTarget.emit("click", { type: "click" }), this._focusTarget.emit("pointerup", { type: "pointerup" })));
  }
  _onMouseMove(e) {
    e.movementX === 0 && e.movementY === 0 || this._deactivate();
  }
  getCoreFunctions() {
    return [
      "addFocusable",
      "removeFocusable",
      "setLayerOrder",
      "addFocusLayer",
      "removeFocusLayer",
      "setFocusLayer",
      "setFocus",
      "focus",
      "clearFocus",
      "removeAllFocusLayers"
    ];
  }
  getCoreSignals() {
    return ["onFocusManagerActivated", "onFocusManagerDeactivated", "onFocusLayerChange", "onFocusChange"];
  }
  _next() {
    var t;
    const e = (t = this._getCurrentLayer()) == null ? void 0 : t.next();
    if (!e) {
      a.error("FocusManager:: _next():: No focusable found in the current layer.");
      return;
    }
    this._setTarget(e);
  }
  _prev() {
    var t;
    const e = (t = this._getCurrentLayer()) == null ? void 0 : t.prev();
    if (!e) {
      a.error("FocusManager:: _prev():: No focusable found in the current layer.");
      return;
    }
    this._setTarget(e);
  }
  _deactivate() {
    this._keyboardActive && (this._keyboardActive = !1);
  }
  _activate() {
    this._keyboardActive || (this._keyboardActive = !0, globalThis.document.addEventListener("mousemove", this._onMouseMove, !0));
  }
  _updatePixiAccessibility() {
    this.app.renderer.accessibility._div.setAttribute("id", "pixi-accessibility"), this._options.usePixiAccessibility || (this.app.renderer.accessibility._div.setAttribute("disabled", "disabled"), this.app.renderer.accessibility.destroy(), globalThis.addEventListener("keydown", this._onKeyDown, !1), globalThis.addEventListener("keyup", this._onKeyUp, !1));
  }
  _getCurrentLayer() {
    return this._currentLayerId != null && this._layers.get(this._currentLayerId) || null;
  }
  _removeTopLayer() {
    var s, i;
    const e = (s = f(this._layers)) == null ? void 0 : s[0], t = (i = u(this._layers, e)) == null ? void 0 : i[0];
    e !== void 0 && (this._layers.delete(e), this._postDelete(t));
  }
  _postDelete(e) {
    this._layers.size === 0 ? this._currentLayerId = null : e !== void 0 && this.setFocusLayer(e);
  }
  _setTarget(e, t = !0) {
    const s = this._getCurrentLayer(), i = this._focusTarget;
    if (this._focusTarget = e, i && this._active && this._clearFocusTarget(i), this.app.renderer.accessibility.isActive || this._keyboardActive)
      this._focusTarget ? (this._active || (this._active = !0), this._options.usePixiAccessibility && !this._focusTarget._accessibleDiv && this.app.renderer.accessibility.postrender(), this._options.usePixiAccessibility && this.app.ticker.addOnce(() => {
        var r, n;
        (n = (r = this._focusTarget) == null ? void 0 : r._accessibleDiv) == null || n.focus();
      }), s != null && s.hasFocusable(e) ? this._focusTarget && (this._focusTarget.focusIn(), this._focusTarget.isFocused = !0, this._focusTarget.onFocusIn.emit(this._focusTarget), s.setCurrentFocusable(this._focusTarget), this._updateOutliner()) : a.warn(
        "The focusable",
        e,
        `does not exist on the current focus layer: ${this._currentLayerId}`
      )) : this._focusOutliner.clear();
    else if (this._focusOutliner.clear(), this._active && t) {
      this._active = !1, this.onFocusManagerDeactivated.emit();
      return;
    }
    i !== e && this._active && this.onFocusChange.emit({ focusable: this._focusTarget, layer: this._currentLayerId });
  }
  _clearFocusTarget(e) {
    e && (e.focusOut(), e.isFocused = !1, e.onFocusOut.emit(e), e.blur(), e.onBlur.emit(e));
  }
  _setupKeyboardListeners() {
    window.addEventListener("keydown", this._onKeyDown, !1), this._addGlobalListeners();
  }
  _addGlobalListeners() {
    globalThis.document.addEventListener("mousemove", this._handleGlobalMouseMove), globalThis.document.addEventListener("pointerdown", this._handleGlobalPointerDown);
  }
  _removeGlobalListeners() {
    globalThis.document.removeEventListener("mousemove", this._handleGlobalMouseMove), globalThis.document.removeEventListener("pointerdown", this._handleGlobalPointerDown);
  }
  _handleGlobalMouseMove() {
    this._enabled && this._active && this.deactivate();
  }
  _handleGlobalPointerDown() {
    this._enabled && (this._active && this.deactivate(), (this.app.renderer.accessibility.isActive || this._keyboardActive) && (this.app.renderer.accessibility._deactivate(), this._deactivate()));
  }
  _setupAppListeners() {
    this.app.scenes.onSceneChangeStart.connect(this.removeAllFocusLayers);
  }
  _updateOutliner() {
    this._focusTarget ? (this._focusOutliner.position.set(this._focusTarget.position.x, this._focusTarget.position.y), this._focusOutliner.draw(this._focusTarget)) : this._focusOutliner.clear();
  }
}
export {
  F as FocusManagerPlugin
};
//# sourceMappingURL=FocusManagerPlugin-DMGIA0Ih.mjs.map
