import { Container as S, Signal as v, Logger as y, Plugin as w } from "dill-pixel";
import { Rectangle as b, Sprite as C, Bounds as R, Texture as M, Point as x, Graphics as E } from "pixi.js";
class z {
  constructor(t, e = !1) {
    this.cells = /* @__PURE__ */ new Map(), this._cellSize = t, e && l.all.forEach((s) => this.insert(s));
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
    for (let h = s; h <= n; h++)
      for (let a = o; a <= r; a++) {
        const u = this.getGridKey(h * this._cellSize, a * this._cellSize);
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
    for (let h = o; h <= r; h++)
      for (let a = n; a <= c; a++) {
        const u = this.getGridKey(h * this._cellSize, a * this._cellSize), g = this.cells.get(u);
        g && g.forEach((f) => {
          e !== void 0 ? Array.isArray(e) ? e.includes(f.type) && s.add(f) : e(f) && s.add(f) : s.add(f);
        });
      }
    return [...s];
  }
  updateAll() {
    l.all.forEach((t) => this.updateEntity(t));
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
    return l;
  }
  get collideables() {
    return [];
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
class A extends B {
  constructor() {
    super(...arguments), this.type = "Solid", this.isSolid = !0;
  }
  get collideables() {
    return l.getNearbyEntities(this, (t) => t.isActor);
  }
  added() {
    l.addSolid(this);
  }
  removed() {
    l.removeSolid(this);
  }
  move(t, e) {
    this.xRemainder += t, this.yRemainder += e;
    const s = Math.round(this.xRemainder), o = Math.round(this.yRemainder), n = this.getAllRidingActors();
    (s !== 0 || o !== 0) && (this.isCollideable = !1, this.y += o, this.yRemainder -= o, this.handleActorInteractions(0, o, n), this.x += s, this.xRemainder -= s, this.handleActorInteractions(s, 0, n), this.isCollideable = !0), l.updateEntity(this);
  }
  getAllRidingActors() {
    return this.collideables.filter((t) => t.isRiding(this));
  }
  // Simple collision detection between this solid and an actor
  collidesWith(t, e, s) {
    return l.getRectangleIntersection(t, this, e, s);
  }
  handleActorInteractions(t, e, s = this.getAllRidingActors()) {
    this.collideables.forEach((o) => {
      if (s.includes(o))
        o.moveY(e), o.moveX(t);
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
const G = {
  width: 10,
  height: 10,
  debugColor: 65535
};
class p extends A {
  constructor(t = {}) {
    super({ ...G, ...t }), this.type = "Wall", this.initialize();
  }
  initialize() {
    this.view = this.add.sprite({
      asset: M.WHITE,
      width: this.config.width,
      height: this.config.height,
      tint: this.config.debugColor,
      anchor: 0.5
    });
  }
}
function I(d, t) {
  return d.x > t.left && d.x < t.right && d.y > t.top && d.y < t.bottom;
}
function P(d, t) {
  const e = Math.max(0, Math.min(d.x + d.width, t.x + t.width) - Math.max(d.x, t.x)), s = Math.max(0, Math.min(d.y + d.height, t.y + t.height) - Math.max(d.y, t.y));
  return { x: e, y: s, area: e * s };
}
function m(d, t, e, s) {
  const o = {
    top: !1,
    bottom: !1,
    left: !1,
    right: !1,
    entity1: e,
    entity2: s,
    type: `${e == null ? void 0 : e.type}|${s == null ? void 0 : s.type}`
  };
  return d.intersects(t) ? (o.left = d.left < t.right && d.left > t.left, o.right = d.right > t.left && d.right < t.right, o.top = d.top < t.bottom && d.top > t.top, o.bottom = d.bottom > t.top && d.bottom < t.bottom, o) : !1;
}
const i = class i {
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
    i.grid ? i.grid.cellSize = t : i.grid = new z(t, !0), i.plugin.options.useSpatialHashGrid = !0;
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
    const c = P(n, r);
    return c.area > 0 && c.area > i.collisionThreshold;
  }
  static update(t, e, s) {
    i.enabled && (i.container || y.error("SnapPhysicsPlugin: World container not set!"), e && e.forEach((o) => o(t)), i.actors.forEach((o) => {
      o.update(t);
    }), i.solids.forEach((o) => {
      o.update(t);
    }), i.sensors.forEach((o) => {
      o.update(t);
    }), s && s.forEach((o) => o(t)), i.debug ? i.drawDebug() : i.gfx && i.gfx.clear(), i.camera && i.camera.update());
  }
  static addBoundary(t, e, s = 10, o = 5, n = ["top", "bottom", "left", "right"]) {
    if (!i.container)
      throw new Error("System container not set. Set World.container before calling System.addBoundary().");
    i.worldBounds.length > 0 && (i.worldBounds.forEach((a) => {
      a.parent.removeChild(a), a.destroy();
    }), i.worldBounds = []);
    const r = new x(0, 0), c = i.container;
    let h;
    n.includes("bottom") && (h = c.addChild(new p({ width: t, height: s })), h.position.set(r.x + t * 0.5, r.y + e + o), i.worldBounds.push(h)), n.includes("top") && (h = c.addChild(new p({ width: t, height: s })), h.position.set(r.x + t * 0.5, r.y + s * 0.5), i.worldBounds.push(h)), n.includes("left") && (h = c.addChild(new p({ width: s, height: e })), h.position.set(r.x - s * 0.5 - o, r.y + e * 0.5 + s * 0.5), i.worldBounds.push(h)), n.includes("right") && (h = c.addChild(new p({ width: s, height: e })), h.position.set(r.x + t + o + s * 0.5, r.y + e * 0.5), i.worldBounds.push(h)), i.grid && i.worldBounds.forEach((a) => {
      var u, g;
      (u = i.grid) == null || u.remove(a), (g = i.grid) == null || g.insert(a);
    });
  }
  static collide(t) {
    !t.type && t.entity1 && t.entity2 && (t.type = `${t.entity1.type}|${t.entity2.type}`), this.onCollision.emit(t);
  }
  static drawDebug() {
    i.container && (i.gfx || (i.gfx = new E(), i.container.addChild(i.gfx)), i.container.setChildIndex(i.gfx, i.container.children.length - 1), i.gfx.clear(), [...i.actors, ...i.solids, ...i.sensors].forEach((t) => {
      const e = t.getBoundingBox(), s = t.getOuterBoundingBox();
      i.gfx.rect(e.x, e.y, e.width, e.height).stroke({ width: 1, color: t.debugColors.bounds, alignment: 0.5 }), s && i.gfx.rect(s.x, s.y, s.width, s.height).stroke({ width: 1, color: t.debugColors.outerBounds, alignment: 0.5 });
    }), i.grid && i.grid.draw(i.gfx));
  }
  static setContainer(t) {
    i.container = t;
  }
  static initialize(t) {
    i.enabled = !0, t.gravity && (i.gravity = t.gravity), t.fps && (i.fps = t.fps, this.app.ticker.maxFPS = t.fps), t.container && i.setContainer(t.container), t.debug !== void 0 && (i.debug = t.debug), t.collisionResolver && (i.collisionResolver = t.collisionResolver), t.boundary && (i.boundary = {
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
    i.worldBounds && (i.worldBounds.forEach((t) => {
      t.parent.removeChild(t), t.destroy();
    }), i.worldBounds = []), i.container && (i.container.removeChildren(), i.container = null), i.gfx && (i.gfx.clear(), i.gfx = null), i.grid && (i.grid.destroy(), i.grid = null), i.camera && (i.camera = null), this.solids = [], this.actors = [], this.sensors = [], this.typeMap.clear(), this.worldBounds = [];
  }
};
i.DEFAULT_COLLISION_THRESHOLD = 2, i.debug = !0, i.typeMap = /* @__PURE__ */ new Map(), i.actors = [], i.solids = [], i.sensors = [], i.enabled = !0, i.gravity = 10, i.onCollision = new v(), i.worldBounds = [], i.collisionThreshold = 8, i._collisionResolver = null;
let l = i;
const T = {
  useSpatialHashGrid: !1,
  gridCellSize: -1,
  fps: -1
};
class W extends w {
  constructor() {
    super(...arguments), this.id = "SnapPhysicsPlugin";
  }
  get gridCellSize() {
    return this.options.gridCellSize;
  }
  set gridCellSize(t) {
    this.options.gridCellSize = t, this.options.useSpatialHashGrid && this.options.gridCellSize > 0 && l.useSpatialHashGrid(this.options.gridCellSize);
  }
  get useSpatialHashGrid() {
    return this.options.useSpatialHashGrid;
  }
  set useSpatialHashGrid(t) {
    this.options.useSpatialHashGrid = t, this.options.useSpatialHashGrid && this.options.gridCellSize > 0 ? l.useSpatialHashGrid(this.options.gridCellSize) : l.removeSpatialHashGrid();
  }
  set fps(t) {
    this.options.fps = t, l.fps = t, this.app.ticker.maxFPS = t;
  }
  get system() {
    return l;
  }
  destroy() {
    this.system.enabled = !1, l.cleanup(), super.destroy();
  }
  async initialize(t, e) {
    this.options = { ...T, ...e }, this.system.app = t, this.system.plugin = this, this.system.enabled = !0, this.options.useSpatialHashGrid && this.options.gridCellSize > 0 && this.system.useSpatialHashGrid(this.options.gridCellSize), this.options.fps > 0 && (l.fps = this.options.fps, t.ticker.maxFPS = l.fps);
  }
}
class H extends B {
  constructor() {
    super(...arguments), this.type = "Actor", this.isActor = !0, this.passThroughTypes = [], this.passingThrough = /* @__PURE__ */ new Set(), this.riding = /* @__PURE__ */ new Set(), this.ridingAmounts = /* @__PURE__ */ new Map();
  }
  get collideables() {
    return l.getNearbyEntities(this, (t) => t.isSolid);
  }
  get mostRidingSolid() {
    let t = null, e = 0;
    for (const [s, o] of this.ridingAmounts)
      o > e && (t = s, e = o);
    return t;
  }
  added() {
    l.addActor(this);
  }
  removed() {
    l.removeActor(this);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  squish(t, e, s) {
  }
  moveX(t, e, s, o) {
    this.xRemainder += t;
    let n = Math.round(this.xRemainder);
    const r = Math.sign(n);
    for (o && (o.isCollideable = !1); n !== 0; ) {
      const c = this.x + (n ? r : 0), h = this.collideAt(c - this.x, 0, this.getBoundingBox(), [
        "left",
        "right"
      ]);
      if (h) {
        e && h.forEach((a) => {
          e(a, o, new x(c - this.x, 0));
        });
        for (const a of h)
          this.isRiding(a.entity2) || (this.xRemainder = 0);
        break;
      } else
        this.x = c, n -= r, this.xRemainder -= r, s && s();
    }
    l.updateEntity(this), o && (o.isCollideable = !0);
  }
  moveY(t, e, s, o) {
    this.yRemainder += t;
    let n = Math.round(this.yRemainder);
    const r = Math.sign(n);
    for (o && (o.isCollideable = !1); n !== 0; ) {
      const c = this.y + (n ? r : 0), h = this.collideAt(0, c - this.y, this.getBoundingBox(), [
        "top",
        "bottom"
      ]);
      if (h) {
        e && h.forEach((a) => e(a, o, new x(0, c - this.y))), this.yRemainder = 0;
        break;
      } else
        this.y = c, n -= r, this.yRemainder -= r, s && s();
    }
    l.updateEntity(this), o && (o.isCollideable = !0);
  }
  // Simple bounding box collision check
  collideAt(t, e, s, o) {
    const n = new b(s.x + t, s.y + e, s.width, s.height), r = [];
    for (const c of this.collideables) {
      if (!c.isCollideable || this.passThroughTypes.includes(c.type))
        continue;
      const h = c.getBoundingBox();
      let a = m(n, h, this, c);
      o != null && o.length && a && (o.filter((g) => a[g]).length || (a = !1)), a && (l.collide(a), l.resolveCollision(a) && r.push(a));
    }
    return r.length ? r : !1;
  }
  isRiding(t) {
    return this.bottom >= t.top - 2 && this.bottom <= t.top + 2 && this.left < t.right && this.right > t.left ? (this.riding.add(t), this.ridingAmounts.set(t, Math.max(t.right - this.left, this.right - t.left)), !0) : (this.riding.has(t) && (this.riding.delete(t), this.ridingAmounts.delete(t)), !1);
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
}
class X extends H {
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
    return l.actors;
  }
  added() {
    l.addSensor(this);
  }
  removed() {
    l.removeSensor(this);
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
      s && t.push(s), s && (l.collide(s), l.resolveCollision(s) && t.push(s));
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
  H as Actor,
  B as Entity,
  X as Sensor,
  A as Solid,
  l as System,
  p as Wall,
  m as checkCollision,
  I as checkPointIntersection,
  W as default
};
//# sourceMappingURL=dill-pixel-plugin-snap-physics.mjs.map
