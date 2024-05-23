import { P as o, S as s, b as d, A as h } from "./index-DXo32gNJ.mjs";
class l extends o {
  /**
   * Creates callback arrays and registers to web events.
   */
  constructor() {
    super(), this.id = "webEvents", this.onResize = new s(), this.onVisibilityChanged = new s(), d(this);
  }
  get app() {
    return h.getInstance();
  }
  initialize() {
    document.addEventListener("visibilitychange", this._onVisibilityChanged, !1), window.addEventListener("resize", this._onResize), document.addEventListener("fullscreenchange", this._onResize);
  }
  destroy() {
    document.removeEventListener("visibilitychange", this._onVisibilityChanged, !1), window.removeEventListener("resize", this._onResize), document.removeEventListener("fullscreenchange", this._onResize);
  }
  getCoreSignals() {
    return ["onResize", "onVisibilityChanged"];
  }
  /**
   * Called when the browser visibility changes. Passes the `hidden` flag of the document to all callbacks.
   */
  _onVisibilityChanged() {
    this.onVisibilityChanged.emit(!document.hidden);
  }
  /**
   * Called when the browser resizes.
   */
  _onResize() {
    var t;
    const e = (t = this.app.renderer.canvas) == null ? void 0 : t.parentElement;
    let i = window.innerWidth, n = window.innerHeight;
    e && (e != null && e.getBoundingClientRect()) && (i = e.offsetWidth, n = e.offsetHeight), this.onResize.emit({ width: i, height: n });
  }
}
export {
  l as WebEventsPlugin
};
//# sourceMappingURL=WebEventsPlugin-GXKdDUwb.mjs.map
