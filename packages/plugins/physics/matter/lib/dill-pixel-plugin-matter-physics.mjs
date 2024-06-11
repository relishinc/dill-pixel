import { Application as b, Plugin as f, Container as y, defaultFactoryMethods as m, WithSignals as v, FactoryContainer as w, bindAllMethods as G } from "dill-pixel";
import { Runner as d, Engine as p, Bodies as a, World as g } from "matter-js";
import { Graphics as z } from "pixi.js";
const e = class e {
  static get app() {
    return b.getInstance();
  }
  static set enabled(i) {
    e._enabled = i, e._enabled ? e._engine && (d.run(e._engine), e.app.ticker.add(e.update)) : e._runner && (d.stop(e._runner), e.app.ticker.remove(e.update));
  }
  static get enabled() {
    return e._enabled;
  }
  static set debug(i) {
    var t;
    e._debug = i, !e._debug && e._debugGraphics && (e._debugGraphics.destroy(), (t = e._debugGraphics.parent) == null || t.removeChild(e._debugGraphics), e._debugGraphics = null);
  }
  static get debug() {
    return e._debug;
  }
  static get engine() {
    return e._engine;
  }
  static get runner() {
    return e._runner;
  }
  static get bounds() {
    return e._bounds;
  }
  static set bounds(i) {
    e._bounds = i;
  }
  static initialize(i) {
    if (e._options = { ...e.pluginOptions, ...i }, e._engine = p.create(e._options.engine), e._runner = d.create(e._options.runner), d.run(e._engine), e._options.container && (e.container = e._options.container), e._options.worldBounds && (e.bounds = e._options.worldBounds), e._options.createWalls) {
      const t = e._options.createWalls.thickness ?? 10, { width: s, height: n } = e.bounds, r = [];
      e._options.createWalls.top && r.push(
        a.rectangle(s / 2, -t / 2, s, t, {
          isStatic: !0
        })
      ), e._options.createWalls.bottom && r.push(a.rectangle(s / 2, n + t / 2, s, t, {
        isStatic: !0
      })), e._options.createWalls.left && r.push(
        a.rectangle(-s / 2 - t / 2, -t / 2, t, n + t, {
          isStatic: !0
        })
      ), e._options.createWalls.right && r.push(a.rectangle(s / 2 + t / 2, -t / 2, t, n + t, {
        isStatic: !0
      })), e.addToWorld(...r);
    }
  }
  static addToWorld(...i) {
    i.forEach((t) => {
      let s;
      t.hasOwnProperty("body") ? (s = t.body, this._objects.add(t)) : s = t, g.add(e._engine.world, s);
    });
  }
  static removeFromWorld(...i) {
    i.forEach((t) => {
      let s;
      t.hasOwnProperty("body") ? (s = t.body, this._objects.add(t)) : s = t, g.remove(this._engine.world, s), e._objects.delete(t);
    });
  }
  static update(i) {
    e._enabled && e._engine && (e._objects.forEach((t) => {
      t.update();
    }), e.debug && e.drawDebug(), p.update(e._engine, 16.666666666666668, i.deltaTime));
  }
  static drawDebug() {
    e._debugGraphics || (e._debugGraphics = new z(), e._debugGraphics.zIndex = 1e3, e._debugGraphics.sortableChildren = !0), e.container && !e._debugGraphics.parent && e.container.addChild(e._debugGraphics), e._debugGraphics.clear(), e._objects.forEach((i) => {
      const t = i.body, s = (i == null ? void 0 : i.debugColor) || 2737654, n = t.vertices;
      if (e._debugGraphics && n.length > 0) {
        e._debugGraphics.moveTo(n[0].x, n[0].y);
        for (let r = 1; r < n.length; r++)
          e._debugGraphics.lineTo(n[r].x, n[r].y);
        e._debugGraphics.lineTo(n[0].x, n[0].y), e._debugGraphics.fill({ color: s, alpha: 0.25 }), e._debugGraphics.stroke({ color: 16711680, alignment: 0.5 });
      }
    });
  }
};
e._debug = !1, e._enabled = !1, e._objects = /* @__PURE__ */ new Set(), e._debugGraphics = null;
let o = e;
const u = {
  debug: !1,
  autoInit: !1,
  engine: {},
  runner: {
    delta: 1e3 / 60,
    isFixed: !1,
    enabled: !0
  }
};
class W extends f {
  initialize(i, t) {
    this._options = {
      ...u,
      ...t,
      runner: { ...u.runner, ...t == null ? void 0 : t.runner },
      engine: { ...u.engine, ...t == null ? void 0 : t.engine }
    }, this._options.autoInit && o.initialize(this._options);
  }
  get system() {
    return o;
  }
}
const c = class c extends y {
  constructor(i = {}) {
    super(), this.config = i, this.bodyDefinition = {}, i.view && (this.view = this.add.existing(i.view)), i.bodyType && (this.bodyType = i.bodyType), i.bodyDefinition && (this.bodyDefinition = i.bodyDefinition);
  }
  get debugColor() {
    return c.DEFAULT_DEBUG_COLOR;
  }
  get system() {
    return o;
  }
  added() {
    this.createBody(), this.system.addToWorld(this);
  }
  onRemoved() {
    this.system.removeFromWorld(this.body);
  }
  createBody() {
    var s, n;
    const i = ((s = this.config.size) == null ? void 0 : s.width) || this.view.width, t = ((n = this.config.size) == null ? void 0 : n.height) || this.view.height;
    switch (this.bodyType) {
      case "rectangle":
        this.body = a.rectangle(this.x, this.y, i, t, this.bodyDefinition);
        break;
      case "circle":
        this.body = a.circle(this.x, this.y, i * 0.5, this.bodyDefinition);
        break;
      case "convex":
        break;
      case "trapezoid":
        this.body = a.trapezoid(this.x, this.y, i, t, 0.5, this.bodyDefinition);
        break;
    }
  }
  update() {
    this.view && this.body && (this.x = this.body.position.x, this.y = this.body.position.y, this.rotation = this.body.angle);
  }
};
c.DEFAULT_DEBUG_COLOR = 2737654;
let l = c;
const _ = {
  ...m,
  entity: (h) => new l(h)
}, x = v(w(_)), R = ["autoResize", "autoUpdate", "priority"], C = { autoResize: !0, autoUpdate: !1, priority: 0 };
class U extends x {
  /**
   * The constructor for the Container class.
   * @param config - The configuration for the container.
   */
  constructor(i) {
    super(), this.__config = { ...C, ...i }, G(this), this.on("added", this._added), this.on("removed", this._removed);
  }
  get app() {
    return b.getInstance();
  }
  /**
   * Update the container. This method is meant to be overridden by subclasses.
   * @param ticker
   */
  update(i) {
  }
  /**
   * Resize the container. This method is meant to be overridden by subclasses.
   * @param size
   */
  resize(i) {
  }
  /**
   * This method is called when the container is added to the stage. It is meant to be overridden by subclasses.
   */
  added() {
  }
  destroy(i) {
    this.__config.autoUpdate && this.app.ticker.remove(this.update, this), super.destroy(i);
  }
  removed() {
  }
  /**
   * This method is called when the container is added to the stage. It sets up auto-resizing and auto-updating if enabled.
   */
  _added() {
    this.__config.autoResize && this.addSignalConnection(this.app.onResize.connect(this.resize, this.__config.priority)), this.__config.autoUpdate && this.app.ticker.add(this.update, this, this.__config.priority), this.added();
  }
  _removed() {
    this.__config.autoResize && this.app.onResize.disconnect(this.resize), this.__config.autoUpdate && this.app.ticker.remove(this.update, this), this.removed();
  }
}
export {
  R as ContainerConfigKeys,
  l as Entity,
  U as PhysicsContainer,
  o as System,
  W as default
};
//# sourceMappingURL=dill-pixel-plugin-matter-physics.mjs.map
