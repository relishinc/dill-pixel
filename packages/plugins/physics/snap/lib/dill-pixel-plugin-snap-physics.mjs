import { Container as S, Signal as v, Logger as y, Plugin as w } from "dill-pixel";
import { Rectangle as b, Sprite as C, Bounds as R, Texture as E, Point as x, Graphics as M } from "pixi.js";
class z {
  constructor(i, e = !1) {
    this.cells = /* @__PURE__ */ new Map(), this._cellSize = i, e && l.all.forEach((s) => this.insert(s));
  }
  get cellSize() {
    return this._cellSize;
  }
  set cellSize(i) {
    this._cellSize = i, this.cells.clear(), this.updateAll();
  }
  destroy() {
    this.cells.clear();
  }
  insert(i) {
    var c;
    const e = i.getBoundingBox(), s = Math.floor(e.x / this._cellSize), o = Math.floor(e.y / this._cellSize), n = Math.floor((e.x + e.width) / this._cellSize), r = Math.floor((e.y + e.height) / this._cellSize);
    for (let h = s; h <= n; h++)
      for (let d = o; d <= r; d++) {
        const u = this.getGridKey(h * this._cellSize, d * this._cellSize);
        this.cells.has(u) || this.cells.set(u, /* @__PURE__ */ new Set()), (c = this.cells.get(u)) == null || c.add(i);
      }
  }
  remove(i) {
    this.cells.forEach((e) => {
      e.delete(i);
    });
  }
  query(i, e) {
    const s = /* @__PURE__ */ new Set(), o = Math.floor(Math.min(i.x, i.x + i.width) / this._cellSize), n = Math.floor(Math.min(i.y, i.y + i.height) / this._cellSize), r = Math.floor(Math.max(i.x, i.x + i.width) / this._cellSize), c = Math.floor(Math.max(i.y, i.y + i.height) / this._cellSize);
    for (let h = o; h <= r; h++)
      for (let d = n; d <= c; d++) {
        const u = this.getGridKey(h * this._cellSize, d * this._cellSize), g = this.cells.get(u);
        g && g.forEach((f) => {
          e !== void 0 ? Array.isArray(e) ? e.includes(f.type) && s.add(f) : e(f) && s.add(f) : s.add(f);
        });
      }
    return [...s];
  }
  updateAll() {
    l.all.forEach((i) => this.updateEntity(i));
  }
  updateEntity(i) {
    this.remove(i), this.insert(i);
  }
  draw(i) {
    this._getDebugRects().forEach((s) => {
      i.rect(s.left, s.top, s.width, s.height), i.stroke({ color: 65280 });
    });
  }
  _getDebugRects() {
    const i = [];
    return this.cells.forEach((e, s) => {
      const [o, n] = s.split(":").map(Number);
      e.size && i.push(new b(o * this._cellSize, n * this._cellSize, this._cellSize, this._cellSize));
    }), i;
  }
  getGridKey(i, e) {
    const s = Math.floor(i / this._cellSize), o = Math.floor(e / this._cellSize);
    return `${s}:${o}`;
  }
}
class B extends S {
  constructor(i) {
    super(), this.isActor = !1, this.isSolid = !1, this.isSensor = !1, this.debug = !1, this.debugColors = {
      bounds: 16711680,
      outerBounds: 65280
    }, this.type = "Solid", this.isCollideable = !0, this.xRemainder = 0, this.yRemainder = 0, this._cachedBounds = null, this._dirtyBounds = !0, this.config = i;
  }
  get cachedBounds() {
    if (!this._cachedBounds || this._dirtyBounds) {
      const i = this.view.getBounds();
      i.scale(1 / this.system.container.worldTransform.d), this._cachedBounds = i;
    }
    return this._cachedBounds || new b();
  }
  set cachedBounds(i) {
    this._cachedBounds = i;
  }
  get dirtyBounds() {
    return this._dirtyBounds;
  }
  set dirtyBounds(i) {
    this._dirtyBounds = i;
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
    const i = this.system.container.toLocal(this.view.getGlobalPosition()), e = this.cachedBounds;
    return e.x = i.x, e.y = i.y, this.view instanceof C && this.view.anchor && (e.x -= this.view.width * this.view.anchor.x, e.y -= this.view.height * this.view.anchor.y), e;
  }
  getBoundingBox() {
    const i = this.getWorldBounds();
    return i instanceof R ? i.rectangle : i;
  }
  getOuterBoundingBox() {
    return null;
  }
  initialize() {
  }
}
class G extends B {
  constructor() {
    super(...arguments), this.type = "Solid", this.isSolid = !0;
  }
  get collideables() {
    return l.getNearbyEntities(this, (i) => i.isActor);
  }
  added() {
    l.addSolid(this);
  }
  removed() {
    l.removeSolid(this);
  }
  move(i, e) {
    this.xRemainder += i, this.yRemainder += e;
    const s = Math.round(this.xRemainder), o = Math.round(this.yRemainder), n = this.getAllRidingActors();
    (s !== 0 || o !== 0) && (this.isCollideable = !1, this.y += o, this.yRemainder -= o, this.handleActorInteractions(0, o, n), this.x += s, this.xRemainder -= s, this.handleActorInteractions(s, 0, n), this.isCollideable = !0), l.updateEntity(this);
  }
  getAllRidingActors() {
    return this.collideables.filter((i) => i.isRiding(this));
  }
  // Simple collision detection between this solid and an actor
  collidesWith(i, e, s) {
    return l.getRectangleIntersection(i, this, e, s);
  }
  handleActorInteractions(i, e, s = this.getAllRidingActors()) {
    this.collideables.forEach((o) => {
      if (s.includes(o))
        o.moveY(e), o.moveX(i);
      else if (!o.passThroughTypes.includes(this.type) && !o.isPassingThrough(this) && this.collidesWith(o, i, e)) {
        const n = i !== 0 ? i > 0 ? this.getBoundingBox().right - o.getBoundingBox().left : this.getBoundingBox().left - o.getBoundingBox().right : 0;
        n !== 0 && o.moveX(n, o.squish, null, this);
        const r = e !== 0 ? e > 0 ? this.getBoundingBox().bottom - o.getBoundingBox().top : this.getBoundingBox().top - o.getBoundingBox().bottom : 0;
        r !== 0 && o.moveY(r, o.squish, null, this);
      }
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleCollisionChange(i) {
  }
}
const P = {
  width: 10,
  height: 10,
  debugColor: 65535
};
class p extends G {
  constructor(i = {}) {
    super({ ...P, ...i }), this.type = "Wall", this.initialize();
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
function I(a, i) {
  return a.x > i.left && a.x < i.right && a.y > i.top && a.y < i.bottom;
}
function T(a, i) {
  const e = Math.max(0, Math.min(a.x + a.width, i.x + i.width) - Math.max(a.x, i.x)), s = Math.max(0, Math.min(a.y + a.height, i.y + i.height) - Math.max(a.y, i.y));
  return { x: e, y: s, area: e * s };
}
function m(a, i, e, s) {
  const o = {
    top: !1,
    bottom: !1,
    left: !1,
    right: !1,
    entity1: e,
    entity2: s,
    type: `${e == null ? void 0 : e.type}|${s == null ? void 0 : s.type}`
  };
  return a.intersects(i) ? (o.left = a.left < i.right && a.left > i.left, o.right = a.right > i.left && a.right < i.right, o.top = a.top < i.bottom && a.top > i.top, o.bottom = a.bottom > i.top && a.bottom < i.bottom, o) : !1;
}
const t = class t {
  static set collisionResolver(i) {
    t._collisionResolver = i;
  }
  static get worldWidth() {
    var i;
    return (i = t.boundary) != null && i.width ? t.boundary.width + (t.boundary.padding ?? 0) : t.container.width;
  }
  static get worldHeight() {
    var i;
    return (i = t.boundary) != null && i.height ? t.boundary.height + (t.boundary.padding ?? 0) : t.container.height;
  }
  static get all() {
    return [...t.actors, ...t.solids];
  }
  static get totalEntities() {
    return t.actors.length + t.solids.length + t.sensors.length;
  }
  static useSpatialHashGrid(i) {
    t.grid ? t.grid.cellSize = i : t.grid = new z(i, !0), t.plugin.options.useSpatialHashGrid = !0;
  }
  static removeSpatialHashGrid() {
    t.grid && (t.grid.destroy(), t.grid = null);
  }
  static resolveCollision(i) {
    return t._collisionResolver ? t._collisionResolver(i) : !0;
  }
  static addEntity(i) {
    t.typeMap.has(i.type) || t.typeMap.set(i.type, []), t.typeMap.get(i.type).push(i), t.grid && t.grid.insert(i);
  }
  static removeEntity(i) {
    if (t.grid && t.grid.remove(i), t.typeMap.has(i.type)) {
      const e = t.typeMap.get(i.type), s = e.indexOf(i);
      s !== -1 && e.splice(s, 1);
    }
  }
  static getEntitiesByType(...i) {
    return i.length === 0 ? t.typeMap.get(i[0]) || [] : i.reduce((e, s) => {
      const o = t.typeMap.get(s);
      return o != null && o.length ? [...e, ...o] : e;
    }, []);
  }
  static addActor(i) {
    t.actors.push(i), t.addEntity(i);
  }
  static addSolid(i) {
    t.solids.push(i), t.addEntity(i);
  }
  static addSensor(i) {
    t.sensors.push(i), t.addEntity(i);
  }
  static removeActor(i) {
    t.removeEntity(i);
    const e = t.actors.indexOf(i);
    e !== -1 && t.actors.splice(e, 1);
  }
  static removeSolid(i) {
    t.removeEntity(i);
    const e = t.solids.indexOf(i);
    e !== -1 && t.solids.splice(e, 1);
  }
  static removeSensor(i) {
    t.removeEntity(i);
    const e = t.sensors.indexOf(i);
    e !== -1 && t.sensors.splice(e, 1);
  }
  static getNearbyEntities(i, e) {
    if (t.grid) {
      const s = i.getBoundingBox();
      return t.grid.query(s, e);
    }
    return t.all.filter((s) => e ? Array.isArray(e) ? e.includes(s.type) : e(s) : !0);
  }
  /**
   * @param entity1
   * @param entity2
   * @param dx
   * @param dy
   */
  static getRectangleIntersection(i, e, s, o) {
    const n = i.getBoundingBox(), r = e.getBoundingBox().clone();
    r.x += s, r.y += o;
    const c = T(n, r);
    return c.area > 0 && c.area > t.collisionThreshold;
  }
  static update(i, e, s) {
    t.enabled && (t.container || y.error("SnapPhysicsPlugin: World container not set!"), e && e.forEach((o) => o(i)), t.actors.forEach((o) => {
      o.update(i);
    }), t.solids.forEach((o) => {
      o.update(i);
    }), t.sensors.forEach((o) => {
      o.update(i);
    }), s && s.forEach((o) => o(i)), t.debug ? t.drawDebug() : t.gfx && t.gfx.clear(), t.camera && t.camera.update());
  }
  static addBoundary(i, e, s = 10, o = 5, n = ["top", "bottom", "left", "right"]) {
    if (!t.container)
      throw new Error("System container not set. Set World.container before calling System.addBoundary().");
    t.worldBounds.length > 0 && (t.worldBounds.forEach((d) => {
      d.parent.removeChild(d), d.destroy();
    }), t.worldBounds = []);
    const r = new x(0, 0), c = t.container;
    let h;
    n.includes("bottom") && (h = c.addChild(new p({ width: i, height: s })), h.position.set(r.x + i * 0.5, r.y + e + o), t.worldBounds.push(h)), n.includes("top") && (h = c.addChild(new p({ width: i, height: s })), h.position.set(r.x + i * 0.5, r.y + s * 0.5), t.worldBounds.push(h)), n.includes("left") && (h = c.addChild(new p({ width: s, height: e })), h.position.set(r.x - s * 0.5 - o, r.y + e * 0.5 + s * 0.5), t.worldBounds.push(h)), n.includes("right") && (h = c.addChild(new p({ width: s, height: e })), h.position.set(r.x + i + o + s * 0.5, r.y + e * 0.5), t.worldBounds.push(h)), t.grid && t.worldBounds.forEach((d) => {
      var u, g;
      (u = t.grid) == null || u.remove(d), (g = t.grid) == null || g.insert(d);
    });
  }
  static collide(i) {
    !i.type && i.entity1 && i.entity2 && (i.type = `${i.entity1.type}|${i.entity2.type}`), this.onCollision.emit(i);
  }
  static drawDebug() {
    t.container && (t.gfx || (t.gfx = new M(), t.container.addChild(t.gfx)), t.container.setChildIndex(t.gfx, t.container.children.length - 1), t.gfx.clear(), [...t.actors, ...t.solids, ...t.sensors].forEach((i) => {
      const e = i.getBoundingBox(), s = i.getOuterBoundingBox();
      t.gfx.rect(e.x, e.y, e.width, e.height).stroke({ width: 1, color: i.debugColors.bounds, alignment: 0.5 }), s && t.gfx.rect(s.x, s.y, s.width, s.height).stroke({ width: 1, color: i.debugColors.outerBounds, alignment: 0.5 });
    }), t.grid && t.grid.draw(t.gfx));
  }
  static setContainer(i) {
    t.container = i;
  }
  static initialize(i) {
    t.enabled = !0, i.gravity && (t.gravity = i.gravity), i.fps && (t.fps = i.fps, this.app.ticker.maxFPS = i.fps), i.container && t.setContainer(i.container), i.debug !== void 0 && (t.debug = i.debug), i.collisionResolver && (t.collisionResolver = i.collisionResolver), i.boundary && (t.boundary = {
      width: i.boundary.width,
      height: i.boundary.height,
      padding: i.boundary.padding ?? 0
    }, i.boundary.width && i.boundary.height ? t.addBoundary(
      i.boundary.width,
      i.boundary.height,
      i.boundary.thickness,
      i.boundary.padding,
      i.boundary.sides
    ) : y.error("SnapPhysicsPlugin System.initialize: Boundary width and height required.")), i.useSpatialHashGrid && t.useSpatialHashGrid(i.cellSize ?? 100);
  }
  static updateEntity(i) {
    t.grid && t.grid.updateEntity(i);
  }
  static cleanup() {
    t.worldBounds && (t.worldBounds.forEach((i) => {
      i.parent.removeChild(i), i.destroy();
    }), t.worldBounds = []), t.container && (t.container.removeChildren(), t.container = null), t.gfx && (t.gfx.clear(), t.gfx = null), t.grid && (t.grid.destroy(), t.grid = null), t.camera && (t.camera = null), this.solids = [], this.actors = [], this.sensors = [], this.typeMap.clear(), this.worldBounds = [];
  }
};
t.DEFAULT_COLLISION_THRESHOLD = 2, t.debug = !0, t.typeMap = /* @__PURE__ */ new Map(), t.actors = [], t.solids = [], t.sensors = [], t.enabled = !0, t.gravity = 10, t.onCollision = new v(), t.worldBounds = [], t.collisionThreshold = 8, t._collisionResolver = null;
let l = t;
const A = {
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
  set gridCellSize(i) {
    this.options.gridCellSize = i, this.options.useSpatialHashGrid && this.options.gridCellSize > 0 && l.useSpatialHashGrid(this.options.gridCellSize);
  }
  get useSpatialHashGrid() {
    return this.options.useSpatialHashGrid;
  }
  set useSpatialHashGrid(i) {
    this.options.useSpatialHashGrid = i, this.options.useSpatialHashGrid && this.options.gridCellSize > 0 ? l.useSpatialHashGrid(this.options.gridCellSize) : l.removeSpatialHashGrid();
  }
  set fps(i) {
    this.options.fps = i, l.fps = i, this.app.ticker.maxFPS = i;
  }
  get system() {
    return l;
  }
  destroy() {
    this.system.enabled = !1, l.cleanup(), super.destroy();
  }
  async initialize(i, e) {
    this.options = { ...A, ...e }, this.system.app = i, this.system.plugin = this, this.system.enabled = !0, this.options.useSpatialHashGrid && this.options.gridCellSize > 0 && this.system.useSpatialHashGrid(this.options.gridCellSize), this.options.fps > 0 && (l.fps = this.options.fps, i.ticker.maxFPS = l.fps);
  }
}
class H extends B {
  constructor() {
    super(...arguments), this.type = "Actor", this.isActor = !0, this.passThroughTypes = [], this.passingThrough = /* @__PURE__ */ new Set();
  }
  get collideables() {
    return l.getNearbyEntities(this, (i) => i.isSolid);
  }
  added() {
    l.addActor(this);
  }
  removed() {
    l.removeActor(this);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  squish(i, e, s) {
  }
  moveX(i, e, s, o) {
    this.xRemainder += i;
    let n = Math.round(this.xRemainder);
    const r = Math.sign(n);
    for (o && (o.isCollideable = !1); n !== 0; ) {
      const c = this.x + (n ? r : 0), h = this.collideAt(c - this.x, 0, this.getBoundingBox(), [
        "left",
        "right"
      ]);
      if (h) {
        e && h.forEach((d) => {
          e(d, o, new x(c - this.x, 0));
        });
        for (const d of h)
          this.isRiding(d.entity2) || (this.xRemainder = 0);
        break;
      } else
        this.x = c, n -= r, this.xRemainder -= r, s && s();
    }
    l.updateEntity(this), o && (o.isCollideable = !0);
  }
  moveY(i, e, s, o) {
    this.yRemainder += i;
    let n = Math.round(this.yRemainder);
    const r = Math.sign(n);
    for (o && (o.isCollideable = !1); n !== 0; ) {
      const c = this.y + (n ? r : 0), h = this.collideAt(0, c - this.y, this.getBoundingBox(), [
        "top",
        "bottom"
      ]);
      if (h) {
        e && h.forEach((d) => e(d, o, new x(0, c - this.y))), this.yRemainder = 0;
        break;
      } else
        this.y = c, n -= r, this.yRemainder -= r, s && s();
    }
    l.updateEntity(this), o && (o.isCollideable = !0);
  }
  // Simple bounding box collision check
  collideAt(i, e, s, o) {
    const n = new b(s.x + i, s.y + e, s.width, s.height), r = [];
    for (const c of this.collideables) {
      if (!c.isCollideable || this.passThroughTypes.includes(c.type))
        continue;
      const h = c.getBoundingBox();
      let d = m(n, h, this, c);
      o != null && o.length && d && (o.filter((g) => d[g]).length || (d = !1)), d && (l.collide(d), l.resolveCollision(d) && r.push(d));
    }
    return r.length ? r : !1;
  }
  isRiding(i) {
    return this.bottom >= i.top - 2 && this.bottom <= i.top + 2 && this.left < i.right && this.right > i.left;
  }
  setPassingThrough(i) {
    this.passingThrough.add(i);
  }
  removePassingThrough(i) {
    this.passingThrough.delete(i);
  }
  isPassingThrough(i) {
    return this.passingThrough.has(i);
  }
}
class X extends H {
  constructor() {
    super(...arguments), this.type = "Sensor", this.isSensor = !0, this.isColliding = !1, this.passThroughTypes = ["Actor", "Player"], this._activeCollisions = null;
  }
  get activeCollisions() {
    return this._activeCollisions;
  }
  set activeCollisions(i) {
    this._activeCollisions = i;
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
  update(i) {
    this.activeCollisions = this.resolveAllCollisions(), this.isColliding = !!this.activeCollisions;
  }
  /**
   * Resolve all collisions for this sensor
   * ignores passThroughTypes
   */
  resolveAllCollisions() {
    const i = [];
    for (const e of this.collideables) {
      if (!e.isCollideable)
        continue;
      const s = m(this.getBoundingBox(), e.getBoundingBox(), this, e);
      s && i.push(s), s && (l.collide(s), l.resolveCollision(s) && i.push(s));
    }
    return i.length ? i : null;
  }
  getOuterCollisions(i = this.collideables) {
    const e = this.getOuterBoundingBox();
    if (!e)
      return y.error(this.type, "has no outer bounding box. Returning empty array."), [];
    const s = [];
    for (const o of i) {
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
  G as Solid,
  l as System,
  p as Wall,
  m as checkCollision,
  I as checkPointIntersection,
  W as default
};
//# sourceMappingURL=dill-pixel-plugin-snap-physics.mjs.map
