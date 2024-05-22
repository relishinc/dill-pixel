import { P as o, C as u, S as i, b as r, j as n } from "./index-CSWyW782.mjs";
class c extends o {
  constructor() {
    super(...arguments), this.id = "popups", this.view = new u(), this.onShowPopup = new i(), this.onHidePopup = new i(), this._popups = /* @__PURE__ */ new Map(), this._activePopups = /* @__PURE__ */ new Map(), this._currentPopupId = void 0;
  }
  // The id of the current popup
  get currentPopupId() {
    return this._currentPopupId;
  }
  get popupCount() {
    return this._popups.size;
  }
  get current() {
    if (this._currentPopupId !== void 0)
      return this._activePopups.get(this._currentPopupId);
  }
  /**
   * Initialize the PopupManager
   * @param _app
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  initialize(e) {
    r(this), this.view.label = "PopupManager", this._setupAppListeners();
  }
  /**
   * Destroy the PopupManager
   */
  destroy() {
    this._activePopups.clear(), super.destroy();
  }
  /**
   * Add a popup
   * @param id - The id of the popup
   * @param popup - The popup constructor
   */
  addPopup(e, t) {
    this._popups.set(e, t);
  }
  /**
   * Show a popup
   * @param id - The id of the popup
   * @param config - The configuration for the popup
   * @returns a promise resolving to the popup, if it exists
   */
  async showPopup(e, t = {}) {
    const p = this._popups.get(e);
    if (p) {
      t.id = e;
      const s = this.view.add.existing(new p(e, t));
      return s.initialize(), this.app.focus.clearFocus(), await s.show(), this.app.focus.setFocusLayer(e), s.afterShow(), this._activePopups.set(e, s), this._currentPopupId = e, this.onShowPopup.emit({ id: e, data: t == null ? void 0 : t.data }), s.start(), s;
    }
  }
  /**
   * Hide a popup
   * @param id - The id of the popup
   * @param data
   * @returns a promise resolving to the popup, if it exists
   */
  async hidePopup(e, t) {
    var s;
    const p = this._activePopups.get(e);
    if (p)
      return p.beforeHide(), await p.hide(), this.view.removeChild(p), this._activePopups.delete(e), this._currentPopupId = ((s = n(this._activePopups)) == null ? void 0 : s[0]) || void 0, this.onHidePopup.emit({ id: e, data: t }), p.end(), p;
  }
  /**
   * Remove all popups
   * @param animate - Whether to animate the removal
   */
  removeAllPopups(e = !1) {
    e ? this._activePopups.forEach((t) => {
      t.hide();
    }) : (this._activePopups.clear(), this.view.removeChildren());
  }
  getCoreFunctions() {
    return ["addPopup", "hidePopup", "showPopup", "removeAllPopups"];
  }
  getCoreSignals() {
    return ["onShowPopup", "onHidePopup"];
  }
  /**
   * Setup application listeners
   * @private
   */
  _setupAppListeners() {
    this.addSignalConnection(this.app.scenes.onSceneChangeStart.connect(() => this.removeAllPopups())), this.app.keyboard.onKeyUp("Escape").connect(this._handleEscape);
  }
  /**
   * Handle escape key press
   * if the current popup should close when escape is pressed (true by default), closes it
   * @private
   */
  _handleEscape() {
    this.current && this.current.config.closeOnEscape && this.hidePopup(this.current.id);
  }
}
export {
  c as PopupManagerPlugin
};
//# sourceMappingURL=PopupManagerPlugin-DyzAuc3B.mjs.map
