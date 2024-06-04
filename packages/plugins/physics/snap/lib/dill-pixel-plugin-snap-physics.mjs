import { Container as S, Signal as w, Logger as y, Plugin as v } from "dill-pixel";
import { Rectangle as b, Sprite as C, Bounds as R, Texture as E, Ticker as M, Point as x, Graphics as z } from "pixi.js";
class H {
  constructor(t, e = !1) {
    this.cells = /* @__PURE__ */ new Map(), this._cellSize = t, e && d.all.forEach((s) => this.insert(s));
  }
  get cellSize() {
    return this._cellSize;
  }
  set cellSize(t) {
    this._cellSize = t, this.cells.clear(), this.updateAll();
  }
  destroy() {
    this.cells.clear();
  }
  insert(t) {
    var c;
    const e = t.getBoundingBox(), s = Math.floor(e.x / this._cellSize), o = Math.floor(e.y / this._cellSize), n = Math.floor((e.x + e.width) / this._cellSize), r = Math.floor((e.y + e.height) / this._cellSize);
    for (let l = s; l <= n; l++)
      for (let h = o; h <= r; h++) {
        const u = this.getGridKey(l * this._cellSize, h * this._cellSize);
        this.cells.has(u) || this.cells.set(u, /* @__PURE__ */ new Set()), (c = this.cells.get(u)) == null || c.add(t);
      }
  }
  remove(t) {
    this.cells.forEach((e) => {
      e.delete(t);
    });
  }
  query(t, e) {
    const s = /* @__PURE__ */ new Set(), o = Math.floor(Math.min(t.x, t.x + t.width) / this._cellSize), n = Math.floor(Math.min(t.y, t.y + t.height) / this._cellSize), r = Math.floor(Math.max(t.x, t.x + t.width) / this._cellSize), c = Math.floor(Math.max(t.y, t.y + t.height) / this._cellSize);
    for (let l = o; l <= r; l++)
      for (let h = n; h <= c; h++) {
        const u = this.getGridKey(l * this._cellSize, h * this._cellSize), g = this.cells.get(u);
        g && g.forEach((f) => {
          e !== void 0 ? Array.isArray(e) ? e.includes(f.type) && s.add(f) : e(f) && s.add(f) : s.add(f);
        });
      }
    return [...s];
  }
  updateAll() {
    d.all.forEach((t) => this.updateEntity(t));
  }
  updateEntity(t) {
    this.remove(t), this.insert(t);
  }
  draw(t) {
    this._getDebugRects().forEach((s) => {
      t.rect(s.left, s.top, s.width, s.height), t.stroke({ color: 65280 });
    });
  }
  _getDebugRects() {
    const t = [];
    return this.cells.forEach((e, s) => {
      const [o, n] = s.split(":").map(Number);
      e.size && t.push(new b(o * this._cellSize, n * this._cellSize, this._cellSize, this._cellSize));
    }), t;
  }
  getGridKey(t, e) {
    const s = Math.floor(t / this._cellSize), o = Math.floor(e / this._cellSize);
    return `${s}:${o}`;
  }
}
class B extends S {
  constructor(t) {
    super(), this.isActor = !1, this.isSolid = !1, this.isSensor = !1, this.debug = !1, this.debugColors = {
      bounds: 16711680,
      outerBounds: 65280
    }, this.type = "Solid", this.isCollideable = !0, this.xRemainder = 0, this.yRemainder = 0, this._cachedBounds = null, this._dirtyBounds = !0, this.config = t;
  }
  get cachedBounds() {
    if (!this._cachedBounds || this._dirtyBounds) {
      const t = this.view.getBounds();
      t.scale(1 / this.system.container.worldTransform.d), this._cachedBounds = t;
    }
    return this._cachedBounds || new b();
  }
  set cachedBounds(t) {
    this._cachedBounds = t;
  }
  get dirtyBounds() {
    return this._dirtyBounds;
  }
  set dirtyBounds(t) {
    this._dirtyBounds = t;
  }
  get top() {
    return this.getBoundingBox().top;
  }
  get bottom() {
    return this.getBoundingBox().bottom;
  }
  get left() {
    return this.getBoundingBox().left;
  }
  get right() {
    return this.getBoundingBox().right;
  }
  get system() {
    return d;
  }
  get collideables() {
    return [];
  }
  preUpdate() {
  }
  update(t) {
  }
  postUpdate() {
  }
  getWorldBounds() {
    const t = this.system.container.toLocal(this.view.getGlobalPosition()), e = this.cachedBounds;
    return e.x = t.x, e.y = t.y, this.view instanceof C && this.view.anchor && (e.x -= this.view.width * this.view.anchor.x, e.y -= this.view.height * this.view.anchor.y), e;
  }
  getBoundingBox() {
    const t = this.getWorldBounds();
    return t instanceof R ? t.rectangle : t;
  }
  getOuterBoundingBox() {
    return null;
  }
  initialize() {
  }
}
class k extends B {
  constructor() {
    super(...arguments), this.type = "Solid", this.isSolid = !0;
  }
  get collideables() {
    return d.getNearbyEntities(this, (t) => t.isActor);
  }
  added() {
    d.addSolid(this);
  }
  removed() {
    d.removeSolid(this);
  }
  move(t, e) {
    this.xRemainder += t, this.yRemainder += e;
    const s = Math.round(this.xRemainder), o = Math.round(this.yRemainder), n = this.getAllRidingActors();
    (s !== 0 || o !== 0) && (this.isCollideable = !1, this.y += o, this.yRemainder -= o, this.handleActorInteractions(0, o, n), this.x += s, this.xRemainder -= s, this.handleActorInteractions(s, 0, n), this.isCollideable = !0), d.updateEntity(this);
  }
  getAllRidingActors() {
    return this.collideables.filter((t) => t.riding.has(this));
  }
  // Simple collision detection between this solid and an actor
  collidesWith(t, e, s) {
    return d.getRectangleIntersection(t, this, e, s);
  }
  handleActorInteractions(t, e, s = this.getAllRidingActors()) {
    this.collideables.forEach((o) => {
      if (s.includes(o))
        o.mostRiding === this && (o.moveY(e), o.moveX(t));
      else if (!o.passThroughTypes.includes(this.type) && !o.isPassingThrough(this) && this.collidesWith(o, t, e)) {
        const n = t !== 0 ? t > 0 ? this.getBoundingBox().right - o.getBoundingBox().left : this.getBoundingBox().left - o.getBoundingBox().right : 0;
        n !== 0 && o.moveX(n, o.squish, null, this);
        const r = e !== 0 ? e > 0 ? this.getBoundingBox().bottom - o.getBoundingBox().top : this.getBoundingBox().top - o.getBoundingBox().bottom : 0;
        r !== 0 && o.moveY(r, o.squish, null, this);
      }
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleCollisionChange(t) {
  }
}
const T = {
  width: 10,
  height: 10,
  debugColor: 65535
};
class p extends k {
  constructor(t = {}) {
    super({ ...T, ...t }), this.type = "Wall", this.initialize();
  }
  initialize() {
    this.view = this.add.sprite({
      asset: E.WHITE,
      width: this.config.width,
      height: this.config.height,
      tint: this.config.debugColor,
      anchor: 0.5
    });
  }
}
function I(a, t) {
  return a.x > t.left && a.x < t.right && a.y > t.top && a.y < t.bottom;
}
function A(a, t) {
  const e = Math.max(0, Math.min(a.x + a.width, t.x + t.width) - Math.max(a.x, t.x)), s = Math.max(0, Math.min(a.y + a.height, t.y + t.height) - Math.max(a.y, t.y));
  return { x: e, y: s, area: e * s };
}
function m(a, t, e, s) {
  const o = {
    top: !1,
    bottom: !1,
    left: !1,
    right: !1,
    entity1: e,
    entity2: s,
    type: `${e == null ? void 0 : e.type}|${s == null ? void 0 : s.type}`
  };
  return a.intersects(t) ? (o.left = a.left < t.right && a.left > t.left, o.right = a.right > t.left && a.right < t.right, o.top = a.top < t.bottom && a.top > t.top, o.bottom = a.bottom > t.top && a.bottom < t.bottom, o) : !1;
}
const i = class i {
  static get enabled() {
    return i._enabled;
  }
  static set enabled(t) {
    i._enabled = t, i._enabled ? (i._ticker || (i._ticker = new M()), i._ticker.maxFPS = i.fps, i._ticker.start(), i._ticker.add(i.update)) : i._ticker && (i._ticker.stop(), i._ticker.destroy(), i._ticker = null);
  }
  static set collisionResolver(t) {
    i._collisionResolver = t;
  }
  static get worldWidth() {
    var t;
    return (t = i.boundary) != null && t.width ? i.boundary.width + (i.boundary.padding ?? 0) : i.container.width;
  }
  static get worldHeight() {
    var t;
    return (t = i.boundary) != null && t.height ? i.boundary.height + (i.boundary.padding ?? 0) : i.container.height;
  }
  static get all() {
    return [...i.actors, ...i.solids];
  }
  static get totalEntities() {
    return i.actors.length + i.solids.length + i.sensors.length;
  }
  static useSpatialHashGrid(t) {
    i.grid ? i.grid.cellSize = t : i.grid = new H(t, !0), i.plugin.options.useSpatialHashGrid = !0;
  }
  static removeSpatialHashGrid() {
    i.grid && (i.grid.destroy(), i.grid = null);
  }
  static resolveCollision(t) {
    return i._collisionResolver ? i._collisionResolver(t) : !0;
  }
  static addEntity(t) {
    i.typeMap.has(t.type) || i.typeMap.set(t.type, []), i.typeMap.get(t.type).push(t), i.grid && i.grid.insert(t);
  }
  static removeEntity(t) {
    if (i.grid && i.grid.remove(t), i.typeMap.has(t.type)) {
      const e = i.typeMap.get(t.type), s = e.indexOf(t);
      s !== -1 && e.splice(s, 1);
    }
  }
  static getEntitiesByType(...t) {
    return t.length === 0 ? i.typeMap.get(t[0]) || [] : t.reduce((e, s) => {
      const o = i.typeMap.get(s);
      return o != null && o.length ? [...e, ...o] : e;
    }, []);
  }
  static addActor(t) {
    i.actors.push(t), i.addEntity(t);
  }
  static addSolid(t) {
    i.solids.push(t), i.addEntity(t);
  }
  static addSensor(t) {
    i.sensors.push(t), i.addEntity(t);
  }
  static removeActor(t) {
    i.removeEntity(t);
    const e = i.actors.indexOf(t);
    e !== -1 && i.actors.splice(e, 1);
  }
  static removeSolid(t) {
    i.removeEntity(t);
    const e = i.solids.indexOf(t);
    e !== -1 && i.solids.splice(e, 1);
  }
  static removeSensor(t) {
    i.removeEntity(t);
    const e = i.sensors.indexOf(t);
    e !== -1 && i.sensors.splice(e, 1);
  }
  static getNearbyEntities(t, e) {
    if (i.grid) {
      const s = t.getBoundingBox();
      return i.grid.query(s, e);
    }
    return i.all.filter((s) => e ? Array.isArray(e) ? e.includes(s.type) : e(s) : !0);
  }
  /**
   * @param entity1
   * @param entity2
   * @param dx
   * @param dy
   */
  static getRectangleIntersection(t, e, s, o) {
    const n = t.getBoundingBox(), r = e.getBoundingBox().clone();
    r.x += s, r.y += o;
    const c = A(n, r);
    return c.area > 0 && c.area > i.collisionThreshold;
  }
  static update(t) {
    if (!i.enabled)
      return;
    const e = t.deltaTime;
    i.container || y.error("SnapPhysicsPlugin: World container not set!"), i.preUpdateHooks && i.preUpdateHooks.forEach((s) => s(e)), i.updateHooks && i.updateHooks.forEach((s) => s(e)), i.all.forEach((s) => {
      s.preUpdate();
    }), i.solids.forEach((s) => {
      s.update(e);
    }), i.sensors.forEach((s) => {
      s.update(e);
    }), i.actors.forEach((s) => {
      s.update(e);
    }), i.all.forEach((s) => {
      s.postUpdate();
    }), i.postUpdateHooks && i.postUpdateHooks.forEach((s) => s(e)), i.debug ? i.drawDebug() : i.gfx && i.gfx.clear(), i.camera && i.camera.update();
  }
  static addBoundary(t, e, s = 10, o = 5, n = ["top", "bottom", "left", "right"]) {
    if (!i.container)
      throw new Error("System container not set. Set World.container before calling System.addBoundary().");
    i.worldBounds.length > 0 && (i.worldBounds.forEach((h) => {
      h.parent.removeChild(h), h.destroy();
    }), i.worldBounds = []);
    const r = new x(0, 0), c = i.container;
    let l;
    n.includes("bottom") && (l = c.addChild(new p({ width: t, height: s })), l.position.set(r.x + t * 0.5, r.y + e + o), i.worldBounds.push(l)), n.includes("top") && (l = c.addChild(new p({ width: t, height: s })), l.position.set(r.x + t * 0.5, r.y + s * 0.5), i.worldBounds.push(l)), n.includes("left") && (l = c.addChild(new p({ width: s, height: e })), l.position.set(r.x - s * 0.5 - o, r.y + e * 0.5 + s * 0.5), i.worldBounds.push(l)), n.includes("right") && (l = c.addChild(new p({ width: s, height: e })), l.position.set(r.x + t + o + s * 0.5, r.y + e * 0.5), i.worldBounds.push(l)), i.grid && i.worldBounds.forEach((h) => {
      var u, g;
      (u = i.grid) == null || u.remove(h), (g = i.grid) == null || g.insert(h);
    });
  }
  static collide(t) {
    !t.type && t.entity1 && t.entity2 && (t.type = `${t.entity1.type}|${t.entity2.type}`), this.onCollision.emit(t);
  }
  static drawDebug() {
    i.container && (i.gfx || (i.gfx = new z(), i.container.addChild(i.gfx)), i.container.setChildIndex(i.gfx, i.container.children.length - 1), i.gfx.clear(), [...i.actors, ...i.solids, ...i.sensors].forEach((t) => {
      const e = t.getBoundingBox(), s = t.getOuterBoundingBox();
      i.gfx.rect(e.x, e.y, e.width, e.height).stroke({ width: 1, color: t.debugColors.bounds, alignment: 0.5 }), s && i.gfx.rect(s.x, s.y, s.width, s.height).stroke({ width: 1, color: t.debugColors.outerBounds, alignment: 0.5 });
    }), i.grid && i.grid.draw(i.gfx));
  }
  static setContainer(t) {
    i.container = t;
  }
  static initialize(t) {
    t.gravity && (i.gravity = t.gravity), t.fps && (i.fps = t.fps), t.container && i.setContainer(t.container), t.debug !== void 0 && (i.debug = t.debug), t.collisionResolver && (i.collisionResolver = t.collisionResolver), t.boundary && (i.boundary = {
      width: t.boundary.width,
      height: t.boundary.height,
      padding: t.boundary.padding ?? 0
    }, t.boundary.width && t.boundary.height ? i.addBoundary(
      t.boundary.width,
      t.boundary.height,
      t.boundary.thickness,
      t.boundary.padding,
      t.boundary.sides
    ) : y.error("SnapPhysicsPlugin System.initialize: Boundary width and height required.")), t.useSpatialHashGrid && i.useSpatialHashGrid(t.cellSize ?? 100);
  }
  static updateEntity(t) {
    i.grid && i.grid.updateEntity(t);
  }
  static cleanup() {
    i.enabled = !1, i.postUpdateHooks.clear(), i.preUpdateHooks.clear(), i.updateHooks.clear(), i.worldBounds && (i.worldBounds.forEach((t) => {
      t.parent.removeChild(t), t.destroy();
    }), i.worldBounds = []), i.container && (i.container.removeChildren(), i.container = null), i.gfx && (i.gfx.clear(), i.gfx = null), i.grid && (i.grid.destroy(), i.grid = null), i.camera && (i.camera = null), i.solids = [], i.actors = [], i.sensors = [], i.typeMap.clear(), i.worldBounds = [];
  }
};
i.DEFAULT_COLLISION_THRESHOLD = 2, i.debug = !0, i.typeMap = /* @__PURE__ */ new Map(), i.actors = [], i.solids = [], i.sensors = [], i.gravity = 10, i.onCollision = new w(), i.worldBounds = [], i.collisionThreshold = 8, i.updateHooks = /* @__PURE__ */ new Set(), i.preUpdateHooks = /* @__PURE__ */ new Set(), i.postUpdateHooks = /* @__PURE__ */ new Set(), i._enabled = !1, i._collisionResolver = null;
let d = i;
const G = {
  useSpatialHashGrid: !1,
  gridCellSize: -1,
  fps: -1
};
class W extends v {
  constructor() {
    super(...arguments), this.id = "SnapPhysicsPlugin";
  }
  get gridCellSize() {
    return this.options.gridCellSize;
  }
  set gridCellSize(t) {
    this.options.gridCellSize = t, this.options.useSpatialHashGrid && this.options.gridCellSize > 0 && d.useSpatialHashGrid(this.options.gridCellSize);
  }
  get useSpatialHashGrid() {
    return this.options.useSpatialHashGrid;
  }
  set useSpatialHashGrid(t) {
    this.options.useSpatialHashGrid = t, this.options.useSpatialHashGrid && this.options.gridCellSize > 0 ? d.useSpatialHashGrid(this.options.gridCellSize) : d.removeSpatialHashGrid();
  }
  set fps(t) {
    this.options.fps = t, d.fps = t;
  }
  get system() {
    return d;
  }
  destroy() {
    this.system.enabled = !1, d.cleanup(), super.destroy();
  }
  async initialize(t, e) {
    this.options = { ...G, ...e }, this.system.app = t, this.system.plugin = this, this.options.useSpatialHashGrid && this.options.gridCellSize > 0 && this.system.useSpatialHashGrid(this.options.gridCellSize), this.options.fps > 0 && (d.fps = this.options.fps);
  }
}
class P extends B {
  constructor() {
    super(...arguments), this.type = "Actor", this.isActor = !0, this.passThroughTypes = [], this.passingThrough = /* @__PURE__ */ new Set(), this.riding = /* @__PURE__ */ new Set(), this.mostRiding = null;
  }
  get ridingAllowed() {
    return !0;
  }
  get collideables() {
    return d.getNearbyEntities(this, (t) => t.isSolid);
  }
  added() {
    d.addActor(this);
  }
  removed() {
    d.removeActor(this);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  squish(t, e, s) {
  }
  preUpdate() {
    this.setAllRiding();
  }
  moveX(t, e, s, o) {
    this.xRemainder += t;
    let n = Math.round(this.xRemainder);
    const r = Math.sign(n);
    for (o && (o.isCollideable = !1); n !== 0; ) {
      const c = this.x + (n ? r : 0), l = this.collideAt(c - this.x, 0, this.getBoundingBox(), [
        "left",
        "right"
      ]);
      if (l) {
        e && l.forEach((h) => {
          e(h, o, new x(c - this.x, 0));
        });
        for (const h of l)
          this.isRiding(h.entity2) || (this.xRemainder = 0);
        break;
      } else
        this.x = c, n -= r, this.xRemainder -= r, s && s();
    }
    d.updateEntity(this), o && (o.isCollideable = !0);
  }
  moveY(t, e, s, o) {
    this.yRemainder += t;
    let n = Math.round(this.yRemainder);
    const r = Math.sign(n);
    for (o && (o.isCollideable = !1); n !== 0; ) {
      const c = this.y + (n ? r : 0), l = this.collideAt(0, c - this.y, this.getBoundingBox(), [
        "top",
        "bottom"
      ]);
      if (l) {
        e && l.forEach((h) => e(h, o, new x(0, c - this.y))), this.yRemainder = 0;
        break;
      } else
        this.y = c, n -= r, this.yRemainder -= r, s && s();
    }
    d.updateEntity(this), o && (o.isCollideable = !0);
  }
  // Simple bounding box collision check
  collideAt(t, e, s, o) {
    const n = new b(s.x + t, s.y + e, s.width, s.height), r = [];
    for (const c of this.collideables) {
      if (!c.isCollideable || this.passThroughTypes.includes(c.type))
        continue;
      const l = c.getBoundingBox();
      let h = m(n, l, this, c);
      o != null && o.length && h && (o.filter((g) => h[g]).length || (h = !1)), h && (d.collide(h), d.resolveCollision(h) && r.push(h));
    }
    return r.length ? r : !1;
  }
  isRiding(t) {
    const e = this.getBoundingBox(), s = t.getBoundingBox();
    return Math.abs(e.bottom - s.top) <= 1 && e.left < s.right && e.right > s.left;
  }
  setPassingThrough(t) {
    this.passingThrough.add(t);
  }
  removePassingThrough(t) {
    this.passingThrough.delete(t);
  }
  isPassingThrough(t) {
    return this.passingThrough.has(t);
  }
  clearAllRiding() {
    this.mostRiding = null, this.riding.clear();
  }
  setAllRiding() {
    this.clearAllRiding(), this.collideables.forEach((e) => {
      this.isRiding(e) && this.riding.add(e);
    });
    let t = 0;
    for (const e of this.riding) {
      if (this.right > e.left && this.left < e.right) {
        this.mostRiding = e;
        break;
      }
      let s = 0;
      this.right > e.left && this.left < e.left ? (s = this.right - e.left, s > t && (t = s, this.mostRiding = e)) : this.left < e.right && this.right > e.right && (s = e.right - this.left, s > t && (t = s, this.mostRiding = e));
    }
  }
}
class X extends P {
  constructor() {
    super(...arguments), this.type = "Sensor", this.isSensor = !0, this.isColliding = !1, this.passThroughTypes = ["Actor", "Player"], this._activeCollisions = null;
  }
  get activeCollisions() {
    return this._activeCollisions;
  }
  set activeCollisions(t) {
    this._activeCollisions = t;
  }
  get collideables() {
    return d.actors;
  }
  added() {
    d.addSensor(this);
  }
  removed() {
    d.removeSensor(this);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(t) {
    this.activeCollisions = this.resolveAllCollisions(), this.isColliding = !!this.activeCollisions;
  }
  /**
   * Resolve all collisions for this sensor
   * ignores passThroughTypes
   */
  resolveAllCollisions() {
    const t = [];
    for (const e of this.collideables) {
      if (!e.isCollideable)
        continue;
      const s = m(this.getBoundingBox(), e.getBoundingBox(), this, e);
      s && t.push(s), s && (d.collide(s), d.resolveCollision(s) && t.push(s));
    }
    return t.length ? t : null;
  }
  getOuterCollisions(t = this.collideables) {
    const e = this.getOuterBoundingBox();
    if (!e)
      return y.error(this.type, "has no outer bounding box. Returning empty array."), [];
    const s = [];
    for (const o of t) {
      if (!o.isCollideable)
        continue;
      const n = m(e, o.getBoundingBox(), this, o);
      n && s.push(n);
    }
    return s;
  }
}
export {
  P as Actor,
  B as Entity,
  X as Sensor,
  k as Solid,
  d as System,
  p as Wall,
  m as checkCollision,
  I as checkPointIntersection,
  W as default
};
//# sourceMappingURL=dill-pixel-plugin-snap-physics.mjs.map
