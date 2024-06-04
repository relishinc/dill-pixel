import { Plugin as f, Container as w } from "dill-pixel";
import { Runner as l, Engine as g, Bodies as o, World as b } from "matter-js";
import { Graphics as y } from "pixi.js";
const e = class e {
  static set enabled(i) {
    e._enabled = i, e._enabled ? e._engine && l.run(e._engine) : e._runner && l.stop(e._runner);
  }
  static get enabled() {
    return e._enabled;
  }
  static set debug(i) {
    e._debug = i;
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
    if (e._options = { ...e.pluginOptions, ...i }, e._engine = g.create(e._options.engine), e._runner = l.create(e._options.runner), l.run(e._engine), e._options.worldBounds && (e.bounds = e._options.worldBounds), e._options.createWalls) {
      const t = e._options.createWalls.thickness ?? 10, { width: s, height: r } = e.bounds, n = [];
      e._options.createWalls.top && n.push(
        o.rectangle(s / 2, -t / 2, s, t, {
          isStatic: !0
        })
      ), e._options.createWalls.bottom && n.push(o.rectangle(s / 2, r + t / 2, s, t, {
        isStatic: !0
      })), e._options.createWalls.left && n.push(
        o.rectangle(-s / 2 - t / 2, -t / 2, t, r + t, {
          isStatic: !0
        })
      ), e._options.createWalls.right && n.push(o.rectangle(s / 2 + t / 2, -t / 2, t, r + t, {
        isStatic: !0
      })), e.addToWorld(...n);
    }
  }
  static addToWorld(...i) {
    i.forEach((t) => {
      let s;
      t.hasOwnProperty("body") ? (s = t.body, this._objects.add(t)) : s = t, b.add(e._engine.world, s);
    });
  }
  static removeFromWorld(...i) {
    i.forEach((t) => {
      let s;
      t.hasOwnProperty("body") ? (s = t.body, this._objects.add(t)) : s = t, b.remove(this._engine.world, s), e._objects.delete(t);
    });
  }
  static update() {
    e._enabled && e._engine && (e._objects.forEach((i) => {
      i.update();
    }), e.debug && e.drawDebug(), g.update(e._engine, 16.666666666666668, 1));
  }
  static drawDebug() {
    e._debugGraphics || (e._debugGraphics = new y(), e._debugGraphics.zIndex = 1e3, e._debugGraphics.sortableChildren = !0), e._debugGraphics.clear(), e._objects.forEach((i) => {
      const t = i.body, s = (i == null ? void 0 : i.debugColor) || 2737654, r = t.vertices;
      e._debugGraphics.moveTo(r[0].x, r[0].y);
      for (let n = 1; n < r.length; n++)
        e._debugGraphics.lineTo(r[n].x, r[n].y);
      e._debugGraphics.lineTo(r[0].x, r[0].y), e._debugGraphics.fill({ color: s }), e._debugGraphics.stroke({ color: 16711680, alignment: 0.5 });
    });
  }
};
e._debug = !1, e._enabled = !1, e._objects = /* @__PURE__ */ new Set();
let c = e;
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
class v extends f {
  initialize(i, t) {
    this._options = {
      ...u,
      ...t,
      runner: { ...u.runner, ...t == null ? void 0 : t.runner },
      engine: { ...u.engine, ...t == null ? void 0 : t.engine }
    }, this._options.autoInit && c.initialize(this._options);
  }
  get system() {
    return c;
  }
}
var d = /* @__PURE__ */ ((a) => (a.RECTANGLE = "rectangle", a.CIRCLE = "circle", a.CONVEX = "convex", a.TRAPEZOID = "trapezoid", a.POLYGON = "polygon", a.CHAMFER = "chamfer", a))(d || {});
const h = class h extends w {
  constructor(i = {}) {
    super(), this.config = i, i.view && (this.view = this.add.existing(i.view)), i.bodyType && (this.bodyType = i.bodyType);
  }
  get debugColor() {
    return h.DEFAULT_DEBUG_COLOR;
  }
  get system() {
    return c;
  }
  added() {
    this.createBody(), this.system.addToWorld(this);
  }
  onRemoved() {
    this.system.removeFromWorld(this.body);
  }
  createBody() {
    var s, r;
    const i = ((s = this.config.size) == null ? void 0 : s.width) || this.view.width, t = ((r = this.config.size) == null ? void 0 : r.height) || this.view.height;
    switch (this.bodyType) {
      case d.RECTANGLE:
        this.body = o.rectangle(this.x, this.y, i, t);
        break;
      case d.CIRCLE:
        this.body = o.circle(this.x, this.y, i * 0.5);
        break;
      case d.CONVEX:
        break;
      case d.TRAPEZOID:
        this.body = o.trapezoid(this.x, this.y, i, t, 0.5);
        break;
    }
  }
  update() {
    this.view && this.body && (this.x = this.body.position.x, this.y = this.body.position.y, this.rotation = this.body.angle);
  }
};
h.DEFAULT_DEBUG_COLOR = 2737654;
let p = h;
export {
  p as Entity,
  c as System,
  v as default
};
//# sourceMappingURL=dill-pixel-plugin-matter-physics.mjs.map
