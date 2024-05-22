import { P as l, C as p } from "./index-DH1sq-Gb.mjs";
const u = {
  autoScroll: !1,
  useAspectRatio: !1,
  fixed: !1,
  minSize: { width: 0, height: 0 },
  maxSize: { width: 0, height: 0 },
  debug: !1
};
class z extends l {
  constructor() {
    super(...arguments), this.id = "resizer";
  }
  get size() {
    return this._size;
  }
  /**
   * Initializes the Resizer module.
   */
  async initialize(t, i = {}) {
    this._options = { ...u, ...i };
  }
  /**
   * Post-initialization of the Resizer module.
   * when this is called, the renderer is already created, and the dom element has been appended
   */
  async postInitialize() {
    this.resize();
  }
  /**
   * Resizes the application based on window size and module options.
   */
  resize() {
    var g;
    let t = window.innerWidth, i = window.innerHeight;
    const e = (g = this.app.renderer.canvas) == null ? void 0 : g.parentElement, s = e == null ? void 0 : e.getBoundingClientRect();
    s && (t = s.width, i = s.height);
    const n = this._options.minSize.width, h = this._options.minSize.height, o = t < n ? n / t : 1, r = i < h ? h / i : 1, a = o > r ? o : r, d = t * a, c = i * a;
    this.app.renderer.canvas.style.width = `${t}px`, this.app.renderer.canvas.style.height = `${i}px`, this._options.autoScroll && (window == null || window.scrollTo(0, 0)), this.app.renderer.resize(d, c), this._size = { width: d, height: c }, this._options.debug && this._drawDebug();
  }
  /**
   * Draws debug information if debug option is enabled.
   */
  _drawDebug() {
    this._debugContainer || (this._debugContainer = this.app.stage.addChild(new p()), this._gfx = this._debugContainer.add.graphics()), this._gfx.clear(), this._gfx.rect(0, 0, this._size.width, this._size.height), this._gfx.stroke({ width: 4, color: 4095 });
  }
}
export {
  z as ResizerPlugin
};
//# sourceMappingURL=ResizerPlugin-CAndaXvg.mjs.map
